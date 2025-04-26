const productList = document.querySelector(".product-list");

const loadBtn = document.createElement("button");
loadBtn.classList.add('load-btn');
loadBtn.textContent = "load more";
document.body.appendChild(loadBtn);

const renderQuantity = 10;
let productIndex = 0;
let products = [];

const renderProducts = function () {
    products.slice(productIndex, productIndex + renderQuantity).forEach((el) => {
        let product = document.createElement("li");
        product.innerHTML = `
            <h2>${el.name}</h2>
            <img src="${el.img}">
            <p class="description">${el.description}</p>
            <p class="price">${el.price}$</p>
        `;
        productList.appendChild(product);
        productIndex++;
    });
    if (productIndex + renderQuantity > products.length) {
        document.body.removeChild(loadBtn);
        Toastify({
            text: "all products loaded",
            duration: 3000,
            close: true,
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "blueviolet",
                padding: "20px",
                fontSize: "20"
            },
            onClick: function () {}, // Callback after click
        }).showToast();
    }
};

fetch("https://67fa491e8ee14a5426274531.mockapi.io/data/products")
    .then((res) => res.json())
    .then((res) => {
        products = res;
        renderProducts();
    });

loadBtn.addEventListener("click", renderProducts);
