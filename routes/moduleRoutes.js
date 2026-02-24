const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkModuleAccess } = require("../middleware/enforcementMiddleware");

router.post("/", verifyToken, moduleController.createModule);

router.get("/:module_id",
  verifyToken,
  checkModuleAccess,
  (req, res) => {
    res.json({ message: "Module content accessible" });
  }
);

module.exports = router;