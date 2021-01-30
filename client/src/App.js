import React, { useEffect, useState } from "react";
import "./App.css";
import NewStudentForm from "./components/NewStudentForm";

export default function App() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch("/students")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // DELETE method isn't quite working here
  const deleteStudent = id => {
    // adding delete method here
    let options = {
      method: "DELETE"
    };
    // finding the student with the id to delete
    fetch(`students/${id}`, options)
      .then(result => result.json())
      .then(students => {
        setStudents(students);
      })
      // if error, here's a message
      .catch(err => {
        console.log("error!", err.message);
      });
  };

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
      <ul>
        {students &&
          students.map(s => (
            <li key={s.id}>
              {s.firstname} {s.lastname}
              <button type="button" onClick={s => deleteStudent(s.id)}>
                {" "}
                delete
              </button>
            </li>
          ))}
      </ul>
      <NewStudentForm />
    </div>
  );
}
