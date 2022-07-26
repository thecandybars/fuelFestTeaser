const { Router } = require("express");
const router = Router();

// Import routers;
// Example: const authRouter = require('./auth.js');

// Set routers
// Example: router.use('/auth', authRouter);
router.use("/festival", require("./festival.js"));
router.use("/user", require("./user.js"));
router.use("/event", require("./event.js"));
router.use("/vendor", require("./vendor.js"));
router.use("/sponsor", require("./sponsor.js"));
router.use("/car", require("./car.js"));
router.use("/favorite", require("./favorite.js"));
router.use("/vote", require("./vote.js"));
router.use("/wallet", require("./wallet.js"));
router.use("/transaction", require("./transaction.js"));
router.use("/asset", require("./asset.js"));

module.exports = router;
