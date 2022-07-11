const express = require('express');

const app = express();


app.use((req,res,next) => {
    console.log('Requète reçcu');
    next();
});

app.use((req,res,next) =>{
    res.status(201);
    next();
})

app.use((req,res) =>{
    res.json({message :' votre requeste est reçu !'});
})

app.use((req,res) =>{
    console.log('Reponse envoyer avec succès');
})

module.exports = app;