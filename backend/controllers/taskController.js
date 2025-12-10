const Task = require('../models/Task');

/*
---------------------------------
CREATE TASK (Logged-in user only)
---------------------------------
*/
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id, // ✅ user-based task
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/*
---------------------------------
GET TASKS (Logged-in user + filters)
---------------------------------
*/
const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    const query = {
      user: req.user._id, // ✅ only user’s tasks
    };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

/*
---------------------------------
GET SINGLE TASK BY ID (User-owned)
---------------------------------
*/
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id, // ✅ ownership check
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid task ID' });
  }
};

/*
---------------------------------
UPDATE TASK (User-owned)
---------------------------------
*/
const updateTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid data or task ID' });
  }
};

/*
---------------------------------
DELETE TASK (User-owned)
---------------------------------
*/
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid task ID' });
  }
};

const createTasksBulk = async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Expected an array of tasks" });
  }

  const tasks = req.body.map(task => {
    if (!task.title) {
      throw new Error("Each task must have a title");
    }

    return {
      ...task,
      user: req.user._id
    };
  });

  const createdTasks = await Task.insertMany(tasks);
  res.status(201).json(createdTasks);
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTasksBulk,
};
