import React, { useRef, useState } from "react";
import "./style.scss";

type PostStatus = "none"| "uploaded" | "cropped"  | "edited";

interface File {
  lastModified: number,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string,
}

const CreatePost = ({ setCreatingPost }:{ setCreatingPost: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>({lastModified: 0, name: '', size: 0, type: '', webkitRelativePath: '',});
  const [postStatus, setPostStatus] = useState<PostStatus>("none");

  const handleClickClose = () => {
    setCreatingPost(false);
  }

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

  const PostComponent = () => {
    switch(postStatus) {
      case "none":
        return(
          <div className="create-post-box-content flex-column-center-center">
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
        );

      case "uploaded":
        const imageBlob = new Blob([file as unknown as BlobPart], {type: file.type})
        const imageURL = URL.createObjectURL(imageBlob); 
        return(
          <div className="create-post-box-content flex-column-center-center">
            <img src={imageURL} alt="uploadedImage" />
          </div>
        )
      default:
        return null;
    }
  }

  return(
    <div className="create-post">
      <div className="create-post-background">
        <button onClick={() => handleClickClose()}>X</button>
      </div>
      <div className="create-post-box">
        <div className="create-post-box-header">Create new post</div>
        <PostComponent />
      </div>
    </div>
  )
}

export default CreatePost;