const express = require('express');
const app = express();

// Définition de la route en GET
app.get('/', (req, res) => {
    res.send('hello world!');
});

// Démarrage du serveur Express
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
