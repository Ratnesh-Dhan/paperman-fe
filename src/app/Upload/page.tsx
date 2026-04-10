'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import File from '../components/File';
import ConfirmModal from '../components/ConfirmModal';
import toast from 'react-hot-toast';

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
                toast.error("Error in fetching files")
            })
    }, []);
    const handleDelete = async() => {
        axios.post("http://localhost:8000/delete", 
            {files: selectedFiles}
        ).then((response)=> {
            if(response.data['success']){
                toast.success("Files deleted successfully")
            }
            else{
                toast.error("Unable to delete files")
            }
        }).catch((error)=> {console.log(error)
            toast.error("Unable to connect to server")
        })
        setConfirmDelte(false);

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