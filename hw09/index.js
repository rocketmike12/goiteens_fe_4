const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const contactList = document.querySelector("ul");
const addTaskBtn = document.querySelector("#addTaskBtn");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

const render = function () {
	contactList.innerHTML = "";
	contacts.forEach((el, idx) => {
		const newTask = document.createElement("li");
		newTask.innerHTML = `
			<input value="${el.firstName}">
			<input value="${el.lastName}">
			<input value="${el.phone}">
			<input value="${el.email}">
			<button class="edit-btn">save</button>
			<button class="delete-btn">delete</button>
		`;
		newTask.id = `C${idx}`;
		contactList.appendChild(newTask);
	});
};

const addTodo = function () {
	contacts.push({
		firstName: firstNameInput.value,
		lastName: lastNameInput.value,
		phone: phoneInput.value,
		email: emailInput.value,
	});
	firstNameInput.value = "";
	lastNameInput.value = "";
	phoneInput.value = "";
	emailInput.value = "";
	localStorage.setItem("contacts", JSON.stringify(contacts));
	render();
};

const contactChecker = function (e) {
	if (e.target.tagName === "BUTTON" && e.target.className === "delete-btn") {
		contacts.splice(e.target.parentElement.id.slice(1), 1);
		localStorage.setItem("contacts", JSON.stringify(contacts));
		render();
	} else if (e.target.tagName === "BUTTON" && e.target.className === "edit-btn") {
		contacts[e.target.parentElement.id.slice(1)] = {
			firstName: e.target.parentElement.children[0].value,
			lastName: e.target.parentElement.children[1].value,
			phone: e.target.parentElement.children[2].value,
			email: e.target.parentElement.children[3].value,
		};
		localStorage.setItem("contacts", JSON.stringify(contacts));
		render();
	}
};

addTaskBtn.addEventListener("click", addTodo);
contactList.addEventListener("click", contactChecker);
render();
