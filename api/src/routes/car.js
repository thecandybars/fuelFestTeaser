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
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  car by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getCarById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Edit car by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editCar(id, data);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Add vote category to car
router.put("/:carId/category/:categoryId", async (req, res) => {
  const { carId, categoryId } = req.params;
  const response = await addCategoryToCar(carId, categoryId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW car
router.post("/", async (req, res) => {
  const response = await createCar(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

/////////////////
// VOTE
/////////////////

// GET vote categories for a car
router.get("/:id/voteCategory", async (req, res) => {
  const { id } = req.params;
  const response = await getVoteCategories(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
