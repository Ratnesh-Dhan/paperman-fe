'use client'
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import File from '../components/File';

const Upload = () => {
    const [existedFiles, setExistedFiles] = useState<string[]>([]);
    useEffect(() => {
        axios.get("http://localhost:8000/files")
            .then((response) => {
                setExistedFiles(response.data['files']);
            })
            .catch((error) => {
                console.error("Error in fetching files : ", error);
            })
    }, [])
    return (
        <div className='bg-slate-300 text-black font-bold h-full'>
            <div className='mx-30 bg-[#8CC7C4] p-5 flex justify-end'>
                <button className='p-3 bg-[#2C687B] rounded-md text-[#FFF6F6]'>Upload</button>
            </div>
            <div className='mx-30'>

            {existedFiles.map((file, idx) => (
                <File customkey={idx} fileName={file} />
            ))}
            </div>
        </div>
    )
}

export default Upload