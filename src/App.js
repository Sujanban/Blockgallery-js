import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import ReactDOM from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" exact element={<Marketplace />}/>
          <Route path="/nftPage" exact element={<NFTPage />}/>        
          <Route path="/profile" exact element={<Profile />}/>
          <Route path="/sellNFT" exact element={<SellNFT />}/>
          <Route element={<Marketplace />} />          
        </Routes>
    </div>
  );
}

export default App;
