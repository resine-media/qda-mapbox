// ------- PARAMETRES DE BASE ET DECLARATIONS -------------------------

// calcul du zoom et de l'orientation en fonction de l'ecran
let
  bearing=0,
  zoom = 16
;
// Orientation de la boussole
if (window.screen.width-window.screen.height < 0)
/* si portrait  */      { bearing = -35; }
/* sinon paysage*/ else { bearing =  50; }

// varier le zoom en fonction de la taille
if      (window.screen.width >= 1920 ) { zoom = 18.73 }
else if (window.screen.width >= 1280 ) { zoom = 18 }
else                 /* on 800*600 */  { zoom = 17.35 }
// fin calcul

mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlhc3Jlc2luZSIsImEiOiJja3Uzc3gwOWsydW14MzBwOGU2MHpxZHJiIn0.-d9PNnwjFaiqz9S5ho9IBQ';

const
//center = [6.466615, 43.538269], // Centre du QDA
center = [6.467029, 43.538094],

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
  zoom: zoom,
  bearing: bearing,   // angle de depart (modifie la position des points cardinaux)
  pitch: 0,      // inclinaison par defaut (clic droit et deplacement pour modifier)
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

  /* On ajoute nos "Sources" de donnes geographiques (la liste des batiments pour chaque periode) */
  eraInfo.forEach( e => addSourceHelper(e));
  eraInfo.forEach( e => addLayerHelper(e));  // On cree un "Layer" par "Source"

  function addMouseEvents(src_id) {
    map.on('mousemove', src_id+'-layer', (e) => {
      if (e.features.length > 0) {
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: src_id, id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = e.features[0].id;
        console.log('feature id :'+hoveredStateId);
        map.setFeatureState(
          { source: src_id, id: hoveredStateId },
          { hover: true }
        );
        //map.getSource(src_id).setData();
        popupShow(e);
      }
    });
    // Permet d'avoir les info bulles au survol
    //map.on('mousemove', src_id, e => popupShow(e));
    map.on('mouseleave', src_id+'-layer', () => {
      if (hoveredStateId !== null) {
        map.setFeatureState(
          { source: src_id, id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
      popupHide();
    });
  }

  eraInfo.forEach( source => addMouseEvents(source.id)); // on ajoute les EventListeners
  // Par defaut c'est le Layer Contemporain qui est visible
  map.setLayoutProperty('PlacesMod-layer',    'visibility', 'none'); // on cache Moderne
  map.setLayoutProperty('PlacesMod-borders',  'visibility', 'none');
  map.setLayoutProperty('PlacesHist-layer',   'visibility', 'none'); // on cache Historique
  map.setLayoutProperty('PlacesHist-borders', 'visibility', 'none');
  
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
  if (!map.getLayer('PlacesHist-layer') || !map.getLayer('PlacesMod-layer') || !map.getLayer('PlacesCont-layer')) {  return;  }
     
  populateNavMenu();
});

map.on('draw_update', sourceRefresh);

function sourceRefresh(e) {
  var data = draw.getAll();
  map.getSource('PlacesCont').setData(data);
  map.getSource('PlacesHist').setData(data);
  map.getSource('PlacesMod').setData(data);
  map.update();
};