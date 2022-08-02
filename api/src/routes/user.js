/*  
    ROUTES FOR :
    /user    
*/

const router = require("express").Router();
const {
  getAllUsers,
  getUsersById,
  createUser,
  toggleFavSponsor,
  toggleFavVendor,
  toggleFavCar,
  toggleFavEvent,
} = require("../controllers/index.js");

const handleStorage = require("../utils/handleStorage");
const uploadUser = handleStorage("user");

// Get all users
router.get("/", async (req, res) => {
  const response = await getAllUsers();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get user by ID
router.get("/:id", async (req, res) => {
  // const { id } = req.params;
  const response = await getUsersById(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// create new user
router.post("/", uploadUser.single("image"), async (req, res) => {
  const response = await createUser(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

/// FAVORITES

// POST user favorite Sponsor
router.post("/:id/favSponsor/:sponsorId", async (req, res) => {
  const { id, sponsorId } = req.params;
  const response = await toggleFavSponsor(id, sponsorId);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// POST user favorite car
router.post("/:id/favCar/:carId", async (req, res) => {
  const { id, carId } = req.params;
  const response = await toggleFavCar(id, carId);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// POST user favorite Event
router.post("/:id/favEvent/:eventId", async (req, res) => {
  const { id, eventId } = req.params;
  const response = await toggleFavEvent(id, eventId);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// POST user favorite Vendor
router.post("/:id/favVendor/:vendorId", async (req, res) => {
  const { id, vendorId } = req.params;
  const response = await toggleFavVendor(id, vendorId);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
