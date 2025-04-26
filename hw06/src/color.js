export const generateColor = function () {
	const colors = [
		"#ff0000",
		"#00ff00",
		"#0000ff",
		"#ffff00",
		"#ff00ff",
		"#00ffff",
		"#ffffff",
	];

	return colors[Math.floor(Math.random() * 6)];
};
