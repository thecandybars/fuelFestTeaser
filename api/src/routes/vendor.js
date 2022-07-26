/*  
    ROUTES FOR :
    /vendor
*/

const router = require("express").Router();
const {
  getAllVendors,
  createVendor,
  getVendorById,
  editVendor,
} = require("../controllers/index.js");

const handleStorage = require("../utils/handleStorage");
const upload = handleStorage("vendor");

// Get ALL vendors
router.get("/", async (req, res) => {
  const response = await getAllVendors();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  vendor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getVendorById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Modify vendor by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editVendor(id, data);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW vendor
router.post("/", upload.single("image"), async (req, res) => {
  const response = await createVendor(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
