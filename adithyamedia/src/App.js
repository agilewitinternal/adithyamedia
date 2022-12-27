import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Sidebar from "./components/SideBar/Sidebar";

const App = () => {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };
  return (
    <>{console.log(process.env.REACT_APP_USER_ID)}
    <Navbar toggle={toggle} />
    <Sidebar isopen={isopen} toggle={toggle} />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      </Routes>
      </>
  );
}

export default App;