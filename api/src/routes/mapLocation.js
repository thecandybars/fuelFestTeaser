/*  
    ROUTES FOR :
    /mapLocation
*/

const router = require("express").Router();
const { getMapLocation } = require("../controllers/index.js");

// Get map location by ID
router.get("/:mapLocationId", async (req, res) => {
  const response = await getMapLocation(req);
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
