// 1

const firstTimer = document.querySelector("#firstTimer");

let timeFirst = 60;

const onTimerTickFirst = function () {
	firstTimer.textContent = timeFirst;
	
	if (timeFirst == 30) {
		alert("Half of the first timer passed!");
	}

	if (timeFirst == 0) {
		clearInterval(timerIdFirst);
	}

	timeFirst--;
};

let timerIdFirst = setInterval(onTimerTickFirst, 1000);



// 2

const secondTimer = document.querySelector("#secondTimer");
const secondTimerBtn = document.querySelector("#secondTimerBtn");

const onTimerTickSecond = function () {
	secondTimer.textContent = timeSecond;
	
	if (timeSecond == 10000) {
		secondTimer.style.transform = "rotate(180deg)";
		secondTimer.style.backgroundColor = "blueviolet";
	}

	if (timeSecond == 0) {
		clearInterval(timerIdSecond);
		secondTimer.style.transform = "rotate(0deg)";
		secondTimer.style.backgroundColor = "transparent";
		secondTimerBtn.disabled = false;
	}

	timeSecond--;
};

let timeSecond;
let timerIdSecond;

secondTimerBtn.addEventListener("click", () => {
	timeSecond = 30000;
	timerIdSecond = setInterval(onTimerTickSecond, 1);
	secondTimerBtn.disabled = true;
});

