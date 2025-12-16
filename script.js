/* ===================== CONFIG ===================== */
const API_URL = "https://script.google.com/macros/s/AKfycbyJ7dA7lq6ojXFZyUeqBHhaCE_-SnjFicCuiXz1rJgSIw8bHt9vHeqRcNF7bQPD4v6F/exec"; 
// ⬆️ keep your actual Apps Script URL here

/* ===================== LOGIN ===================== */
function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  fetch(`${API_URL}?action=login&u=${encodeURIComponent(u)}&p=${encodeURIComponent(p)}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("error").innerText = "Invalid login";
      }
    });
}

/* ===================== DASHBOARD ===================== */
function loadDashboard() {
  fetch(`${API_URL}?action=dashboard`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("vacancyCount").innerText = data.vacancies;
      document.getElementById("lecturerCount").innerText = data.lecturers;
      document.getElementById("assignmentCount").innerText = data.assignments;
    });
}

function logout() {
  window.location.href = "index.html";
}

/* ===================== VACANCY LOGIC ===================== */

let selectedDates = [];

function addDate() {
  const date = document.getElementById("datePicker").value;
  if (date && !selectedDates.includes(date)) {
    selectedDates.push(date);
  }
  document.getElementById("dateList").innerText = selectedDates.join(", ");
  document.getElementById("datePicker").value = "";
}

function handlePlaceChange() {
  document.getElementById("otherPlace").style.display =
    document.getElementById("place").value === "OTHER" ? "block" : "none";
}

function handleSubjectChange() {
  document.getElementById("otherSubject").style.display =
    document.getElementById("subject").value === "OTHER" ? "block" : "none";
}

function handleSalaryChange() {
  document.getElementById("otherSalary").style.display =
    document.getElementById("salary").value === "OTHER" ? "block" : "none";
}

function addVacancy() {
  const place =
    document.getElementById("place").value === "OTHER"
      ? document.getElementById("otherPlace").value
      : document.getElementById("place").value;

  const subject =
    document.getElementById("subject").value === "OTHER"
      ? document.getElementById("otherSubject").value
      : document.getElementById("subject").value;

  const salary =
    document.getElementById("salary").value === "OTHER"
      ? document.getElementById("otherSalary").value
      : document.getElementById("salary").value;

  const payload = {
    college: document.getElementById("college").value.trim(),
    place: place,
    subject: subject,
    level: document.getElementById("level").value,
    experience: document.getElementById("experience").value,
    salary: salary,
    dates: selectedDates.join(", "),
    notes: document.getElementById("notes").value.trim()
  };

  fetch(`${API_URL}?action=addVacancy`, {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("msg").innerText =
        data.success ? "Vacancy saved successfully" : "Failed to save vacancy";
    })
    .catch(() => {
      document.getElementById("msg").innerText = "Backend error";
    });
}
