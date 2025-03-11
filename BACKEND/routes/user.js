const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const { verifyToken } = require('../middlewares/authMiddleware');

// User Routes
router.post("/", createUser);      
router.get("/", verifyToken, getAllUsers);       
router.get("/:id",verifyToken,getUserById);    
router.put("/:id",verifyToken, updateUser);     
router.delete("/:id",verifyToken, deleteUser); 
router.post("/login", loginUser);  

module.exports = router;
