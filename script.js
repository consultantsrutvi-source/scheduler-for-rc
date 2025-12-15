const API_URL = "https://script.google.com/macros/s/XXXXXXXX/exec"; 
// ⚠️ paste your REAL Apps Script URL here

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  if (!u || !p) {
    showError("Enter username and password");
    return;
  }

  fetch(`${API_URL}?action=login&u=${encodeURIComponent(u)}&p=${encodeURIComponent(p)}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Login successful");
        // next step: window.location = "dashboard.html";
      } else {
        showError("Invalid username or password");
      }
    })
    .catch(err => {
      showError("Backend not reachable");
      console.error(err);
    });
}

function showError(msg) {
  document.getElementById("error").innerText = msg;
}
