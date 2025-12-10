const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


// ✅ Routes for /api/tasks
router.route('/')
  .get(protect, getTasks)      // Get logged-in user's tasks
  .post(protect, createTask); // Create task for logged-in user


// ✅ Routes for /api/tasks/:id
router.route('/:id')
  .get(protect, getTaskById)   // Get single task (user-owned)
  .put(protect, updateTask)   // Update task (user-owned)
  .delete(protect, deleteTask); // Delete task (user-owned)


module.exports = router;
