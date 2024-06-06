"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
const FormDataPage = () => {
     const pathName = usePathname()
     const Router = useRouter()
     const data = pathName.replace('/',"").split("-")
   const [listErr, setListErr] = useState({
    NameError : false,
    MarkErro : false,
    totalError : false 
   })
   const [list, setList] = useState({
    studentName : "",
    mark : "",
    totalSubject : ""
   })

   useEffect(() => {
     list.studentName !== "" && setListErr((prev) => ({...prev,NameError : false}))
     list.mark !== "" && setListErr((prev) => ({...prev, MarkErro : false}))
     list.totalSubject !== "" && setListErr((prev) => ({...prev,totalError : false}))
   },[list.studentName,list.mark,list.totalSubject])
   const submit = async(e) => {

     e.preventDefault();
    console.log(list,"list23")
     if(list.studentName =="" || list.mark === "" || list.totalSubject === "") {
        list.studentName == "" && setListErr((prev) => ({...prev,NameError : true}) )
        list.mark == "" && setListErr((prev) => ({...prev,MarkErro : true}) )
        list.totalSubject == "" && setListErr((prev) => ({...prev,totalError : true}) )
     } else {
        if(data[0] === "create") {
            console.log(list,"list28")
               await axios.post(`https://crud-backend-8owv.vercel.app/create-list`,list).then((res) =>{
                Router.push("/")
               } ).catch((err) => {
                console.log(err)
               })
        } else {
            await axios.put(`https://crud-backend-8owv.vercel.app/update-list?id=${data[1]}`,list).then((res) => {
              Router.push("/")
            }).catch((err) =>  console.log(err) )
        }
     }
   }
     return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold text-center">{data[0]} Student List</h2>
           <form className="w-1/2 mx-auto">
                <div className="mt-5  ">
                    <p aria-labelledby="id1">Student Name</p>
                    <input type="text" id="id1" placeholder={`Enter your name`} 
                     className={`focus:outline-none  ${listErr.NameError ? "border border-red-400 rounded-lg" : "border-1 border-b border-blue-400"} w-1/2 h-10 pl-2 mt-2`}
                    
                    onChange={(e) => setList((prev) => ({...prev,studentName : e.target.value}))}
                    />
                    {listErr.NameError && <p className="text-sm text-red-500">*Enter your name</p>}
                </div>
                <div className="my-5">
                    <p aria-labelledby="id2">Mark</p>
                    <input type="text" id="id2" placeholder="Enter your Mark"  className={`focus:outline-none  ${listErr.MarkErro ? "border border-red-400 rounded-lg" : "border-1 border-b border-blue-400"} w-1/2 h-10 pl-2 mt-2`}
                    onChange={(e) => setList((prev) => ({...prev,mark: e.target.value}))}
                    />
                    {listErr.MarkErro && <p className="text-sm text-red-500">*Enter your Mark</p>}
                </div>
                <div>
                    <p aria-labelledby="id3">Total subject</p>
                    <input type="text" id="id1" placeholder="Enter your Total subject" 
                     className={`focus:outline-none  ${listErr.totalError ? "border border-red-400 rounded-lg" : "border-1 border-b border-blue-400"} w-1/2 h-10 pl-2 mt-2`}
                    onChange={(e) => setList((prev) => ({...prev,totalSubject:e.target.value}))}
                    />
                    {listErr.totalError && <p className="text-sm text-red-500">*Enter your Total Subject</p>}
                </div>
                <div className="ml-20">
                <button role="button" tabIndex={0} onClick={(e)=> submit(e)}
                className="text-base font-semibold px-[2em] py-[0.5em] border bg-[#6fa728] text-white rounded-md  items-center mt-5 border-[#6fa728] hover:bg-opacity-50"
                >{data[0]}</button>
                </div>
                
           </form>
        </div>
    );
};

export default FormDataPage;
