const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// Hardcoded users for demo
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "reception", password: "recept123", role: "receptionist" },
    { username: "patient1", password: "patient123", role: "patient" }
];

loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if(user){
        // Save logged in user to localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirect based on role
        if(role === "admin" || role === "receptionist"){
            window.location.href = "dashboard.html";
        } else if(role === "patient"){
            window.location.href = "patient_dashboard.html";
        }
    } else {
        errorMsg.textContent = "Invalid credentials. Try again!";
    }
});
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      console.log("Logged in:", user);

      // REDIRECT to dashboard
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      console.error(error);
      alert("Google login failed!");
    });
}

