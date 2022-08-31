import { getAuth } from "firebase/auth";
import { collection, getFirestore, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./style.scss";

interface PostObject {
  imageUrl: string,
  caption: string,
  posterID: string,
  storageUri: string,
  comments: string[],
  likes: string[],
  timeStamp: Timestamp,
}

const ProfilePostGrid = () => {
  const [userPosts, setUserPosts] = useState<PostObject[]>([]);
  const [postsID, setPostsID] = useState<string[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true);

  const getPosts = () => {
    const postsRef = collection(getFirestore(), "posts");
    
    const postsQuery = query(postsRef, orderBy("timeStamp", "asc"));

    onSnapshot(postsQuery, (posts) => {
      const currentUserID = getAuth().currentUser?.uid;
      let newUserPostsArray: PostObject[] = [];
      let newPostsID: string[] = [];

      posts.docs.forEach(post => {
        if (post.data().posterID === currentUserID) {
          newUserPostsArray = [post.data() as PostObject, ...newUserPostsArray];
          newPostsID = [post.id, ...newPostsID];
        }
      })

      setUserPosts(newUserPostsArray);
      setPostsID(newPostsID);
      setLoadingPosts(false);
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  return(
    <>
      {loadingPosts?
        <div>Loading...</div>
        :
        userPosts.map((post, i) => {
          return <img className="posts-grid-image" key={postsID[i]} alt={`user post ${i}`} src={post.imageUrl}/>
        })
      }
    </>
  )
}

export default ProfilePostGrid;