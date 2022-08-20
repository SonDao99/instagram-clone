import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/auth";

const NavBar = () => {
  const dispatch = useAppDispatch();

  const handleClickSignOut = () => {
    dispatch(logout());
  }

  return(
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={() => handleClickSignOut()}>Sign out</button>
    </nav>
  )
}

export default NavBar;