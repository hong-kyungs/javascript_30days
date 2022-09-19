const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole = holes[idx];
	if (lastHole === hole) {
		console.log('Ah Nah thats the same one.');
		return randomHole(holes);
	}
	lastHole = hole;
	return hole;
}

function peep() {
	const time = randomTime(200, 1000);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (!timeUp) peep();
	}, time);
}

function startGame() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	peep();
	setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
	if (!e.isTrusted) return; //cheater, mouse click이 아닌 다른 방법을 이용한 클릭은 인정하지 않는다.
	score++;
	this.classList.remove('up');
	scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', bonk));
