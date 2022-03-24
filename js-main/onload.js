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
  // TODO : clean up this ugly redondant array !!!!
  map.on("click", function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ["PlacesCont-layer", "PlacesMod-layer", "PlacesHist-layer"] });
    if (features.length) {
      window.location = 'https://www.draguignan-quartierdesarts.fr/' + features[0].properties.link;
    }
  });

});