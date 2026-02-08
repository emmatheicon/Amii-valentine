const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
  "images/img9.jpg",
  "images/img10.jpg"
];

let index = 0;
const slider = document.getElementById("slider");

// Image slider
setInterval(() => {
  index = (index + 1) % images.length;
  slider.src = images[index];
}, 3000);

// Music setup
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStarted = false;

musicBtn.addEventListener("click", () => {
  if (musicStarted) return;

  music.src = "audio/2-of-us.mp3";
  music.volume = 0.7;
  music.loop = true;

  music.play()
    .then(() => {
      musicStarted = true;
      musicBtn.innerText = "🎶 Playing...";
      musicBtn.disabled = true;
    })
    .catch(err => {
      console.error("Music error:", err);
      alert("Tap again if music didn’t start");
    });
});

// Ensure audio is loaded before playing
music.load();

musicBtn.addEventListener("click", async () => {
  try {
    await music.play();
    musicBtn.innerText = "🎶 Playing...";
    musicBtn.disabled = true; // optional: disable after playing
  } catch (err) {
    console.log("Audio play failed:", err);
  }
});

// Yes button
document.querySelector(".yes").onclick = () => {
  // Remove the button section
  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".message").style.display = "none";
  document.querySelector("h2").style.display = "none";

  // Create GIF element
  const gif = document.createElement("img");
  gif.src = "images/yes-celebration.gif"; // your GIF path
  gif.style.width = "100%";
  gif.style.borderRadius = "15px";
  gif.style.marginTop = "20px";

  document.querySelector(".container").appendChild(gif);

  // Launch confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Optional: repeat confetti for 3 seconds
  const interval = setInterval(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 400);

  setTimeout(() => clearInterval(interval), 3000);
};

// No button runs away
const noBtn = document.querySelector(".no");
noBtn.onmouseover = () => {
  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random() * 70 + "%";
  noBtn.style.left = Math.random() * 70 + "%";
};
