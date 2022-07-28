
const express = require('express');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const router = express.Router();


const stuffCtrl = require('../controllers/stuffs')

 /* ********************************************** GET MIDDLEWEARS *******************************************************/ 

 /* La méthode GET demande une représentation de la ressource spécifiée. 
 Les requêtes GET doivent uniquement être utilisées afin de récupérer des données. */

 //cette middleweare recupère toutes les données 
router.get('/',auth,stuffCtrl.getAllThing)

//********************************************  POST MIDDLEWEARS **********************************************************

/* La méthode POST est utilisée pour envoyer une entité vers la ressource indiquée. 
Cela entraîne généralement un changement d'état ou des effets de bord sur le serveur. */


router.post('/',auth, multer,stuffCtrl.createThing);   

//cette middleweare recupère les données d'un id spécifié 
router.get('/:id',auth,stuffCtrl.getOneThing);

  /* ********************************************** PUT MIDDLEWEARS *******************************************************/ 
  /* La méthode PUT remplace toutes les représentations actuelles de la ressource visée par le contenu de la requête. */ 

router.put('/:id',auth,multer,stuffCtrl.modifyThing);

  /* ********************************************** DELETE MIDDLEWEARS *******************************************************/ 

  router.delete('/:id',auth ,stuffCtrl.deleteThing);



module.exports = router;
