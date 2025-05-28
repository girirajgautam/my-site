document.addEventListener('DOMContentLoaded', () => {
    // Example static values (replace with API data)
    document.getElementById('patients-count').textContent = 40;
    document.getElementById('doctors-count').textContent = 8;
    document.getElementById('appointments-count').textContent = 12;
  
    // Example appointments data (simulate from SQL)
    const appointments = [
      { patient: 'John Doe', doctor: 'Dr. Alice', date: '2025-06-01 10:00', status: 'Scheduled' },
      { patient: 'Jane Smith', doctor: 'Dr. Bob', date: '2025-06-01 11:00', status: 'Scheduled' }
    ];
  
    const table = document.getElementById('appointments-table');
    appointments.forEach(app => {
      const row = `<tr>
        <td>${app.patient}</td>
        <td>${app.doctor}</td>
        <td>${app.date}</td>
        <td>${app.status}</td>
      </tr>`;
      table.innerHTML += row;
    });
  });
  