const express = require("express");
// const { students } = require('./constant');
const path = require('path');

let students = [
  {
    id: 1,
    name: "Mike",
    age: 28,
    department: "CST",
    address: "Vancouver",
  },
  {
    id: 2,
    name: "Stacy",
    age: 21,
    department: "IT",
    address: "Burnaby",
  },
  {
    id: 3,
    name: "Charles",
    age: 21,
    department: "CST",
    address: "Burnaby",
  },
];

const app = express();
const PORT = 4000;

app.use(express.json());

// So this will tell your sever that the incomign data is json
app.use(express.static(path.join(__dirname, 'public')))

// STATUS CODE
// 200 - Succesful Operation
// 201 - Succesful Creation
// 404 - Not Found
// 500 - Something Went Wrong on server
// 401 - You are not authenticated to access it

app.get("/all", (request, response) => {

    if (!students) {
        return response.status(404).json({
            message: 'Students data not found',
            data: null
        }) 
    }

    return response.status(200).json({
        message: 'Succesfully Fetched All Students',
        data: students
    })
})

// department/CST
// department/CST
app.get("/department/:dep", (request, response) => {
    const deparment = request.params.dep; // This value comes from the parameters
    const filteredStudents = students.filter((student) => {
        if (student.department === deparment) {
            return true;
        }
    })

    return response.status(200).json({
        message: `Succesfully Fetched ${deparment}  Students`,
        data: filteredStudents
    })

})

app.delete("/:id", (request, response) => {
    const studentId = parseInt(request.params.id); // This value comes from the parameters

    // We are checking this because this will make sure the id is a number
    if (isNaN(studentId)) {
        return response.status(400).json({
            message: `Please provide a valid student id`,
            data: null
        })
    }

    // Find the studnet to be deleted
    const studentIndex = students.findIndex((student) => student.id === studentId);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        return response.status(200).json({
            message: `Succesfully Deleted student with id ${studentId}`,
            data: students
        })
    
    } else {
        return response.status(404).json({
            message: `Student with ${studentId} not found`,
            data: null
        })
    }
})

app.post("/create", (request, response) => {

    console.log('REQUEST REACHED SERVER....', request.body);
    // Extract the body from the request object
    const studentsData = request.body;
    // name: "Mike",
    // age: 28,
    // department: "CST",
    // address: "Vancouver",
    if (!studentsData.age || !studentsData.name || !studentsData.department || !studentsData.address) {
        return response.status(500).json({
            message: "Please provide valid data to be created",
            data: null
        })
    }
   
    const newStudent = {
        id: students.length + 1,
        name: studentsData.name,
        age: studentsData.age,
        department: studentsData.department,
        address: studentsData.address
    }

    students.push(newStudent);
    return response.status(201).json({
        message: `Succesfully created the student`,
        data: students
    })
    // Add it inside the students array
    // return the new array
})

app.put("/:id", (request, response) => {
    const studentId = parseInt(request.params.id); // This value comes from the parameters
    const updatedData = request.body;
    // We are checking this because this will make sure the id is a number
    if (isNaN(studentId)) {
        return response.status(400).json({
            message: `Please provide a valid student id`,
            data: null
        })
    }

    const updateStudents = students.map((student) => {
        if (student.id === studentId) {
            if (updatedData.name) {
                student.name = updatedData.name;
            }

            if (updatedData.age) {
                student.age = updatedData.age;
            }

            if (updatedData.deparment) {
                student.department = updatedData.deparment;
            }

            if (updatedData.address) {
                student.address = updatedData.address;
            }

        }

        return student;
    })

    // You have to over ride the orignal array
    students = updateStudents;

    return response.status(200).json({
        message: `Succesfully updated the student with id ${studentId}`,
        data: students
    })
})

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});


// FRONTEND, BACKEND on the same server