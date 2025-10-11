const words = [
  { jp: "フェラーリ", reading: "ふぇらーり", romaji: "ferari" },
  { jp: "写生大会", reading: "しゃせいたいかい", romaji: "shaseitaikai" },
  { jp: "お賃金", reading: "おちんぎん", romaji: "ochingin" },
  { jp: "漫湖", reading: "まんこ", romaji: "manko" },
  { jp: "アナリスト", reading: "あなりすと", romaji: "anaristo" },
  { jp: "万華鏡", reading: "まんげきょう", romaji: "mangekyou" },
  { jp: "オスマン帝国", reading: "おすまんていこく", romaji: "osumanteikoku" },
  { jp: "一万個", reading: "いちまんこ", romaji: "ichimanko" },
  { jp: "π", reading: "ぱい", romaji: "pai" },
  { jp: "マンホール", reading: "まんほーる", romaji: "manhoru" },
  { jp: "満月", reading: "まんげつ", romaji: "mangetsu" },
  { jp: "ちんちん電車", reading: "ちんちんでんしゃ", romaji: "chinchindensha" },
  { jp: "不正行為", reading: "ふせいこうい", romaji: "fuseikoui" },
  { jp: "節句", reading: "せっく", romaji: "sekku" },
  { jp: "デンマーク", reading: "でんまーく", romaji: "denmaaku" },
  { jp: "手抜き", reading: "てぬき", romaji: "tenuki" },
  { jp: "鎮火", reading: "ちんか", romaji: "chinka" },
  { jp: "満州", reading: "まんしゅう", romaji: "manshuu" },
  { jp: "ちんすこう", reading: "ちんすこう", romaji: "chinsukou" },
];

let currentIndex = 0;
let time = 45;
let timerInterval;
let score = 0;
let typedWords = [];

const startBtn = document.getElementById("start-btn");
const retryBtn = document.getElementById("retry-btn");
const startScreen = document.getElementById("start-screen");
const typingArea = document.getElementById("typing-area");
const resultScreen = document.getElementById("result-screen");
const wordEl = document.getElementById("word");
const readingEl = document.getElementById("reading");
const romajiEl = document.getElementById("romaji");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const wordListEl = document.getElementById("word-list");

function startGame() {
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  typingArea.classList.remove("hidden");
  score = 0;
  typedWords = [];
  time = 45;
  timerEl.textContent = time;
  nextWord();

  timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function nextWord() {
  const random = words[Math.floor(Math.random() * words.length)];
  currentIndex = 0;
  readingEl.textContent = random.reading;
  wordEl.textContent = random.jp;
  romajiEl.textContent = random.romaji;
}

document.addEventListener("keydown", (e) => {
  if (typingArea.classList.contains("hidden")) return;

  const currentWord = romajiEl.textContent;
  if (e.key === currentWord[currentIndex]) {
    currentIndex++;
    if (currentIndex === currentWord.length) {
      score++;
      typedWords.push(wordEl.textContent);
      nextWord();
    }
  }
});

function endGame() {
  clearInterval(timerInterval);
  typingArea.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreEl.textContent = score;
  wordListEl.innerHTML = typedWords.map(w => `<li>${w}</li>`).join("");
}

startBtn.addEventListener("click", startGame);
retryBtn.addEventListener("click", startGame);
