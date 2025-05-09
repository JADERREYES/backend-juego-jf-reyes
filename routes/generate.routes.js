// Backend/src/routes/generate.routes.js

const express = require("express");
const router  = express.Router();

// Debe apuntar EXACTO a ../controllers/generate.controller.js
const genCtrl = require("../controllers/generate.controller");

router.post("/generate", genCtrl.generate);

module.exports = router;
