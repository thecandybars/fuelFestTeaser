const multer = require("multer");

function handleStorage(name) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `uploads/${name}`;
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const filename = `${name}-${Date.now()}`;
      const extension = file.originalname.split(".").pop();
      cb(null, `${filename}.${extension}`);
    },
  });

  return multer({ storage });
}

module.exports = handleStorage;
