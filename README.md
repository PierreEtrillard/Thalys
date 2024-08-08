# Thalys ![alt logo](assets/logo-white.webp)
<center>Site vitrine de Thalys développement</center>

## Introducation
*Sur demande du client **aucun framework n'est utilisé pour le développement du projet** et celui-ci ne dépend d'aucune librairie tiers pour la phase de développement ormis sass.*

Les dépendances suivante sont toutefois **necessaires pour la mise en production**:
- autoprefixer
- cssnano
- html-minifier-terser
- postcss
- postcss-cli

L'ensemble de ces dépendances ainsi que sass est **installable en une seul commande** à executer dans le dossier 'Thalys':
`npm install --save`
*node est necessaire pour utiliser npm (node package manager)* il est facilement installable sur tous les OS en suivant [ce lien](https://nodejs.org/fr/download/).

## Déploiement

- [] **une seul commande** est nécesaire à la mise en production: `npm run build` *celle ci générera des fichiers minifiés des fichiers html,css et js au sein du dossier **dist/**.*

- [] Pour la **mise en production** il suffit d'**envoyer** les repertoires **dist/**, **asset/**, **fonts/** et les fichiers '**favicon**' et '**license**' sur le serveur.

## Maintenance 
### Architecture

le projet est construit comme un site purement static avec la page d'accueil en index.html afin de favoriser le SEO.

Afin d'eviter la répetition des headers et footers des autres pages, à la maniére d'une Single Page App, **un generateur de contenu en JavaScript est implémenté dans le fichier pages.js**.
Celui-ci est **rattaché pages.html** et *y injecte le contenu des fichiers html placés dans le repertoire pages/*

### CSS

Le fichier **scss/main.scss centralise toutes les régles** et dépend des partials annotées d'un underscore dans le même repertoire.

main.scss est structué ainsi : 
- les variables global en premier
- puis les régles sont écrite dans le déroulé du DOM.
- les **régles spécifiques aux pages** about, contact, offre, legal, confidentiality sont **dans les class du même nom** wrappées dans **la régle 'section'** (ainsi cela suit toujours l'ordre de lecture du html). 

Le **changement de typo ou de couleurs** ce fait dans les partials **scss/_typos.scss** et **scss/_colors.scss**
