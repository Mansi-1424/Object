## Product Details Dashboard

---

## Problem Description
The Product Details Dashboard is a dynamic web application that displays
detailed information about a product using JavaScript objects.
It demonstrates how real-world product data can be structured using
objects, nested objects, arrays, and object methods.

The dashboard presents product information such as price, availability,
specifications, and related products, and updates the UI dynamically
based on object data.

---

## Input
- Product data stored in a JavaScript object
- Includes:
  - Product name and price
  - Stock status
  - Rating and category
  - Specifications
  - Related products
  - Discount percentage (for calculation)


## JavaScript Logic Demo 


- Create a product object containing:
  - Primitive values (title, price, stock)
  - Nested objects (specifications)
  - Arrays (features and related products)
- Use object destructuring to access values
- Use object methods to calculate discounted price
- Use getters to format price output
- Loop through specifications using object iteration
- Loop through related products array to create cards
- Update the DOM dynamically with product data
- Handle button click to display detailed product alert

---

## Explanation
1. Product information is stored in a structured object.
2. Nested objects represent detailed specifications.
3. Arrays store multiple related products.
4. JavaScript reads object properties and updates the UI.
5. Stock status is displayed conditionally.
6. Specifications are rendered dynamically using loops.
7. Related products are displayed as cards.
8. A button triggers object methods to calculate discounts.
9. Alerts and animations enhance user interaction.

---

## Constraints
- Product data must follow object structure
- Price values must be numeric
- Stock status must be boolean
- Ratings must be between 0 and 5
- All rendering is performed on the client side
- UI depends entirely on object data consistency

---

## UI & Visual Styling
- Glassmorphism layout with blur
- Rounded corners using border-radius
- Gradient animations in background
- Hover elevation effects on cards
- Pulse animation for featured badge