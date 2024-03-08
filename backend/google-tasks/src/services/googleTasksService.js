const { google } = require('googleapis');

/**
 * Servicefor interacting with Google Tasks API
 * @module services/googleTasksService
 */

// Authentication configuration
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly'],
});

/**
 * GoogleTasksService class for interacting with Google Tasks API
 */
class GoogleTasksService {
    /**
     * Get all task lists.
     * @returns {Promise<object[]>} An array of task lists.
     */
    async getTaskLists() {
        const tasks = google.tasks({ version: 'v1', auth });
        const taskLists = await tasks.tasklists.list();
        return taskLists.data.items;
    }

    async createTaskList(taskList) {
        const tasks = google.tasks({ version: 'v1', auth });
        const taskListCreated = await tasks.tasklists.insert({ requestBody: taskList });
        return taskListCreated.data;
    }

    async updateTaskList(id, taskList) {
        const tasks = google.tasks({ version: 'v1', auth });
        const taskListUpdated = await tasks.tasklists.update({ tasklist: id, requestBody: taskList });
        return taskListUpdated.data;
    }

    async deleteTaskList(id) {
        const tasks = google.tasks({ version: 'v1', auth });
        await tasks.tasklists.delete({ tasklist: id });
    }

    async getTasks(taskListId) {
        const tasks = google.tasks({ version: 'v1', auth });
        const tasksList = await tasks.tasks.list({ tasklist: taskListId });
        return tasksList.data.items;
    }

    async createTask(taskListId, task) {
        const tasks = google.tasks({ version: 'v1', auth });
        const taskCreated = await tasks.tasks.insert({ tasklist: taskListId, requestBody: task });
        return taskCreated.data;
    }

    async updateTask(taskListId, taskId, task) {
        const tasks = google.tasks({ version: 'v1', auth });
        const taskUpdated = await tasks.tasks.update({ tasklist: taskListId, task: taskId, requestBody: task });
        return taskUpdated.data;
    }

    async deleteTask(taskListId, taskId) {
        const tasks = google.tasks({ version: 'v1', auth });
        await tasks.tasks.delete({ tasklist: taskListId, task: taskId });
    }

    async clearCompletedTasks(taskListId) {
        const tasks = google.tasks({ version: 'v1', auth });
        await tasks.tasks.clear({ tasklist: taskListId });
    }

    async moveTask(taskListId, taskId, task) {
        const tasks = google.tasks({ version: 'v1', auth });
        const taskMoved = tasks.tasks.move({ tasklist: taskListId, task: taskId, requestBody: task });
        return taskMoved.data;
    }

    async getTask(taskListId, taskId) {
        const tasks = google.tasks({ version: 'v1', auth });
        const task = await tasks.tasks.get({ tasklist: taskListId, task: taskId });
        return task.data;
    }
}

module.exports = GoogleTasksService;