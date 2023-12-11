const express = require("express");
const router = express.Router();
const authControllerAdmin = require('../controllers/authControllerAdmin');

const {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail,
} = require("../controllers/admins");

router.post("/", createAdmin);

router.get("/", getAllAdmins);
// router.route("/").get(getAllAdmins); 

router.get("/:id", getAdmin);

// router parameter
router.get("/email/:email", getAdminByEmail);

router.patch("/:id", updateAdmin);

router.delete("/:id", deleteAdmin);

router.post('/login', authControllerAdmin.login);

module.exports = router;
