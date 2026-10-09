const express = require("express");
const fs = require("fs");
const os = require("os");
const dns = require("dns");

const app = express();
const PORT = 3000;
const DATA_FILE = "students.json";

// Read student data from JSON file
function getStudents() {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
}


// 1. Get all students
app.get("/students", (req, res) => {
    const students = getStudents();

    let output = "";

    students.forEach(student => {
        output += JSON.stringify(student, null, 4) + "\n\n";
    });

    res.type("text").send(output);
});


// 2. Get student by ID
app.get("/students/:id", (req, res) => {
    const students = getStudents();

    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (student) {
        res.type("text").send(JSON.stringify(student, null, 4));
    } else {
        res.status(404).send("Student not found");
    }
});


// 3. Search students by course
app.get("/search", (req, res) => {
    const students = getStudents();

    const course = req.query.course;

    const result = students.filter(
        student => student.course.toLowerCase() === course.toLowerCase()
    );

    res.type("text").send(JSON.stringify(result, null, 4));
});


// 4. Display system information
app.get("/system", (req, res) => {
    const systemInfo = {
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuCores: os.cpus().length
    };

    res.type("text").send(JSON.stringify(systemInfo, null, 4));
});


// 5. Display DNS information
app.get("/dns", (req, res) => {
    const hostname = "google.com";

    dns.lookup(hostname, (err, address, family) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            const dnsInfo = {
                hostname: hostname,
                address: address,
                family: family
            };

            res.type("text").send(JSON.stringify(dnsInfo, null, 4));
        }
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});