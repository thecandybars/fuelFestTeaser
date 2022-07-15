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
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  Sponsor by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getSponsorById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Modify Sponsor by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editSponsor(id, data);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW Sponsor
router.post("/", async (req, res) => {
  const response = await createSponsor(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
