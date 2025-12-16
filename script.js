const API_URL = "https://script.google.com/macros/s/XXXX/exec"; 
// keep your real Apps Script URL

/* LOGIN */
function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();

  fetch(`${API_URL}?action=login&u=${encodeURIComponent(u)}&p=${encodeURIComponent(p)}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) window.location.href = "dashboard.html";
      else document.getElementById("error").innerText = "Invalid login";
    });
}

/* DASHBOARD */
function loadDashboard() {
  fetch(`${API_URL}?action=dashboard`)
    .then(res => res.json())
    .then(d => {
      document.getElementById("vacancyCount").innerText = d.vacancies;
      document.getElementById("lecturerCount").innerText = d.lecturers;
      document.getElementById("assignmentCount").innerText = d.assignments;
    });
}

function logout() {
  window.location.href = "index.html";
}

/* VACANCY HELPERS */
let selectedDates = [];

function addDate() {
  const d = document.getElementById("datePicker").value;
  if (d && !selectedDates.includes(d)) selectedDates.push(d);
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

/* ADD VACANCY */
function addVacancy() {
  const payload = {
    college: document.getElementById("college").value.trim(),
    place: document.getElementById("place").value === "OTHER"
      ? document.getElementById("otherPlace").value
      : document.getElementById("place").value,
    subject: document.getElementById("subject").value === "OTHER"
      ? document.getElementById("otherSubject").value
      : document.getElementById("subject").value,
    level: document.getElementById("level").value,
    experience: document.getElementById("experience").value,
    salary: document.getElementById("salary").value === "OTHER"
      ? document.getElementById("otherSalary").value
      : document.getElementById("salary").value,
    dates: selectedDates.join(", "),
    notes: document.getElementById("notes").value.trim()
  };

  fetch(`${API_URL}?action=addVacancy`, {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(r => {
      document.getElementById("msg").innerText =
        r.success ? "Vacancy saved successfully" : "Failed to save vacancy";
    })
    .catch(() => {
      document.getElementById("msg").innerText = "Backend error";
    });
}
