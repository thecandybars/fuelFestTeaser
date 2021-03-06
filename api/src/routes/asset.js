/*  
    ROUTES FOR :
    /asset
*/

const router = require("express").Router();
const {
  createTokenCoupon,
  createAssetCategory,
  createNFTCard,
  createVoucher,
  buyAsset,
  getAssets,
} = require("../services/index.js");

// Get all assets for a wallet
router.get("/:walletID", async (req, res) => {
  const { walletID } = req.params;
  const response = await getAssets(walletID);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new Token Coupons
router.post("/tokenCoupon/:walletID/:quantity", async (req, res) => {
  const response = await createTokenCoupon({ ...req.params, ...req.body });
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new NFT Cards
router.post("/nftCard/:walletID/:quantity", async (req, res) => {
  const response = await createNFTCard({ ...req.params, ...req.body });
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new Voucher
router.post("/voucher/:walletID/:quantity", async (req, res) => {
  const response = await createVoucher({ ...req.params, ...req.body });
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
router.post("/:assetID/buy/:walletID", async (req, res) => {
  const response = await buyAsset(req.params);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
