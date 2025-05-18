// Створіть веб-додаток блогу, який дозволяє користувачам створювати, переглядати, оновлювати та видаляти пости.
// 1. Використовуйте Node.js для створення сервера.
// 2. Використовуйте json-server для створення серверу та обробки запитів.
// 3. Використовуйте пакетний менеджер npm для управління залежностями та інсталяції необхідних пакетів. Для збирання проєкту ініціалізуйте новий проєкт та встановіть Parcel.
// 4. Використовуйте шаблонізатор Handlebars для відображення сторінок блогу.
// 5. Використовуйте bd.json для зберігання даних про пости та коментарі.
// 6. Реалізуйте механізм пагінації для перегляду списку постів.

const postList = document.querySelector(".post-list");
const createForm = document.querySelector("form");

let posts = [];

async function getPosts() {
	let data = await fetch("http://localhost:3000/posts");
	posts = await data.json();
	render();
}

const render = function () {
	postList.innerHTML = "";
	posts.forEach((el) => {
		postList.insertAdjacentHTML(
			"beforeend",
			`
				<li class="post" id="P${el.id}">
					<h2 class="post-title">${el.title}</h2>
					<p class="post-text">${el.text}</p>
					<p class="post-author">by ${el.author}</p>
					<button class="editBtn">edit</button>
					<button class="delBtn">delete</button>
				</li>
			`,
		);
	});
};

createForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let createData = Object.fromEntries(new FormData(createForm));
	fetch("http://localhost:3000/posts/", {
		method: "POST",
		body: JSON.stringify(createData),
	});
	render();
});

postList.addEventListener("click", (e) => {
	const currentPost = e.target.parentElement;
	if (e.target.className === "delBtn") {
		fetch(`http://localhost:3000/posts/${currentPost.id.slice(1)}`, {
			method: "DELETE",
		});
		render();
	} else if (e.target.className === "editBtn") {
		currentPost.innerHTML = `
			<input type="text" value="${currentPost.children[0].innerText}">	
			<input type="text" value="${currentPost.children[1].innerText}">	
			<input type="text" value="${currentPost.children[2].innerText.split(" ")[1]}">
			<button class="saveBtn">save</button>
		`;
	} else if (e.target.className === "saveBtn") {
		fetch(`http://localhost:3000/posts/${currentPost.id.slice(1)}`, {
			method: "PATCH",
			body: JSON.stringify({
				title: currentPost.children[0].value,
				text: currentPost.children[1].value,
				views: currentPost.children[2].value,
			}),
		});
		render();
	}
});

getPosts();
