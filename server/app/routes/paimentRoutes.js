const express = require("express");
const { getAllPaiments } = require("../controllers/paimentController");
const router = express.Router();

router.get('/',getAllPaiments);

module.exports = router;