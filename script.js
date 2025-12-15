const API_URL = "https://script.google.com/macros/s/AKfycbyJ7dA7lq6ojXFZyUeqBHhaCE_-SnjFicCuiXz1rJgSIw8bHt9vHeqRcNF7bQPD4v6F/exec";

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  fetch(`${API_URL}?action=login&u=${u}&p=${p}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Login success – dashboard next");
      } else {
        document.getElementById("error").innerText = "Invalid login";
      }
    });
}
