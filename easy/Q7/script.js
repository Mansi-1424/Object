
function revealIdentity() {
    return `Identity resolved: ${this.name}`;
}


const student = {
    name: "Aarav (Student)"
};

const teacher = {
    name: "Dr. Meera (Teacher)"
};


const log = document.getElementById("log");


document.getElementById("studentBtn").addEventListener("click", () => {
    const message = revealIdentity.call(student);
    log.innerHTML = `
        <strong>Student Interaction</strong><br>
        ✔ Same function used<br>
        ✔ Context dynamically changed<br>
        ➜ ${message}
    `;
    alert(message);
});

document.getElementById("teacherBtn").addEventListener("click", () => {
    const message = revealIdentity.call(teacher);
    log.innerHTML = `
        <strong>Teacher Interaction</strong><br>
        ✔ Same function used<br>
        ✔ Context dynamically changed<br>
        ➜ ${message}
    `;
    alert(message);
});


console.log("Function:", revealIdentity);
console.log("Using call() to bind context at runtime");
