/*  
    ROUTES FOR :
    /sponsor
*/

const router = require("express").Router();
const {
  getAllSponsors,
  createSponsor,
  getSponsorById,
  editSponsor,
} = require("../services/index.js");

// Get ALL Sponsors
router.get("/", async (req, res) => {
  const response = await getAllSponsors();
  res.json(response);
});
// Get  Sponsor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getSponsorById(id);
  res.json(response);
});

// Modify Sponsor by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editSponsor(id, data);
  res.json(response);
});
// Create NEW Sponsor
router.post("/", async (req, res) => {
  const response = await createSponsor(req.body);
  res.json(response);
});

module.exports = router;
