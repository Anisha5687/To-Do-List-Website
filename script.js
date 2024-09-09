document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all-btn");

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasksToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            // Mark task as completed
            taskItem.querySelector('span').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasksToLocalStorage();
                renderTasks();
            });

            // Edit task
            taskItem.querySelector('.edit-btn').addEventListener('click', () => {
                const newTaskText = prompt("Edit your task:", task.text);
                if (newTaskText !== null && newTaskText.trim() !== "") {
                    task.text = newTaskText;
                    saveTasksToLocalStorage();
                    renderTasks();
                }
            });

            // Delete task
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
    };

    // Add a new task
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            saveTasksToLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Clear all tasks
    clearAllBtn.addEventListener("click", () => {
        tasks = [];
        saveTasksToLocalStorage();
        renderTasks();
    });

    // Render tasks on page load
    renderTasks();
});