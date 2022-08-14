import { Route, Routes } from "react-router-dom";

import "./App.css";
import BottomNav from "./components/BottomNav.jsx";
import Events from "./components/Events.jsx";
import Cars from "./components/Cars.jsx";
import Main from "./components/Main.jsx";
import TopNav from "./components/TopNav.jsx";
import Voting from "./components/Voting";
import Wallet from "./components/Wallet";

function App() {
  return (
    <div className="App">
      <TopNav />
      <div className="middleContent">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/voting/:carId" element={<Voting />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
