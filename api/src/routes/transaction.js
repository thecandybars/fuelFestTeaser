/*  
    ROUTES FOR :
    /transaction
*/

const router = require("express").Router();
const {
  createTokenTransaction,
  createTransactionCategory,
} = require("../services/index.js");

// Create new TOKEN transaction
router.post("/token", async (req, res) => {
  const response = await createTokenTransaction(req.body);
  res.json(response);
});

// Create new transaction category
router.post("/category", async (req, res) => {
  const response = await createTransactionCategory(req.body);
  res.json(response);
});

module.exports = router;
