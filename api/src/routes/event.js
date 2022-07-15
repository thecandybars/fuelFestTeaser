/*  
    ROUTES FOR :
    /event
*/

const router = require("express").Router();
const {
  getAllEvents,
  createEvent,
  getEventById,
  editEvent,
} = require("../services/index.js");

// Get ALL events
router.get("/", async (req, res) => {
  const response = await getAllEvents();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get  event by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getEventById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// Modify event by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editEvent(id, data);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Create NEW event
router.post("/", async (req, res) => {
  const response = await createEvent(req.body);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
