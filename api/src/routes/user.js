/*  
    ROUTES FOR :
    /user    
*/

const router = require("express").Router();
const {
  getAllUsers,
  getUsersById,
  createUser,
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

module.exports = router;
