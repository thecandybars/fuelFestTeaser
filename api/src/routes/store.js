/*  
    ROUTES FOR :
    /store
*/

const router = require("express").Router();
const {
  getAllStores,
  createStore,
  getStoreById,
  editStore,
} = require("../services/index.js");

// Get ALL Stores
router.get("/", async (req, res) => {
  const response = await getAllStores();
  res.json(response);
});
// Get  Store by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getStoreById(id);
  res.json(response);
});

// Modify Store by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editStore(id, data);
  res.json(response);
});
// Create NEW Store
router.post("/", async (req, res) => {
  const response = await createStore(req.body);
  res.json(response);
});

module.exports = router;
