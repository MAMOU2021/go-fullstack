
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const stuffRoutes = require('./routes/stuffs');
const userRoutes = require('./routes/user');

//------------------------------------------------------------------------------------------------------
                              /* Connection de MongoDB */
mongoose.connect('mongodb+srv://johnLopo:2001@cluster0.3rthccw.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//-------------------------------------------------------------------------------------------------------

const app = express();

app.use('/images', express.static(path.join(__dirname, 'images'))); //La configuration middleware Pour permettre l'accès à des ressources statiques comme des images

app.use(express.json()); // Avec ceci, Express prend toutes les requêtes qui ont
// comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req   

//-----------------------------------Pour Résourdre les problèmes de CORS -----------------------------------
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//-----------------------------------------------------------------------------------------------------------  
app.use(bodyParser.json())

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth',userRoutes); //raccine de tous ce qui est routes liées à l'authentification 

module.exports = app;