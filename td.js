// Get task form, task input, pending tasks list, and completed tasks list
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const pendingTasksList = document.getElementById("pendingTasks");
const completedTasksList = document.getElementById("completedTasks");

// Add event listener to the task form
taskForm.addEventListener("submit", addTask);

// Function to add a new task
function addTask(event) {
  event.preventDefault();

  const task = taskInput.value.trim();

  if (task !== "") {
    const listItem = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.innerText = task;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const completeButton = document.createElement("button");
    completeButton.innerText = "Complete";
    completeButton.addEventListener("click", completeTask);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", editTask);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteTask);

    actions.appendChild(completeButton);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    listItem.appendChild(taskText);
    listItem.appendChild(actions);

    pendingTasksList.appendChild(listItem);
  }

  taskInput.value = "";
}

// Function to mark a task as complete
function completeTask() {
  const listItem = this.parentNode.parentNode;
  const taskText = listItem.querySelector("span");

  listItem.removeChild(this.parentNode);
  taskText.classList.add("completed");

  const actions = listItem.querySelector(".actions");
  actions.innerHTML = "";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", deleteTask);

  actions.appendChild(deleteButton);

  completedTasksList.appendChild(listItem);
}

// Function to edit a task
function editTask() {
  const listItem = this.parentNode.parentNode;
  const taskText = listItem.querySelector("span");
  const actions = listItem.querySelector(".actions");

  taskInput.value = taskText.innerText;
  taskInput.focus();

  listItem.removeChild(actions);
  listItem.removeChild(taskText);

  taskForm.removeEventListener("submit", addTask);
  taskForm.addEventListener("submit", saveTask);

  function saveTask(event) {
    event.preventDefault();

    const newTask = taskInput.value.trim();

    if (newTask !== "") {
      taskText.innerText = newTask;

      actions.appendChild(taskText);
      actions.appendChild(this.parentNode);

      taskInput.value = "";

      taskForm.removeEventListener("submit", saveTask);
      taskForm.addEventListener("submit", addTask);
    }
  }
}

// Function to delete a task
function deleteTask() {
  const listItem = this.parentNode.parentNode;
  const parentList = listItem.parentNode;
  parentList.removeChild(listItem);
}
