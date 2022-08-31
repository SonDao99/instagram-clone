import React, { useState } from "react";
import "./style.scss";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/auth";
import { PostStatus } from "..";
import { db } from "../../../firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface WriteCaptionProps {
  imageURL: string,
  imageBlob: Blob,
  setPostStatus: React.Dispatch<React.SetStateAction<PostStatus>>,
  setCreatingPost: React.Dispatch<React.SetStateAction<boolean>>,
}

const WriteCaption = (props: WriteCaptionProps) => {
  const { imageURL, imageBlob, setPostStatus, setCreatingPost } = props;
  const[caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector(selectAuth).userName;

  const handleClickBack = () => {
    setPostStatus('none');
  }

  const handleChangeCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  }

  const handleClickShare = async () => {
    setLoading(true);
    
    const postID = uuidv4();
    const filePath = `${getAuth().currentUser?.uid}/${postID}`;
    const newImageRef = ref(getStorage(), filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, imageBlob)

    const publicImageUrl = await getDownloadURL(newImageRef);

    const newPostRef = doc(db, 'posts', postID);
    setDoc(newPostRef, 
      {
        posterID: getAuth().currentUser?.uid,
        imageUrl: publicImageUrl,
        storageUri: fileSnapshot.metadata.fullPath,
        caption: caption,
        likes: [],
        comments: [],
        timeStamp: serverTimestamp(),
      }
    )

    setCreatingPost(false);
  }

  let ImageOrLoading;
  switch (loading) {
    case true:
      ImageOrLoading = <div className="write-caption-content flex">Loading...</div>
      break;
    default:
      ImageOrLoading =
        <div className="write-caption-content flex">
          <div className="write-caption-content-image">
            <img src={imageURL} alt="uploadedImage" />
          </div>
          <div className="write-caption-content-text">
            <div className="user-info flex-start-center padding-10 gap-10">
              <img className="profile-pic" alt="DP" />
              <p>{currentUser}</p>
            </div>
            <form>
              <textarea onChange={(e) => handleChangeCaption(e)} placeholder="Write a caption..."></textarea>
            </form>
          </div>
        </div>
  }

  return(
    <div className="write-caption flex-column-center-center">
      <div className="write-caption-header flex-space-between">
        <button onClick={() => handleClickBack()}>&lt;--</button>
        <p>Create new post</p>
        { loading ? <div></div> : <button onClick={() => handleClickShare()}>share</button> }
      </div>

      {ImageOrLoading}
    
    </div>
  )
}

export default WriteCaption;