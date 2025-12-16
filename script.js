// ================= CONFIG =================
const API_URL = "https://script.google.com/macros/s/AKfycbyJ7dA7lq6ojXFZyUeqBHhaCE_-SnjFicCuiXz1rJgSIw8bHt9vHeqRcNF7bQPD4v6F/exec"; 
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
function addVacancy() {
  const payload = {
    action: "addVacancy",
    collegeName: document.getElementById("collegeName").value,
    place:
      document.getElementById("place").value === "OTHER"
        ? document.getElementById("otherPlace").value
        : document.getElementById("place").value,
    subject: document.getElementById("subject").value,
    level: document.getElementById("level").value,
    requiredDates: document.getElementById("requiredDates").value,
    offeredSalary: document.getElementById("offeredSalary").value,
    minExp: document.getElementById("minExp").value,
    notes: document.getElementById("notes").value
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(res => {
    alert(res.success ? "Vacancy saved" : "Vacancy failed");
  })
  .catch(err => {
    alert("Error saving vacancy");
    console.error(err);
  });
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
// ================= LOGIN =================
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("error").innerText = "Enter username and password";
    return;
  }

  const payload = {
    action: "login",
    username: username,
    password: password
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("user", data.username);
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("error").innerText = data.message || "Login failed";
      }
    })
    .catch(err => {
      document.getElementById("error").innerText = "Server error";
      console.error(err);
    });
}
const PLACES = [
  "Bengaluru Urban (Bangalore)",
  "Bengaluru Rural",
  "Ramanagara",
  "Tumakuru (Tumkur)",
  "Chikkaballapura",
  "Kolar",
  "Chamarajanagara",

  "Belagavi (Belgaum)",
  "Bagalkot",
  "Dharwad",
  "Gadag",
  "Haveri",
  "Uttara Kannada (Karwar)",

  "Kalaburagi (Gulbarga)",
  "Ballari (Bellary)",
  "Bidar",
  "Chitradurga",
  "Koppal",
  "Raichur",
  "Vijayapura (Bijapur)",
  "Yadgir",
  "Vijayanagara",

  "Mysuru (Mysore)",
  "Mandya",
  "Hassan",
  "Kodagu (Coorg)",
  "Chikkamagaluru (Chikmagalur)",
  "Dakshina Kannada (Mangalore)",
  "Udupi",
  "Shivamogga (Shimoga)",
  "Davanagere",

  "Hyderabad (Telangana)",
  "Visakhapatnam",
  "Vijayawada",
  "Pune",
  "Mumbai",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Latur",
  "Chennai",
  "Coimbatore",
  "Namakkal",

  "OTHER"
];

function loadPlaces() {
  const placeSelect = document.getElementById("place");
  if (!placeSelect) return;

  placeSelect.innerHTML = "<option value=''>Select Place</option>";

  PLACES.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    placeSelect.appendChild(opt);
  });
}

function handlePlaceChange() {
  const place = document.getElementById("place").value;
  const other = document.getElementById("otherPlace");

  if (place === "OTHER") {
    other.style.display = "block";
  } else {
    other.style.display = "none";
    other.value = "";
  }
}

document.addEventListener("DOMContentLoaded", loadPlaces);

