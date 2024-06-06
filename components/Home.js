"use client";  // This tells Next.js to treat this component as a Client Component

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { ModeEdit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";  // Importing from next/navigation

const HomeComponent = () => {
    const [list, setList] = useState([]);
    const router = useRouter();

    const getData = async () => {
        try {
            const studentList = await axios.get("https://crud-backend-8owv.vercel.app/get-lists").then((res) => res.data).catch((err) => err);
            console.log(studentList, "student12");
            setList(studentList);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const deleteList = async (deleteItem) => {
        console.log(deleteItem, "item24");
        await axios.delete(`https://crud-backend-8owv.vercel.app/delete-list?id=${deleteItem?._id}`).then((res) => {
            console.log(res, "res26");
            getData();
        }).catch((err) => {
            console.log(err);
        });
    };

    const formData = (type) => {
        console.log(type,"type38")
        if (type === "create") {
            router.push(`/${type}`);
        } else {
            router.push(`/edit-${type._id}`)
        }
    };

    return (
        <section>
            <h2 className="font-bold text-xl text-center">Student List</h2>
            <div className="flex justify-end mr-6">
                <button onClick={() => formData("create")} className="text-base font-semibold px-[2em] py-[0.5em] border bg-[#6fa728] text-white rounded-md  items-center mt-5 border-[#6fa728] hover:bg-opacity-50">Create</button>
            </div>
            <table className="w-1/2 mx-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mark</th>
                        <th>Total Subject</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((student, index) => (
                        <tr key={index}>
                            <td>{student.studentName}</td>
                            <td>{student.mark}</td>
                            <td>{student.totalSubject}</td>
                            <td><button onClick={() => formData(student)}><ModeEdit className="text-blue-400" /></button></td>
                            <td><button onClick={() => deleteList(student)}><Delete className="text-red-400" /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default HomeComponent;
