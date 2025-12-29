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

// SELECT ELEMENTS
const form = document.getElementById("appointmentForm");
const tableBody = document.querySelector("#appointmentsTable tbody");
const searchInput = document.getElementById("searchpatient");

// LOAD APPOINTMENTS ON PAGE LOAD
window.onload = function () {
    loadPatients();
};
// Form submit
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const patient = document.getElementById("appt-patient-name").value;
    const doctor = document.getElementById("appt-doctor-name").value;
    const date = document.getElementById("appt-date").value;
    const time = document.getElementById("appt-time").value;

    if (!patient || !doctor || !date || !time) {
        alert("Please fill all fields!");
        return;
    }
    const newAppointment = { patient, doctor, date, time };

     let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    addAppointmentRow(newAppointment, appointments.length - 1);
    updateAppointmentCount();
    form.reset();
});

// Load appointments from localStorage
function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    tableBody.innerHTML = ""; // clear table

    appointments.forEach((appt, index) => {
        addAppointmentRow(appt, index);
    });
}

// Add row to table
function addAppointmentRow(appt, index) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${appt.patient}</td>
        <td>${appt.doctor}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td>
            <button class="edit-btn" onclick="editAppointment(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteAppointment(${index})">Delete</button>
        </td>
    `;

    tableBody.appendChild(tr);
}

// Delete appointment
function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let appt =  appointments[index];

    if (confirm(`Are you sure you want to delete appointment of ${appt.patient} with ${appt.doctor}?`)) {
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
        updateAppointmentCount();
        alert("Appointment deleted successfully!");
    }
}

function editAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    let appt = appointments[index];

    // Show only edit message
    if(confirm(`Editing appointment of ${appt.patient} with ${appt.doctor}`)) {

    // Fill the form with existing data
    document.getElementById("appt-patient-name").value = appt.patient;
    document.getElementById("appt-doctor-name").value = appt.doctor;
    document.getElementById("appt-date").value = appt.date;
    document.getElementById("appt-time").value = appt.time;

    // Remove the old entry silently (without alert)
    appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadAppointments(); // refresh table
}
}


// Search appointments
searchInput.addEventListener("input", function () {
    let value = searchInput.value.toLowerCase();
    let rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? "" : "none";
    });
});

// Download appointments list
function downloadAppointments() {
    let data = localStorage.getItem("appointments") || "[]";

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "appointments.json";
    a.click();

    URL.revokeObjectURL(url);
}
    function updateAppointmentCount() 
{
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    document.getElementById("appointments-count").textContent = appointments.length;
}
window.onload = function () {
    loadAppointments();
    updateAppointmentCount(); // update count immediately on page load
};