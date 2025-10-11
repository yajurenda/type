document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // 1. 仮名 → ローマ字マップ（完全対応）
  // ===================================
  const kanaToRomaji = {
    あ:["a"],い:["i"],う:["u"],え:["e"],お:["o"],
    か:["ka"],き:["ki"],く:["ku"],け:["ke"],こ:["ko"],
    さ:["sa"],し:["shi","si","ci"],す:["su"],せ:["se"],そ:["so"],
    た:["ta"],ち:["chi","ti"],つ:["tsu","tu"],て:["te"],と:["to"],
    な:["na"],に:["ni"],ぬ:["nu"],ね:["ne"],の:["no"],
    は:["ha"],ひ:["hi"],ふ:["fu","hu"],へ:["he"],ほ:["ho"],
    ま:["ma"],み:["mi"],む:["mu"],め:["me"],も:["mo"],
    や:["ya"],ゆ:["yu"],よ:["yo"],
    ら:["ra"],り:["ri"],る:["ru"],れ:["re"],ろ:["ro"],
    わ:["wa"],を:["wo"],ん:["n","nn"],
    が:["ga"],ぎ:["gi"],ぐ:["gu"],げ:["ge"],ご:["go"],
    ざ:["za"],じ:["ji","zi"],ず:["zu"],ぜ:["ze"],ぞ:["zo"],
    だ:["da"],ぢ:["ji","di"],づ:["zu","du"],で:["de"],ど:["do"],
    ば:["ba"],び:["bi"],ぶ:["bu"],べ:["be"],ぼ:["bo"],
    ぱ:["pa"],ぴ:["pi"],ぷ:["pu"],ぺ:["pe"],ぽ:["po"],
    きゃ:["kya"],きゅ:["kyu"],きょ:["kyo"],
    しゃ:["sha","sya"],しゅ:["shu","syu"],しょ:["sho","syo"],
    ちゃ:["cha","tya","cya"],ちゅ:["chu","tyu","cyu"],ちょ:["cho","tyo","cyo"],
    にゃ:["nya"],にゅ:["nyu"],にょ:["nyo"],
    ひゃ:["hya"],ひゅ:["hyu"],ひょ:["hyo"],
    みゃ:["mya"],みゅ:["myu"],みょ:["myo"],
    りゃ:["rya"],りゅ:["ryu"],りょ:["ryo"],
    ぎゃ:["gya"],ぎゅ:["gyu"],ぎょ:["gyo"],
    じゃ:["ja","jya","zya"],じゅ:["ju","jyu","zyu"],じょ:["jo","jyo","zyo"],
    びゃ:["bya"],びゅ:["byu"],びょ:["byo"],
    ぴゃ:["pya"],ぴゅ:["pyu"],ぴょ:["pyo"],
    // 外来語・特殊音
    ふぁ:["fa"],ふぃ:["fi"],ふぇ:["fe"],ふぉ:["fo"],
    てぃ:["ti"],でぃ:["di"],どぅ:["du"],
    うぃ:["wi"],うぇ:["we"],うぉ:["wo"],
    ヴぁ:["va"],ヴぃ:["vi"],ヴ:["vu"],ヴぇ:["ve"],ヴぉ:["vo"],
    // 小文字
    ぁ:["xa","la"],ぃ:["xi","li"],ぅ:["xu","lu"],ぇ:["xe","le"],ぉ:["xo","lo"],
    ゃ:["xya","lya"],ゅ:["xyu","lyu"],ょ:["xyo","lyo"],
    っ:["xtu","ltu","xtsu","ltsu"]
  };

  // ===================================
  // 2. 単語リスト
  // ===================================
  const words = [
    { jp: "フェラーリ", reading: "ふぇらーり" },
    { jp: "写生大会", reading: "しゃせいたいかい" },
    { jp: "お賃金", reading: "おちんぎん" },
    { jp: "漫湖", reading: "まんこ" },
    { jp: "アナリスト", reading: "あなりすと" },
    { jp: "万華鏡", reading: "まんげきょう" },
    { jp: "オスマン帝国", reading: "おすまんていこく" },
    { jp: "一万個", reading: "いちまんこ" },
    { jp: "π", reading: "ぱい" },
    { jp: "マンホール", reading: "まんほーる" },
    { jp: "満月", reading: "まんげつ" },
    { jp: "ちんちん電車", reading: "ちんちんでんしゃ" },
    { jp: "不正行為", reading: "ふせいこうい" },
    { jp: "節句", reading: "せっく" },
    { jp: "デンマーク", reading: "でんまーく" },
    { jp: "手抜き", reading: "てぬき" },
    { jp: "鎮火", reading: "ちんか" },
    { jp: "満州", reading: "まんしゅう" },
    { jp: "ちんすこう", reading: "ちんすこう" },
  ];

  // ===================================
  // 3. 状態管理
  // ===================================
  let currentWord = {};
  let kanaIndex = 0;
  let typedRomaji = "";
  let time = 45;
  let timer;
  let score = 0;
  let typedWords = [];

  // ===================================
  // 4. 要素取得
  // ===================================
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
  const progressBar = document.createElement("div");
  progressBar.id = "progress-bar";
  typingArea.prepend(progressBar);

  // ===================================
  // 5. 仮名→ローマ字列展開
  // ===================================
  function toRomajiSequence(kana) {
    let result = [];
    let i = 0;
    while (i < kana.length) {
      const pair = kana.slice(i, i + 2);
      if (kanaToRomaji[pair]) {
        result.push(kanaToRomaji[pair]);
        i += 2;
      } else if (kanaToRomaji[kana[i]]) {
        result.push(kanaToRomaji[kana[i]]);
        i++;
      } else i++;
    }
    return result;
  }

  // ===================================
  // 6. ゲーム開始
  // ===================================
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

    timer = setInterval(() => {
      time--;
      timerEl.textContent = time;
      progressBar.style.width = `${(time / 45) * 100}%`;
      if (time <= 0) endGame();
    }, 1000);
  }

  // ===================================
  // 7. 新しい単語
  // ===================================
  function nextWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    kanaIndex = 0;
    typedRomaji = "";
    readingEl.textContent = currentWord.reading;
    wordEl.textContent = currentWord.jp;
    updateDisplay();
  }

  // ===================================
  // 8. 表示更新
  // ===================================
  function updateDisplay() {
    const romajiSeq = toRomajiSequence(currentWord.reading).flat()[kanaIndex] || "";
    romajiEl.innerHTML = `<span class="typed">${typedRomaji}</span>${romajiSeq.slice(typedRomaji.length)}`;
  }

  // ===================================
  // 9. 入力処理
  // ===================================
