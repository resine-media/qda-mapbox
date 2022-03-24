// On cree une info bulle, sans l'afficher
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

/* fonction pour afficher l'info bulle,
'e' represente l'evenement declencheur de la fonction */
function popupShow(e)
{
  map.getCanvas().style.cursor = 'pointer'; // on survole un lien

  const coordinates = e.lngLat; //  e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description;

  /* 
  permets de garantir, lorsque le dezoom fait apparitre une feature plusieurs fois,
  que le popup soit bien au dessus du curseur et non sur une copie de la feature survolee.
  
  Voir `renderWorldCopies` dans l'instantiation de la carte pour comprendre ce comportement.
  Il consiste en l'apparition d'une frise infinie de plannisphere quand on dezoom a fond.
  (comportement par defaut de Mapbox , mais desactivé dans main.js, de plus on bloque la vue sur dragui)
  */
  while ( Math.abs(e.lngLat.lng - coordinates.lng) > 180 ) {
   coordinates[0] += e.lngLat.lng > coordinates.lat ? 360 : -360;
  }

  // parametrage et affichage du popup (position, contenu)
  popup.setLngLat(coordinates).setHTML(description).addTo(map);
}

// Fonction pour masquer l'info bulle
function popupHide()
{
  map.getCanvas().style.cursor = ''; // reinitialise la fleche du curseur
  popup.remove();                    // retirer de la carte
}