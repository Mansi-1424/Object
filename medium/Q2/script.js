// PRIVATE SYMBOL (cannot be accessed without reference)
const USER_ID = Symbol("userId");

// User factory function
function createUser(username) {
  return {
    name: username,

    // private symbol-based ID
    [USER_ID]: Math.floor(Math.random() * 100000),

    // controlled access method
    getUserId() {
      return this[USER_ID];
    }
  };
}

// DOM Elements
const form = document.getElementById("userForm");
const input = document.getElementById("username");
const userList = document.getElementById("userList");

// Store users
const users = [];

// Render users to UI
function renderUsers() {
  userList.innerHTML = "";

  users.forEach((user, index) => {
    const card = document.createElement("div");
    card.className = "user-card";

    const name = document.createElement("span");
    name.textContent = user.name;

    const btn = document.createElement("button");
    btn.textContent = "Show ID";

    btn.addEventListener("click", () => {
      alert(`Private User ID: ${user.getUserId()}`);
    });

    card.appendChild(name);
    card.appendChild(btn);
    userList.appendChild(card);
  });
}

// Form submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = input.value.trim();
  if (!username) return;

  const newUser = createUser(username);

  // 🔒 Proof of privacy (students can inspect in console)
  console.log("Object.keys:", Object.keys(newUser));
  console.log("JSON:", JSON.stringify(newUser));
  for (let key in newUser) {
    console.log("for...in:", key);
  }

  users.push(newUser);
  renderUsers();
  input.value = "";
});
