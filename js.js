// Verwijzing naar de BackgroundCheck-bibliotheek
// Zorg ervoor dat dit pad correct is naar je background-check.js-bestand
// Als het zich in dezelfde map bevindt als je script.js, laat het dan zoals het is
// Anders moet je het juiste pad specificeren

// Wacht tot het HTML-document volledig is geladen voordat je de code uitvoert
document.addEventListener("DOMContentLoaded", function () {
  // Initialisatie van BackgroundCheck
  BackgroundCheck.init({
    // Definieer de doelelementen die moeten worden gecontroleerd
    targets: ".thumbnail",
    // Debug-modus inschakelen om uitvoer in de console te tonen
    debug: true,
  });


    const img = document.getElementById('draggableImage');
    const thumbnail = document.querySelector('.thumbnail');
  
    img.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('text', event.target.id);
      console.log('dragstart');
    });
  
    thumbnail.addEventListener('dragover', function (event) {
      event.preventDefault();  // Necessary to allow dropping
    });
  
    thumbnail.addEventListener('drop', function (event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      const draggableElement = document.getElementById(data);
      thumbnail.appendChild(draggableElement);
      draggableElement.style.position = 'absolute';
      draggableElement.style.top = event.offsetY + 'px';
      draggableElement.style.left = event.offsetX + 'px';
    });
  
});
