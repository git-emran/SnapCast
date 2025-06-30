import Image from "next/image";
import React from "react";

interface FileInputProps {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  previewUrl: string | null;
  inputRef: React.RefObject<HTMLInputElement | null> | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  type?: "video" | "image";
}

const FileInput = ({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef,
  onChange,
  onReset,
  type,
}: FileInputProps) => {
  return (
    <section className="file-input cursor-pointer">
      <label htmlFor={id}>{label}</label>
      <input type="file" id={id} accept={accept} ref={inputRef} hidden />
      {!previewUrl ? (
        <figure onChange={onChange}>
          <Image
            src="/assets/icons/upload.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <p>Click to upload your {id}</p>
        </figure>
      ) : (
        <div>
          <button type="button" onClick={onReset}>
            {type === "video" ? (
              <video src={previewUrl} controls />
            ) : (
              previewUrl && <Image src={previewUrl} alt="image" fill />
            )}
            <Image
              src="assets/icons/close.svg"
              alt="close"
              width={16}
              height={16}
            />
          </button>
          {file && <p>{file.name}</p>}
        </div>
      )}
    </section>
  );
};

export default FileInput;
