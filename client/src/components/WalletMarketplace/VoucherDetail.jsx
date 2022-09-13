import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../../assets/MainContainer";
import { getVoucher } from "../../services/assets";
import styled from "styled-components";
import { Dialog } from "@mui/material";
import BackButton from "../../assets/BackButton";
import DialogBuyVoucher from "./DialogBuyVoucher";
import Title from "../../assets/Title";

const StyledTitle = styled.div`
  display: flex;
  font-size: 1rem;
  /* text-align: left; */
  color: #da1921;
  /* margin-left: 0px; */
  margin-bottom: 20px;
`;
const StyledPrice = styled.p`
  font-family: "Oswald";
  font-size: 36px;
  margin-bottom: 10px;
  color: #feae2e;
  margin-left: 8px;
`;
const StyledButton = styled.div`
  padding: 1px 10px;
  background-color: #00703d;
  color: white;
  border-radius: 20px;
  font-family: "Oswald";
  font-size: 18px;
  text-align: center;
`;

export default function VoucherDetail() {
  const { voucherId } = useParams();
  const apiURL = process.env.REACT_APP_API;

  // INIT
  const [fetchedVoucher, setFetchedVoucher] = useState({});
  const fetchVoucher = async (voucherId) => {
    setFetchedVoucher(await getVoucher(voucherId));
  };
  useEffect(() => {
    fetchVoucher(voucherId);
  }, [voucherId]);

  //DIALOG
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    Object.keys(fetchedVoucher).length !== 0 && (
      <MainContainer>
        <Title backButton={true} color={"red"}>
          {fetchedVoucher.title}
        </Title>
        <div>
          <img
            alt={fetchVoucher.title}
            src={`${apiURL}/${fetchedVoucher.image}`}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <StyledPrice>{fetchedVoucher.price} DRIFT</StyledPrice>
          </div>
          <StyledButton onClick={() => setDialogOpen(true)}>Buy</StyledButton>
        </div>
        {/* DIALOG */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogBuyVoucher
            assetId={fetchedVoucher.assetId}
            closeDialog={handleDialogClose}
          />
        </Dialog>
      </MainContainer>
    )
  );
}
