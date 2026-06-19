const API_URL =
"http://localhost:3000/students";

async function loadStudents(){

    const response =
    await fetch(API_URL);

    const students =
    await response.json();

    displayStudents(students);

}

function displayStudents(students){

    const container =
    document.getElementById("students");

    container.innerHTML = "";

    students.forEach(student=>{

        const div =
        document.createElement("div");

        div.className="card";

        div.innerHTML=`

            <h3>${student.name}</h3>

            <p>${student.email}</p>

            <p>${student.course}</p>

            <button
            onclick="deleteStudent(${student.id})">

            Delete

            </button>

        `;

        container.appendChild(div);

    });

}

document
.getElementById("studentForm")
.addEventListener("submit",

async function(e){

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const course =
    document.getElementById("course").value;

    await fetch(API_URL,{

        method:"POST",

        headers:{

            "Content-Type":
            "application/json"

        },

        body:JSON.stringify({

            name,
            email,
            course

        })

    });

    loadStudents();

    this.reset();

});

async function deleteStudent(id){

    await fetch(

        `${API_URL}/${id}`,

        {

            method:"DELETE"

        }

    );

    loadStudents();

}

loadStudents();