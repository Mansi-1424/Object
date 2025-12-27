
const appInfo = {
    appName: "Login System",
    version: "1.0"
};
console.log(appInfo);


function User(username, role) {
    this.username = username;
    this.role = role;
}


User.prototype.login = function () {
    alert(`${this.username} logged in`);
};


User.prototype.getUserInfo = function () {
    return `${this.username} (${this.role})`;
};


const addUserBtn = document.getElementById("addUserBtn");
const usersContainer = document.getElementById("usersContainer");

addUserBtn.addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    if (!username || !role) {
        alert("Please enter username and role");
        return;
    }

    // Create user using constructor
    const user = new User(username, role);

    // Create UI card
    const card = document.createElement("div");
    card.className = "user-card";

    const text = document.createElement("span");
    text.textContent = user.getUserInfo();

    const loginBtn = document.createElement("button");
    loginBtn.textContent = "Login";

    // Shared prototype method used here
    loginBtn.addEventListener("click", function () {
        user.login();
        demoCallApplyBind(user);
    });

    card.appendChild(text);
    card.appendChild(loginBtn);
    usersContainer.appendChild(card);

    console.log(user.__proto__); // Prototype check
});


function demoCallApplyBind(user) {
    function showAccess(level, location) {
        console.log(
            `${this.username} has ${level} access from ${location}`
        );
    }

    // call
    showAccess.call(user, "Admin", "Web App");

    // apply
    showAccess.apply(user, ["User", "Mobile App"]);

    // bind
    const boundAccess = showAccess.bind(user, "Manager", "Dashboard");
    boundAccess();
}


console.log(User.prototype);                 // login(), getUserInfo()
console.log(User.prototype.__proto__);       // Object.prototype
