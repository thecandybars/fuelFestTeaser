import React, { useState, useEffect } from "react";
import { getWallet, manageTokens } from "../services/wallet";
import style from "./css/Wallet.module.css";
import driftCoin from "../img/driftCoin.png";

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
    const wallet = await getWallet();
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
    setDisplayDrift({ liquid: e.target.value, frozen: 10100 - e.target.value });
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
        </div>{" "}
      </div>
    </div>
  );
}
