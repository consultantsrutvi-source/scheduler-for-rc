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
        window.location.href = "dashboard.html";
      
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
function loadDashboard() {
  fetch(`${API_URL}?action=dashboard`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("vacancyCount").innerText = data.vacancies;
      document.getElementById("lecturerCount").innerText = data.lecturers;
      document.getElementById("assignmentCount").innerText = data.assignments;
    })
    .catch(() => {
      alert("Failed to load dashboard data");
    });
}

function logout() {
  window.location.href = "index.html";
}
function addVacancy() {
  const payload = {
    college: document.getElementById("college").value.trim(),
    place: document.getElementById("place").value.trim(),
    subject: document.getElementById("subject").value,
    level: document.getElementById("level").value,
    dates: document.getElementById("dates").value.trim(),
    salary: document.getElementById("salary").value,
    experience: document.getElementById("experience").value,
    notes: document.getElementById("notes").value.trim()
  };

  if (!payload.college || !payload.subject || !payload.level) {
    document.getElementById("msg").innerText = "Please fill required fields";
    return;
  }

  fetch(`${API_URL}?action=addVacancy`, {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("msg").innerText = "Vacancy saved successfully";
      } else {
        document.getElementById("msg").innerText = "Failed to save vacancy";
      }
    })
    .catch(() => {
      document.getElementById("msg").innerText = "Backend error";
    });
}
