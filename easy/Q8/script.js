
function computeEarnings(extra, deduction) {
    return this.base + extra - deduction;
}


const baseInput = document.getElementById("base");
const bonusInput = document.getElementById("bonus");
const taxInput = document.getElementById("tax");
const resultPanel = document.getElementById("result");


document.getElementById("process").addEventListener("click", () => {

    const base = Number(baseInput.value);
    const bonus = Number(bonusInput.value);
    const tax = Number(taxInput.value);

    if (!base || !bonus || !tax) {
        alert("Please fill all financial inputs");
        return;
    }

 
    const employeeProfile = {
        base: base
    };

    
    const finalAmount = computeEarnings.apply(
        employeeProfile,
        [bonus, tax]
    );

    resultPanel.innerHTML = `
        ✔ Financial context injected successfully<br>
        ✔ Shared calculation logic reused<br><br>
        <strong>Final Payable Amount:</strong> ₹${finalAmount}
    `;

    alert(`Final payable amount calculated: ₹${finalAmount}`);

    console.log("Context object:", employeeProfile);
});
