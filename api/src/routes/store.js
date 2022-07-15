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
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  Store by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getStoreById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Modify Store by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editStore(id, data);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW Store
router.post("/", async (req, res) => {
  const response = await createStore(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
