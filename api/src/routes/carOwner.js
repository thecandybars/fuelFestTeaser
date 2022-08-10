/*  
    ROUTES FOR :
    /carOwner
*/

const router = require("express").Router();
const {
  getAllCarOwners,
  getCarOwnerById,
  editCarOwner,
  createCarOwner,
} = require("../controllers/index.js");

// const handleStorage = require("../utils/handleStorage");
// const upload = handleStorage("car");

// Get ALL car owners
router.get("/", async (req, res) => {
  const response = await getAllCarOwners();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  car owner by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getCarOwnerById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Edit car owner by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editCarOwner(id, data);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Create NEW car owner
router.post("/", async (req, res) => {
  // const response = req.body;
  const response = await createCarOwner(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
