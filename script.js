const clockEle = document.querySelector("#clock");
const dayEle = document.querySelector("#day");
const dateEle = document.querySelector("#date");

const toggleCheckbox = document.querySelector(".theme-switch__checkbox");
const body = document.body;

const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");

// ---- Clock ----
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  hours = String(hours).padStart(2, "0");
  clockEle.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

function updateDay() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayEle.textContent = days[new Date().getDay()];
}

function updateDate() {
  const now = new Date();
  const day = now.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  dateEle.textContent = `${day} ${month} ${year}`;
}

function updateAll() {
  updateTime();
  updateDay();
  updateDate();
}
setInterval(updateAll, 1000);
updateAll();

// ---- Theme toggle ----
function applyTheme(isDark) {
  body.classList.toggle("dark", isDark);
  body.classList.toggle("light", !isDark);
  if (toggleCheckbox) toggleCheckbox.checked = isDark;
  try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch { }
}

try {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") applyTheme(true);
} catch { }

if (toggleCheckbox) {
  toggleCheckbox.addEventListener("change", (e) => {
    applyTheme(e.target.checked);
  });
}

// ---- Modal Independence Day (only on 14 Aug) ----
function launchConfetti() {
  const duration = 3 * 1000; // 3 seconds
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const now = new Date();
if (now.getDate() === 14 && now.getMonth() === 7) { // August = 7
  modal.style.display = "flex";
  launchConfetti();
}

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
