import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import AddProfile from "./pages/AddProfile";
import ProfileDetails from "./pages/ProfileDetails";
import InterestedProfiles from "./pages/InterestedProfiles";
import SavedProfiles from "./pages/SavedProfiles";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/add-profile" element={<AddProfile />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/interested" element={<InterestedProfiles />} />
        <Route path="/saved" element={<SavedProfiles />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
