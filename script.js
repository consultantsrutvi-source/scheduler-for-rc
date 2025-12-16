// ================= CONFIG =================
const API_URL = "PASTE_YOUR_WEB_APP_EXEC_URL_HERE"; 
// must end with /exec

// ================= AUTH =================
function logout() {
  localStorage.clear();
  location.href = "index.html";
}

// ================= SHARED =================
let selectedDates = [];

function addDate() {
  const d = document.getElementById("datePicker").value;
  if (!d) return;
  selectedDates.push(d);
  document.getElementById("dateList").innerText = selectedDates.join(", ");
}

// ================= ADD LECTURER =================
function addLecturer() {
  const payload = {
    action: "addLecturer",
    name: document.getElementById("name").value,
    subject:
      document.getElementById("subject").value === "OTHER"
        ? document.getElementById("otherSubject").value
        : document.getElementById("subject").value,
    level: document.getElementById("level").value,
    experience: document.getElementById("experience").value,
    preferredSalary:
      document.getElementById("salary").value === "OTHER"
        ? document.getElementById("otherSalary").value
        : document.getElementById("salary").value,
    place:
      document.getElementById("place").value === "OTHER"
        ? document.getElementById("otherPlace").value
        : document.getElementById("place").value,
    availableDates: selectedDates.join(", "),
    status: document.getElementById("status").value
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  })
    .then(r => r.json())
    .then(res => {
      document.getElementById("msg").innerText =
        res.success ? "Lecturer saved successfully" : "Failed to save lecturer";
    })
    .catch(err => {
      document.getElementById("msg").innerText = "Error: " + err;
    });
}

// ================= DASHBOARD =================
function loadDashboard() {
  fetch(API_URL + "?action=counts")
    .then(r => r.json())
    .then(d => {
      document.getElementById("vacancyCount").innerText = d.vacancies;
      document.getElementById("lecturerCount").innerText = d.lecturers;
      document.getElementById("assignmentCount").innerText = d.assignments;
    });
}
