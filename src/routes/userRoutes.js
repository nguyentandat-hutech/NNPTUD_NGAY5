const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  enableUser,
  disableUser,
} = require('../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.post('/enable', enableUser);
router.post('/disable', disableUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
