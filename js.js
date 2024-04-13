// Wait for the HTML document to fully load before running the code
document.addEventListener("DOMContentLoaded", function () {
  const lightFunction = (mean) => {
    let Lighting = mean.toFixed(2);
    console.log("background is light", { Lighting });
  };
  const darkFunction = (mean) => {
    let Darkness = mean.toFixed(2);
    console.log("background is dark", { Darkness });
  };
  // Initialization of BackgroundCheck
  BackgroundCheck.init({
    // Define the target element to be checked
    targets: "#draggableImage",
    images: ".thumbnail",
    lightFunction: lightFunction,
    darkFunction: darkFunction,
  });

  const img = document.getElementById("draggableImage");
  const thumbnail = document.querySelector(".thumbnail");

  // store the mouse position
  let offsetX, offsetY;
  function moveElement(event) {
    let clientX = event.clientX || event.touches[0].clientX;
    let clientY = event.clientY || event.touches[0].clientY;

    img.style.position = 'absolute';
    img.style.left = clientX - offsetX + 'px';
    img.style.top = clientY - offsetY + 'px';
    thumbnail.appendChild(img);

    // Refresh BackgroundCheck
    BackgroundCheck.refresh();
  }


  img.addEventListener("dragstart", function (event) {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    event.dataTransfer.setData("text", event.target.id);
  });

  thumbnail.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  thumbnail.addEventListener("drop", moveElement);
img.addEventListener('touchstart', function(event) {
  offsetX = event.touches[0].pageX - img.offsetLeft;
  offsetY = event.touches[0].pageY - img.offsetTop;
  event.preventDefault(); // Prevent scrolling when touching the image
});

img.addEventListener('touchmove', moveElement);

img.addEventListener('touchend', function() {
  img.removeEventListener('touchmove', moveElement);
});
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const captureBtn = document.getElementById("captureBtn");

// Vraag toestemming voor toegang tot de camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    // Toon de camerastream in de videotag
    video.srcObject = stream;
  })
  .catch(function (err) {
    console.error("Geen toegang tot de camera: ", err);
  });

// Wanneer de gebruiker op de knop klikt, maak dan een foto
captureBtn.addEventListener("click", function () {
  // Teken het huidige frame van de videostream op het canvas
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  // Zet de afbeeldingsgegevens van het canvas om naar een afbeelding URL
  const imgURL = canvas.toDataURL("image/png");
  // Toon de genomen foto in de afbeeldingstag
  photo.src = imgURL;

  thumbnail.style.setProperty = ("--bg", "url(" + imgURL + ")");
});
