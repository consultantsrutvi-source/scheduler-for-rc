const API_URL = "https://script.google.com/macros/s/AKfycbyJ7dA7lq6ojXFZyUeqBHhaCE_-SnjFicCuiXz1rJgSIw8bHt9vHeqRcNF7bQPD4v6F/exec"; 

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
  showError("Backend reachable but error occurred");
  console.error("API ERROR:", err);
});
}

function showError(msg) {
  document.getElementById("error").innerText = msg;
}
