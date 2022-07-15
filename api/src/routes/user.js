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
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getUsersById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// create new user
router.post("/", async (req, res) => {
  const response = await createUser(req.body);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

////////////////
// FAVORITES
////////////////

// user gets all fav events
router.get("/:id/fav/event/", async (req, res) => {
  const { id } = req.params;
  const response = await getUserFavEvents(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// user toggles fav event
router.post("/:id/fav/event/:eventId", async (req, res) => {
  const { id, eventId } = req.params;
  const response = await toggleFavEvent(id, eventId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// user gets all fav cars
router.get("/:id/fav/car/", async (req, res) => {
  const { id } = req.params;
  const response = await getUserFavCars(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// user toggles fav car
router.post("/:id/fav/car/:carId", async (req, res) => {
  const { id, carId } = req.params;
  const response = await toggleFavCar(id, carId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
