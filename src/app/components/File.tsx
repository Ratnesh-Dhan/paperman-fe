'use client'
import React, { useState } from 'react'

const File = ({fileName, setSelected}: {fileName: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked){
        setSelected((prev) => [...prev, fileName]);
    }else{
        setSelected((prev) => prev.filter((file) => file !== fileName));
    }
  }
  return (
    <div 
        className='border p-3 mb-1'
        >
        <input type='checkbox' className='mr-4' onChange={handleChange} />
          {fileName}</div>
  )
}

export default File
//  // this is to find out if the checkbox is checked in vanilla js by id
// const isChecked = document.getElementById("myCheckbox").checked;
