// =========================
// DOCTOR FORM FUNCTIONALITY
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
const doctorForm = document.getElementById("doctorForm");
const doctorsTableBody = document.querySelector("#doctorsTable tbody");
const searchInput = document.getElementById("searchDoctor");

// Load doctors on page load
window.onload = function () {
    loadDoctors();
};

// Add new doctor
doctorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("doctor-name").value;
    const specialization = document.getElementById("doctor-specialization").value;
    const experience = document.getElementById("doctor-experience").value;
    const address = document.getElementById("doctor-address").value;
    const phone = document.getElementById("doctor-phone").value;

    if (!name || !specialization || !experience || !address || !phone) {
        alert("Please fill all fields!");
        return;
    }

    const newDoctor = { name, specialization, experience, address, phone };

    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctors.push(newDoctor);
    localStorage.setItem("doctors", JSON.stringify(doctors));

    addDoctorRow(newDoctor, doctors.length - 1);
    updatedoctorscount();
    doctorForm.reset();
});

// Load doctors from storage
function loadDoctors() {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    doctorsTableBody.innerHTML = "";

    doctors.forEach((doc, index) => {
        addDoctorRow(doc, index);
    });
}

// Add a row to table
function addDoctorRow(doc, index) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${doc.name}</td>
        <td>${doc.specialization}</td>
        <td>${doc.experience}</td>
        <td>${doc.address}</td>
        <td>${doc.phone}</td>
        <td>
            <button class="edit-btn" onclick="editDoctor(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteDoctor(${index})">Delete</button>
        </td>
    `;

    doctorsTableBody.appendChild(tr);
}


// Delete doctor
function deleteDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let d = doctors[index];
    if (confirm(`Are you sure you want to delete Dr. ${d.name}?`)) {
       doctors.splice(index, 1);
       localStorage.setItem("doctors", JSON.stringify(doctors));
    loadDoctors(); // refresh table
    updatedoctorscount();
    alert("Doctor deleted successfully!");
   }
}

// Edit doctor
function editDoctor(index) {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    let d = doctors[index];
    if (confirm(`Are you sure you want to edit Dr. ${d.name}`)) {

    document.getElementById("doctor-name").value = d.name;
    document.getElementById("doctor-specialization").value = d.specialization;
    document.getElementById("doctor-experience").value = d.experience;
    document.getElementById("doctor-address").value = d.address;
    document.getElementById("doctor-phone").value = d.phone;

    // Remove old data and update
    doctors.splice(index,1);
    localStorage.setItem("doctors", JSON.stringify(doctors));
    loadDoctors(); // refresh table
}
}

// Search doctor
searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase();
    let rows = doctorsTableBody.querySelectorAll("tr");

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
    });
});

// Download doctors list
function downloadDoctors() {
    let data = localStorage.getItem("doctors") || "[]";

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "doctors.json";
    a.click();

    URL.revokeObjectURL(url);
}
 function updatedoctorscount() {
    let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    document.getElementById("doctors-count").textContent = doctors.length;
}
window.onload = function () {
    loadDoctors();
    updatedoctorscount();
};
