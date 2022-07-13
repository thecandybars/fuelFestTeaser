/*  
    ROUTES FOR :
    /user    
*/

const router = require("express").Router();
const {
  getAllUsers,
  getUsersById,
  createUser,
  toggleFavEvent,
  getUserFavEvents,
  toggleFavCar,
  getUserFavCars,
} = require("../services/index.js");

// Get all users
router.get("/", async (req, res) => {
  const response = await getAllUsers();
  res.json(response);
});
// Get user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getUsersById(id);
  res.json(response);
});

// create new user
router.post("/", async (req, res) => {
  const response = await createUser(req.body);
  res.json(response);
});

////////////////
// FAVORITES
////////////////

// user gets all fav events
router.get("/:id/fav/event/", async (req, res) => {
  const { id } = req.params;
  const response = await getUserFavEvents(id);
  res.json(response);
});
// user toggles fav event
router.post("/:id/fav/event/:eventId", async (req, res) => {
  const { id, eventId } = req.params;
  const response = await toggleFavEvent(id, eventId);
  res.json(response);
});

// user gets all fav cars
router.get("/:id/fav/car/", async (req, res) => {
  const { id } = req.params;
  const response = await getUserFavCars(id);
  res.json(response);
});
// user toggles fav car
router.post("/:id/fav/car/:carId", async (req, res) => {
  console.log("Hola");
  const { id, carId } = req.params;
  const response = await toggleFavCar(id, carId);
  res.json(response);
});

module.exports = router;
