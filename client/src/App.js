import { Route, Routes } from "react-router-dom";

import "./App.css";
import BottomNav from "./components/BottomNav.jsx";
import Events from "./components/Events.jsx";
import Main from "./components/Main.jsx";
import TopNav from "./components/TopNav.jsx";

function App() {
  return (
    <div className="App">
      <TopNav />
      <div className="middleContent">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/events" element={<Events />}></Route>
        </Routes>
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
