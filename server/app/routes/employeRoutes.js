const express = require("express");
const {
  getAllEmployes,
  getOneEmploye,
  findOneEmploye,
  deleteOneEmploye,
  putOneEmploye,
  createOneEmploye,
  NonPayer,
  nbSal,
} = require("../controllers/employerController");

const router = express.Router();

router.get("/", getAllEmployes);
router.post("/",createOneEmploye);
router.get("/:id", getOneEmploye);
router.put("/:id", putOneEmploye);
router.delete("/:id", deleteOneEmploye);
router.get("/chercher/:id", findOneEmploye);
router.get("/nbSal",nbSal)

module.exports = router;
