// Fetch All students

const fetchAllStudents = async () => {
    const results = await fetch('/all');
    const { data } = await results.json();
    generateTableUI(data);
}

const generateTableUI = async (students) => {
    const tBody = document.getElementById('student-table');

    tBody.innerHTML = '';

    for (let student of students) {
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        const nameTd = document.createElement('td');
        const ageTd = document.createElement('td');
        const departmentTd = document.createElement('td');
        const addressTd = document.createElement('td');
        const buttonTd = document.createElement('button');
        buttonTd.textContent = 'Delete';

        buttonTd.addEventListener('click', async () => {
            // DELETE API
            const results = await fetch(`/${student.id}`, {
                method: 'DELETE'
            });

            const { data, message } = await results.json();
            alert(message);
            generateTableUI(data);

        })
        idTd.textContent = student.id;
        nameTd.textContent = student.name;
        ageTd.textContent = student.age;
        departmentTd.textContent = student.department;
        addressTd.textContent = student.address;

        tr.append(idTd, nameTd, ageTd, departmentTd, addressTd, buttonTd);
        tBody.appendChild(tr);
    }
}

const createStudent = async (event) => {
    event.preventDefault();

    // Fetch all the data from the form
    const name = document.getElementById('studentName').value;
    const age = document.getElementById('studentAge').value;
    const department = document.getElementById('studentDepartment').value;
    const address = document.getElementById('studentAddress').value;

    const newStudent = {
        name,
        age,
        department,
        address
    }

    const JSONData = JSON.stringify(newStudent);

    console.log(JSONData);

    // Call post api
    const results = await fetch('/create', {
        method: 'POST',
        body: JSONData,
        headers: {
            "Content-Type": "application/json"
        }
    })

    const { data, message } = await results.json(); 

    generateTableUI(data);

    // call generateTableUI
}

fetchAllStudents();