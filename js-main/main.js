// Procedure de calcul du zoom et de l'orientation en fonction de l'ecran
// bascule automatiquement en mode portrait (au chargement, pas dynamique)
// assure d'avoir toujour une vue complete du quartier
let
  bearing=0,
  zoom = 16
;
// Orientation de la boussole
if (window.screen.width-window.screen.height < 0)
/* si portrait  */      { bearing = -35; }
/* sinon paysage*/ else { bearing =  50; }

// varier le zoom en fonction de la taille
if      ( window.screen.width >= 1920 ) { zoom = 18.73; }
else if ( window.screen.width >= 1280 ) { zoom = 18; }
else    /* 800*600 or more */           { zoom = 17.35; }
// fin calcul

// ------- PARAMETRES DE BASE ET DECLARATIONS -------------------------

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
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

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
  }), 'top-left'
);

map.on('idle', () => {

  // Abort if these layers were not added to the map
  if (!map.getLayer('PlacesHist-layer') || !map.getLayer('PlacesMod-layer') || !map.getLayer('PlacesCont-layer')) {  return;  }
     
  populateNavMenu();
});

//map.on('draw_update', sourceRefresh());