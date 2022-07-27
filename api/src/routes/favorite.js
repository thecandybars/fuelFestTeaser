/*  
    ROUTES FOR :
    /favorite  
*/

const router = require("express").Router();
const {
  getFavEvent,
  toggleFavEvent,
  getFavCar,
  toggleFavCar,
  getFavSponsor,
  toggleFavSponsor,
  getFavVendor,
  toggleFavVendor,
} = require("../controllers/index.js");

// Get all fav events for a user
router.get("/:id/event/", async (req, res) => {
  const { id } = req.params;
  const response = await getFavEvent(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Toggles fav event for a user
router.post("/:id/event/:eventId", async (req, res) => {
  const { id, eventId } = req.params;
  const response = await toggleFavEvent(id, eventId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Get all fav sponsors for a user
router.get("/:id/sponsor/", async (req, res) => {
  const { id } = req.params;
  const response = await getFavSponsor(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Toggles fav sponsor for a user
router.post("/:id/sponsor/:sponsorId", async (req, res) => {
  const { id, sponsorId } = req.params;
  const response = await toggleFavSponsor(id, sponsorId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// user gets all fav cars
router.get("/:id/car/", async (req, res) => {
  const { id } = req.params;
  const response = await getFavCar(id);
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

// user gets all fav vendors
router.get("/:id/vendor/", async (req, res) => {
  const { id } = req.params;
  const response = await getFavVendor(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// user toggles fav vendor
router.post("/:id/vendor/:vendorId", async (req, res) => {
  const { id, vendorId } = req.params;
  const response = await toggleFavVendor(id, vendorId);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
