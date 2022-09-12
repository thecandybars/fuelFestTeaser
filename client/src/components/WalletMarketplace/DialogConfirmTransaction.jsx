import React, { useContext } from "react";
import successfulTransactionIcon from "../../img/successfulTransaction.svg";
import styled from "styled-components";
import { BoughtAssetContext } from "../WalletMarketplace.jsx";

const StyledConfirmTransaction = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.dialogBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 70%;
  }
  h2 {
    font-size: 2.7rem;
    color: ${(props) => props.theme.yellow};
    text-align: center;
    margin: 15px 0;
  }
  p {
    color: ${(props) => props.theme.white};
    font-family: "Oswald";
    font-size: 1.3rem;
  }
  p span {
    color: ${(props) => props.theme.yellow};
  }
  div {
    width: 40%;
    margin: 15px 0;
    padding: 1px 10px;
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
    border-radius: 20px;
    font-family: "Oswald";
    font-size: 1.5rem;
    text-align: center;
  }
`;

export default function DialogConfirmTransaction() {
  const boughtAsset = useContext(BoughtAssetContext);

  const handleConfirmBuyClose = () => {
    // setConfirmBuyOpen(false);
    // boughtAsset tells WalletMarketplace an asset was bought and it needs to re-render.
    // Its usefull when asset is bought directly from the Buy button on the card. If user instead clicks the card first
    // it opens the details view, wich is a link outside de useContext reach, so boughAsset function is not present (and not needed)
    // and throws and error. That´s why it needs to be checked before executing it.
    boughtAsset && boughtAsset(true);
    // props.closeDialog();
  };
  return (
    <StyledConfirmTransaction>
      <img alt="Transaction Successful" src={successfulTransactionIcon} />
      <h2>Transaction Successful!</h2>
      <p>
        View Transaction: <span>87346587</span>
      </p>
      <div onClick={handleConfirmBuyClose}>Close</div>
    </StyledConfirmTransaction>
  );
}
