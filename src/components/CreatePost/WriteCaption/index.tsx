import React, { useId, useState } from "react";
import "./style.scss";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/auth";
import { PostStatus } from "..";
import { db } from "../../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


interface WriteCaptionProps {
  imageURL: string,
  imageBlob: Blob,
  setPostStatus: React.Dispatch<React.SetStateAction<PostStatus>>,
}

const WriteCaption = (props: WriteCaptionProps) => {
  const { imageURL, imageBlob, setPostStatus } = props;
  const id = useId();
  const[caption, setCaption] = useState('');

  const handleClickBack = () => {
    setPostStatus('none');
  }

  const handleChangeCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  }

  const handleClickShare = async () => {
    const filePath = `${getAuth().currentUser?.uid}/${id}`;
    const newImageRef = ref(getStorage(), filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, imageBlob)

    const publicImageUrl = await getDownloadURL(newImageRef);

    const newPostRef = doc(db, 'posts', id);
    setDoc(newPostRef, 
      {
        imageUrl: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
        caption: caption,
        likes: [],
        comments: [],
      }
    )
  }

  return(
    <div className="write-caption flex-column-center-center">
      <div className="write-caption-header flex-space-between">
        <button onClick={() => handleClickBack()}>&lt;--</button>
        <p>Create new post</p>
        <button onClick={() => handleClickShare()}>share</button>
      </div>
      <div className="write-caption-content flex">
        <div className="write-caption-content-image">
          <img src={imageURL} alt="uploadedImage" />
        </div>
        <div className="write-caption-content-text">
          <div className="user-info flex-start-center padding-10 gap-10">
            <img className="profile-pic" alt="DP" />
            <p>{useAppSelector(selectAuth).userName}</p>
          </div>
          <form>
            <textarea onChange={(e) => handleChangeCaption(e)} placeholder="Write a caption..."></textarea>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WriteCaption;