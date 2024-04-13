// Wait for the HTML document to fully load before running the code
const pElement = document.querySelector("p");

document.addEventListener("DOMContentLoaded", function () {
  const lightFunction = (mean) => {
    let Lighting = mean.toFixed(2);
    console.log("background is light", { Lighting });
    pElement.classList.add("background--light");
    pElement.classList.remove("background--dark");
  };
  const darkFunction = (mean) => {
    let Darkness = mean.toFixed(2);
    console.log("background is dark", { Darkness });
    pElement.classList.add("background--dark");
    pElement.classList.remove("background--light");
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

  img.addEventListener("dragstart", function (event) {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    event.dataTransfer.setData("text", event.target.id);
  });

  thumbnail.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  thumbnail.addEventListener("drop", function (event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(data);
    thumbnail.appendChild(draggableElement);
    draggableElement.style.position = "absolute";

    draggableElement.style.left = event.offsetX - offsetX + "px";
    draggableElement.style.top = event.offsetY - offsetY + "px";

    // Initialization of BackgroundCheck
    BackgroundCheck.init({
      // Define the target element to be checked
      targets: "#draggableImage",
      images: ".thumbnail",
      lightFunction: lightFunction,
      darkFunction: darkFunction,
    });

    // Refresh BackgroundCheck
    BackgroundCheck.refresh();
  });
});

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const captureBtn = document.getElementById("captureBtn");
const thumbnail = document.querySelector(".thumbnail");

// Vraag toestemming voor toegang tot de camera
navigator.mediaDevices
  // .getUserMedia({ video: true })
  .getUserMedia({
    video: {
      facingMode: { exact: "environment" }, // Gebruik alleen de achterste camera
    },
  })
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

  // Pas de achtergrond van de thumbnail aan met de vastgelegde afbeelding
  thumbnail.style.backgroundImage = "url(" + imgURL + ")";
  // Refresh BackgroundCheck
  BackgroundCheck.refresh();
});
