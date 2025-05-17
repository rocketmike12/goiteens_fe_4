// 1

let messageInterval = setInterval(() => {
	document.querySelector("#msgBox").innerHTML += "<p>Hello World</p>";
}, 1000);

setTimeout(() => {
	clearInterval(messageInterval);
}, 5500);

// 2

[
	document.querySelector("#first"),
	document.querySelector("#second"),
	document.querySelector("#third"),
].forEach((el) => {
	setInterval(() => {
		el.style.transform = `rotate(${Math.floor(Math.random() * 180)}deg)`;
	}, 1500);
});

// 3

const gameBtn = document.querySelector("#gameBtn");
let gameActive = false;
let gameReady = true;
let clickCount = 0;

const onBtnClick = function () {
	if (gameActive) {
		clickCount++;
	} else {
		if (gameReady) {
			gameBtn.textContent = 3;
			gameBtn.disabled = true;
			setTimeout(() => {
				gameBtn.textContent = 2;
				setTimeout(() => {
					gameBtn.textContent = 1;
					setTimeout(() => {
						gameActive = true;
						gameBtn.disabled = false;
						gameBtn.textContent = "click!";
						setTimeout(() => {
							gameBtn.disabled = true;
							gameActive = false;
							gameBtn.textContent = `you clicked ${clickCount} times in 5 seconds!`;
						}, 5000);
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}
};

gameBtn.addEventListener("click", onBtnClick);

// 3

const timerBtn = document.querySelector("#timerBtn");
const timerInput = document.querySelector("#timerInput");
const timerText = document.querySelector("#timerText");

timerBtn.addEventListener("click", () => {
	let time = Number(timerInput.value);
	timerText.textContent = time;
	let timerInterval = setInterval(() => {
		time--;
		timerText.textContent = time;
	}, 1000);
	setTimeout(() => {
		timerText.textContent = "time's up!";
		clearInterval(timerInterval);
	}, time * 1000);
});
