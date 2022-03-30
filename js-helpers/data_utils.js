/* fonction outil, permettant de faire correspondre 
* le nom de la periode au numero pour l'ancre sur la 
* page triptique (le lien ouvre sur la periode voulue)
*/
function getAnchorIndex(era) {
  let result;
  switch (era) {
   case "Contemporain" :
    result = 1;
    break;
   case "PlacesCont" :
    result = 1;
    break;
   case "Moderne" :
    result = 2;
    break;
   case "PlacesMod" :
    result = 2;
    break;
   case "Historique" :
    result = 3;
    break;
   case "PlacesHist" :
    result = 3;
    break;
  }
  return result;
}

/* prefixe n par zero si inferieur a 10
   ATTENTION NE PAS DEPASSER 99 */
function n(n) {
  return n > 9 ? "" + n: "0" + n;
}

/*
* pour chaque Layer on liste des batiments.
* (On regroupe les batiments par rue pour s'y retrouver)
* 
* chaque batiment doit nous donner :
*  - son emplacement (latitude longitude)
*  - Le texte a afficher au survol
*
*  Pour un meme batiment l'emplacement est toujours le meme
*  en revanche le message change d'une periode a l'autre.
*
* La fonction parseEra permets de construire, a partir 
* de 2 tableaux associatifs, la structure de donnees voulue
* en evitant les repetitions.
*/

function parseEra(era) {
  /* Cette fonction est celle qui permet de remplir un Layer.
  * Il y a un Layer par epoque (era = epoque en anglais).
  *
  * pour chaque rue on va concatener les resultats en un seul tableau
  */
  let eraFeatList = [];
  streets.forEach( function(str) {
    eraFeatList = eraFeatList.concat( parseStreetEra(str, era) );
  });
  return eraFeatList;
}

function parseStreetEra(street, era) {
/* Cette fonction retourne tous les batiments
* d'une rue seulement et pour une epoque uniquement
* Elle est appellee par la fonction "parseEra" (pas d'autre utilite)
*/
  let strFeatList = [];
  let i = 1;
  for (let bat in eraLayers[era][street]) {
  /* /!\ ici on parcours une rue seulement.
   * On cree une collection de Features (classe geoJSON) :
   * pour chaque batiment, on va inserer un objet dans le tableau (la collection).
   * et on renseigne la localisation et le message correspondant (voir eraLayers)
   */
    let genId = era+"-"+street+"-"+i;
    strFeatList.push( Object.assign( {
     'type'      : 'Feature',
     'properties': {
         "@id": "way/"+genId,
        'description': "<center> - numéro "+bat+" - </center><br><center>"+eraLayers[era][street][bat]+"</center>", 
        'link':        'n-'+n(bat)+street+'/#toggle-id-'+getAnchorIndex(era)
      },
     'geometry'  : { 
        'type': 'Polygon',
        'coordinates': numLoc[street][bat]
      },
      "id": "way/"+genId
    }
    ));
    i += i;
  }
  return strFeatList;
}