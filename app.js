
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongoose')

const app = express();

//------------------------------------------------------------------------------------------------------
                              /* Connection de MongoDB */
mongoose.connect('mongodb+srv://johnLopo:2001@cluster0.3rthccw.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//-------------------------------------------------------------------------------------------------------
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

  app.post('/api/stuff', (req,res,next) =>{
   console.log(req.body) // on a accès à req.body grace  app.use(express.json());
   res.status(201).json({
    message : 'Objet crée'
   });
  });   

app.get('/api/stuff',(req,res,next)=>{
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
          },
          {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
          },
          {
            _id: 'oeihfzeomoihi',
            title: 'Mon troisième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/03/16/01/23/bird-7071408__340.jpg',
            price: 1700,
            userId: 'qsomihvqios',
          },
    ];
    res.status(200).json(stuff) // ici on spécifie le status (code) et eon rnvoie le tableau stuff sous forat json 
})

module.exports = app;