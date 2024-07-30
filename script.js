let inputs = document.getElementById("inp");
let text = document.querySelector(".text");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to load tasks from local storage and add them to the DOM
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Function to create a new task element in the DOM
function addTaskToDOM(taskValue) {
    let newEle = document.createElement("ul");
    newEle.innerHTML = `
        ${taskValue}
        <i class="fa-solid fa-pen edit"></i>
        <i class="fa-solid fa-trash"></i>
    `;
    text.appendChild(newEle);
    newEle.querySelector(".fa-trash").addEventListener("click", remove);
    newEle.querySelector(".fa-pen").addEventListener("click", edit);
}

// Function to add a new task, called when adding a task
function Add() {
    if (inputs.value == "") {
        alert("Please Enter Task");
    } else {
        addTaskToDOM(inputs.value);
        saveTask(inputs.value);
        inputs.value = "";
    }
}

// Function to save a new task to local storage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove a task from the DOM and local storage
function remove(event) {
    let taskItem = event.target.parentElement;
    removeTaskFromLocalStorage(taskItem.textContent.trim());
    taskItem.remove();
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskValue) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to edit a task, updating the DOM and local storage
function edit(event) {
    let taskItem = event.target.parentElement;
    let newValue = prompt("Edit your task:", taskItem.textContent.trim());
    if (newValue !== null && newValue !== "") {
        let oldValue = taskItem.textContent.trim();
        taskItem.childNodes[0].textContent = newValue + " ";
        updateTaskInLocalStorage(oldValue, newValue);
    }
}

// Function to update a task in local storage
function updateTaskInLocalStorage(oldValue, newValue) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldValue);
    if (index > -1) {
        tasks[index] = newValue;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}