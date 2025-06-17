"use client";

import FileInput from "@/components/FileInput";
import FormField from "@/components/FormField";
import { useState, ChangeEvent } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });
  const video = {};
  const thumbnail = {};
  const [error, setError] = useState(null);
  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}

      <form
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5"
        action=""
      ></form>
      <FormField
        id="title"
        label="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Enter a clear video title."
      />
      <FormField
        id="description"
        label="Description"
        onChange={handleInputChange}
        placeholder="Describe what this video is about."
        value={formData.description}
        as="textarea"
      />
      <FileInput
        id="video"
        label="Video"
        accept="video/*"
        file={video.file}
        previewUrl={video.inputRef}
        onChange={video.handleFileChange}
        onReset={video.resetFile}
        type="video"
      />
      <FileInput
        id="thumbnail"
        label="Thumbnail"
        accept="image/*"
        file={thumbnail.file}
        previewUrl={thumbnail.inputRef}
        onChange={thumbnail.handleFileChange}
        onReset={thumbnail.resetFile}
        type="image"
      />
      <FormField
        id="visibility"
        label="Visibility"
        onChange={handleInputChange}
        value={formData.visibility}
        as="select"
        options={[
          { value: "public", label: "Public" },
          { value: "private", label: "Private" },
        ]}
      />
    </div>
  );
};

export default Page;
