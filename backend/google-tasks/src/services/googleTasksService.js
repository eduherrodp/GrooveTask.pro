// services/googleTasksService.js
const { google } = require('googleapis');
const { getAuthenticatedClient } = require('./googleAuth');
console.log(getAuthenticatedClient);

/**
 * Servicefor interacting with Google Tasks API
 * @module services/googleTasksService
 */

/**
 * GoogleTasksService class for interacting with Google Tasks API
 */
class GoogleTasksService {
    /**
     * Get all task lists.
     * @returns {Promise<object[]>} An array of task lists.
     */
    async getTaskLists() {
        try {
            const authorizeUrl = await googleAuth.main();
            console.log('Authorization URL:', authorizeUrl);
            // Aquí debes enviar el authorizeUrl a la interfaz de usuario o manejarlo según sea necesario
        } catch (error) {
            console.error('Error getting task lists:', error);
            throw error;
        }
    }

    /**
     * Create a new task list.
     * @param {Object} taskList - The task list to create.
     * @returns {Promise<object>} The created task list.
     */
    async createTaskList(taskList) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        const newTaskList = await tasks.tasklists.insert({ requestBody: taskList });
        return newTaskList.data;
    }

    /**
     * Update a task list.
     * @param {string} id - The ID of the task list to update.
     * @param {Object} taskList - The updated task list.
     * @returns {Promise<object>} The updated task list.
     */
    async updateTaskList(id, taskList) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        const updatedTaskList = await tasks.tasklists.update({ taskList: id, requestBody: taskList });
        return updatedTaskList.data;
    }

    /**
     * Delete a task list.
     * @param {string} id - The ID of the task list to delete.
     */

    async deleteTaskList(id) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        await tasks.tasklists.delete({ taskList: id });
    }

    /**
     * Get all tasks in a task list.
     * @param {string} taskListId - The ID of the task list.
     * @returns {Promise<object[]>} An array of tasks.
     */
    async getTasks(taskListId) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        const tasksList = await tasks.tasks.list({ taskList: taskListId });
        return tasksList.data.items;
    }

    /**
     * Create a new task in a task list.
     * @param {string} taskListId - The ID of the task list.
     * @param {Object} task - The task to create.
     * @returns {Promise<object>} The created task.
     */

    async createTask(taskListId, task) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        const newTask = await tasks.tasks.insert({ taskList: taskListId, requestBody: task });
        return newTask.data;
    }

    /**
     * Update a task in a task list.
     * @param {string} taskListId - The ID of the task list.
     * @param {string} taskId - The ID of the task to update.
     * @param {Object} task - The updated task.
     * @returns {Promise<object>} The updated task.
     */

    async updateTask(taskListId, taskId, task) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        const updatedTask = await tasks.tasks.update({ taskList: taskListId, task: taskId, requestBody: task });
        return updatedTask.data;
    }

    /**
     * Delete a task from a task list.
     * @param {string} taskListId - The ID of the task list.
     * @param {string} taskId - The ID of the task to delete.
     */
    async deleteTask(taskListId, taskId) {
        const authClient = await getAuthenticatedClient();
        const tasks = google.tasks({ version: 'v1', auth: authClient });
        await tasks.tasks.delete({ taskList: taskListId, task: taskId });
    }

    
}

module.exports = GoogleTasksService;