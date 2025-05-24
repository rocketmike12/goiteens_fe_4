let time = 100000;

class CountdownTimer {
	constructor(options) {
		this.selector = options.selector;
		this.targetDate = options.targetDate;
		this.update();
		this.timer = setInterval(() => {
			this.update();
		}, 1000);
	}

	update() {
		let time = this.targetDate - Date.now();

		document.querySelectorAll(`${this.selector} .value`).forEach((el, i) => {
			el.textContent = [
				Math.floor(time / (1000 * 60 * 60 * 24)), // days
				Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), // hours
				Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)), // minutes
				Math.floor((time % (1000 * 60)) / 1000), // seconds
			][i];
		});
	}
}

const timer = new CountdownTimer({
	selector: "#timer-1",
	targetDate: new Date("Jun 17, 2025"),
});
