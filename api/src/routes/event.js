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
  res.json(response);
});
// Get  event by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getEventById(id);
  res.json(response);
});

// Modify event by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await editEvent(id, data);
  res.json(response);
});
// Create NEW event
router.post("/", async (req, res) => {
  const response = await createEvent(req.body);
  res.json(response);
});

module.exports = router;
