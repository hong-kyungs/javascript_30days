let countdown;
const timerDisplay = document.querySelector('.display__time-left');

function timer(seconds) {
	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);

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
