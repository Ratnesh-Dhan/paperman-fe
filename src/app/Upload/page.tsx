'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import File from '../components/File';
import ConfirmModal from '../components/ConfirmModal';

const Upload = () => {
    const [existedFiles, setExistedFiles] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [confirmDelte, setConfirmDelte] = useState<boolean>(false);
    useEffect(() => {
        axios.get("http://localhost:8000/files")
            .then((response) => {
                setExistedFiles(response.data['files']);
            })
            .catch((error) => {
                console.error("Error in fetching files : ", error);
            })
    }, []);
    const handleDelete = async() => {
        console.log(selectedFiles)
    }
    return (
        <div className='bg-slate-300 text-black font-bold h-full'>
            <div className='mx-30 bg-[#8CC7C4] p-5 flex justify-end gap-5'>
                <button className='p-3 bg-[#DB1A1A] rounded-md text-[#FFF6F6]'onClick={()=> setConfirmDelte(true)}>Delete</button>
                <ConfirmModal title={"Confirm Delete"} open={confirmDelte} message="Are you sure you want to delete selected files?" onConfirm={handleDelete} onCancel={()=> setConfirmDelte(false)}/>
                <button className='p-3 bg-[#2C687B] rounded-md text-[#FFF6F6]'>Upload</button>
            </div>
            <div className='mx-30'>

            {existedFiles.map((file, idx) => (
                <File key={idx} fileName={file} setSelected={setSelectedFiles}/>
            ))}
            </div>
        </div>
    )
}

export default Upload