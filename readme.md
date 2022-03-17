Description du besoin
===

Nous souhaitons proposer au visiteur de https://www.draguignan-quartierdesarts.fr/ la possibilité de se géolocaliser.

La première version était basée sur *Google Maps* mais nous utilisons actuellement les services de **MapBox** et la technologie **WebGL**.

Cette carte viens en supplément des 3 cartes SVG intégrées à la page d'accueil du site.


Organisation du repo
===

* Les fichiers *à la racine* sont les seuls nécessaire au fonctionnement de la carte
* Le dossier `outils_de_travail` contient des éléments qui permettrons de faciliter le developpement (ajout de bâtiments... récuperer des données vectorielles)

Le fichier qda-data.js
---
Contient deux tableaux multidimensionnels permettant une recherche croisée.
Cette recherche croisée permettra de relier les informations historiques des batiments à leurs informations géographiques.

* `numLoc`, Le premier tableau fait correspondre les coordonnées des batiments à leurs numeros respectifs.
L'indexage est sous la forme `numLoc['street']['num']` et renvoie un tableau de tuples longitude-latitude représentant les sommets du polygone.
*Mis à part les anciens batiments détruits ou les futurs travaux, ce sont des données plus ou moins **figées**.*

* `eraLayers`, le deuxième tableau, fait correspondre -- pour une période donnée -- les noms de commerces aux batiments concernés (texte du tool-tip).
Pour chaque période on retrouve un tableau similaire à numLoc. La forme est `eraLayers['era']['street']['num']`.
*Ces données, surtout pour le layer contemporain, vont **changer fréquemment** (nouveaux artisans etc...).*

Contient également deux fonctions "helpers" permettant de générer une collection d'objets "Feature".
"Feature" est une classe GeoJSON (un des formats principaux pour Mapbox WebGL)

la première fonction, `parseStreetEra(rue, era)`, parcours une rue pour une periode seulement. (c'est une sous-fonction pour générer la suivante).
la deuxième fonction, `parseEra(era)`, appelle la première fonction sur chaque rue, cela permets d'avoir la liste complète pour une période.

Le fichier mapbox-qda-helpers.js
---

En premier lieu nous trouvons le tableau `periodesInfo` qui va se remplir grace aux fonctions dans `qda-data.js`.
Ce tableau fait correspondre le nom de la periode à sa liste de features et sa couleur.

Nous trouvons ensuite des fonctions helpers permettant de generer les "sources" de données et les layers correspondants.
La liste de features precedemment crée nous permets de renseigner nos sources. A chacune d'elles correspondra un layer que l'on peut afficher ou non.

La fonction `populateNavMenu()` va permettre de créer des bouttons (en dessous du lien vers l'accueil) et de leur associer un comportement "radio" qui permettra de ne jamais avoir deux layers de periodes differentes en meme temps.

Contient :
 * l'ajout des sources et des layers à partir de nos données (on genere une liste de "Feature" (classe specifique au GeoJSON)
 * les fonctions pour le tooltip flottant (mouse events)
 * Generation de "Bouttons"/"Radio" pour choisir le layer a afficher


Le fichier mapboxInit.js
---

Code de base de la carte (le point d'entrée)
Pour plus d'infos se rendre sur https://docs.mapbox.com/mapbox-gl-js/example/
Cela permets de se familiariser avec la documentation et les convensions utilisées par la communauté de développeurs MapBox.
La plupart des fonctionnalitées y sont illustrées.
