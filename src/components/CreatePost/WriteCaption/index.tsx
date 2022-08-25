import React from "react";
import "./style.scss";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/auth";
import { PostStatus } from "..";

interface WriteCaptionProps {
  imageURL: string,
  setPostStatus: React.Dispatch<React.SetStateAction<PostStatus>>,
}

const WriteCaption = (props: WriteCaptionProps) => {
  const { imageURL, setPostStatus } = props;

  const handleClickBack = () => {
    setPostStatus('none');
  }

  const handleClickShare = () => {
    console.log('share');
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
            <textarea placeholder="Write a caption..."></textarea>
          </form>
        </div>
      </div>
    </div>
  )
}

export default WriteCaption;