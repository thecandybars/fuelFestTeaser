/*  
    ROUTES FOR :
    /transaction
*/

const router = require("express").Router();
const {
  createTokenTransaction,
  createTransactionCategory,
  createAssetTransaction,
} = require("../services/index.js");

// Create new ASSET transaction
router.post("/asset", async (req, res) => {
  const response = await createAssetTransaction(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create new TOKEN transaction
router.post("/token", async (req, res) => {
  const response = await createTokenTransaction(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Create new transaction category
router.post("/category", async (req, res) => {
  const response = await createTransactionCategory(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
