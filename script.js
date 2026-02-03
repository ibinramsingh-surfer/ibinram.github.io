const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const taunt = document.getElementById("taunt");
const main = document.getElementById("main");
const celebrate = document.getElementById("celebrate");

const roseStage = document.getElementById("roseStage");
const achievementStage = document.getElementById("achievementStage");

/* English Sarcastic Lines ONLY */
const taunts = [
  "Nice try 😏",
  "That button doesn’t work 😌",
  "You know YES is the right choice 😉",
  "Still not happening 😂",
  "Destiny says YES 💛",
  "Wrong option detected 😜",
  "System override: YES only 😎",
  "Stop teasing and click YES 😏"
];

/* NO button movement */
function moveNo() {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 150);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  taunt.innerText = taunts[Math.floor(Math.random() * taunts.length)];
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", moveNo);

/* YES button logic */
yesBtn.addEventListener("click", () => {
  yesBtn.innerText = "Processing happiness... 💛";

  setTimeout(() => {
    main.classList.add("hidden");
    celebrate.classList.remove("hidden");

    roseStage.classList.remove("hidden");
    achievementStage.classList.add("hidden");

    // Show achievement after rose
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
