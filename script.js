const targetWordDisplay = document.getElementById('target-word');
const inputArea = document.getElementById('input-area');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const typeSound = document.getElementById('type-sound');
const gameOverSound = document.getElementById('game-over-sound');

const words = [
    "野獣先輩", "イキスギ", "やりますねぇ", "野獣の咆哮", "ｱｰｲｷｿ",
    "あーソレいいよ", "アイスティーしかなかったんだけどいいかな", "頭にきますよ", "暴れんなよ", "ありますあります",
    "いいよこいよ", "王道を征く", "アォン", "オォン", "おかのした",
    "お前の事が好きだったんだよ", "俺もやったんだからさ", "おまたせ", "溜まってんなぁおい", "硬くなってんぜ",
    "悔い改めて", "これもうわかんねぇな", "この辺がセクシーエロい", "じゃけん夜行きましょうね", "ちょっと歯ぁ当たんよ",
    "で、でますよ", "出しちゃっていいっすか", "ないです", "ヌッ", "ぬわああん疲れたもおおおん",
    "白菜かけますね", "はっきりわかんだね", "ファッ", "ふたいたいは", "ブッチッパ",
    "ホラホラホラホラ", "ま多少はね", "やっぱ好きなんすねぇ", "辞めたくなりますよ", "ンアッー",
    "はぇーすっごいおっきい", "まずいですよ", "当たり前だよなぁ", "あっそうだ", "あっそっかぁ",
    "いいゾこれ", "噓つけ絶対見てたゾ", "おっそうだな", "じゃあぶち込んでやるぜ", "そうだよ",
    "どうすっかな俺もな", "腹減ったなぁ", "冷えてるか", "見たけりゃ見せてやるよ", "みろよみろよ",
    "オナシャス", "センセンシャル", "ワン", "おいゴルァ", "あくしろよ",
    "やだよ", "じゃあ俺ギャラもらって帰るから", "しゃぶれよ", "はやく帰って宿題しなきゃ", "ほんとぉ",
    "やめちくり～", "気持ちよくできましたか", "じゃあオラオラ来いよオラァ", "ありがとナス", "ウッソだろお前",
    "かりこまり", "悲しいなぁ", "髪なんか必要ねぇんだよ", "もう許せるぞオイ"
];

let currentWord = '';
let score = 0;
let timeLeft = 45;
let timerInterval;
let gameActive = false;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    timeLeft = 45;
    scoreDisplay.textContent = `スコア: ${score}`;
    timerDisplay.textContent = `残り時間: ${timeLeft}秒`;
    inputArea.disabled = false;
    inputArea.value = '';
    inputArea.focus();
    startButton.disabled = true;
    startButton.textContent = 'プレイ中...';

    currentWord = getRandomWord();
    targetWordDisplay.textContent = currentWord;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `残り時間: ${timeLeft}秒`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    inputArea.disabled = true;
    startButton.disabled = false;
    startButton.textContent = 'ゲーム開始';
    targetWordDisplay.textContent = 'タイムアップ！';
    gameOverSound.play();
}

inputArea.addEventListener('input', () => {
    if (!gameActive) return;

    const typedText = inputArea.value;
    if (typedText === currentWord) {
        score++;
        scoreDisplay.textContent = `スコア: ${score}`;
        currentWord = getRandomWord();
        targetWordDisplay.textContent = currentWord;
        inputArea.value = '';
        typeSound.play();
    } else if (typedText.length > 0) {
        // タイプ音が鳴る条件を簡略化。文字入力があるたびに鳴らす。
        // より正確にするなら、currentWordの対応する文字が入力されたら鳴らすなどの実装も可能
        typeSound.play();
    }
});

startButton.addEventListener('click', startGame);

// 初期状態では入力欄を無効にする
inputArea.disabled = true;
