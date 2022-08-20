import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { login } from "../features/auth/auth";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";


const Login = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((resp) => {
        dispatch(login({isAuthenticated: true, userName: resp.user.displayName || "User"}));
        navigate("/");
      })
  }

  return(
    <>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </> 
  )
}

export default Login;