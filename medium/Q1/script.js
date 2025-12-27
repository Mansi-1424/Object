// Sealed internal mark
const hiddenMark = Symbol("sealed");

// Identity constructor
function LedgerEntry(label) {
  this.label = label;
  this[hiddenMark] = crypto.randomUUID();
}

// Controlled internal access
LedgerEntry.prototype.verify = function () {
  return this[hiddenMark];
};

// DOM logic
const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector(".records");

const archive = [];

button.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) return;

  const entry = new LedgerEntry(name);
  archive.push(entry);

  const item = document.createElement("li");
  item.innerHTML = `
    <span>${entry.label}</span>
    <span>✔︎ Sealed</span>
  `;

  list.appendChild(item);
  input.value = "";
});

/*
Proof of secrecy (dev console only):

Object.keys(entry) → ["label"]
JSON.stringify(entry) → {"label":"..."}
for (let k in entry) → label only
entry.verify() → hidden internal mark
*/
