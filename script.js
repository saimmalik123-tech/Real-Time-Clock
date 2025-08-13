const clockEle = document.querySelector("#clock");
const dayEle = document.querySelector("#day");
const dateEle = document.querySelector("#date");
const toggleInput = document.querySelector("#toggleMode");
const body = document.body;
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#closeModal");

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
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayEle.textContent = days[now.getDay()];
}

function updateDate() {
  const now = new Date();
  const day = now.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  dateEle.textContent = `${day} ${month} ${year}`;
}

function updateAll() {
  updateTime();
  updateDay();
  updateDate();
}

toggleInput.addEventListener("change", () => {
  body.classList.toggle("dark", toggleInput.checked);
  body.classList.toggle("light", !toggleInput.checked);
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function checkPakistanDay() {
  const now = new Date();
  if (now.getDate() === 14 && now.getMonth() === 7) {
    createConfetti();
    modal.style.display = "flex";
  }
}

setInterval(updateAll, 1000);
setInterval(checkPakistanDay, 1000);
updateAll();
