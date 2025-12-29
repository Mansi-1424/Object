"use strict";

// Immutable configuration object
const appConfig = Object.freeze({
  appName: "SecurePay",
  version: "1.0.0",
  apiUrl: "https://api.securepay.com"
});

// DOM elements
const appNameEl = document.getElementById("appName");
const versionEl = document.getElementById("version");
const apiUrlEl = document.getElementById("apiUrl");
const statusEl = document.getElementById("status");
const modal = document.getElementById("configModal");
const closeModalBtn = document.getElementById("closeModal");


// Initial render
function renderConfig() {
  appNameEl.textContent = appConfig.appName;
  versionEl.textContent = appConfig.version;
  apiUrlEl.textContent = appConfig.apiUrl;
}

renderConfig();

document.getElementById("attemptBtn").addEventListener("click", () => {
  try {
    appConfig.appName = document.getElementById("nameInput").value;
    appConfig.version = document.getElementById("versionInput").value;
    appConfig.apiUrl = document.getElementById("apiInput").value;

    appConfig.newProperty = "Hacked";

    statusEl.textContent = "❌ Configuration change blocked";
    statusEl.style.color = "var(--clr-error)";
  } catch (err) {
    statusEl.textContent = `❌ ${err.message}`;
    statusEl.style.color = "var(--clr-error)";
  }

  // SHOW POPUP
  modal.classList.remove("hidden");

  renderConfig();
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
