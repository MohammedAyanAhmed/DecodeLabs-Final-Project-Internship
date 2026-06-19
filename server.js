const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Project 3 Running");
});

// GET ALL STUDENTS

app.get("/students", (req, res) => {

    db.query(
        "SELECT * FROM students",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

// GET STUDENT BY ID

app.get("/students/:id", (req, res) => {

    db.query(
        "SELECT * FROM students WHERE id=?",
        [req.params.id],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

});

// INSERT STUDENT

app.post("/students", (req, res) => {

    const { name, email, course } = req.body;

    db.query(
        "INSERT INTO students(name,email,course) VALUES(?,?,?)",

        [name, email, course],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Student Added Successfully"
            });

        }
    );

});

// UPDATE STUDENT

app.put("/students/:id", (req, res) => {

    const { name, email, course } = req.body;

    db.query(

        `UPDATE students
         SET name=?,
             email=?,
             course=?
         WHERE id=?`,

        [
            name,
            email,
            course,
            req.params.id
        ],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Updated Successfully"
            });

        }
    );

});

// DELETE STUDENT

app.delete("/students/:id", (req, res) => {

    db.query(
        "DELETE FROM students WHERE id=?",
        [req.params.id],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Deleted Successfully"
            });

        }
    );

});

app.listen(3000, () => {

    console.log("Server Started");

});