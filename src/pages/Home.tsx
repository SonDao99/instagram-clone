import { signInWithPopup } from "firebase/auth"
import NavBar from "../components/NavBar/NavBar"
import { auth, provider } from "../firebase-config"

const Home = ():JSX.Element => {

  return(
    <>
      <NavBar />
      <div>Home</div>
    </>
  )
}

export default Home;