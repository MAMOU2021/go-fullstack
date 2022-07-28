const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    email : {type : String ,require :true , unique : true }, 
    password : {type : String ,require :true}
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users',userSchema);

// unique : true pourque que ça soit impossible d'utiliser le mm email pour creer plusieur compte

/* Mais pour mieux gérer le problème nous allons installer un package qui est : 
npm install --save mongoose-unique-validator 
*/

/* 

bcrypt  est un package de cryptage que vous pouvez installer avec  npm  .
mongoose-unique-validator  améliore les messages d'erreur lors de l'enregistrement de données uniques.

*/