// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');

// Création de l'application Express
const app = express();

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Données factices d'utilisateurs pour les tests
let users = [
    new User(1, 'John Doe', 'john@gmail.com'),
    new User(2, 'Jane Doe', 'jane@gmail.com'),
    new User(3, 'Moh Doe', 'moh@gmail.com'),
    new User(4, 'Jack Doe', 'jack@gmail.com'),
    new User(5, 'Amin Doe', 'amine@gmail.com')
];

// Route pour obtenir tous les utilisateurs
app.get('/users', (req, res) => {
    res.json(users);
});

// Route pour obtenir un utilisateur par son ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Route pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
    const { id, name, email } = req.body;
    const newUser = new User(id, name, email);
    users.push(newUser);
    res.status(201).json(newUser);
});

// Route pour mettre à jour un utilisateur existant
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = email;
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Route pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.sendStatus(204);
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
