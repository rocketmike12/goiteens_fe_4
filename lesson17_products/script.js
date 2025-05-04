const productList = document.querySelector(".product-list");
const filterInput = document.querySelector(".filter");

const loadBtn = document.createElement("button");
loadBtn.classList.add("load-btn");
loadBtn.textContent = "load more";
document.body.appendChild(loadBtn);

const renderQuantity = 10;
let productIndex = 0;
let products = [];

const renderProducts = function (isFiltered, data) {
	productList.innerHTML = "";
	data.slice(0, productIndex + renderQuantity).forEach((el) => {
		let product = document.createElement("li");
		product.innerHTML = `
            	<h2>${el.name}</h2>
            	<img src="${el.img}">
            	<p class="description">${el.description}</p>
            	<p class="price">${el.price}$</p>
				<button class="delete-btn">delete</button>
        	`;
		productList.appendChild(product);
		if (!isFiltered) {
			productIndex++;
		}
	});
	if (productIndex + renderQuantity > products.length) {
		document.body.removeChild(loadBtn);
		Toastify({
			text: "all products loaded",
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
};

fetch("https://67fa491e8ee14a5426274531.mockapi.io/data/products")
	.then((res) => res.json())
	.then((res) => {
		products = res;
		renderProducts(false, products);
	});

loadBtn.addEventListener("click", () => {
	renderProducts(false, products);
});

filterInput.addEventListener("input", () => {
	productIndex = 0;
	renderProducts(
		true,
		products.filter((el) => el.name.toLowerCase().includes(filterInput.value.toLowerCase())),
	);
});