document.addEventListener("keydown", (e) => {
  if (typingArea.classList.contains("hidden")) return;
  const key = e.key.toLowerCase();
  if (!/^[a-z]$/.test(key)) return;

  const kanaSeq = toRomajiSequence(currentWord.reading);
  if (kanaIndex >= kanaSeq.length) return;

  let currentKana = currentWord.reading[kanaIndex];
  let romajiOptions = kanaSeq[kanaIndex];
  let matched = false;

  // ===================================
  // 「ん」専用処理（完全対応版）
  // ===================================
  if (currentKana === "ん") {
    const nextKana = currentWord.reading[kanaIndex + 1];
    const nextRomaji = nextKana ? kanaToRomaji[nextKana]?.[0] || "" : "";
    const nextInitial = nextRomaji ? nextRomaji[0] : "";

    if (typedRomaji === "" && key === "n") {
      // 「ん」入力開始
      typedRomaji = "n";
      matched = true;

      // 次が母音・や行 → nだけでは未確定
      if ("aiueony".includes(nextInitial)) {
        // 待機状態にする
        // （次のキーでnnが入力されたら確定）
      } else {
        // 次が子音系なら「ん」確定
        kanaIndex++;
        typedRomaji = "";
      }
    } else if (typedRomaji === "n" && key === "n") {
      // 「nn」で確定（次が母音・や行）
      kanaIndex++;
      typedRomaji = "";
      matched = true;
    }
  }

  // ===================================
  // 通常かな処理
  // ===================================
  if (!matched) {
    for (let opt of romajiOptions) {
      if (opt.startsWith(typedRomaji + key)) {
        typedRomaji += key;
        matched = true;
        if (typedRomaji === opt) {
          kanaIndex++;
          typedRomaji = "";
        }
        break;
      }
    }
  }

  // ===================================
  // 促音「っ」
  // ===================================
  if (!matched && currentKana === "っ") {
    const nextKana = currentWord.reading[kanaIndex + 1];
    if (nextKana) {
      const nextOpt = kanaToRomaji[nextKana]?.[0];
      if (nextOpt && key === nextOpt[0]) {
        kanaIndex++;
        matched = true;
      }
    }
  }

  // ===================================
  // 長音「ー」
  // ===================================
  if (!matched && currentKana === "ー") {
    typedRomaji += key;
    kanaIndex++;
    matched = true;
  }

  // ===================================
  // 結果反映
  // ===================================
  if (matched) {
    updateDisplay();
    if (kanaIndex >= kanaSeq.length) {
      score++;
      typedWords.push(currentWord.jp);
      nextWord();
    }
  } else {
    romajiEl.classList.add("mistype");
    setTimeout(() => romajiEl.classList.remove("mistype"), 150);
  }
});

  // ===================================
  // 10. 終了
  // ===================================
  function endGame() {
    clearInterval(timer);
    typingArea.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    scoreEl.textContent = score;
    wordListEl.innerHTML = typedWords.map(w => `<li>${w}</li>`).join("");
  }

  // ===================================
  // 11. ボタン
  // ===================================
  startBtn.addEventListener("click", startGame);
  retryBtn.addEventListener("click", startGame);
});
