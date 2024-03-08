const GoogleTasksService = require('../services/googleTasksService');

/**
 * Controller class for handling task-related operations.
 * @module controllers/taskController
 */
class TaskController {
    /**
     * Get all task lists.
     * @param {Object} _req - The request object.
     * @param {Object} res - The response object.
     */
    async getTaskLists(_req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const taskLists = await googleTasksService.getTaskLists();
            res.status(200).json(taskLists);
        } catch (error) {   
            console.error('Error getting task lists', error);
            res.status(500).json({ message: error.message });
        }
    }

    async createTaskList(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const taskList = await googleTasksService.createTaskList(req.body);
            res.status(201).json(taskList);
        } catch (error) {
            console.error('Error creating task list', error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateTaskList(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const taskList = await googleTasksService.updateTaskList(req.params.id, req.body);
            res.status(200).json(taskList);
        } catch (error) {
            console.error('Error updating task list', error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTaskList(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            await googleTasksService.deleteTaskList(req.params.id);
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting task list', error);
            res.status(500).json({ message: error.message });
        }
    }

    async getTasks(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const tasks = await googleTasksService.getTasks(req.params.id);
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error getting tasks', error);
            res.status(500).json({ message: error.message });
        }
    }

    async createTask(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const task = await googleTasksService.createTask(req.params.id, req.body);
            res.status(201).json(task);
        } catch (error) {
            console.error('Error creating task', error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateTask(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const task = await googleTasksService.updateTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error) {
            console.error('Error updating task', error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            await googleTasksService.deleteTask(req.params.id);
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting task', error);
            res.status(500).json({ message: error.message });
        }
    }

    async moveTask(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const task = await googleTasksService.moveTask(req.params.id, req.body);
            res.status(200).json(task);
        } catch (error) {
            console.error('Error moving task', error);
            res.status(500).json({ message: error.message });
        }
    }

    async completeTask(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const task = await googleTasksService.completeTask(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            console.error('Error completing task', error);
            res.status(500).json({ message: error.message });
        }
    }

    async incompleteTask(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            const task = await googleTasksService.incompleteTask(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            console.error('Error incompleting task', error);
            res.status(500).json({ message: error.message });
        }
    }

    async clearCompletedTasks(req, res) {
        try {
            const googleTasksService = new GoogleTasksService();
            await googleTasksService.clearCompletedTasks(req.params.id);
            res.status(204).end();
        } catch (error) {
            console.error('Error clearing completed tasks', error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TaskController;