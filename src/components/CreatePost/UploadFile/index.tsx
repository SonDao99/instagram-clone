import React from "react";
import { File, PostStatus } from "../index";
import "./style.scss";

interface UploadFileProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>,
  setFile: React.Dispatch<React.SetStateAction<File>>,
  setPostStatus: React.Dispatch<React.SetStateAction<PostStatus>>,
}

const UploadFile = (props: UploadFileProps) => {
  const { inputRef, setFile, setPostStatus } = props;

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setPostStatus("uploaded");
    }
  }

  const handleClickUpload = () => {
    inputRef.current?.click();
  }

  const handleClickLabel = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPostStatus("uploaded");
    }
  }

  return(
    <div className="upload-file">
      <div className="upload-file-header">Create new post</div>
      <div className="upload-file-content flex-column-center-center">
        <form className="flex-column-center-center" onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleDragOver(e)}>
          <label 
            className="flex-column-center-center"
            htmlFor="uploadFile"
            onClick={(e) => handleClickLabel(e)}
          > 
            <div>Drag photos and videos here</div>
            <button  type="button" onClick={() => handleClickUpload()} className="btn-upload-file">
              Select from computer
            </button>
          </label>
          <input ref={inputRef} onChange={(e) => handleUpload(e)} type="file" id="uploadFile" name="uploadFile"/>
        </form>
      </div>
    </div>
  )
}

export default UploadFile;