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
} = require("../controllers/index.js");

const handleStorage = require("../utils/handleStorage");
const upload = handleStorage("event");
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
router.post("/", upload.single("image"), async (req, res) => {
  const response = await createEvent(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
