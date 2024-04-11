// Verwijzing naar de BackgroundCheck-bibliotheek
// Zorg ervoor dat dit pad correct is naar je background-check.js-bestand
// Als het zich in dezelfde map bevindt als je script.js, laat het dan zoals het is
// Anders moet je het juiste pad specificeren
import BackgroundCheck from "/background-check";

// Wacht tot het HTML-document volledig is geladen voordat je de code uitvoert
document.addEventListener("DOMContentLoaded", function () {
  // Initialisatie van BackgroundCheck
  BackgroundCheck.init({
    // Definieer de doelelementen die moeten worden gecontroleerd
    targets: ".thumbnail",
    // Debug-modus inschakelen om uitvoer in de console te tonen
    debug: true,
  });
});
