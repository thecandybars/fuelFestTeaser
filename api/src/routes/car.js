/*  
    ROUTES FOR :
    /car
*/

const router = require("express").Router();
const {
  getAllCars,
  getCarById,
  editCar,
  createCar,
  addCategoryToCar,
  getVoteCategories,
} = require("../services/index.js");

// Get ALL cars
router.get("/", async (req, res) => {
  const response = await getAllCars();
  res.json(response);
});
// Get  car by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getCarById(id);

  if (!response || response.hasOwnProperty("parent")) res.sendStatus(400);
  else res.json(response);
});

// Edit car by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editCar(id, data);
  res.json(response);
});
// Add vote category to car
router.put("/:carId/category/:categoryId", async (req, res) => {
  const { carId, categoryId } = req.params;
  const response = await addCategoryToCar(carId, categoryId);
  res.json(response);
});
// Create NEW car
router.post("/", async (req, res) => {
  const response = await createCar(req.body);
  res.json(response);
});

/////////////////
// VOTE
/////////////////

// GET vote categories for a car
router.get("/:id/voteCategory", async (req, res) => {
  const { id } = req.params;
  const response = await getVoteCategories(id);
  res.json(response);
});

module.exports = router;
