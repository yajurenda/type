document.addEventListener("DOMContentLoaded", () => {
  const words = [
    { jp: "フェラーリ", reading: "ふぇらーり", romaji: ["ferari"] },
    { jp: "写生大会", reading: "しゃせいたいかい", romaji: ["shaseitaikai"] },
    { jp: "お賃金", reading: "おちんぎん", romaji: ["ochingin"] },
    { jp: "漫湖", reading: "まんこ", romaji: ["manko"] },
    { jp: "アナリスト", reading: "あなりすと", romaji: ["anaristo"] },
    { jp: "万華鏡", reading: "まんげきょう", romaji: ["mangekyou", "mangekyo"] },
    { jp: "オスマン帝国", reading: "おすまんていこく", romaji: ["osumanteikoku"] },
    { jp: "一万個", reading: "いちまんこ", romaji: ["ichimanko"] },
    { jp: "π", reading: "ぱい", romaji: ["pai"] },
    { jp: "マンホール", reading: "まんほーる", romaji: ["manhoru", "manhooru"] },
    { jp: "満月", reading: "まんげつ", romaji: ["mangetsu"] },
    { jp: "ちんちん電車", reading: "ちんちんでんしゃ", romaji: ["chinchindensha"] },
    { jp: "不正行為", reading: "ふせいこうい", romaji: ["fuseikoui"] },
    { jp: "節句", reading: "せっく", romaji: ["sekku"] },
    { jp: "デンマーク", reading: "でんまーく", romaji: ["denmaaku", "denmark"] },
    { jp: "手抜き", reading: "てぬき", romaji: ["tenuki"] },
    { jp: "鎮火", reading: "ちんか", romaji: ["chinka"] },
    { jp: "満州", reading: "まんしゅう", romaji: ["manshuu", "mansyu"] },
    { jp: "ちんすこう", reading: "ちんすこう", romaji: ["chinsukou", "chinsuko"] },
  ];

  let time = 45;
  let timerInterval;
  let score = 0;
  let typedWords = [];
  let currentRomaji = "";
  let currentIndex = 0;
  let currentWord = {};

  const startBtn = document.getElementById("start-btn");
  const retryBtn = document.getElementById("retry-btn");
  const startScreen = document.getElementById("start-screen");
  const typingArea = document.getElementById("typing-area");
  const resultScreen = document.getElementById("result-screen");
  const wordEl = document.getElementById("word");
  const readingEl = document.getElementById("reading");
  const romajiEl = document.getElementById("romaji");
  const timerEl = document.getElementById("timer");
  const progressBar = document.createElement("div");
  progressBar.id = "progress-bar";
  typingArea.prepend(progressBar);
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
    progressBar.style.width = "100%";
    nextWord();

    timerInterval = setInterval(() => {
      time--;
      timerEl.textContent = time;
      progressBar.style.width = `${(time / 45) * 100}%`;
      if (time <= 0) endGame();
    }, 1000);
  }

  function nextWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    currentRomaji = currentWord.romaji[0];
    currentIndex = 0;
    readingEl.textContent = currentWord.reading;
    wordEl.textContent = currentWord.jp;
    updateRomajiDisplay();
  }

  function updateRomajiDisplay() {
    const typed = currentRomaji.slice(0, currentIndex);
    const remaining = currentRomaji.slice(currentIndex);
    romajiEl.innerHTML = `<span class="typed">${typed}</span>${remaining}`;
  }

  document.addEventListener("keydown", (e) => {
    if (typingArea.classList.contains("hidden")) return;
    const key = e.key.toLowerCase();

    // 各候補の中で、今の入力位置に合うローマ字があるか確認
    const validCandidates = currentWord.romaji.filter(r => r[currentIndex] === key);

    if (validCandidates.length > 0) {
      // 成功時：候補を更新（複数入力法の分岐を保つ）
      currentWord.romaji = validCandidates;
      currentRomaji = validCandidates[0];
      currentIndex++;
      updateRomajiDisplay();

      if (currentIndex === currentRomaji.length) {
        score++;
        typedWords.push(currentWord.jp);
        nextWord();
      }
    } else {
      // ミスタイプ時：赤く点滅
      romajiEl.classList.add("mistype");
      setTimeout(() => romajiEl.classList.remove("mistype"), 200);
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
});
