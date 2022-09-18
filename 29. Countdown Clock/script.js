let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	//clear any existing timer
	clearInterval(countdown);
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it
		if (secondLeft < 0) {
			//return으로는 우리에게 보여지지만 않을뿐 interval이 멈추는 것은 아니다.
			//so, clearInterval(타이머이름)을 넣어서 타이머가 멈추게 한다.
			clearInterval(countdown);
			return;
		}
		//display it
		displayTimeLeft(secondLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${
		remainderSeconds < 10 ? '0' : ''
	}${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
	// console.log({ minutes, remainderSeconds });
	// console.log(display);
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${
		minutes < 10 ? '0' : ''
	}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

//form 태그에 name-"customForm"을 이용해서 document.customForm.addEventListener라고 해줄 수 있다.
document.customForm.addEventListener('submit', function (e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins * 60);
	this.reset();
});
