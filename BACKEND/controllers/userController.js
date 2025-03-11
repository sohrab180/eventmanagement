const User = require("../models/users");
const ErrorLog = require("../models/errorLog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validation Schema
const userSchema = Joi.object({
  fname: Joi.string().trim(),
  middleName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string().trim().required(),
  isAdmin: Joi.boolean(),
  userRole: Joi.string().valid("user", "admin", "moderator"),
});

// Create a New User
exports.createUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    await ErrorLog.create({ error: err.message, route: req.originalUrl });
    res.status(500).json({ message: err.message });
  }
};

// User Login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and password are required.");
      error.status = 400;
      return next(error);
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      const error = new Error("User Not Found!");
      error.status = 400;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Password is incorrect!");
      error.status = 400;
      return next(error);
    }

    const token = jwt.sign({ id: user._id, userRole: user.userRole }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    
    
    res.json({ message: "Login successful", token, user });

  }catch (err) {
    await ErrorLog.create({
      endpoint: req.originalUrl,
      method: req.method,
      requestBody: req.body,       // Logs request body for debugging
      queryParams: req.query,       // Logs query parameters if any
      headers: req.headers,         // Logs request headers
      errorMessage: err.message,    // Stores error message
      stack: err.stack,             // Logs the stack trace for debugging
      timestamp: new Date(),        // Stores the timestamp
    });

    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (err) {
    await ErrorLog.create({ error: err.message, route: req.originalUrl });
    res.status(500).json({ message: err.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    await ErrorLog.create({ error: err.message, route: req.originalUrl });
    res.status(500).json({ message: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { allowUnknown: true });
    if (error) return res.status(400).json({ message: error.details[0].message });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    await ErrorLog.create({ error: err.message, route: req.originalUrl });
    res.status(500).json({ message: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    await ErrorLog.create({ error: err.message, route: req.originalUrl });
    res.status(500).json({ message: err.message });
  }
};
