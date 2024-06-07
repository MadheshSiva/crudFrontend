"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
const FormDataPage = () => {
  const pathName = usePathname()
  const Router = useRouter()
  const data = pathName.replace('/', "").split("-")
  const [load, setLoad] = useState(false)
  const [loadStop, setStop] = useState(false)
  const [listErr, setListErr] = useState({
    NameError: false,
    MarkErro: false,
    totalError: false
  })
  const [list, setList] = useState({
    studentName: "",
    mark: "",
    totalSubject: ""
  })

  useEffect(() => {
    list.studentName !== "" && setListErr((prev) => ({ ...prev, NameError: false }))
    list.mark !== "" && setListErr((prev) => ({ ...prev, MarkErro: false }))
    list.totalSubject !== "" && setListErr((prev) => ({ ...prev, totalError: false }))
  }, [list.studentName, list.mark, list.totalSubject])
  const submit = async (e) => {

    e.preventDefault();
    setStop(true)
    setLoad(true)
    if (list.studentName == "" || list.mark === "" || list.totalSubject === "") {
      list.studentName == "" && setListErr((prev) => ({ ...prev, NameError: true }))
      list.mark == "" && setListErr((prev) => ({ ...prev, MarkErro: true }))
      list.totalSubject == "" && setListErr((prev) => ({ ...prev, totalError: true }))
    } else {
      if (data[0] === "create") {
        console.log(list, "list28")
        await axios.post(`https://crud-backend-8owv.vercel.app/create-list`, list).then((res) => {

          Router.push("/")
          setLoad(false)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        await axios.put(`https://crud-backend-8owv.vercel.app/update-list?id=${data[1]}`, list).then((res) => {

          Router.push("/")
          setLoad(false)
        }).catch((err) => console.log(err))
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 3000)
  }, [loadStop, list, listErr])
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-center capitalize">{data[0]} Student List</h2>
      <form className="w-1/2 mx-auto">
        <div className="mt-5 w-3/5 mx-auto">
          <p aria-labelledby="id1" className="text-[#F4CF00] font-semibold text-lg">Student Name</p>
          <input type="text" id="id1" placeholder={`Enter your name`}
            className={`focus:outline-none  ${listErr.NameError ? "border border-red-400 rounded-lg" : "border-1 border-b border-[#7B786A]"} w-full h-10  mt-2`}

            onChange={(e) => setList((prev) => ({ ...prev, studentName: e.target.value }))}
          />
          {listErr.NameError && <p className="text-sm text-red-500">*Enter your name</p>}
        </div>
        <div className="my-5 w-3/5 mx-auto">
          <p aria-labelledby="id2" className="text-[#F4CF00] font-semibold text-lg">Mark</p>
          <input type="text" id="id2" placeholder="Enter your Mark" className={`focus:outline-none  ${listErr.MarkErro ? "border border-red-400 rounded-lg" : "border-1 border-b border-[#7B786A]"} w-full h-10  mt-2`}
            onChange={(e) => setList((prev) => ({ ...prev, mark: e.target.value }))}
          />
          {listErr.MarkErro && <p className="text-sm text-red-500">*Enter your Mark</p>}
        </div>
        <div className="w-3/5 mx-auto">
          <p aria-labelledby="id3" className="text-[#F4CF00] font-semibold text-lg">Total subject</p>
          <input type="text" id="id1" placeholder="Enter your Total subject"
            className={`focus:outline-none  ${listErr.totalError ? "border border-red-400 rounded-lg" : "border-1 border-b border-[#7B786A]"} w-full h-10  mt-2`}
            onChange={(e) => setList((prev) => ({ ...prev, totalSubject: e.target.value }))}
          />
          {listErr.totalError && <p className="text-sm text-red-500">*Enter your Total Subject</p>}
        </div>
        <div className="mx-auto flex justify-center">
          <button role="button" tabIndex={0} onClick={(e) => submit(e)}
            className="text-base font-semibold px-[2em] py-[0.5em] border bg-[#393937] text-[#F4CF00] rounded-md  items-center mt-5 border-[#393937] capitalize duration-300 shadow-lg hover:shadow-[#F4CF00]"
          >{load ? <img src={"/loading.gif"} alt="loading gif" className="w-16 h-9" /> : data[0]}</button>
        </div>

      </form>
    </div>
  );
};

export default FormDataPage;
