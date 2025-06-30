import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from './pages/Login'
import Signup from "./pages/signup";
import VerifyEmail from "./pages/VerifyEmail";
import Error from "./pages/Error";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/dashboard/MyProfile";
import MyProjects from "./components/dashboard/MyProjects";
import ProjectCollab from "./components/dashboard/ProjectCollab";

function App() {
  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden bg-gray-900 flex flex-col  font-inter scrollable pt-14 text-white">
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />

        <Route path="/reset-password" element={<OpenRoute><ResetPassword/></OpenRoute>} />
        <Route path="/update-password/:token" element={<OpenRoute><UpdatePassword/></OpenRoute>} />

        <Route path="" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="/dashboard/my-projects" element={<MyProjects/>}/>
          <Route path="/dashboard/projects-collab" element={<ProjectCollab/>}/>
        </Route>


        <Route path="*"  element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
