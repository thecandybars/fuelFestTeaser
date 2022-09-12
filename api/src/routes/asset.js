/*  
    ROUTES FOR :
    /asset
*/

const router = require("express").Router();
const {
  createTokenCoupon,
  createVoucherCoupon,
  createAssetCategory,
  createNFTCard,
  createVoucher,
  buyAsset,
  getAssets,
  getAssetById,
  getAssetsByWallet,
  getAllAssetCategory,
  getNFTCards,
  getNFTCard,
  getVouchers,
  getVoucher,
} = require("../controllers/index.js");

// Image middleware
const handleStorage = require("../utils/handleStorage");
const uploadVoucher = handleStorage("voucher");
const uploadTokenCoupon = handleStorage("tokenCoupon");
const uploadVoucherCoupon = handleStorage("voucherCoupon");
const uploadNFTCard = handleStorage("NFTCard");

// Get all asset Category
router.get("/category", async (req, res) => {
  const response = await getAllAssetCategory();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get All NFT Cards
router.get("/nftCards", async (req, res) => {
  const response = await getNFTCards(req);
  res.status(200).json(response);
  // !response.error
  //   ? res.status(200).json(response)
  //   : res.status(response.error.status).send(response.error.title);
});
// Create new Token Coupon
router.post(
  "/tokenCoupon/:walletId/:quantity",
  uploadTokenCoupon.single("image"),
  async (req, res) => {
    const response = await createTokenCoupon(req);
    !response.error
      ? res.status(200).json(response)
      : res.status(response.error.status).send(response.error.title);
  }
);
// Create new Voucher Coupon
router.post(
  "/voucherCoupon/:walletId/:quantity",
  uploadTokenCoupon.single("image"),
  async (req, res) => {
    const response = await createVoucherCoupon(req);
    !response.error
      ? res.status(200).json(response)
      : res.status(response.error.status).send(response.error.title);
  }
);

router.post(
  "/nftCard/:walletId/:quantity",
  uploadNFTCard.array("images"),
  async (req, res) => {
    const response = await createNFTCard(req);
    !response.error
      ? res.status(200).json(response)
      : res.status(response.error.status).send(response.error.title);
  }
);
// Get all Vouchers
router.get("/voucher", async (req, res) => {
  const response = await getVouchers(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new Voucher
router.post(
  "/voucher/:walletId/:quantity",
  uploadVoucher.single("image"),
  async (req, res) => {
    const response = await createVoucher(req);
    !response.error
      ? res.status(200).json(response)
      : res.status(response.error.status).send(response.error.title);
  }
);
// Get all assets
router.get("/", async (req, res) => {
  const response = await getAssets(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new asset Category
router.post("/category", async (req, res) => {
  const response = await createAssetCategory(req.body);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// // Wallet buys available asset from marketplace
router.post("/:assetId/buy/:walletId", async (req, res) => {
  const response = await buyAsset(req.params);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get asset by Id
router.get("/byId/:assetId", async (req, res) => {
  const response = await getAssetById(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).json(response.error.title);
});
// Get all assets for a wallet
router.get("/byWallet/:walletId", async (req, res) => {
  const { walletId } = req.params;
  const response = await getAssetsByWallet(walletId);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get NFT Card
router.get("/nftCard/:nftCardId", async (req, res) => {
  const response = await getNFTCard(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get Discount Voucher
router.get("/voucher/:voucherId", async (req, res) => {
  const response = await getVoucher(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
