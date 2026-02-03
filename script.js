const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const tauntBtn = document.getElementById("tauntBtn");
const main = document.getElementById("main");
const celebrate = document.getElementById("celebrate");

const roseStage = document.getElementById("roseStage");
const achievementStage = document.getElementById("achievementStage");

const taunts = [
  "Nice try 😏",
  "Still the wrong choice 😌",
  "YES is literally chasing you 😉",
  "You can’t escape destiny 😂",
  "Resistance is pointless 💛",
  "System override in progress 😎",
  "Just accept it already 😏"
];

function randomPosition(el) {
  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 200);
  el.style.left = x + "px";
  el.style.top = y + "px";
}

function showTaunt() {
  tauntBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
  tauntBtn.classList.remove("hidden");
  randomPosition(tauntBtn);
}

/* NO button */
noBtn.addEventListener("click", () => {
  randomPosition(noBtn);
  showTaunt();
});

/* Taunt button loop */
tauntBtn.addEventListener("click", () => {
  showTaunt();
});

/* YES button chases cursor */
document.addEventListener("mousemove", (e) => {
  const rect = yesBtn.getBoundingClientRect();
  const dx = e.clientX - rect.left;
  const dy = e.clientY - rect.top;

  yesBtn.style.left = rect.left + dx * 0.02 + "px";
  yesBtn.style.top = rect.top + dy * 0.02 + "px";
});

/* YES button click */
yesBtn.addEventListener("click", () => {
  yesBtn.innerText = "Processing happiness... 💛";

  setTimeout(() => {
    main.classList.add("hidden");
    celebrate.classList.remove("hidden");

    roseStage.classList.remove("hidden");
    achievementStage.classList.add("hidden");

    setTimeout(() => {
      roseStage.classList.add("hidden");
      achievementStage.classList.remove("hidden");
      startConfetti();
    }, 2500);
  }, 1200);
});

/* CONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  confetti = [];
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 5 + 1
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,215,0,0.9)";
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = 0;
  });
  requestAnimationFrame(animateConfetti);
}
