import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from './pages/Login'

function App() {
  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden bg-gray-900 flex flex-col  font-inter scrollable pt-14 text-white">
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
