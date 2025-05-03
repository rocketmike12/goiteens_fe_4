import templateSource from "./template.hbs?raw";
import { products } from "./data.js";

const template = Handlebars.compile(templateSource);

const searchInput = document.querySelector(".search-input");
const productsContainer = document.querySelector(".products");

const render = function (data) {
	productsContainer.innerHTML = template({ products: data });
};

searchInput.addEventListener("input", () => {
	let data = products.filter((el) =>
		el.name.toLowerCase().includes(searchInput.value.toLowerCase()),
	);
	render(data);
});

render(products);
