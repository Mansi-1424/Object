
const adminProfile = {
    name: "System Administrator"
};


function revealAuthority() {
    return `Verified Identity: ${this.name}`;
}


const lockedAuthority = revealAuthority.bind(adminProfile);


const identityText = document.getElementById("identity");
const statusPanel = document.getElementById("status");

document.getElementById("activate").addEventListener("click", () => {

    const message = lockedAuthority();

    identityText.textContent = adminProfile.name;

    statusPanel.innerHTML = `
        ✔ Identity permanently verified<br>
        ✔ Control action locked to authority<br><br>
        ${message}
    `;

    alert(message);

    console.log("Bound execution confirmed");
});
