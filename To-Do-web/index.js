
let allTasks = [];
let completedTasks = [];


function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  
  if (taskText === "") return;
  
  const newTask = {
    text: taskText,
    added: new Date().toLocaleString(),
    completed: false,
  };

  allTasks.push(newTask);
  updateLists();
  taskInput.value = "";
}


function updateLists() {
  const allTasksList = document.getElementById("allTasks");
  const completedTasksList = document.getElementById("completedTasks");

  allTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  allTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${task.text} - Added: ${task.added}</span>
      <span>
        <button onclick="completeTask(${index})">Complete</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </span>
    `;
    allTasksList.appendChild(listItem);
  });

  completedTasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("completed");
    listItem.innerHTML = `
      <span>${task.text} - Added: ${task.added} - Completed: ${task.completed}</span>
      <span>
        <button onclick="deleteTask(${index}, true)">Delete</button>
      </span>
    `;
    completedTasksList.appendChild(listItem);
  });
}


function completeTask(index) {
  const task = allTasks.splice(index, 1)[0];
  task.completed = new Date().toLocaleString();
  completedTasks.push(task);
  updateLists();
}


function editTask(index) {
  const newTaskText = prompt("Edit the task:", allTasks[index].text);
  if (newTaskText !== null) {
    allTasks[index].text = newTaskText;
    updateLists();
  }
}


function deleteTask(index, isCompletedTask = false) {
  if (isCompletedTask) {
    completedTasks.splice(index, 1);
  } else {
    allTasks.splice(index, 1);
  }
  updateLists();
}


updateLists();
