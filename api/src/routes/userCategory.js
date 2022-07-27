/*  
    ROUTES FOR :
    /userCategory
*/

const router = require("express").Router();
const {
  createUserCategory,
  getAllUserCategories,
  getUserCategoryById,
} = require("../controllers/index.js");

// Get all user categories
router.get("/", async (req, res) => {
  const response = await getAllUserCategories();
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});
// Get user category by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getUserCategoryById(id);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

// create new user category
router.post("/", async (req, res) => {
  const response = await createUserCategory(req);
  !response.error
    ? res.status(201).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
