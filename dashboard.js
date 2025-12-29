// =========================
// DASHBOARD JS FUNCTIONS
// =========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAhUdB_W0mwaaah2kJowHsehv-4Ihqr5q4",
  authDomain: "hospital-management-syst-3b544.firebaseapp.com",
  projectId: "hospital-management-syst-3b544",
  storageBucket: "hospital-management-syst-3b544.appspot.com",
  messagingSenderId: "827158953094",
  appId: "1:827158953094:web:b48097ffb9392fb6f26507",
  measurementId: "G-XQW28CWG7N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const userEmailSpan = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmailSpan.textContent = user.email;
  } else {
    window.location.href = "login.html";
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});


// Update counts
function updateDashboardCounts() {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  document.getElementById("patients-count").textContent = patients.length;
  document.getElementById("doctors-count").textContent = doctors.length;
  document.getElementById("appointments-count").textContent = appointments.length;

  loadPatientsTable(patients);
  loadDoctorsTable(doctors);
  loadAppointmentsTable(appointments);
}

// Load tables
function loadPatientsTable(patients){
  const tbody = document.querySelector("#patientsTable tbody");
  tbody.innerHTML = "";
  patients.forEach(p=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${p.name||'-'}</td>
    <td>${p.age||'-'}</td>
    <td>${p.address||'-'}</td>`;
    tbody.appendChild(tr);
  });
}

function loadDoctorsTable(doctors){
  const tbody = document.querySelector("#doctorsTable tbody");
  tbody.innerHTML = "";

  doctors.forEach(d => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.name}</td>
      <td>${d.specialization || '-'}</td>
      <td>${d.experience || '-'}</td>
      <td>${d.address || '-'}</td>
      <td>${d.phone || '-'}</td>
    `;
    tbody.appendChild(tr);
  });
}


function loadAppointmentsTable(appointments){
  const tbody = document.querySelector("#appointmentsTable tbody");
  tbody.innerHTML = "";
  appointments.forEach(a=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${a.patient||'-'}</td>
    <td>${a.doctor||'-'}</td>
    <td>${a.date||'-'}</td>
    <td>${a.time||'-'}</td>`;
    tbody.appendChild(tr);
  });
}

// Search functionality
document.getElementById("searchPatients").addEventListener("input", function(){
  const value = this.value.toLowerCase().trim();
  document.querySelectorAll("#patientsTable tbody tr").forEach(row=>{
    row.style.display = row.textContent.toLowerCase().includes(value) ? "" : "none";
  });
});

document.getElementById("searchDoctors").addEventListener("input", function(){
  const value = this.value.toLowerCase().trim();
  document.querySelectorAll("#doctorsTable tbody tr").forEach(row=>{
    row.style.display = row.textContent.toLowerCase().includes(value) ? "" : "none";
  });
});

document.getElementById("searchAppointments").addEventListener("input", function(){
  const value = this.value.toLowerCase().trim();
  document.querySelectorAll("#appointmentsTable tbody tr").forEach(row=>{
    row.style.display = row.textContent.toLowerCase().includes(value) ? "" : "none";
  });
});

// Download functions
function downloadPatients(){
  const data = localStorage.getItem("patients") || "[]";
  downloadJSON(data, "patients.json");
}
function downloadDoctors(){
  const data = localStorage.getItem("doctors") || "[]";
  downloadJSON(data, "doctors.json");
}
function downloadAppointments(){
  const data = localStorage.getItem("appointments") || "[]";
  downloadJSON(data, "appointments.json");
}

function downloadJSON(data, filename){
  const blob = new Blob([data], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Auto-update dashboard
setInterval(updateDashboardCounts, 1000);
window.onload = updateDashboardCounts;


