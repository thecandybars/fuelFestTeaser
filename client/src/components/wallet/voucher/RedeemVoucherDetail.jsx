import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVoucher } from "../../../services/assets";
import { theme } from "../../../common/theme";
// import { Dialog } from "@mui/material";
// import DialogQrRedeemVoucher from "./DialogQrRedeemVoucher";
import NftCardDetail from "../../_shared/NftCardDetail";

export default function RedeemVoucherDetail() {
  const { voucherId } = useParams();
  const navigate = useNavigate();

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
    navigate(-1);
  };

  return (
    Object.keys(fetchedVoucher).length !== 0 && (
      <>
        {/* DIALOG */}
        {/* Don´t know how to open the QR Dialog from here! */}
        {/* <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogQrRedeemVoucher
            open={openQrDialog}
            vendor={fetchedVoucher.vendor.title}
            title={fetchedVoucher.voucher.title}
            image={fetchedVoucher.voucher.image}
            id={fetchedVoucher.asset.id}
            handleClose={setOpenQrDialog}
            clearDialog={setNftCardPrimaryButtonId}
            setReload={setReaload}
          />
        </Dialog> */}

        <NftCardDetail
          id={voucherId}
          type="voucher"
          title={fetchedVoucher.voucher.title}
          data={{
            id: voucherId,
            description: fetchedVoucher.voucher.description,
            vendorLogo: fetchedVoucher.voucher.vendor.logo,
            vendorTitle: fetchedVoucher.voucher.vendor.title,
            vendorTent: fetchedVoucher.voucher.vendor.tent,
          }}
          image={fetchedVoucher.voucher.image}
          imageType={fetchedVoucher.voucher.imageType}
          price={""}
          actionButton={{
            action: () => navigate(-1),
            label: "GO BACK",
            color: theme.red,
          }}
        />
      </>
    )
  );
}
// <MainContainer>
//   <Title backButton="true" color={theme.red}>
//     {fetchedVoucher.title}
//   </Title>
//   <div style={{ display: "flex" }}>
//     <StyledLeft>
//       <Info>
//         <StyledSubtitle>Voucher ID</StyledSubtitle>
//         <StyledInfo>{fetchedVoucher.assetId}</StyledInfo>
//       </Info>
//       <Info>
//         <StyledSubtitle>Description</StyledSubtitle>
//         <StyledInfo>{fetchedVoucher.description}</StyledInfo>
//       </Info>
//       <Info>
//         <Grid3>
//           <VendorLogo
//             alt="logo"
//             src={`${apiURL}/${fetchedVoucher.vendor.logo}`}
//             width="50px"
//           />
//           <StyledSubtitle>Vendor</StyledSubtitle>
//           <StyledInfo>{fetchedVoucher.vendor.title}</StyledInfo>
//         </Grid3>
//       </Info>
//       <Info>
//         <Grid4>
//           <Location style={{ fill: "white", fontSize: "1.8rem" }} />
//           <StyledSubtitle>
//             Tent #{fetchedVoucher.vendor.tent}
//           </StyledSubtitle>
//           <Map style={{ fill: `${theme.red}`, fontSize: "1.8rem" }} />
//           <StyledInfo style={{ textDecoration: "underline" }}>
//             <Link to="#">See it on map</Link>
//           </StyledInfo>
//         </Grid4>
//       </Info>
//     </StyledLeft>

//     <StyledRight>
//       <VoucherImage
//         alt={fetchVoucher.title}
//         src={`${apiURL}/${fetchedVoucher.image}`}
//       />
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <StyledPrice>{fetchedVoucher.price} DRIFT</StyledPrice>
//       </div>
//       <StyledButton onClick={() => setDialogOpen(true)}>Buy</StyledButton>
//     </StyledRight>
//   </div>

//   {/* DIALOG */}
//   <Dialog open={dialogOpen} onClose={handleDialogClose}>
//     <DialogBuyVoucher
//       assetId={fetchedVoucher.assetId}
//       closeDialog={handleDialogClose}
//     />
//   </Dialog>
// </MainContainer>
