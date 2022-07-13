/*  
    ROUTES FOR :
    /vote
*/

const router = require("express").Router();
const { createVoteCategory, carVote } = require("../services/index.js");

// Create NEW vote category
router.post("/category", async (req, res) => {
  const response = await createVoteCategory(req.body);
  res.json(response);
});

// Vote for a car
router.post("/car/:userId", async (req, res) => {
  const { userId } = req.params;
  const { carId, categoryId } = req.body;
  const response = await carVote(userId, carId, categoryId);
  res.json(response);
});

module.exports = router;
