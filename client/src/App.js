import { Route, Routes } from "react-router-dom";
import "./App.css";
import BottomNav from "./components/bottomNav/BottomNav.jsx";
import Events from "./components/events/Events.jsx";
import Cars from "./components/cars/Cars.jsx";
import Main from "./components/main/Main.jsx";
import TopNav from "./components/topNav/TopNav.jsx";
import Voting from "./components/wallet/voting/Voting";
import Wallet from "./components/wallet/Wallet";
import WalletVouchers from "./components/wallet/voucher";
import WalletMarketplace from "./components/wallet/marketplace/";
import Vendors from "./components/vendors/Vendors";
import Sponsors from "./components/sponsors/index";
import Maps from "./components/maps/Maps";
import WalletVoting from "./components/wallet/voting/WalletVoting";
import WalletPinsRallies from "./components/wallet/pinsRallies/WalletPinsRallies";
import WalletNFTGarage from "./components/wallet/nftGarage/index";
import WalletStatistics from "./components/wallet/statistics/WalletStatistics";
import NFTCarDetail from "./components/wallet/marketplace/NFTCarDetail";
import NftCarDetail from "./components/wallet/nftGarage/NftCarDetail";
import WalletVotingCategory from "./components/wallet/voting/WalletVotingCategory";
import CarDetails from "./components/cars/CarDetails";
import User from "./components/profile/User";
import NftVoucherDetail from "./components/wallet/marketplace/NftVoucherDetail";
import VendorRedeemVoucher from "./components/wallet/voucher/VendorRedeemVoucher";
import NftGarageVoucherDetail from "./components/wallet/nftGarage/NftGarageVoucherDetail";
import RedeemVoucherDetail from "./components/wallet/voucher/RedeemVoucherDetail";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <div className="wrapper">
      <TopNav />
      <main>
        {/* <TestComponent /> */}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car/:carId" element={<CarDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:vendorId" element={<Vendors />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/vouchers" element={<WalletVouchers />} />
          <Route
            path="/wallet/voucherRedeem/:voucherId"
            element={<RedeemVoucherDetail />}
          />
          {/* <Route path="/wallet/voting" element={<WalletVoting />} /> */}
          <Route path="/wallet/voting" element={<Voting />} />
          <Route
            path="/wallet/voting/category/:voteCategory"
            element={<WalletVotingCategory />}
          />
          <Route path="/wallet/quests" element={<WalletPinsRallies />} />
          <Route path="/wallet/marketplace" element={<WalletMarketplace />} />
          <Route
            path="/wallet/marketplace/nftCarCard/:assetId"
            element={<NFTCarDetail />}
          />
          <Route
            path="/wallet/nftGarage/nftCarCard/:assetId"
            element={<NftCarDetail />}
          />
          <Route
            path="/wallet/marketplace/voucher/:voucherId"
            element={<NftVoucherDetail />}
          />
          <Route
            path="/wallet/nftGarage/voucher/:voucherId"
            element={<NftGarageVoucherDetail />}
          />
          <Route path="/wallet/NFTGarage" element={<WalletNFTGarage />} />
          <Route path="/wallet/stats" element={<WalletStatistics />} />
          <Route path="/voting/:carId" element={<Voting />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/voucher/vendorRedeem/:voucherId"
            element={<VendorRedeemVoucher />}
          />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App;
