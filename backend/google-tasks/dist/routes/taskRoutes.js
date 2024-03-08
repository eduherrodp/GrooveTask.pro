"use strict";

var express = require('express');
var router = express.Router();
var TaskController = require('../controllers/taskController');

/**
 * Define routes related to tasks and task lists.
 * @module routes/taskRoutes
 */

// Create an instance of TaskController to handle task-related operations
var taskController = new TaskController();

// Define routes for handling different HTTP methods and endpoints
router.get('/', taskController.getTaskLists.bind(taskController));
router.post('/', taskController.createTaskList.bind(taskController));
router.put('/:id', taskController.updateTaskList.bind(taskController));
router["delete"]('/:id', taskController.deleteTaskList.bind(taskController));

// Export the router module to make it accessible to other parts of the application
module.exports = router;