const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

exports.signup = (req,res,next) =>{
  bcrypt.hash(req.body.password,10)    // permet de hacher le mot de passe
  .then( hash => {
    const user = new User ({
        email : req.body.email,
        password : hash
    });
    user.save()
      .then(() =>res.status(201).json({message : 'Utilisateur créé !!'}))
      .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(500).json({error})); 
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };




/* Installation du packahge de cryptage pour les mots de passe 

npm install --save bcrypt

*/

/* 

//SIGNUP

Dans cette fonction :

nous appelons la fonction de hachage de bcrypt dans notre mot de passe et lui demandons de « saler » le mot de passe 10 fois. 
Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé. Pour plus d'informations, consultez la documentation de bcrypt ;
il s'agit d'une fonction asynchrone qui renvoie une Promise dans laquelle nous recevons le hash généré ;
dans notre bloc then , nous créons un utilisateur et l'enregistrons dans la base de données, 
en renvoyant une réponse de réussite en cas de succès, et des erreurs avec le code d'erreur en cas d'échec. 

La méthode  hash()  de bcrypt crée un hash crypté des mots de passe de vos utilisateurs pour les enregistrer de manière sécurisée dans la base de données.

*/

//LOGIN

/* 
Nous utilisons notre modèle Mongoose pour vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données :
Dans le cas contraire, nous renvoyons une erreur401 Unauthorized.
Si l'e-mail correspond à un utilisateur existant, nous continuons.
Nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données :
S'ils ne correspondent pas, nous renvoyons une erreur401 Unauthorized avec le même message que lorsque l’utilisateur n’a pas été trouvé, afin de ne pas laisser quelqu’un vérifier si une autre personne est inscrite sur notre site.
S'ils correspondent, les informations d'identification de notre utilisateur sont valides. Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token. Ce token est une chaîne générique pour l'instant,
 mais nous allons le modifier et le crypter dans le prochain chapitre.

 La méthode compare de bcrypt compare un string avec un hash pour, par exemple, vérifier si un mot de passe entré par l'utilisateur correspond à un hash sécurisé enregistré en base de données.
  Cela montre que même bcrypt ne peut pas décrypter ses propres hashs.

*/

//POUR LA PRISE EN CHARGE AUTOMATIQUE DES TOKENS NOUS INSTALLER jsonwebtoken
//  npm install --save jsonwebtoken

//TOKEN

/* Dans le code ci-dessus :
Nous utilisons la fonction sign de jsonwebtoken pour chiffrer un nouveau token.
Ce token contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token).
Nous utilisons une chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour crypter notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production). Puisque cette chaîne sert de clé pour le chiffrement et le déchiffrement du token, elle doit être difficile à deviner, sinon n’importe qui pourrait générer un token en se faisant passer pour notre serveur.
Nous définissons la durée de validité du token à 24 heures. L'utilisateur devra donc se reconnecter au bout de 24 heures.
Nous renvoyons le token au front-end avec notre réponse. 

Les JSON web tokens sont des tokens chiffrés qui peuvent être utilisés pour l'autorisation.
La méthode sign() du package jsonwebtoken utilise une clé secrète pour chiffrer un token qui peut contenir un payload personnalisé et avoir une validité limitée.
*/