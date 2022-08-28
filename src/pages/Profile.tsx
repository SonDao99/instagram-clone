import { selectAuth } from "../features/auth/auth";
import { useAppSelector } from "../app/hooks";
import NavBar from "../components/NavBar";
import ProfilePostGrid from "../components/ProfilePostsGrid";

const Profile = (): JSX.Element => {
  return(
    <div>
      <NavBar />
      <div>{useAppSelector(selectAuth).userName}</div>
      <div>
        <button>Followers</button>
        <button>Following</button>
      </div>
      <div className="posts">
        <ProfilePostGrid />
      </div>
    </div>
  )
}

export default Profile;