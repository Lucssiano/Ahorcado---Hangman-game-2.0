// --- A way to simplify the selectors to avoid writing them every time i need it --- //
function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}
// ------------------------------------- //

/* Words of the game separated on topics */
const countryWords = ['china', 'dinamarca', 'finlandia', 'rusia', 'argentina', 'españa'];
const animalsWords = ['cocodrilo', 'canguro', 'rinoceronte', 'mono', 'tigre', 'leon'];
/* Words of the game all together */
const wordsArray = [countryWords, animalsWords];

const wordLines = $('span.word-lines');
const randomTopicSpan = $('.random-topic-span');
/* The select selector which changes the topic of the word */
const changeTopicSelect = $('select.change-topic');
const selectContainer = $('.select-container');
let wordTopic;
/* Variable where lines spaces of the word generated are displayed */
let linesArray = [];
let wordGenerated = [];

// --- Function that generates the word --- //
function randomWordGenerator(wordsIndex, topic) {
	let randomWord = Math.floor(Math.random() * wordsArray[wordsIndex].length);
	randomTopicSpan.innerText = topic;
	wordGenerated = wordsArray[wordsIndex][randomWord];
	for (let i = 0; i < wordGenerated.length; i++) {
		linesArray[i] = '-';
	}
	wordLines.innerText = linesArray.join('');
}
// ------------------------------------- //

// --- Function to generate a random Topic --- //
function randomTopicFunction() {
	let randomTopic = Math.floor(Math.random() * wordsArray.length);
	changeTopicSelect.selectedIndex = randomTopic;
	wordTopic = changeTopicSelect[randomTopic].textContent;
	randomWordGenerator(randomTopic, wordTopic);
}
randomTopicFunction();
// ------------------------------------- //

// --- Change Topic of the Word --- //
changeTopicSelect.addEventListener('change', () => {
	linesArray = [];
	let topic = changeTopicSelect.selectedIndex;
	wordTopic = changeTopicSelect[topic].textContent;
	randomWordGenerator(topic, wordTopic);
});
// ------------------------------------- //

// --- Alphabet buttons section --- //
const alphabetButtons = $$('.alphabet-letter');
const attemptsContainer = $('span.attempts');
let attempts = 10;

alphabetButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		selectContainer.style.display = 'none';
		btn.disabled = true;
		btn.style.opacity = 0.5;
		if (!wordGenerated.includes(btn.value)) {
			btn.classList.add('incorrect');
			setTimeout(() => {
				btn.classList.remove('incorrect');
			}, 1000);
			attempts--;
			manPainting();
		}
		for (let i = 0; i < wordGenerated.length; i++) {
			if (btn.value === wordGenerated[i]) {
				linesArray[i] = wordGenerated[i];
				linesArray[i].innerText = btn.textContent;
				wordLines.innerText = linesArray.join('');
				btn.classList.add('correct');
				setTimeout(() => {
					btn.classList.remove('correct');
				}, 1000);
			}
		}
		checkGameOver();
	});
});
// ------------------------------------- //

// --- Function that check if the game is over because the user wins or if the attemps have finished --- //
function checkGameOver() {
	if (attempts === 0 || !linesArray.includes('-')) {
		let finalWord;
		attempts === 0 ? (finalWord = 'Perdiste!') : (finalWord = 'Ganaste!');
		setTimeout(() => {
			alert(`${finalWord} , la palabra era "${wordGenerated}"`);
			window.location.href = window.location.href;
		}, 1000);
	}
}
// ------------------------------------- //

// --- Function that draw the man hanged when the user have a mistake --- //
let imgNumber = 1;
const hangedImg = $('.hanged-man');
function manPainting(){
	window.scrollTo(0,document.body.scrollHeight);
	imgNumber++;
	setTimeout(() => {
		attemptsContainer.innerText = attempts;
		hangedImg.src = `img/imagen${imgNumber}.png`;
	}, 500);
	setTimeout(() => {
		window.scrollTo(document.body.scrollHeight, 0);
	}, 1200);
}
// ------------------------------------- //