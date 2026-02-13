const heartbeat = document.getElementById("heartbeat");

// function playHeartbeat() {
//     heartbeat.volume = 100.00; // subtle, not creepy
//     heartbeat.currentTime = 0;
//     heartbeat.play().catch(() => {
//         console.log("User interaction required for audio");
//     });
// }

// function stopHeartbeat() {
//     heartbeat.pause();
//     heartbeat.currentTime = 0;
// }

window.addEventListener("load", (event) => {
  new Audio()
  new Audio("heartbeat.mp3").play().catch((error) => {
    console.log("Error playing heartbeat sound:", error);
  });
});
const rejectBtn = document.getElementById("rejectBtn");

rejectBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 150 - 75;
    rejectBtn.style.transform = `translate(${x}px, ${y}px)`;
});
document.getElementById("yesBtn").addEventListener("click", () => {
    for (let i = 0; i < 500; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = 2 + Math.random() * 2 + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    }
});
const secretBtn = document.getElementById("secretBtn");
const secretText = document.getElementById("secretText");

secretBtn.addEventListener("click", () => {
    secretText.classList.remove("hidden");

    // delay so display:none is removed first
    setTimeout(() => {
        secretText.classList.add("show");
    }, 10);

    secretBtn.innerText = "🤫 Okay, you know now";
    secretBtn.disabled = true;
});

let submitted = false;

function showSuccess() {
  if (!submitted) return;

  const form = document.querySelector(".contact-form");
  const success = document.getElementById("successMessage");

  form.style.display = "none";     // hide form
  success.classList.remove("hidden");
}


function chooseTheOne() {
    const form = document.getElementById("proposalForm");

    form.classList.remove("hidden");

    // slight delay for animation to feel intentional
    setTimeout(() => {
        form.classList.add("show");
    }, 50);
}
function submitAndRedirect(e) {
  e.preventDefault(); // stop instant redirect

  const popup = document.getElementById("popupOverlay");
  popup.classList.remove("hidden");

  // allow DOM to update
  setTimeout(() => {
    popup.classList.add("show");
  }, 20);

  // redirect AFTER popup is visible
  setTimeout(() => {
    window.location.href = "profile1.html";
  }, 2000); // adjust timing if you want
}