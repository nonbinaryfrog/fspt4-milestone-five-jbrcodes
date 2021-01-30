import React, { useEffect, useState } from "react";
import "../App.css";

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

  // handle change event when typing students name
  const handleChange = () => {
    setStudents(students);
  };

  // handle a submit event to add student
  const handleSubmit = e => {
    // want to prevent default here
    e.preventDefault();
    // adding the POST method here
    let options = {
      method: "POST"
    };
    fetch(`/students/`, options)
      // get the results in json format
      .then(result => result.json())
      .then(students => {
        // adding student to list
        setStudents(students);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  };

  return (
    <div className="NewStudentForm">
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="firstname">First Name:</label>
        <input onChange={handleChange} id="firstname" />
        <label htmlFor="lastname"> Last Name:</label>
        <input onChange={handleChange} id="lastname" />
        <button>Add Student!</button>
      </form>
    </div>
  );
}
