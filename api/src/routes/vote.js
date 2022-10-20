/*  
    ROUTES FOR :
    /vote
*/

const router = require("express").Router();
const {
  createVoteCategory,
  carPostVote,
  carPutVote,
  carDeleteVote,
  getCarsByVotingCategory,
  getAllVotingCategories,
} = require("../controllers/index.js");

const handleStorage = require("../utils/handleStorage");
const uploadVoteCategory = handleStorage("voteCategory");

// Get ALL vote categories
router.get("/category", async (req, res) => {
  const response = await getAllVotingCategories(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get ONE vote category
router.get("/category/:categoryId", async (req, res) => {
  const response = await getCarsByVotingCategory(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW vote category
router.post(
  "/category",
  uploadVoteCategory.single("image"),
  async (req, res) => {
    const response = await createVoteCategory(req);
    !response.error
      ? res.status(201).json(response)
      : res.status(response.error.status).send(response.error.title);
  }
);

// Vote for a car
router.post("/car/:walletId", async (req, res) => {
  const response = await carPostVote(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Update a vote
router.put("/car/:voteId", async (req, res) => {
  const response = await carPutVote(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Delete a vote
router.delete("/car/:voteId", async (req, res) => {
  const response = await carDeleteVote(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
