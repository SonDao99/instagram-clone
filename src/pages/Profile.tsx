import NavBar from "../components/NavBar";
import { selectAuth } from "../features/auth/auth";
import { useAppSelector } from "../app/hooks";

const Profile = ():JSX.Element => {
  return(
    <div>
      <NavBar />
      <div>Profile</div>
      <div>
        <button>Followers</button>
        <button>Following</button>
      </div>
      <div className="posts">
      </div>
    </div>
  )
}

export default Profile;