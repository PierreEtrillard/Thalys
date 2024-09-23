# ![alt logo](assets/logo-white.webp) Site vitrine de Thalys développement

## Introducation
*Sur demande du client **aucun framework n'est utilisé pour le développement du projet** et celui-ci ne dépend d'aucune librairie tiers pour la phase de développement ormis sass.*

Les dépendances suivante sont toutefois **necessaires pour la mise en production**:
- autoprefixer
- cssnano
- html-minifier-terser
- postcss
- postcss-cli
- json-minify

*ces bibliothèques minify les fichiers en sortie et ajoute les prefix css necessaires aux différent navigateurs* 

L'ensemble de ces dépendances ainsi que sass est **installable en une seul commande** à executer dans le dossier 'Thalys':
`npm install --save`
*node est necessaire pour utiliser npm (node package manager)* il est facilement installable sur tous les OS en suivant [ce lien](https://nodejs.org/fr/download/).

## Déploiement

- [ ] **une seul commande** est nécesaire à la mise en production: `npm run build_fr` ou `npm run build_en` *celle ci générera des fichiers minifiés des fichiers html,css,js et json dans la langue spécifiée au sein du dossier **dist/**.*

- [ ] Pour la **mise en production** il suffit d'**envoyer** les repertoires **dist/**, **asset/**, **fonts/**, **LANG/**, **api/** et mettre le fichier **assets\favicon_alt\favicon.ico** à la racine ainsi que les fichiers '**license**' sur le serveur.

## Maintenance 
### Architecture

Le projet est construit comme un site purement static avec la page d'accueil en index.html afin de favoriser le SEO.

Afin d'eviter la répetition des headers et footers des autres pages, à la maniére d'une Single Page App, **un generateur de contenu en JavaScript est implémenté dans le fichier pages.js**.
Celui-ci est **rattaché pages.html** et *y injecte le contenu des fichiers html placés dans le repertoire pages/*

#### *ajout de nouvelles pages*
l'ajout de nouvelles pages necessitera les 3 étapes suivante:
1. coder le html dans un nouveau fichier du repertoire "pages/" :
  le fichier contiendra uniquement les sections à injecter dans le main;
  mettre à jour les fichier de LANG/**.json

2. mettre a jour le switch statement de pages.js[¹] et les liens dans les fichiers .html ainsi : href="?new_page_name"
[¹]: il suffit d'ajouter un `case "new_page_name" : injectHtml("pages/new_page_name.html");
break;`

3. ajouter un script  `"build:new_page_name:html" : "html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true src/new_page_name.html -o dist/new_page_name.html",` au package.json
et mettre à jour build:html en ajoutant `&& npm run build:new_page_name:html` a la fin

### CSS

Le fichier **scss/main.scss centralise toutes les régles** et dépend des partials annotées d'un underscore dans le même repertoire.

main.scss est structué ainsi : 
- les variables global en premier
- puis les régles sont écritent dans le déroulé du DOM.
- les **régles spécifiques aux pages** about, contact, offre, legal, confidentiality sont **dans les class du même nom** wrappées dans **la régle 'section'** (ainsi cela suit toujours l'ordre de lecture du html). 

Le **changement de typo ou de couleurs** ce fait dans les partials **scss/_typos.scss** et **scss/_colors.scss**
