// Verwijzing naar de BackgroundCheck-bibliotheek
// Zorg ervoor dat dit pad correct is naar je background-check.js-bestand
// Als het zich in dezelfde map bevindt als je script.js, laat het dan zoals het is
// Anders moet je het juiste pad specificeren

// Wacht tot het HTML-document volledig is geladen voordat je de code uitvoert
document.addEventListener("DOMContentLoaded", function () {
  const lightFunction = () => {
    console.log("background is light");
  }
  const darkFunction = () => {
    console.log("background is dark");
  }
  // Initialisatie van BackgroundCheck
  BackgroundCheck.init({
    // Definieer de doelelementen die moeten worden gecontroleerd
    targets: "#draggableImage",
    images: '.thumbnail',
    lightFunction: lightFunction,
    darkFunction: darkFunction
  });


    const img = document.getElementById('draggableImage');
    const thumbnail = document.querySelector('.thumbnail');
  
    // store teh mouse position
    let offsetX, offsetY;

    img.addEventListener('dragstart', function (event) {
      offsetX = event.offsetX;
      offsetY = event.offsetY;
      event.dataTransfer.setData('text', event.target.id);
    });
    
    thumbnail.addEventListener('dragover', function (event) {
      event.preventDefault(); 
    });
  
    thumbnail.addEventListener('drop', function (event) {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      const draggableElement = document.getElementById(data);
      thumbnail.appendChild(draggableElement);
      draggableElement.style.position = 'absolute';
    
      draggableElement.style.left = (event.offsetX - offsetX) + 'px';
      draggableElement.style.top = (event.offsetY - offsetY) + 'px';
    
      // Refresh BackgroundCheck 
      BackgroundCheck.refresh();
    });
    
  
});
