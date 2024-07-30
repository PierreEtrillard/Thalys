# Thalys
Site vitrine de Thalys développement 
## Maintenance 
Sur demande du client aucun framework n'est utilisé pour le développement du projet et celui-ci ne dépend d'aucune librairie tiers pour la phase de développement ormis sass.
Les dépendances suivante sont toutefois necessaires pour la mise en production:
    autoprefixer
    cssnano
    html-minifier-terser
    postcss
    postcss-cli
L'ensemble de ces dépendance ainsi que sass est installable en une seul commande à executer dans le dossier 'Thalys':
npm install --save
node est facilement installable sur tous les OS en suivant ce lien[https://nodejs.org/fr/download/] et est necessaire pour utiliser npm (node package manager)
## Deploiement
une seul commande est nécesaire à la production: 'npm run build' celle ci générera des fichier minifiés des fichiers html,css et js au sein du dossier dist.
Pour la mise en production il suffit d'envoyé les repertoire dist, asset, fonts et les fichiers favicon et license sur le serveur.
## CSS
la fichier main.scss centralise toutes les régles et dépend des partials annotées d'un underscore dans le même fichier. main.scss est structué ainsi : les variables global en premier puis les régles sont écrite dans le déroulé du index.html. les régles spécifiques au pages aboout, contact et offre sont en queue de fichier dans l'ordre précité. 
