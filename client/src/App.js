import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/BottomNav.jsx";
import Events from "./components/Events.jsx";
import Cars from "./components/Cars.jsx";
import Main from "./components/Main.jsx";
import TopNav from "./components/TopNav.jsx";
import Voting from "./components/Voting";
import Wallet from "./components/Wallet";
import WalletVouchers from "./components/WalletVouchers";
import WalletMarketplace from "./components/WalletMarketplace";
import Vendors from "./components/Vendors";
import Sponsors from "./components/Sponsors";
import Maps from "./components/Maps";
import WalletVoting from "./components/WalletVoting";
import WalletQuests from "./components/WalletQuests";
import WalletNFTGarage from "./components/WalletNFTGarage";
import WalletStats from "./components/WalletStats";
import NFTCar from "./components/NFTCar";
import WalletVotingCategory from "./components/WalletVotingCategory";
import CarDetails from "./components/CarDetails";
import User from "./components/User";
import { screenSize } from "./common/screenSize";

function App() {
  return (
    <div className="wrapper">
      <TopNav />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:carId" element={<CarDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/vouchers" element={<WalletVouchers />} />
          <Route path="/wallet/voting" element={<WalletVoting />} />
          <Route
            path="/wallet/voting/category/:voteCategory"
            element={<WalletVotingCategory />}
          />
          <Route path="/wallet/quests" element={<WalletQuests />} />
          <Route path="/wallet/marketplace" element={<WalletMarketplace />} />
          <Route path="/wallet/marketplace/:assetId" element={<NFTCar />} />
          <Route path="/wallet/NFTGarage" element={<WalletNFTGarage />} />
          <Route path="/wallet/stats" element={<WalletStats />} />
          <Route path="/voting/:carId" element={<Voting />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </main>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
