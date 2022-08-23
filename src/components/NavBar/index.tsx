import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { logout } from "../../features/auth/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

import CreatePost from "../CreatePost";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const [creatingPost, setCreatingPost] = useState(true);

  const handleClickSignOut = () => {
    dispatch(logout());
    signOut(auth);
  }

  const handleClickCreatePost = () => {
    setCreatingPost(true);
  }

  return(
    <>
      <nav>
        <Link to="/">Home</Link>
        <button onClick={() => handleClickCreatePost()}>Create Post</button>
        <Link to="/profile">Profile</Link>
        <button onClick={() => handleClickSignOut()}>Sign out</button>
      </nav>

      {creatingPost ? <CreatePost setCreatingPost={setCreatingPost} /> : null}
    </>
  )
}

export default NavBar;