var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET student list
router.get("/", function(req, res, next) {
  db("SELECT * FROM students;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one student
router.get("/:id", async function(req, res, next) {
  // get the id first
  let id = req.params.id;
  // if the id exists, get the student with the ID
  try {
    let sql = `SELECT * FROM students WHERE id = ${id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      res.send(results.data);
    } else {
      // if the id doesnt exist, send 404 error message
      res.status(404).send({ error: "Not Found" });
    }
  } catch (err) {
    // if there is a server message, catch it here
    res.status(500).send({ error: error.message });
  }
});

// INSERT a new student into the DB
router.post("/", function(req, res, next) {
  // deconstruct what goes into the body
  let { firstname, lastname } = req.body;
  // make the post request
  let sql = ` INSERT INTO 
  students ( firstname, lastname ) 
  VALUES ('${firstname}', '${lastname}')`;
  // if it goes well, it should return the data
  db(sql).then(results => {
    db("SELECT * FROM students")
      .then(results => {
        res.status(201).send(results.data);
      })
      // if it does not go well, give server error
      .catch(err => res.status(500).send(err));
  });
});

// DELETE a student from the DB
router.delete("/:id", async function(req, res, next) {
  // get the id first
  let id = req.params.id;
  // if the id exists, get the student with the ID
  try {
    let sql = `SELECT * FROM students WHERE id = ${id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      sql = `
    DELETE FROM students
    WHERE id = ${id}`;
      await db(sql);
      results = await db("SELECT * FROM students");
      res.send(results.data);
    } else {
      // if the id doesnt exist, this 404 error will show
      res.status(404).send({ error: "Not Found" });
    }
  } catch (err) {
    // catch server error here
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
