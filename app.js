const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "Java", "SQL"],
    answer: 1,
  },
  {
    question: "Which language is primarily used to add interactivity to webpages?",
    options: ["CSS", "HTML", "JavaScript", "XML"],
    answer: 2,
  },
  {
    question: "Which symbol is used for an ID selector in CSS?",
    options: [".", "#", "@", "*"],
    answer: 1,
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    question: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["var", "let", "int", "dim"],
    answer: 1,
  },
];

// Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const countEl = document.getElementById("question-count");
const liveScore = document.getElementById("live-score");
const progressBar = document.getElementById("progress-bar");
const finalScore = document.getElementById("final-score");
const totalQuestions = document.getElementById("total-questions");
const resultMessage = document.getElementById("result-message");
const resultEmoji = document.getElementById("result-emoji");

let current = 0;
let score = 0;
let answered = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function startQuiz() {
  current = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  const q = questions[current];

  questionText.textContent = q.question;
  countEl.textContent = `Question ${current + 1} / ${questions.length}`;
  liveScore.textContent = `Score: ${score}`;
  progressBar.style.width = `${(current / questions.length) * 100}%`;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? "Finish" : "Next";

  optionsBox.innerHTML = "";
  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = text; // textContent keeps tags like <a> displayed as text
    btn.addEventListener("click", () => selectAnswer(index));
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[current].answer;
  const buttons = optionsBox.querySelectorAll(".option");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctIndex) btn.classList.add("correct");
  });

  if (index === correctIndex) {
    score++;
    feedback.textContent = "Correct!";
    feedback.classList.add("good");
  } else {
    buttons[index].classList.add("wrong");
    feedback.textContent = "Wrong answer.";
    feedback.classList.add("bad");
  }

  liveScore.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (!answered) return;
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  progressBar.style.width = "100%";
  finalScore.textContent = score;
  totalQuestions.textContent = questions.length;

  const pct = score / questions.length;
  if (pct === 1) {
    resultEmoji.textContent = "🏆";
    resultMessage.textContent = "Perfect score! Excellent work.";
  } else if (pct >= 0.6) {
    resultEmoji.textContent = "🎉";
    resultMessage.textContent = "Good job! You know your stuff.";
  } else {
    resultEmoji.textContent = "📚";
    resultMessage.textContent = "Keep practicing and try again!";
  }
  showScreen(resultScreen);
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);