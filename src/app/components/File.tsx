import React from 'react'

const File = ({customkey, fileName}: {customkey: number, fileName: string}) => {
  return (
    <div 
        className='border p-3 mb-1'
        key={customkey}>{fileName}</div>
  )
}

export default File