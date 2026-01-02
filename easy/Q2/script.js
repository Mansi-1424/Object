// Product Object with nested objects and arrays
const product = {
    title: "Wireless Noise-Cancelling Headphones",
    price: 2999,
    inStock: true,
    rating: 4.2,
    category: "Electronics",
    brand: "SoundWave Pro",
    warranty: "1 Year",
    color: "Matte Black",
    
    // Nested object for specifications
    specifications: {
        batteryLife: "30 hours",
        connectivity: "Bluetooth 5.2",
        weight: "250g",
        drivers: "40mm",
        chargingTime: "2 hours",
        noiseCancellation: "Active"
    },
    
    // Array for features
    features: [
        "Active Noise Cancellation",
        "Hi-Res Audio Support",
        "Voice Assistant Integration",
        "Foldable Design",
        "Quick Charge"
    ],
    
    // Nested array for related products
    relatedProducts: [
        {
            name: "Wireless Earbuds Pro",
            price: 1999,
            inStock: true,
            rating: 4.5
        },
        {
            name: "Bluetooth Speaker",
            price: 2499,
            inStock: false,
            rating: 4.0
        },
        {
            name: "Gaming Headset",
            price: 3499,
            inStock: true,
            rating: 4.3
        }
    ],
    
    // Object method
    getDiscountedPrice: function(discountPercent) {
        return this.price - (this.price * discountPercent / 100);
    },
    
    // Computed property (using getter)
    get formattedPrice() {
        return `₹${this.price.toLocaleString('en-IN')}`;
    }
};

// DOM Elements
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const stockStatus = document.getElementById("stockStatus");
const productRating = document.getElementById("productRating");
const productCategory = document.getElementById("productCategory");
const viewBtn = document.getElementById("viewBtn");
const specsGrid = document.getElementById("specsGrid");
const relatedProducts = document.getElementById("relatedProducts");

// Display product details
productTitle.textContent = product.title;
productPrice.textContent = product.formattedPrice;
productRating.textContent = "★★★★☆ " + product.rating;
productCategory.textContent = product.category;

// Stock status with object destructuring
const { inStock } = product;
if (inStock) {
    stockStatus.textContent = "🟢 IN STOCK";
    stockStatus.style.background = "linear-gradient(45deg, rgba(72, 187, 120, 0.2), rgba(39, 174, 96, 0.1))";
    stockStatus.style.borderColor = "#27ae60";
    stockStatus.style.color = "#2ecc71";
} else {
    stockStatus.textContent = "🔴 OUT OF STOCK";
    stockStatus.style.background = "linear-gradient(45deg, rgba(231, 76, 60, 0.2), rgba(192, 57, 43, 0.1))";
    stockStatus.style.borderColor = "#c0392b";
    stockStatus.style.color = "#e74c3c";
}

// Display specifications using Object.entries()
Object.entries(product.specifications).forEach(([key, value]) => {
    const specItem = document.createElement("div");
    specItem.className = "spec-item";
    
    const specKey = document.createElement("span");
    specKey.textContent = key.split(/(?=[A-Z])/).join(" ").toUpperCase();
    specKey.style.color = "#a78bfa";
    
    const specValue = document.createElement("span");
    specValue.textContent = value;
    specValue.style.color = "white";
    specValue.style.fontWeight = "600";
    
    specItem.appendChild(specKey);
    specItem.appendChild(specValue);
    specsGrid.appendChild(specItem);
});

// Display related products
product.relatedProducts.forEach(relatedProduct => {
    const relatedCard = document.createElement("div");
    relatedCard.className = "related-product-card";
    
    relatedCard.innerHTML = `
        <h4>${relatedProduct.name}</h4>
        <div class="price">₹${relatedProduct.price}</div>
        <div class="rating" style="color: #ffc107; margin: 10px 0;">
            ${'★'.repeat(Math.floor(relatedProduct.rating))}${'☆'.repeat(5 - Math.floor(relatedProduct.rating))} ${relatedProduct.rating}
        </div>
        <div class="stock" style="
            background: ${relatedProduct.inStock ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
            color: ${relatedProduct.inStock ? '#2ecc71' : '#e74c3c'};
            border-color: ${relatedProduct.inStock ? '#27ae60' : '#c0392b'};
        ">
            ${relatedProduct.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
    `;
    
    relatedProducts.appendChild(relatedCard);
});

// Button click event using object method
viewBtn.addEventListener("click", function() {
    const discount = 15; // 15% discount
    const discountedPrice = product.getDiscountedPrice(discount);
    
    // Create a detailed alert using template literals and object destructuring
    const { batteryLife, connectivity } = product.specifications;
    
    alert(`🎧 ${product.title}
💰 Original Price: ${product.formattedPrice}
🏷️  ${discount}% Off Price: ₹${discountedPrice}
🔋 Battery Life: ${batteryLife}
📶 Connectivity: ${connectivity}
${product.inStock ? '✅ Available for purchase!' : '❌ Currently out of stock'}
⭐ Rating: ${product.rating}/5`);
    
    // Add animation to button
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
        this.style.transform = "scale(1)";
    }, 150);
});

// Additional Object Concepts Demonstration (for learning)
console.log("=== Object Concepts Demo ===");
console.log("1. Object.keys():", Object.keys(product));
console.log("2. Object.values():", Object.values(product.specifications));
console.log("3. Object spread operator:", { ...product.specifications });
console.log("4. Object method call:", product.getDiscountedPrice(20));