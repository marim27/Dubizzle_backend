const adminModel = require("../models/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// async function createAdmin(req, res) {
//   try {
//     const newAdmin = await adminModel.create(req.body);
//     res.status(201).json(newAdmin);
//   } catch (error) {
//     res.status(402).json({ message: 'xxxxxx'+error.message });
//   }
// }

async function createAdmin(req, res) {
  try {
    const newCategory = await adminModel.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(402).json({ message: 'xxxxxx'+error.message });
  }
}

async function getAllAdmins(req, res) {
  try {
    const admins = await adminModel.find();
    res.status(201).json(admins);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

async function getAdmin(req, res) {
  var id = req.params.id;
  try {
    const admin = await adminModel.findById(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    res.status(201).json(admin);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

//// router http://localhost:5555/admins/email/admin22@example.com
async function getAdminByEmail(req, res) {
  var { email } = req.params;

  try {
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      throw new Error("Admin not found");
    }
    res.status(201).json(admin);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

// async function updateAdmin(req, res) {
//   var id = req.params.id;
//   var adUpdatedData = req.body;
//   try {
//     const updatedAdmin = await adminModel.updateOne({ _id: id }, adUpdatedData);
//     res.status(201).json(updatedAdmin);
//   } catch (error) {
//     res.status(402).json({ message: error.message });
//   }
// }

async function updateAdmin(req, res) {
  try {
    // we cant send hashed password throw url Fetal Mistake
    const { password } = req.body;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      req.body.password = hashedPassword;
    }

    const admin = await adminModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!admin) {
      return res.status(404).json({
        message: "admin not found",
      });
    }
    const token = jwt.sign({ adminId: admin._id }, "654DubizzleAdmin");
    res.status(201).json({
      status: "success",
      data: {
        admin,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update admin",
      error: err.message,
    });
  }
}

async function deleteAdmin(req, res) {
  var id = req.params.id;
  try {
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }
    res.status(201).json(deletedAdmin);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
}

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail,
};
