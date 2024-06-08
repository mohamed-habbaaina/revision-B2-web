// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

// Clé secrète pour JWT (chargée depuis les variables d'environnement)
const JWT_SECRET = process.env.JWT_SECRET;

// Création de l'application Express
const app = express();

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Données factices d'utilisateurs pour les tests
let users = [
    new User(1, 'John Doe', 'john@gmail.com', bcrypt.hashSync('1234', 10)),
    new User(2, 'Jane Doe', 'jane@gmail.com', bcrypt.hashSync('1234', 10)),
    new User(3, 'Moh Doe', 'moh@gmail.com', bcrypt.hashSync('1234', 10)),
    new User(4, 'Jack Doe', 'jack@gmail.com', bcrypt.hashSync('1234', 10)),
    new User(5, 'Amin Doe', 'amine@gmail.com', bcrypt.hashSync('1234', 10))
];

// Middleware pour vérifier les tokens JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Route pour obtenir tous les utilisateurs (sécurisée)
app.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});

// Route pour obtenir un utilisateur par son ID (sécurisée)
app.get('/users/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Route pour créer un nouvel utilisateur
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User(users.length + 1, name, email, hashedPassword);
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Route pour la connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

// Route pour mettre à jour un utilisateur existant (sécurisée)
app.put('/users/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].password = bcrypt.hashSync(password, 10);
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Route pour supprimer un utilisateur (sécurisée)
app.delete('/users/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.sendStatus(204);
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
