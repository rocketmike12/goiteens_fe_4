const list = document.querySelector("ul");
const loadBtn = document.querySelector("#loadBtn");
const spinner = document.querySelector(".half-circle-spinner");
const backdrop = document.querySelector(".backdrop");

const renderQuantity = 5;
let userIndex = 0;
let users = JSON.parse(localStorage.getItem("users")) || false;

const renderUsers = function () {
	backdrop.classList.remove("is-hidden");
	setTimeout(() => {
		backdrop.classList.add("is-hidden");

		list.innerHTML = "";
		userIndex += renderQuantity;
		users.slice(0, userIndex).forEach((el) => {
			let user = document.createElement("li");
			user.innerHTML = `
            	<h2>${el.name}</h2>
            	<img src="${el.avatar}">
        	`;
			list.appendChild(user);
		});

		if (userIndex + renderQuantity > users.length) {
			loadBtn.classList.add("is-hidden");
			Toastify({
				text: "all users loaded",
				duration: 3000,
				close: true,
				stopOnFocus: true,
				style: {
					background: "blueviolet",
					padding: "20px",
					fontSize: "20",
				},
			}).showToast();
		}
	}, 1000);
};
	
if (!users) {
	fetch("https://67fa491e8ee14a5426274531.mockapi.io/data/users")
		.then((res) => res.json())
		.then((res) => {
			users = res;
			localStorage.setItem("users", JSON.stringify(users));
		});
}

if (!window.navigator.onLine) {
	document.querySelector(".error").className = "error no-conection";
	document.querySelector("button").className = "no-conection";
} else {
	loadBtn.addEventListener("click", renderUsers);
}
