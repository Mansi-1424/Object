// Object Literal
const user = {
    name: "",
    email: "",
    isLoggedIn: false,

    login: function () {
        this.isLoggedIn = true;
        console.log("User has logged in");
        alert("User logged in successfully!");
    }
};

// DOM Elements
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const loginStatus = document.getElementById("loginStatus");
const loginBtn = document.getElementById("loginBtn");

// Validation patterns
const namePattern = /^[A-Za-z\s]+$/;          // Only letters and spaces
const emailPattern = /^[A-Za-z@.]+$/;         // Letters + @ + . (no numbers)

// Login button click
loginBtn.addEventListener("click", function () {
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();

    // Name validation
    if (!namePattern.test(nameValue)) {
        alert("Name should contain only characters!");
        return;
    }

    // Email validation
    if (!emailPattern.test(emailValue)) {
        alert("Email should not contain numbers!");
        return;
    }

    // Save data to object
    user.name = nameValue;
    user.email = emailValue;

    // Login
    user.login();
    loginStatus.textContent = "Logged In";
    loginStatus.style.color = "green";
});
