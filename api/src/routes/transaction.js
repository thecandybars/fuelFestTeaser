/*  
    ROUTES FOR :
    /transaction
*/

const router = require("express").Router();
const {
  createTokenTransaction,
  createAssetTransaction,
  createCouponTransaction,
  createVoucherTransaction,
} = require("../controllers/index.js");

// Create new ASSET transaction (send asset, buy asset)
router.post("/asset", async (req, res) => {
  const response = await createAssetTransaction(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new TOKEN transaction (send/receive tokens)
router.post("/token", async (req, res) => {
  const response = await createTokenTransaction(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new TOKEN COUPON transaction (Owner burns token coupon, the recepient receives tokens)
router.post("/tokenCoupon", async (req, res) => {
  const response = await createCouponTransaction(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new VOUCHER transaction = SPEND (Owner sends voucher, the recepient burns coupon)
router.post("/voucher/:voucherId", async (req, res) => {
  const response = await createVoucherTransaction(req);
  !response.error
    ? res.status(201).json("Voucher redeemed!")
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
