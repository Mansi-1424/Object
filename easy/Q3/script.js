// Bank Account Object
const bankAccount = {
    username: "amit",
    password: "1234",
    accountHolder: "Amit Sharma",
    balance: 45000,

    getDetails() {
        return `Account Holder: ${this.accountHolder} | Balance: ₹${this.balance}`;
    }
};

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const detailsBtn = document.getElementById("detailsBtn");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginCard = document.getElementById("loginCard");
const bankCard = document.getElementById("bankCard");

const accountInfo = document.getElementById("accountInfo");
const loginMsg = document.getElementById("loginMsg");

// Login Logic
loginBtn.addEventListener("click", () => {
    const user = usernameInput.value;
    const pass = passwordInput.value;

    if (user === bankAccount.username && pass === bankAccount.password) {
        alert("Login successful");

        loginCard.classList.add("hidden");
        bankCard.classList.remove("hidden");
    } else {
        loginMsg.textContent = "Invalid username or password";
        loginMsg.style.color = "red";
    }
});

// Show Account Details
detailsBtn.addEventListener("click", () => {
    accountInfo.textContent = bankAccount.getDetails();
});
