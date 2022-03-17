// ---- LAYERS et SOURCES DE DONNEES 

/* Pour chaque periode on a un id et une couleur associee
*  Ce tableau permets un code plus concis via l'utilisation des
*  fonctions "helper" et des forEach (pour ajouter sources et layers...)
*/
const eraInfo = [
  {'id':"PlacesCont", 'features':parseEra("Contemporain"), 'color':"#bd5942"}, 
  {'id':"PlacesMod",  'features':parseEra("Moderne"),      'color':"#7EB77B"},
  {'id':"PlacesHist", 'features':parseEra("Historique"),   'color':"#40a7b8"}
];
/* parseEra construit la collection de features pour une source
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

/* Un Layer permets d'afficher une source */
function addLayerHelper(era) {
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
        0.4
      ]
    }
  });

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

// --------- *** INFO BULLE *** ----------

// On cree une info bulle, sans l'afficher
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

/* fonction pour afficher l'info bulle, 'e' represente l'evenement decencheur de la fonction */
function popupShow(e) {
  
  map.getCanvas().style.cursor = 'pointer'; // on survole un lien

  // Copy coordinates array.
  const coordinates = e.lngLat; //  e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description;

  /* Ensure that if the map is zoomed out such that multiple copies
   * of the feature are visible, the popup appears
   * over the copy being pointed to. */
  while ( Math.abs(e.lngLat.lng - coordinates.lng) > 180 ) {
   coordinates[0] += e.lngLat.lng > coordinates.lat ? 360 : -360;
  }
  // parametrage et affichage du popup (position, contenu)
  popup.setLngLat(coordinates).setHTML(description).addTo(map);
}

// Fonction pour masquer l'info bulle
function popupHide() {
  map.getCanvas().style.cursor = ''; // reinitialise la fleche du curseur
  popup.remove();                    // retirer de la carte
}



// ----------- NAV MENU : LAYER SWITCH-BUTTONS --------

function populateNavMenu() {
  // Set up the toggle button for each layer.
  for (const era of eraInfo) {
    
    // Skip layers that already have a button set up.
    if (document.getElementById(era.id)) { continue; }
   
    // Create radio and label elements for the layer selector.
    const radio = document.createElement('input');
    const label = document.createElement('label');

    // common setup
    radio.id   = era.id;
    radio.type = "radio";
    radio.name = "era";
    label.htmlFor  = era.id;

    // custom settings for each Era
    switch (era.id) {
      case 'PlacesCont' : 
        label.textContent = 'Artisans actuels';
        label.style = "background: "+era.color+";"
        break;
      case 'PlacesMod'  : 
        label.textContent  = "l\'Âge d\'or";
        label.style = "background:"+era.color+";"
        break;
      case 'PlacesHist' :
        label.textContent = 'Période Médiéveale';
        label.style = "background: "+era.color+";"
        break;
    }
    
    // check the default view
    if (era.id == 'PlacesCont') { radio.checked = true; }
   
    // en cliquant sur le label on declanche l'event onChange du radio correspondant
    radio.onchange = function (e) {
      const clickedLayer = this.id;
      e.preventDefault();
      e.stopPropagation();

      map.setLayoutProperty(clickedLayer+'-layer', 'visibility', 'visible');
      map.setLayoutProperty(clickedLayer+'-borders', 'visibility', 'visible');

      for ( const layer of eraInfo ) {
        if ( layer.id != clickedLayer ) {
          map.setLayoutProperty(layer.id+'-layer', 'visibility', 'none');
          map.setLayoutProperty(layer.id+'-borders', 'visibility', 'none');
        }
      }
    };
   
    const eraSelector = document.getElementById('menu');
    eraSelector.appendChild(radio);
    eraSelector.appendChild(label);
  }
}