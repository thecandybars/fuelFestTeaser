/*  
    ROUTES FOR :
    /wallet
*/

const router = require("express").Router();
const {
  getAllWallets,
  getWalletById,
  editWallet,
  createWallet,
  freezeTokens,
  unFreezeTokens,
  manageTokens,
} = require("../controllers/index.js");

// Get ALL wallets
router.get("/", async (req, res) => {
  const response = await getAllWallets();
  res.json(response);
});
// Get  wallet by ID
router.get("/:id", async (req, res) => {
  const response = await getWalletById(req);

  if (!response || response.hasOwnProperty("parent")) res.sendStatus(400);
  else res.json(response);
});

// Edit WALLET by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editWallet(id, data);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW wallet
router.post("/", async (req, res) => {
  const response = await createWallet(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

/////////////////////////
// MANAGE
/////////////////////////

// Freeze some tokens
router.put("/:id/freeze/:amount", async (req, res) => {
  const { id, amount } = req.params;
  const response = await freezeTokens({ id, amount: parseInt(amount) });
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Unfreeze some tokens
router.put("/:id/unfreeze/:amount", async (req, res) => {
  const { id, amount } = req.params;
  const response = await unFreezeTokens({ id, amount: parseInt(amount) });
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Manage wallet tokens (liquid, frozen)
router.put("/:walletId/manage/", async (req, res) => {
  const response = await manageTokens(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
