# MelanyConde_6_08042021

SO-PEKOCKO

L'entreprise So-Pekocko a souhaité développer une application permettant à des utilisateurs d'ajouter et d'évaluer des sauces piquantes en likant ou dislikant les produits.

Pré-requis
Avant de commencer, vous devrez cloner le frontend de l'application à cette adresse :
https://github.com/OpenClassrooms-Student-Center/dwj-projet6

ATTENTION
Pour des raisons de sécurité, il vous sera necessaire de créer un fichier .env dans votre dossier backend. Vous devrez ensuite écrire ce qui suit :

DJWT_RAND_SECRET=RANDOM_TOKEN_SECRET
MONGO_USERNAME=Mentor
MONGO_PASSWORD=mentor
CLUSTER_DB=cluster0
DATA_BASE_NAME=myFirstDatabase

Les variables du "mentor" ont été ajouté le temps de la soutenance.

INSTALLATION

Côté Frontend :
Aller sur votre terminal
Accéder au frontend avec : cd frontend
Lancer le serveur côté frontend : ng serve
Il faudra garder ce terminal ouvert durant toute votre session sur le site

Côté Backend :
Ouvrir un second terminal
Accéder au backend : cd backend
Installer NPM : npm install
Pour utiliser le serveur, chargez le package nodemon : npm install -g nodemon
Lancer le serveur côté backend : nodemon server
Il faudra également garder ce terminal ouvert durant toute votre session sur le site

Lancement du site :
Vous pouvez désormais accéder à l'adresse suivante : http://localhost:4200/login

Technologies utilisées :
Node.js ( ainsi que le framework Express)
Angular
MongoDB Atlas

Liste des dépendances NPM
Il faut les installer afin de s'assurer du bon fonctionnement de l'application :
Express
Helmet
Multer
Body-parser
Validator
Mongoose
Mongoose-unique-validator
Jsonwebtoken
Express-rate-limit
Dotenv
