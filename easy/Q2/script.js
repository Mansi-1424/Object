// Product Object (Object Literal)
const product = {
    title: "Wireless Headphones",
    price: 2999,
    inStock: true
};

// DOM Elements
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const stockStatus = document.getElementById("stockStatus");
const viewBtn = document.getElementById("viewBtn");

// Display product details using dot notation
productTitle.textContent = product.title;
productPrice.textContent = "₹" + product.price;

if (product.inStock) {
    stockStatus.textContent = "In Stock";
    stockStatus.style.color = "green";
} else {
    stockStatus.textContent = "Out of Stock";
    stockStatus.style.color = "red";
}

// Button click event
viewBtn.addEventListener("click", function () {
    alert("In Stock");
});
