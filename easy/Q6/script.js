/****************************************
 * Base Object (Employee)
 ****************************************/
const employee = {
    role: "Employee",
    work: function () {
        alert(`${this.role} is working in ${this.department} department`);
    }
};

/****************************************
 * DOM Elements
 ****************************************/
const btn = document.getElementById("createManager");
const output = document.getElementById("output");

/****************************************
 * Event Listener
 ****************************************/
btn.addEventListener("click", function () {
    const dept = document.getElementById("dept").value;

    if (!dept) {
        alert("Please enter department");
        return;
    }

    /************************************
     * Create manager using Object.create
     ************************************/
    const manager = Object.create(employee);
    manager.role = "Manager";
    manager.department = dept;

    /************************************
     * UI Creation
     ************************************/
    output.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h3>Manager Profile</h3>
        <p><strong>Role:</strong> ${manager.role}</p>
        <p><strong>Department:</strong> ${manager.department}</p>
        <p><strong>Prototype:</strong> Inherited from employee</p>
    `;

    const workBtn = document.createElement("button");
    workBtn.textContent = "Make Manager Work";

    workBtn.addEventListener("click", function () {
        manager.work(); // inherited method
        console.log(manager.__proto__); // prototype reference
    });

    card.appendChild(workBtn);
    output.appendChild(card);
});
