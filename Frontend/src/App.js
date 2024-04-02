import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from './components/Profile';
import Questions from './components/Questions';
import Home from './components/Home';
import ProfileRecords from './components/ProfileRecords';
import ProfileDetails from "./components/ProfileDetails";
import Help from "./components/Help";
import { useState } from "react";

function App() {
  const [profile, setProfile] = useState({})

  return (
    <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/profile" element={<Profile profile={profile}/>} />
            <Route path="/questions" element={<Questions setProfile={setProfile}/>} />
            <Route path="/records" element={<ProfileRecords/>}/>
            <Route path="/profile/:id" element={<ProfileDetails/>}/>
            <Route path="/help" element={<Help />}/>
          </Routes>
        </main>
  </Router>
  );
}

export default App;
