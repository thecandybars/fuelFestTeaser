import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWallet, manageTokens } from "../services/wallet";
import style from "./css/Wallet.module.css";
import driftCoin from "../img/driftCoin.png";
import { walletId } from "../common/getLoginData";
import voucherIcon from "../icons/sell_FILL1_wght400_GRAD0_opsz48.svg";
import votingIcon from "../icons/military_tech_FILL1_wght400_GRAD0_opsz48.svg";
import questIcon from "../icons/stars_FILL0_wght400_GRAD0_opsz48.svg";
import marketplaceIcon from "../icons/storefront_FILL1_wght400_GRAD0_opsz48.svg";
import inventoryIcon from "../icons/inventory_2_FILL1_wght400_GRAD0_opsz48.svg";
import statisticsIcon from "../icons/auto_graph_FILL1_wght400_GRAD0_opsz48.svg";

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
    <div className={style.container}>
      <h1 className={style.title}>Wallet</h1>
      <div className={style.wallet}>
        <div className={style.wallet_data}>
          <p className={style.wallet_data_title}>TOTAL</p>
          <div className={style.wallet_drift}>
            <img alt="drift" src={driftCoin} />
            <div>
              <p className={style.wallet_drift_total}>
                {parseInt(displayDrift.liquid) + parseInt(displayDrift.frozen)}
              </p>
              <p className={style.wallet_drift_unit}>DRIFT</p>
            </div>
            <img alt="drift" src={driftCoin} />
          </div>
          <div className={style.wallet_gridContent}>
            <p>
              Liquid <span>{displayDrift.liquid}</span>
            </p>

            <p>
              Frozen <span>{displayDrift.frozen}</span>
            </p>
            <br />
            <p>
              Drift dip <span>120/day</span>
            </p>
          </div>
          <br />
          <div className={style.wallet_manage}>
            <button onClick={handleManageButton}>Manage</button>
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
        </div>
        <div className={style.actions}>
          <div className={style.actions_tokens}>
            <p>TOKENS</p>
            <button>Send</button>
            <button>Receive</button>
          </div>
          <div className={style.actions_coupons}>
            <p>COUPONS</p>
            <button>Spend</button>
            <button>Redeem</button>
          </div>
        </div>
      </div>
      <div>
        <ul className={style.walletLinks}>
          <li className={style.walletLinks_btn}>
            <Link to="/wallet/vouchers">
              <img
                alt="Discount vouchers"
                src={voucherIcon}
                className={style.walletLinks_icon}
              />
              <p>Discount vouchers</p>
            </Link>
          </li>
          <li className={style.walletLinks_btn}>
            <Link to="/wallet/voting">
              <img
                alt="Voting"
                src={votingIcon}
                className={style.walletLinks_icon}
              />
              <p>Voting</p>
            </Link>
          </li>
          <li className={style.walletLinks_btn}>
            <Link to="/wallet/quest">
              <img
                alt="Quest"
                src={questIcon}
                className={style.walletLinks_icon}
              />
              <p>Quest</p>
            </Link>
          </li>
          <li className={style.walletLinks_btn}>
            <Link to="/wallet/marketplace">
              <img
                alt="Marketplace"
                src={marketplaceIcon}
                className={style.walletLinks_icon}
              />
              <p>Marketplace</p>
            </Link>
          </li>
          <li className={style.walletLinks_btn}>
            <Link to="/wallet/inventory">
              <img
                alt="Inventory"
                src={inventoryIcon}
                className={style.walletLinks_icon}
              />
              <p>Inventory</p>
            </Link>
          </li>
          <li className={style.walletLinks_btn}>
            <Link to="/wallet/statistics">
              <img
                alt="Statistics"
                src={statisticsIcon}
                className={style.walletLinks_icon}
              />
              <p>Statistics</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
