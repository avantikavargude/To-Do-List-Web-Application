const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
        addTaskToDOM(taskText);
    });
};

// Add task to the DOM and local storage
addBtn.addEventListener('click', () => {
    if (taskInput.value !== "") {
        const taskText = taskInput.value;
        addTaskToDOM(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = "";
    }
});

// Delete task from the DOM and local storage
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const listItem = event.target.parentElement;
        const taskText = listItem.firstChild.textContent.trim();
        taskList.removeChild(listItem);
        removeTaskFromLocalStorage(taskText);
    }
});

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        ${taskText}
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(listItem);
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
