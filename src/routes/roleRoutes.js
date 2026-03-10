const express = require('express');
const router = express.Router();
const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getUsersByRole,
} = require('../controllers/roleController');

router.route('/').get(getRoles).post(createRole);
router.get('/:id/users', getUsersByRole);
router.route('/:id').get(getRoleById).put(updateRole).delete(deleteRole);

module.exports = router;
