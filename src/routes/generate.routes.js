// Backend/src/routes/generate.routes.js

const express = require("express");
const router  = express.Router();
const genCtrl = require("../controllers/generate.controller");

// POST /api/generate
router.post("/generate", genCtrl.generate);

module.exports = router;
