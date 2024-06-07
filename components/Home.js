"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { ModeEdit, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const HomeComponent = () => {
    const [list, setList] = useState([]);
    const [focus, setFocus] = useState(false)
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
        setFocus(true)
        console.log(deleteItem, "item24");
        await axios.delete(`https://crud-backend-8owv.vercel.app/delete-list?id=${deleteItem?._id}`).then((res) => {
            console.log(res, "res26");
            setFocus(false)
            getData();
        }).catch((err) => {
            console.log(err);
        });
    };

    const formData = (type) => {
        console.log(type, "type38")
        if (type === "create") {
            router.push(`/${type}`);
        } else {
            router.push(`/edit-${type._id}`)
        }
    };

    return (
        <section>
            <h2 className="font-bold text-3xl text-center">Student List</h2>
            <div className="flex justify-end mr-6 my-6">
                <button onClick={() => formData("create")} className="text-base font-semibold px-[2em] py-[0.5em] border bg-[#3b3b39] text-[#F4CF00]   rounded-md  items-center mt-5 border-[#3b3b39] transition-all duration-300  shadow-lg hover:scale-110 hover:shadow-[#F4CF00]">Create</button>
            </div>
            <div className="table-container">
                <table className="w-full mx-auto">
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
                                <td><button onClick={() => formData(student)} className="focus:border-2 focus:rounded-md focus: border-blue-600"><ModeEdit className="text-blue-600" /></button></td>
                                <td><button onClick={() => deleteList(student)}
                                    className={`${focus ? "focus:border-2 focus:rounded-md focus:border-red-600" : "focus:border-none"}`}
                                ><Delete className="text-red-600" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default HomeComponent;
