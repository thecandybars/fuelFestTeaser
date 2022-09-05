import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWallet, manageTokens } from "../services/wallet";
import style from "./css/Wallet.module.css";
import driftCoin from "../img/driftCoin.png";
import historyIcon from "../icons/history.svg";
import { walletId } from "../common/getLoginData";
import spendIcon from "../icons/north_FILL0_wght400_GRAD0_opsz48.svg";
import redeemIcon from "../icons/star_FILL0_wght400_GRAD0_opsz48.svg";
import manageIcon from "../icons/settings_FILL0_wght400_GRAD0_opsz48.svg";
import voucherIcon from "../icons/sell_FILL1_wght400_GRAD0_opsz48.svg";
import votingIcon from "../icons/military_tech_FILL1_wght400_GRAD0_opsz48.svg";
import questIcon from "../icons/stars_FILL0_wght400_GRAD0_opsz48.svg";
import marketplaceIcon from "../icons/storefront_FILL1_wght400_GRAD0_opsz48.svg";
import inventoryIcon from "../icons/inventory_2_FILL1_wght400_GRAD0_opsz48.svg";
import statisticsIcon from "../icons/auto_graph_FILL1_wght400_GRAD0_opsz48.svg";
import walletVouchers from "../img/walletVouchers.png";
import walletVoting from "../img/walletVoting.png";
import walletPinQuest from "../img/walletPinQuest.png";
import walletNFTMarketplace from "../img/walletNFTMarketplace.png";
import walletNFTInventory from "../img/walletNFTInventory.png";
import walletStatistics from "../img/walletStatistics.png";
import Title from "../assets/Title.jsx";
import MainContainer from "../assets/MainContainer";

export default function Wallet() {
  const [wallet, setWallet] = useState({});
  const [manage, setManage] = useState(false);
  const [displayDrift, setDisplayDrift] = useState({ liquid: 0, frozen: 0 });
  useEffect(() => {
    fetchWallet();
  }, []);
  useEffect(() => {
    resetDisplayDrift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);
  const fetchWallet = async () => {
    const wallet = await getWallet(walletId);
    setWallet(wallet);
  };
  const resetDisplayDrift = () => {
    setDisplayDrift({ liquid: wallet.liquid, frozen: wallet.frozen });
  };
  const handleManageButton = () => {
    setManage((prev) => {
      fetchWallet();
      return !prev;
    });
  };
  const handleManageRange = (e) => {
    setDisplayDrift({
      liquid: e.target.value,
      frozen: wallet.liquid + wallet.frozen - e.target.value,
    });
  };
  const handleManageConfirm = () => {
    manageTokens({
      walletId: wallet.id,
      liquid: displayDrift.liquid,
      frozen: displayDrift.frozen,
    });
    setManage(false);
  };
  return (
    <MainContainer>
      <div className={style.titleBaar}>
        <Title title="YOUR WALLET" backButton="true"></Title>
        {/* <img alt="drift coin" src={driftCoin} /> */}
      </div>
      <div className={style.walletData}>
        <div className={style.row1}>
          <div className={style.walletData_balance}>
            <p className={style.walletData_title}>BALANCE</p>
            <p className={style.walletData_total}>
              {parseInt(displayDrift.liquid) + parseInt(displayDrift.frozen)}
            </p>
            <p className={style.walletData_units}>DRIFT</p>
          </div>
          <div className={style.walletData_detail}>
            <p>
              Liquid{" "}
              <span style={{ marginRight: "25px" }}>{displayDrift.liquid}</span>
            </p>
            <p>
              Frozen{" "}
              <span style={{ marginRight: "25px" }}>{displayDrift.frozen}</span>
            </p>
            <p>
              Drift drip
              <span>
                120<small>/DAY</small>
              </span>
            </p>
          </div>
        </div>
        <div className={style.walletData_history}>
          <img alt="history" src={historyIcon} />
          <p>Token history</p>
        </div>
        <div className={style.wallet_buttons}>
          <div className={style.buttonContainer}>
            <div onClick={handleManageButton} className={style.wallet_button}>
              <img alt="icon" src={spendIcon} />
            </div>
            <p className={style.wallet_button_label}>Spend tokens</p>
          </div>
          <div className={style.buttonContainer}>
            <div onClick={handleManageButton} className={style.wallet_button}>
              <img alt="icon" src={redeemIcon} />
            </div>
            <p className={style.wallet_button_label}>Redeem coupon</p>
          </div>{" "}
          <div className={style.buttonContainer}>
            <div onClick={handleManageButton} className={style.wallet_button}>
              <img alt="icon" src={manageIcon} />
            </div>
            <p className={style.wallet_button_label}>Manage wallet</p>
          </div>
        </div>
      </div>
      {manage && (
        <>
          <input
            type="range"
            min="0"
            max={wallet.liquid + wallet.frozen}
            step="10"
            // max={wallet.liquid + wallet.frozen}
            onChange={handleManageRange}
            value={displayDrift.liquid}
          />
          <button onClick={handleManageConfirm}>Confirm</button>
          <button onClick={resetDisplayDrift}>Reset</button>
        </>
      )}
      <div className={style.linksContainer}>
        <div
          className={style.walletLinks_btn}
          style={{ backgroundImage: `url(${walletVouchers})` }}
        >
          <Link to="/wallet/vouchers">
            <img
              alt="Discount vouchers"
              src={voucherIcon}
              className={style.walletLinks_icon}
            />
            <p>Discount vouchers</p>
          </Link>
        </div>
        <div
          className={style.walletLinks_btn}
          style={{ backgroundImage: `url(${walletVoting})` }}
        >
          <Link to="/wallet/voting">
            <img
              alt="Voting"
              src={votingIcon}
              className={style.walletLinks_icon}
            />
            <p>Voting</p>
          </Link>
        </div>
        <div
          className={style.walletLinks_btn}
          style={{ backgroundImage: `url(${walletPinQuest})` }}
        >
          <Link to="/wallet/quests">
            <img
              alt="Quest"
              src={questIcon}
              className={style.walletLinks_icon}
            />
            <p>Pins / rallies</p>
          </Link>
        </div>
        <div
          className={style.walletLinks_btn}
          style={{ backgroundImage: `url(${walletNFTMarketplace})` }}
        >
          <Link to="/wallet/marketplace">
            <img
              alt="Marketplace"
              src={marketplaceIcon}
              className={style.walletLinks_icon}
            />
            <p>NFT Marketplace</p>
          </Link>
        </div>
        <div
          className={style.walletLinks_btn}
          style={{ backgroundImage: `url(${walletNFTInventory})` }}
        >
          <Link to="/wallet/NFTGarage">
            <img
              alt="Inventory"
              src={inventoryIcon}
              className={style.walletLinks_icon}
            />
            <p>NFT Garage</p>
          </Link>
        </div>
        <div
          className={style.walletLinks_btn}
          style={{ backgroundImage: `url(${walletStatistics})` }}
        >
          <Link to="/wallet/stats">
            <img
              alt="Statistics"
              src={statisticsIcon}
              className={style.walletLinks_icon}
            />
            <p>Statistics</p>
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
