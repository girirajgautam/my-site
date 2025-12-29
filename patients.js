// =========================
// PATIENT FORM FUNCTIONALITY
// =========================
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
// Auto-update dashboard
setInterval(updateDashboardCounts, 1000);
window.onload = updateDashboardCounts;

// Select elements
const patientForm = document.getElementById("patientForm");
const patientsTableBody = document.querySelector("#patientsTable tbody");
const searchInput = document.getElementById("searchpatients");

// Load patients on page load
window.onload = function () {
    loadPatients();
};

// Add new patient
patientForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("patient-name").value;
    const age = document.getElementById("patient-age").value;
    const address = document.getElementById("patient-address").value;

    if (!name || !age || !address) {
        alert("Please fill all fields!");
        return;
    }
    const newPatient = { name, age, address };

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(patients));

    addPatientsRow(newPatient, patients.length - 1);
     updatePatientCount();
    patientForm.reset();
});

// Load patients from storage
function loadPatients() {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patientsTableBody.innerHTML = "";

    patients.forEach((p, index) => {
        addPatientsRow(p, index);
    });
}

// Add a row to table
function addPatientsRow(p, index) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.address}</td>
        <td>
            <button class="edit-btn" onclick="editPatients(${index})">Edit</button>
            <button class="delete-btn" onclick="deletePatients(${index})">Delete</button>
        </td>
    `;

    patientsTableBody.appendChild(tr);
}

// Delete
function deletePatients(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let p = patients[index];

    if (confirm(`Delete ${p.name}?`)) {
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));
        loadPatients();
        updatePatientCount();
        alert("Patient deleted successfully.");
    }
}

// Edit
function editPatients(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let p = patients[index];
    if (confirm(`Edit details of ${p.name}?`)) {
    document.getElementById("patient-name").value = p.name;
    document.getElementById("patient-age").value = p.age;
    document.getElementById("patient-address").value = p.address;

    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    loadPatients();
}
}

// Search
searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase().trim();
    let rows = patientsTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
    });
});


// Download
function downloadpatients() {
    let data = localStorage.getItem("patients") || "[]";

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "patients.json";
    a.click();

    URL.revokeObjectURL(url);
}
    function updatePatientCount() 
{
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    document.getElementById("patients-count").textContent = patients.length;
}
window.onload = function () {
    loadPatients();
    updatePatientCount(); // update count immediately on page load
};
