import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="max-w-screen min-h-screen overflow-x-hidden bg-gray-900 flex flex-col  font-inter scrollable pt-14 text-white">
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
