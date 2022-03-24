/* Pour chaque periode on a un id et une couleur associee
*  Ce tableau permets un code plus concis via l'utilisation des
*  fonctions "helper" et des forEach (pour ajouter sources et layers...)
*/
const eraInfo = [
  {'id':"PlacesCont", 'features':parseEra("Contemporain"), 'color':"#bd5942"}, 
  {'id':"PlacesMod",  'features':parseEra("Moderne"),      'color':"#6Ea76B"},
  {'id':"PlacesHist", 'features':parseEra("Historique"),   'color':"#40a7b8"}
];
/* parseEra() (voir data_utils.js) construit la collection de features pour une source
*  une Feature (classe GeoJSON)   correspond a un Batiment. */

/*  une Source  (classe MapBoxGl)  par periode */
function addSourceHelper(era) {
  map.addSource(era.id, {
    'type': 'geojson',
    'generateId': true,
    'data': {
      'type': 'FeatureCollection',
      'features': era.features,
    }
  })
}

/* Les layers permettent une representation graphique d'une source
  Il peut y avoir plusieurs layers par source
*/
function addLayerHelper(era) {
  // affiche un polygon colore
  map.addLayer({
    'id':     era.id+'-layer',
    'type':   'fill',
    'source': era.id,
    'layout': {},
    'paint': {
      'fill-color':     era.color,
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.5
      ]
    }
  });
  // affiche des bordures sur le polygon
  map.addLayer({
    'id': era.id+'-borders',
    'type': 'line',
    'source': era.id,
    'layout': {},
    'paint': {
      'line-color': era.color,
      'line-width': 2
    }
  });
}