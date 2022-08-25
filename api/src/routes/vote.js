/*  
    ROUTES FOR :
    /vote
*/

const router = require("express").Router();
const {
  createVoteCategory,
  carVote,
  getVoteCategoryByCat,
} = require("../controllers/index.js");

const handleStorage = require("../utils/handleStorage");
const uploadVoteCategory = handleStorage("voteCategory");

// Get ONE vote category
router.get("/category/:voteCategory", async (req, res) => {
  const response = await getVoteCategoryByCat(req);
  !response.error
    ? res.status(201).json(response)
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
  const response = await carVote(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
