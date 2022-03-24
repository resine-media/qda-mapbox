// ----------- NAV MENU : SWITCH-LAYER BUTTONS --------
function populateNavMenu() {

  // Set up the toggle button for each layer.
  for (const era of eraInfo ) {
    
    // Skip layers that already have a button set up.
    if ( document.getElementById(era.id) ) { continue; }
   
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
    if ( era.id == 'PlacesCont' ) { radio.checked = true; }
   
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