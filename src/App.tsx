import './App.scss';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from './pages/Home';
import Profile from "./pages/Profile";
import { useState } from 'react';

function App():JSX.Element {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        
        {loggedIn?
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
          </nav>
          :
          <></>
        }

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
