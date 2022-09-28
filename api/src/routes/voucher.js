/*  
    ROUTES FOR :
    /voucher
*/

const router = require("express").Router();
const {
  getVouchersByWallet,
  burnVoucher,
  ownerConfirmRedeem,
  vendorConfirmRedeem,
  vendorConfirmedRedeem,
} = require("../controllers/index.js");

// Image middleware
const handleStorage = require("../utils/handleStorage");
const uploadVoucher = handleStorage("voucher");
const uploadTokenCoupon = handleStorage("tokenCoupon");
const uploadVoucherCoupon = handleStorage("voucherCoupon");
const uploadNFTCard = handleStorage("NFTCard");

// Get all Vouchers for a wallet
router.get("/wallet/:walletId", async (req, res) => {
  const response = await getVouchersByWallet(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Burn voucher
router.post("/burn/:voucherId", async (req, res) => {
  const response = await burnVoucher(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response);
});
// Owner confirms/cancels redeem
router.post("/redeem/owner", async (req, res) => {
  const response = await ownerConfirmRedeem(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response);
});

// Vendor confirms redeem
router.post("/redeem/vendor", async (req, res) => {
  const response = await vendorConfirmRedeem(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response);
});
// Get if vendor confirms redeem
router.get("/redeem/vendor/:voucherId", async (req, res) => {
  const response = await vendorConfirmedRedeem(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response);
});

module.exports = router;
