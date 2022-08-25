import React, { useRef, useState } from "react";
import "./style.scss";
import UploadFile from "./UploadFile";
import WriteCaption from "./WriteCaption";

export type PostStatus = "none"| "uploaded" | "cropped"  | "edited";

export interface File {
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

  let PostComponent: JSX.Element | null;
  switch(postStatus) {
    case "none":
      PostComponent = <UploadFile inputRef={inputRef} setFile={setFile} setPostStatus={setPostStatus} />
      break;
    case "uploaded":
      const imageBlob = new Blob([file as unknown as BlobPart], {type: file.type})
      const imageURL = URL.createObjectURL(imageBlob); 
      PostComponent = <WriteCaption imageURL={imageURL} setPostStatus={setPostStatus}/>
      break;
    default:
      PostComponent = null;
  }

  return(
    <div className="create-post">
      
      <div className="create-post-background">
        <button onClick={() => handleClickClose()}>X</button>
      </div>
      
      {PostComponent}

    </div>
  )
}

export default CreatePost;