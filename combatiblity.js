let answers = {};
let answered = 0;

function selectAnswer(q, choice) {
  if (answers[q]) return;

  answers[q] = choice;
  answered++;

  const currentQuestion = document.querySelector(
    `[data-question="${q}"]`
  );

  const selectedBtn = currentQuestion.querySelector(
    `button[data-choice="${choice}"]`
  );
  selectedBtn.classList.add("selected");

  document.getElementById("progressFill").style.width =
    (answered / 2) * 100 + "%";

  // 🔥 HIDE CURRENT QUESTION
  setTimeout(() => {
    currentQuestion.classList.remove("active");
  }, 200);

  // 🔥 SHOW NEXT QUESTION OR RESULT
  setTimeout(() => {
    const nextQuestion = document.querySelector(
      `[data-question="${q + 1}"]`
    );

    if (nextQuestion) {
      nextQuestion.classList.add("active");
    } else {
      showResult();
    }
  }, 350);
}
function showResult() {
  const combo = answers[1] + answers[2];
  const outcomes = document.querySelectorAll("#outcomes div");

  outcomes.forEach(outcome => {
    if (outcome.dataset.combo === combo) {
      const prob = outcome.dataset.prob;
      const isCorrect = outcome.dataset.correct === "true";

      animateCircle(prob);
      document.getElementById("resultLine").innerText =
        isCorrect
          ? "Elite match. Scary chemistry. 💘"
          : outcome.innerText;
    }
  });

  document.getElementById("resultBox").classList.remove("hidden");
}

function animateCircle(percent) {
  const circle = document.querySelector(".circle");
  const text = document.getElementById("percentage");

  let current = 0;
  const interval = setInterval(() => {
    current++;
    text.innerText = current + "%";
    circle.style.background =
      `conic-gradient(#ff4d6d ${current * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
    if (current >= percent) clearInterval(interval);
  }, 15);
}
function animateCircle(percent) {
  const circle = document.querySelector(".circle");
  const text = document.getElementById("percentage");
  const nextBtn = document.getElementById("nextBtn");

  // 🛑 If percent is 0, show 0 instantly and exit
  if (percent == 0) {
    text.innerText = "0%";
    circle.style.background =
      "conic-gradient(#ff4d6d 0deg, rgba(255,255,255,0.1) 0deg)";
    return;
  }

  let current = 0;

  const interval = setInterval(() => {
    current++;
    text.innerText = current + "%";

    circle.style.background =
      `conic-gradient(#ff4d6d ${current * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;

    if (current >= percent) {
      clearInterval(interval);

      if (percent == 100) {
        nextBtn.classList.remove("hidden");
      }
    }
  }, 15);
}
function goNext() {
  window.location.href = "ready.html"; // change to your next page
}