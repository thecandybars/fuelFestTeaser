/*  
    ROUTES FOR :
    /favorite  
*/

const router = require("express").Router();
const {
  toggleFavEvent,
  getUserFavEvents,
  toggleFavCar,
  getUserFavCars,
} = require("../services/index.js");

// user gets all fav events
router.get("/:id/event/", async (req, res) => {
  const { id } = req.params;
  const response = await getUserFavEvents(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// user toggles fav event
router.post("/:id/event/:eventId", async (req, res) => {
  const { id, eventId } = req.params;
  const response = await toggleFavEvent(id, eventId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// user gets all fav cars
router.get("/:id/car/", async (req, res) => {
  const { id } = req.params;
  const response = await getUserFavCars(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// user toggles fav car
router.post("/:id/car/:carId", async (req, res) => {
  const { id, carId } = req.params;
  const response = await toggleFavCar(id, carId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
