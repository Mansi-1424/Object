class Employee {
  constructor(name, baseSalary, bonus) {
    this.name = name;
    this.baseSalary = baseSalary;
    this.bonus = bonus;
  }

  get totalSalary() {
    return this.baseSalary + this.bonus;
  }

  getFormatted(value) {
    return `₹${value.toLocaleString("en-IN")}`;
  }
}

// Employee store
const employees = [];

// DOM elements
const listEl = document.getElementById("employeeList");
const statusEl = document.getElementById("status");

document.getElementById("addBtn").addEventListener("click", () => {
  try {
    const name = document.getElementById("nameInput").value.trim();
    const base = Number(document.getElementById("baseInput").value);
    const bonus = Number(document.getElementById("bonusInput").value);

    if (!name) throw new Error("Employee name is required");
    if (base < 0 || bonus < 0 || isNaN(base) || isNaN(bonus)) {
      throw new Error("Salary values must be positive numbers");
    }

    const employee = new Employee(name, base, bonus);
    employees.push(employee);

    renderEmployees();
    statusEl.textContent = "✅ Employee added successfully";
    statusEl.style.color = "var(--clr-accent)";

    document.getElementById("nameInput").value = "";
    document.getElementById("baseInput").value = "";
    document.getElementById("bonusInput").value = "";

  } catch (err) {
    statusEl.textContent = `❌ ${err.message}`;
    statusEl.style.color = "var(--clr-error)";
  }
});

function renderEmployees() {
  listEl.innerHTML = "";

  employees.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";

    card.innerHTML = `
      <h3>${emp.name}</h3>
      <div class="salary-row">
        <span>Base</span>
        <strong>${emp.getFormatted(emp.baseSalary)}</strong>
      </div>
      <div class="salary-row">
        <span>Bonus</span>
        <strong>${emp.getFormatted(emp.bonus)}</strong>
      </div>
      <div class="salary-row total">
        <span>Total</span>
        <strong>${emp.getFormatted(emp.totalSalary)}</strong>
      </div>
    `;

    listEl.appendChild(card);
  });
}
