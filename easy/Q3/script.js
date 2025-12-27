// Bank Account Object
const bankAccount = {
    accountHolder: "Amit Sharma",
    balance: 45000,

    getDetails: function () {
        return `Account holder: ${this.accountHolder}, Balance: ₹${this.balance}`;
    }
};

// DOM Elements
const accountInfo = document.getElementById("accountInfo");
const detailsBtn = document.getElementById("detailsBtn");

// Button click event
detailsBtn.addEventListener("click", function () {

    // Using object method with 'this'
    accountInfo.textContent = bankAccount.getDetails();

    // Popup message
    alert("User login successfully");
});
