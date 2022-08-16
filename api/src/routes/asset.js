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
  getAllAssetCategory,
  getNFTCards,
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
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
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

// Get all assets for a wallet
router.get("/:walletId", async (req, res) => {
  const { walletId } = req.params;
  const response = await getAssets(walletId);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
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

module.exports = router;
