import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVoucher } from "../../../services/assets";
import { Dialog } from "@mui/material";
import { theme } from "../../../common/theme";
import DialogBuyVoucher from "./DialogBuyVoucher";
import NftCardDetail from "../../_shared/NftCardDetail";

export default function VoucherDetail() {
  const { voucherId } = useParams();

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
      <>
        {/* DIALOG */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogBuyVoucher
            assetId={fetchedVoucher.assetId}
            closeDialog={handleDialogClose}
          />
        </Dialog>

        <NftCardDetail
          id={voucherId}
          type="voucher"
          title={fetchedVoucher.title}
          data={{
            id: voucherId,
            description: fetchedVoucher.description,
            vendorLogo: fetchedVoucher.vendor.logo,
            vendorTitle: fetchedVoucher.vendor.title,
            vendorTent: fetchedVoucher.vendor.tent,
          }}
          image={fetchedVoucher.image}
          imageType={fetchedVoucher.imageType}
          price={fetchedVoucher.price}
          actionButton={{
            action: () => setDialogOpen(true),
            label: "Buy",
            color: theme.green,
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
