// Product object with strict price control
const product = (() => {
  let _price = 0;

  const obj = {
    name: "Wireless Headphones",

    get price() {
      return _price;
    },

    set price(value) {
      if (typeof value !== "number" || isNaN(value)) {
        throw new Error("Price must be a number");
      }

      if (value <= 0) {
        throw new Error("Price must be a positive number");
      }

      _price = value;
    },

    getFormattedPrice() {
      return `₹${this.price.toLocaleString("en-IN")}`;
    }
  };

  // Prevent deletion or redefinition of price
  Object.defineProperty(obj, "price", {
    configurable: false
  });

  return obj;
})();

// DOM Elements
const priceEl = document.getElementById("productPrice");
const inputEl = document.getElementById("priceInput");
const statusEl = document.getElementById("statusMessage");

// Initial UI
priceEl.textContent = product.getFormattedPrice();

// Update price handler
document.getElementById("updateBtn").addEventListener("click", () => {
  try {
    const value = Number(inputEl.value);
    product.price = value;

    priceEl.textContent = product.getFormattedPrice();
    statusEl.textContent = "✅ Price updated successfully";
    statusEl.style.color = "var(--clr-accent)";
  } catch (err) {
    statusEl.textContent = `❌ ${err.message}`;
    statusEl.style.color = "var(--clr-error)";
  }

  inputEl.value = "";
});

// 🔒 Challenge proof (students will try this)
try {
  product.price = -500; // ❌ throws error
} catch (e) {
  console.warn("Blocked:", e.message);
}
