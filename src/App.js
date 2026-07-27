import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
import EditProfile from "./pages/EditProfile";
import MyProfile from "./pages/MyProfile";
import InterestRequests from "./pages/InterestRequests";
function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;

}
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={ <ProtectedRoute> <Profiles /> </ProtectedRoute> } />
        <Route path="/my-profile"element={ <ProtectedRoute> <AddProfile /> </ProtectedRoute> } />
        <Route path="/profile/:id" element={ <ProtectedRoute> <ProfileDetails /> </ProtectedRoute> } />
        <Route path="/interested" element={ <ProtectedRoute> <InterestedProfiles /> </ProtectedRoute> } />
        <Route path="/saved" element={ <ProtectedRoute> <SavedProfiles /> </ProtectedRoute> } />
        <Route path="/chat/:id" element={ <ProtectedRoute> <Chat /> </ProtectedRoute> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={ <ProtectedRoute> <EditProfile /> </ProtectedRoute> }/> 
        <Route path="/my-dashboard" element={ <ProtectedRoute> <MyProfile /> </ProtectedRoute> } />   
        <Route path="/interest-requests" element={<InterestRequests />} />
        </Routes>
    </Router>
  );
}

export default App;
