// A way to simplify the selectors to avoid writing them every time i need it
function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}

// --- Generator of the new word --- //
// Words of the game separated on topics
const countryWords = ['china', 'dinamarca', 'finlandia', 'rusia', 'argentina', 'españa'];
const animalsWords = ['cocodrilo', 'canguro', 'rinoceronte', 'mono', 'tigre', 'leon'];
// Words of the game all together
const wordsArray = [countryWords, animalsWords];
const wordLines = $('main .word-lines');
const randomTopicSpan = $('.random-topic-span');
// Topic of the word
let wordTopic;
// Variable where lines spaces of the word generated are displayed
let linesArray = [];
// Word generated randomly
let wordGenerated = [];

// --- Word rewrite function --- //
function rewriteWord(wordsIndex, topic) {
	let randomWord = Math.floor(Math.random() * wordsArray[wordsIndex].length);
	randomTopicSpan.innerText = topic;
	wordGenerated = wordsArray[wordsIndex][randomWord];
	console.log(wordGenerated);
	for (let i = 0; i < wordGenerated.length; i++) {
		linesArray[i] = '-';
	}
	wordLines.innerText = linesArray.join('');
}
// ------------------------------------- //

// --- Function to generate a random Topic --- //
function randomTopicFunction() {
	let randomTopic = Math.floor(Math.random() * wordsArray.length);
	switch (randomTopic) {
		case 0:
			wordTopic = 'Paises';
			break;
		case 1:
			wordTopic = 'Animales';
			break;
	}
	rewriteWord(randomTopic, wordTopic);
}
randomTopicFunction();
// ------------------------------------- //

// --- Change Topic of the Word --- //
const changeTopicSelect = $('select.change-topic');

changeTopicSelect.addEventListener('change', () => {
	linesArray = [];
	let topic = changeTopicSelect.selectedIndex;
	switch (topic) {
		case 1:
			rewriteWord(0, 'Paises');
			break;
		case 2:
			rewriteWord(1, 'Animales');
			break;
	}
});
// ------------------------------------- //

// --- Alphabet buttons --- //
const alphabetButtons = $$('.alphabet-letter');

alphabetButtons.forEach((btn) => {
	btn.addEventListener('click', () => {
		for (let i = 0; i < wordGenerated.length; i++) {
			if (btn.value === wordGenerated[i]) {
				linesArray[i] = wordGenerated[i];
				linesArray[i].innerText = btn.textContent;
				wordLines.innerText = linesArray.join('');
			}
		}
	});
});
// ------------------------------------- //
