// Elements from the DOM
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task function
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = ''; // Clear input
        saveTaskToLocalStorage(taskText); // Save task to local storage
    }
});

// Function to add task to the DOM
function addTask(taskText) {
    const li = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Add delete functionality
    deleteBtn.addEventListener("click", () => {
        li.remove(); // Remove task from the DOM
        removeTaskFromLocalStorage(taskText); // Remove task from local storage
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage and display them
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => addTask(taskText));
}
