const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");

usernameInput.value = JSON.parse(localStorage.getItem('username')) || "";
passwordInput.value = JSON.parse(localStorage.getItem('password')) || "";

saveBtn.addEventListener('click', () => {
	localStorage.setItem('username', JSON.stringify(usernameInput.value));
	localStorage.setItem('password', JSON.stringify(passwordInput.value));
})

