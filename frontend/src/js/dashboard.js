// dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
    // Check if code is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Obtener el token y el ID del usuario del almacenamiento local
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_');

    if (token && userId) {
        console.log('Token and user ID found in localStorage: ', token, userId);
        try {
            // Enviar una solicitud al servidor para obtener la información del usuario
            const response = await fetch(`https://db.edhrrz.pro/user/info/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                const username = userData.username;
                const email = userData.email;
                const googleCode = userData.googleCode;

                // Change the DOM, put username in all elements with class 'db-username'
                const usernameElements = document.querySelectorAll('.db-username');
                usernameElements.forEach(element => {
                    element.textContent = username;
                });

                document.getElementById('singout').addEventListener('click', async () => {
                    // End the session
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_');
                    const response = await fetch('https://db.edhrrz.pro/user/logout', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }).catch(error => console.error('Error:', error.message));
                    if (response.ok) {
                        window.location.href = '/login';
                    } else {
                        const errorData = await response.json();
                        console.error('Error ending session:', errorData.error);
                    }
                });

                // We need to hide the linkGoogleAccountSection if the user already has a googleCode
                if (googleCode !== null && googleCode !== '') {
                    const linkGoogleAccountSection = document.getElementById('linkGoogleAccountSection-G');
                    linkGoogleAccountSection.classList.add('fade-out');
                    setTimeout(() => {
                        linkGoogleAccountSection.style.display = 'none';
                        const parentLinkGoogleAccountSection = document.getElementById('parent-linkGoogle');
                        document.getElementById('principal').classList.remove('ocultar');
                        parentLinkGoogleAccountSection.classList.remove('justify-content-center', 'align-items-center');
                    }, 300);

                    console.log('Send googleCode to the backend to exchange it for a token in server:', googleCode);

                    // Send googleCode to the backend to exchange it for a token in server
                    const response = await fetch('https://db.edhrrz.pro/user/getToken', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ code: googleCode }),
                    });

                    // CONCLUYO FETCH

                    if (response.ok) {
                        const data = await response.json();

                        console.log('Data:', data);

                        // Set lists
                        const cardBody = document.querySelector('#my-lists .card-body');
                        cardBody.innerHTML = '';
                        let totalTasks = 0;
                        let completedTasks = 0;
                        let nearestDueDateTask;

                        data.forEach(taskList => {
                            const cardText = document.createElement('p');
                            cardText.classList.add('card-text');
                            cardText.textContent = taskList.title;
                            cardBody.appendChild(cardText);

                            taskList.tasks.forEach(task => {
                                totalTasks++;
                                if (task.status === 'completed') {
                                    completedTasks++;
                                }
                                if (!nearestDueDateTask || (task.due && new Date(task.due) < new Date(nearestDueDateTask.due))) {
                                    nearestDueDateTask = task;
                                }
                            });
                        });
                        // Set the nearest due date task in the DOM
                        console.log(document.getElementById('nearestDueDateTask'));
                        document.getElementById('nearestDueDateTask').innerText = nearestDueDateTask ? nearestDueDateTask.title : 'No tasks found';

                        // Display total tasks and completed tasks
                        console.log('Total tasks:', totalTasks);
                        console.log('Completed tasks:', completedTasks);

                        // Display nearest due date task
                        console.log('Nearest due date task:', nearestDueDateTask);

                        // Set the total tasks and completed tasks in the DOM
                        console.log(document.getElementById('task-completed'));
                        console.log(document.getElementById('total-tasks'));
                        document.getElementById('task-completed').textContent = completedTasks;
                        document.getElementById('total-tasks').textContent = totalTasks;

                        // Set the pie chart

                        const pieChartContainer = document.getElementById('pieChart');
                        const pieChartCanvas = document.createElement('canvas');
                        pieChartContainer.appendChild(pieChartCanvas);


                        // Parse the data to int
                        const pendingTasks = totalTasks - completedTasks;

                        const chart_data = {
                            labels: ['Completed', 'Pending'],
                            datasets: [{
                                label: 'Tasks',
                                data: [completedTasks, pendingTasks],
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(255, 99, 132, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)'
                                ],
                                borderWidth: 1
                            }],
                            hoverOffset: 4,
                        };

                        const config = { type: 'doughnut', data: chart_data };
                        new Chart(pieChartCanvas, config);

                        // Generate a bar chart where the x axis is the title of the task list and the y axis is the number of tasks

                        const barChartContainer = document.getElementById('barChart');
                        const barChartCanvas = document.createElement('canvas');
                        barChartContainer.appendChild(barChartCanvas);

                        const barChartData = {
                            labels: data.map(taskList => taskList.title),
                            datasets: [{
                                label: 'Tasks',
                                data: data.map(taskList => taskList.tasks.length),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }],
                        };

                        const barChartConfig = { type: 'bar', data: barChartData };
                        new Chart(barChartCanvas, barChartConfig);

                        // We need to know the last added task
                        const lastAddedTask = data.reduce((lastTask, taskList) => {
                            return taskList.tasks.reduce((lastTask, task) => {
                                return lastTask.updated > task.updated ? lastTask : task;
                            }, lastTask);
                        }, { updated: 0 });

                        // Set the last added task in the DOM
                        console.log(document.getElementById('last-added'));
                        document.getElementById('last-added').innerText = lastAddedTask.title;

                        // Progress of bar
                        const completionPercentage = (completedTasks / totalTasks) * 100;
                        const progressBar = document.querySelector('.progress-bar');
                        progressBar.style.width = `${completionPercentage}%`;
                        progressBar.setAttribute('aria-valuenow', completionPercentage);

                        // Add dinamic data to the dashboard, create a single list but categorized them by tasklist,, identify the tasklist by the title, in the task show updated and due date, and the status of the task
                        // Set dinamic data to the dashboard
                        const taskSection = document.getElementById('tasks-section');

                        // Function to create a list item for a task
                        function createTaskItem(task) {
                            const taskItem = document.createElement('li');
                            // Change update and due date to a human readable format
                            task.updated = new Date(task.updated).toLocaleString();
                            task.due = task.due ? new Date(task.due).toLocaleString() : 'No due date';
                            // if Status is completed change the color of the text to green
                            if (task.status === 'completed') {
                                taskItem.classList.add('text-success');
                            }
                            // if Status is needsAction change the color of the text to red
                            if (task.status === 'needsAction') {
                                taskItem.classList.add('text-danger');
                            }
                            taskItem.textContent = `${task.title} - Updated: ${task.updated}, Due: ${task.due}`;
                            return taskItem;
                        }

                        // Function to create a list of tasks for a task list
                        function createTaskList(taskList) {
                            const listContainer = document.createElement('div');
                            // Add class p-1 bg-primary bg-gradient text-white rounded ps-3
                            const listTitle = document.createElement('h3');
                            listTitle.classList.add('p-1', 'bg-primary', 'bg-gradient', 'text-white', 'rounded', 'ps-3');
                            listTitle.textContent = taskList.title;
                            listContainer.appendChild(listTitle);
                            const taskListUl = document.createElement('ul');
                            taskList.tasks.forEach(task => {
                                const taskItem = createTaskItem(task);
                                taskListUl.appendChild(taskItem);
                            });
                            listContainer.appendChild(taskListUl);
                            return listContainer;
                        }

                        // Update #tasks-section with the task lists and tasks
                        function updateTasksSection(data) {
                            taskSection.innerHTML = '';
                            data.forEach(taskList => {
                                const taskListElement = createTaskList(taskList);
                                taskSection.appendChild(taskListElement);
                            });
                        }

                        // Call updateTasksSection with data after fetch
                        updateTasksSection(data);


                        // Save tokens in localStorage
                        // localStorage.setItem('googleTokens', JSON.stringify(tokens));

                        // When task nav link is clicked, hide the dashboard and show the tasks and vice versa
                        const taskNavLink = document.getElementById('tasks');
                        const dashboardNavLink = document.getElementById('dashboard');
                        const principal = document.getElementById('principal');
                        
                        taskNavLink.addEventListener('click', () => {
                            principal.classList.add('ocultar');
                            taskSection.classList.remove('ocultar');
                            // Change aria-current attribute
                            taskNavLink.setAttribute('aria-current', 'page');
                        });
                        dashboardNavLink.addEventListener('click', () => {
                            taskSection.classList.add('ocultar');
                            principal.classList.remove('ocultar');
                            // Change aria-current attribute
                            taskNavLink.removeAttribute('aria-current');
                        });

                    }
                }

            } else {
                const errorData = await response.json();
                console.error('Error fetching user data:', errorData.error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    } else {
        console.error('Token or user ID not found in localStorage');
        // User is not logged in, redirect to login page
        window.location.href = 'https://edhrrz.pro/pages/login.html';
    }


    const linkGoogleAccountButton = document.getElementById('linkGoogleAccount');
    if (linkGoogleAccountButton) {
        linkGoogleAccountButton.addEventListener('click', async () => {
            try {
                // Send request to API server to get authorization URL
                const response = await fetch('https://api.edhrrz.pro/getLink', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const authorizationLink = data.link;

                    window.location.href = authorizationLink;
                } else {
                    console.error('Error fetching authorization link:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching authorization link:', error.message);
            }
        });
    }

    // Event listener for linking Google account    
    if (code) {
        console.log('Code found in URL:', code);
        // Update the user's googleCode in the database
        const response = await fetch('https://db.edhrrz.pro/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: userId, type: 'googleCode', data: code }),
        });


        if (response.ok) {
            console.log('Code saved in database');
        } else {
            console.error('Error saving code in database:', response.statusText);
        }

        // Remove the code from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        // Then reload the page
        window.location.reload();
    }
});