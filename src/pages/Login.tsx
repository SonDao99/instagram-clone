import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { login } from "../features/auth/auth";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const Login = ():JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const response = await signInWithPopup(auth, provider);

    const usersQuery = await getDocs(collection(getFirestore(), 'users'));

    const userExists = usersQuery.docs.find((user) => {
      return user.id === response.user.uid;
    })

    if (userExists) {
      dispatch(login({isAuthenticated: true, userName: response.user.displayName || "User"}));
      navigate("/");  
    } else {
      const newUserRef = doc(db, 'users', response.user.uid);
      setDoc(newUserRef, 
        {
          userName: response.user.displayName,
          followers: [],
          following: [],
        }
      );
      dispatch(login({isAuthenticated: true, userName: response.user.displayName || "User"}));
      navigate("/");
    }
  }

  return(
    <>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </> 
  )
}

export default Login;