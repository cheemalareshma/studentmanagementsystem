import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios"
import '../App.css'

function dashboard() {
    const [students,setStudents]=useState([]);
    const [form,setForm]=useState({name:"",email:"",course:"",age:""});
    const [editid,seteditId]=useState(null);
    const getstudents=async()=>{
        try{
          const response= await axios.get("http://localhost:5000/api/students");
            setStudents(response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getstudents();
    },[]);
    const handleinput=(e)=>{
        setForm({...form,
            [e.target.name]:e.target.value
        })
    }
    const handlesubmit=async(e)=>{
       e.preventDefault();
       try{
       if(editid){
        await axios.put(`http://localhost:5000/api/students/${editid}`,form);
        alert("student updated");
        seteditId(null);
       }
       else {

                // ADD
                await axios.post(
                    "http://localhost:5000/api/students",
                    form
                );

                alert("Student added");

            }
          setForm({
                name: "",
                email: "",
                course: "",
                age: ""
            });
            getstudents();
        }
        catch(error){
            console.log(error);
        }

    }
    const deletestudent=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/students/${id}`);
            alert("student deleted");
            getstudents();
        }
        catch(error){
            console.log(error);
        }
    }
      const editstudent = (student) => {

        seteditId(student._id);

        setForm({
            name: student.name,
            email: student.email,
            course: student.course,
            age: student.age
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
  return (
    <div className="app">
        <header>
            <h2>🎓 Student Management System</h2>
            <div className="admin"> 👤 Admin</div>
        </header>
        <div className="layout">
            <aside>
                <h3>Menu</h3>
                <a href="#dashboard"> 🏠Dashboard</a>
                <a href="#students">👥View Students</a>
                <a href="#add">➕Add Student</a>
            </aside>
            <main>
                <section id="dashboard">
                    <h1>Dashboard</h1>
                    <div className='cards'>
                        <div className='card'>
                            <h2>{students.length}</h2>
                            <p>Total Students</p>
                        </div>
                        <div className='card'>
                            <h2>4</h2>
                            <p>Courses</p>
                        </div>
                        <div className='card'>
                            <h2>100%</h2>
                            <p>Records</p>
                        </div>
                    </div>
                </section>
                <section className='form-section' id="add">
                    <h2>{editid?"Edit student":"Add new student"}</h2>
                    <form onSubmit={handlesubmit}>
                        <input type="text" placeholder='enter name' value={form.name} name="name"
                        onChange={handleinput} required/>
                        <input type="email" name="email" placeholder='enter email' value={form.email}
                        onChange={handleinput} required/>
                        <input type="text" name="course" placeholder='enter course' value={form.course}
                        onChange={handleinput} required/>
                        <input type='number' value={form.age} placeholder='enter age' name="age" 
                        onChange={handleinput} required/>
                        <button type="submit">{editid?"update student":"add student"}</button>
                           {editid && (

                                <button
                                    type="button"
                                    className="cancel"
                                    onClick={() => {
                                        seteditId(null);
                                        setForm({
                                            name: "",
                                            email: "",
                                            course: "",
                                            age: ""
                                        });

                                    }}>
                                    Cancel
                                </button>
                           )}
                    </form>

                </section>
                <section className='student-section' id="students">
                    <h2>All Students</h2>
                    {students.length==0?(
                        <p>No Student Found</p>
                    ):(
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                            {students.map((student,index)=>(
                                <tr key={student._id}>
                                    <td>{index+1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.course}</td>
                                    <td>{student.age}</td>
                                    <td><button className='edit' onClick={()=>editstudent(student)}>Edit</button>
                                    <button className='delete' onClick={()=>deletestudent(student._id)}>Delete</button></td>
                                </tr>
                            ))}
                        </table>
                    )}
                </section>
            </main>
        </div>
     
    </div>
  )
}

export default dashboard
