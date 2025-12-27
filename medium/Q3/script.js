// Secure bank account object
const bankAccount = (() => {
  let _balance = 0;

  const account = {};

  Object.defineProperty(account, "balance", {
    get() {
      return _balance;
    },
    enumerable: true,
    configurable: false
  });

  account.deposit = function (amount) {
    if (amount <= 0 || isNaN(amount)) {
      return "Invalid deposit amount";
    }
    _balance += amount;
    return "Deposit successful";
  };

  account.withdraw = function (amount) {
    if (amount <= 0 || isNaN(amount)) {
      return "Invalid withdrawal amount";
    }
    if (amount > _balance) {
      return "Insufficient funds";
    }
    _balance -= amount;
    return "Withdrawal successful";
  };

  return account;
})();

// DOM Elements
const balanceEl = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const messageEl = document.getElementById("message");

document.getElementById("depositBtn").addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const result = bankAccount.deposit(amount);
  updateUI(result, "success");
});

document.getElementById("withdrawBtn").addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const result = bankAccount.withdraw(amount);
  updateUI(result, "danger");
});

function updateUI(message, type) {
  balanceEl.textContent = `₹${bankAccount.balance}`;
  messageEl.textContent = message;
  messageEl.style.color =
    message.includes("successful") ? "var(--clr-success)" : "var(--clr-danger)";
  amountInput.value = "";
}

// 🔒 Challenge Proof (students will try this)
bankAccount.balance = 1000000; // ❌ ignored
