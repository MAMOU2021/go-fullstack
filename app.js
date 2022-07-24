
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Thing = require('./models/Thing');
const thing = require('./models/Thing');

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


//-----------------------------------------Post middlewear-------------------------------
  app.post('/api/stuff', (req,res,next) =>{
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
    .then(()=> res.status(201).json({message :'Objet Enregistrer !!!'}))
    .catch(Error => res.status(400).json({Error}));
  });   
  //-------------------------------------------------------------------------------------


 //------------------------------Get middlewear--------------------------------------------- 
app.get('/api/stuff/:id',(req,res,next) =>{
Thing.findOne({ _id : req.params.id})
.then(thing => res.status(200).json(thing))
.catch(error =>res.status(404).json(error));

})


app.get('/api/stuff',(req,res,next)=>{
     Thing.find()
       .then(things => res.status(200).json(things))
       .catch(error =>res.status(400).json(error));
})

module.exports = app;