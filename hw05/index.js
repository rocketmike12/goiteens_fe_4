const key = document.querySelector("#key");
const gameStatus = document.querySelector("#status");
const newGame = document.querySelector("button");

window.addEventListener("DOMContentLoaded", () => {
	PNotify.defaults.styling = "material";
	PNotify.defaults.icons = "material";
	PNotify.defaultModules.set(PNotifyMobile, {});
});

let currentKey = "";
let score = 0;

let keys = "qwertyuiopasdfghjklzxcvbnm";

const generateKey = function () {
	currentKey = keys[Math.floor(Math.random() * keys.length)];
	key.textContent = currentKey.toUpperCase();
};

document.addEventListener("keypress", (e) => {
	if (e.key === currentKey.toLowerCase()) {
		generateKey();
		score++;
		gameStatus.textContent = `Score: ${score}`;
	} else {
		PNotify.error({ text: "Wrong key!", delay: 200 });
	}
});

newGame.addEventListener("click", () => {
	score = 0;
	gameStatus.textContent = `Score: ${score}`;
	PNotify.success({ text: "New game", delay: 500 });
});

generateKey();

///

const chartData = {
	type: "line",
	data: {
		labels: [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
		],
		datasets: [
			{
				label: "Продажі за останній місяць",
				data: [
					150, 220, 180, 200, 250, 300, 280, 350, 400, 380, 420, 450,
					500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000,
					1050, 1100, 1150, 1200, 1250, 1300, 1350,
				],
				borderWidth: 1,
			},
		],
	},
};

const salesChart = new Chart(document.getElementById("sales-chart"), chartData);
