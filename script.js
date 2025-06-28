// Flip on click
const card = document.getElementById("souptimCard");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

// BGM mute/unmute
const bgm = document.getElementById("bgm");
const toggleBtn = document.getElementById("toggleBgm");

toggleBtn.addEventListener("click", () => {
  if (bgm.muted) {
    bgm.muted = false;
    toggleBtn.textContent = "🔊";
  } else {
    bgm.muted = true;
    toggleBtn.textContent = "🔇";
  }
});
