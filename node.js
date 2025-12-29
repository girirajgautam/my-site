const express = require("express");
const app = express();

app.get("/patients", (req, res) => {
    res.json({ message: "Working!" });
});

app.listen(3000, () => console.log("Server running"));
app.get("/api/getData", (req, res) => {
    const data = {
        patients: 120,
        doctors: 25,
        appointments: 75
    };
    res.json(data);
});
app.use(express.static("public"));
