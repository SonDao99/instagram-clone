import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";

interface PostObject {
  imageUrl: string,
  caption: string,
  posterID: string,
  storageUri: string,
  comments: string[],
  likes: string[],
}

const ProfilePostGrid = () => {
  const [userPosts, setUserPosts] = useState<PostObject[]>([]);
  const [postsID, setPostsID] = useState<string[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true);
  
  const getPosts = async () => {
    let newUserPostsArray: PostObject[] = [];
    let newPostsID: string[] = [];
    const postsQuery = await getDocs(collection(getFirestore(), 'posts'));

    const currentUserID = getAuth().currentUser?.uid;
    postsQuery.docs.forEach(post => {
      if (post.data().posterID === currentUserID) {
        newUserPostsArray = [post.data() as PostObject, ...newUserPostsArray];
        newPostsID = [post.id, ...newPostsID];
      }
    })

    setUserPosts(newUserPostsArray);
    setPostsID(newPostsID);
    setLoadingPosts(false);
  }
  
  useEffect(() => {
    getPosts();
  }, [])

  return(
    <>
      {loadingPosts?
        <div>Loading...</div>
        :
        userPosts.map((post, i) => {
          return <img key={postsID[i]} style={{width: "300px", height: "300px", objectFit: "cover"}} alt={`user post ${i}`} src={post.imageUrl}/>
        })
      }
    </>
  )
}

export default ProfilePostGrid;