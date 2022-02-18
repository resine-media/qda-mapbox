// ------- PARAMETRES DE BASE -------------------------

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlhc3Jlc2luZSIsImEiOiJja3Uzc3gwOWsydW14MzBwOGU2MHpxZHJiIn0.-d9PNnwjFaiqz9S5ho9IBQ';

const

center = [6.466615, 43.538269], // Centre du QDA

bounds = [               // cadre de rendu (empeche un dezoom trop important)
  [6.333961, 43.440722], // South-west coordinates 
  [6.594200, 43.631371]  // North-east coordinates
],

// instance de la carte
map = new mapboxgl.Map({
  container: 'map',         // id de la div conteneur
  style: 'mapbox://styles/mathiasresine/ckufquhl27yyx17mwljrqh4ui', // style URL
  renderWorldCopies: false, // ne pas generer une frise infinie de planispheres.
  center: center,
  maxBounds: bounds,
  zoom: 16,
  bearing: -35,   // angle de depart (modifie la position des points cardinaux)
  pitch: 0,       // inclinaison par defaut (clic droit et deplacement pour modifier)
  antialias: true
});
let hoveredStateId = null;



// ----------- BOUTTONS DE CONTROLE (Zoom + Geo-localisation) ------

// zoom et "boussole" pour reorienter le nord en haut
map.addControl(new mapboxgl.NavigationControl());

// Ajoute un boutton de Geolocalisation
map.addControl(
  /* TODO : check if user is inside the bounds, otherwise dont show location
   * visit links for more info :
   * https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds#contains
   * https://stackoverflow.com/questions/60894926/mapbox-gl-js-how-to-check-if-a-person-is-inside-a-certain-area-and-then-displa
  */
  new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation:  true,
    showUserHeading:    true,  // fleche ou rond
    showAccuracyCircle: false  // marge d'erreur
  })
);



// -------------- CHARGEMENT ---------------------

// au chargement on va ajouter nos sources+layers
map.on('load', () => {
  // Permet d'avoir les info bulles au survol
  function addMouseEvents(id) {
    map.on('mouseover', id, (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: id, id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: id, id: hoveredStateId },
          { hover: true }
        );
        //map.getSource(id).setData();
        //popupShow(e);
      }
    });
    //map.on('mousemove', id, e => popupShow(e));
    map.on('mouseleave', id, e => {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: id, id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
      popupHide();
    });
  }

  /* On ajoute nos "Sources" de donnes geographiques (la liste des batiments pour chaque periode) */
  periodesInfo.forEach( e => addSourceHelper(e));
  periodesInfo.forEach( e => addLayerHelper(e));  // On cree un "Layer" par "Source"
  
  // Par defaut c'est le Layer Contemporain qui est visible
  map.setLayoutProperty('PlacesMod', 'visibility', 'none'); // on cache Moderne
  map.setLayoutProperty('PlacesHist','visibility', 'none'); // on cache Historique

  periodesInfo.forEach( e => addMouseEvents(e.id)); // on ajoute les EventListeners
  
  // Redirection vers la page du batiment sur lequel on clique
  // TODO : ouvrir le triptique sur la perdiode voulue.
  map.on("click", function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ["PlacesCont", "PlacesMod", "PlacesHist"] });
    if (features.length) {
      window.location = 'https://www.draguignan-quartierdesarts.fr/' + features[0].properties.link;
    }
  });
});

map.on('idle', () => {

  // Abort if these layers were not added to the map
  if (!map.getLayer('PlacesHist') || !map.getLayer('PlacesMod') || !map.getLayer('PlacesCont')) {  return;  }
     
  populateNavMenu();
});