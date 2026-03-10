const User = require('../models/User');

// @desc    Get all users (query theo username nếu có)
// @route   GET /api/users?username=abc
const getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.username) {
      filter.username = { $regex: req.query.username, $options: 'i' };
    }
    const users = await User.find(filter).populate('role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new user
// @route   POST /api/users
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.create({ username, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Soft delete user (chuyển isActive về false)
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isActive = false;
    await user.save();
    res.status(200).json({ message: 'User disabled successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enable user (truyền email + username, nếu đúng thì chuyển isActive = true)
// @route   POST /api/users/enable
const enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username });
    if (!user) {
      return res.status(404).json({ message: 'User not found or info incorrect' });
    }
    user.isActive = true;
    await user.save();
    res.status(200).json({ message: 'User enabled successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Disable user (truyền email + username, nếu đúng thì chuyển isActive = false)
// @route   POST /api/users/disable
const disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username });
    if (!user) {
      return res.status(404).json({ message: 'User not found or info incorrect' });
    }
    user.isActive = false;
    await user.save();
    res.status(200).json({ message: 'User disabled successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  enableUser,
  disableUser,
};
