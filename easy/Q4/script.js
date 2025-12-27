
function User(name, age) {
    this.name = name;
    this.age = age;
}

/************************************
 * Prototype Method
 ************************************/
User.prototype.greet = function () {
    alert(`Hello, my name is ${this.name}`);
};

/************************************
 * Extra Prototype Method
 ************************************/
User.prototype.getDetails = function () {
    return `${this.name} is ${this.age} years old.`;
};

/************************************
 * DOM Manipulation
 ************************************/
const btn = document.getElementById("createUser");
const userList = document.getElementById("userList");

btn.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;

    if (!name || !age) {
        alert("Please fill all fields");
        return;
    }

    // Creating object using new
    const user = new User(name, age);

    // Call greet() method (popup)
    user.greet();

    // Display user in DOM
    const div = document.createElement("div");
    div.className = "user";
    div.textContent = user.getDetails();

    userList.appendChild(div);

    demonstrateCallApplyBind(user);
});

/************************************
 * call / apply / bind demonstration
 ************************************/
function demonstrateCallApplyBind(user) {

    function showName(city, country) {
        console.log(
            `Name: ${this.name}, City: ${city}, Country: ${country}`
        );
    }

    // call
    showName.call(user, "Delhi", "India");

    // apply
    showName.apply(user, ["Mumbai", "India"]);

    // bind
    const boundFunc = showName.bind(user, "Bangalore", "India");
    boundFunc();
}

/************************************
 * Prototype Chain Explanation (console)
 ************************************/
console.log(User.prototype);          // prototype object
console.log(User.prototype.__proto__); // Object.prototype
