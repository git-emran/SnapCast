import React from 'react'

const FileInput = ({id, label, accept, file, previewUrl, inputRef, onChange, onReset, type }: FileInputProps) => {
  return (
   <section>
    <label htmlFor={id}>{label}</label>
    <input type="text" id={id} accept={accept} ref={inputRef} hidden onChange={onChange} />
   </section>
  )
}

export default FileInput