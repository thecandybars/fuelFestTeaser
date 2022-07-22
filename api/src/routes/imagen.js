/*  
    ROUTES FOR :
    /imagen
*/

const router = require("express").Router();
const {} = require("../services/index.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("img"), async (req, res) => {
  const { body, file } = req;
  const response = "hola!";
  !response.error
    ? res.status(200).json(response)
    : res.status(response.error.status).send(response.error.title);
});

module.exports = router;
