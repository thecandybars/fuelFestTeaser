/*  
    ROUTES FOR :
    /voucher
*/

const router = require("express").Router();
const { getVouchersByWallet } = require("../controllers/index.js");

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

module.exports = router;
