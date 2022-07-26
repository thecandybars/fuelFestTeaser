/*  
    ROUTES FOR :
    /festival
*/

const router = require("express").Router();
const {
  getAllFestivals,
  getFestivalById,
  createFestival,
  editFestival,
} = require("../controllers/index.js");

// Get ALL festivals
router.get("/", async (req, res) => {
  const response = await getAllFestivals();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  festival by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getFestivalById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Modify festival by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editFestival(id, data);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW festival
router.post("/", async (req, res) => {
  const response = await createFestival(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
