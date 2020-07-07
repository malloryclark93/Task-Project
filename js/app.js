// Define UI variavles

const form = document.querySelector('#task-form');// we grab the form by it's id #task-form in HTML
// Our form 

const taskList = document.querySelector('.collection'); // selecting the ul list which is .cellection 
// Where are ul & li's will be 

const clearBtn = document.querySelector('.clear-tasks'); // clearBtn has the class of .clear-tasks
// black button

const filter = document.querySelector('#filter'); // input type has the id of filer (#filter)
// filter tasks, bottom input

const taskInput = document.querySelector('#task'); // input type has the id of task (#task)
// new tasks / top input 


// load all event listeners 
loadEventListeners();

function loadEventListeners(){
  // DOM load event  
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event 
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event 
  filter.addEventListener('keyup', filterTasks);

}

// Get tasks from local storage
function getTasks(){
 let tasks; // see if any content is in storage
  if(localStorage.getItem('tasks') === null) {
  tasks = []; // if there isn't, set it to an empty array 
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }


  tasks.forEach(function(task){
       // Create li element 
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    // ^^ the li we are appending is whatever we put as the input. If we add 'walk the dog' it will appear as a new li. 'walk the dog' is taskInput.value (value of input)

    // Create new link element 
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'; // this innerHTML tag creates the 'x' icon to the right of the li 

    // Append the link to the li
    li.appendChild(link);
    // Append the li to the ul 
    taskList.appendChild(li);

    
  
  });

}



// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a Task'); 
  }

  // Create li element 
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // ^^ the li we are appending is whatever we put as the input. If we add 'walk the dog' it will appear as a new li. 'walk the dog' is taskInput.value (value of input)

  // Create new link element 
  const link = document.createElement('a');
  // Add class 
  link.className = 'delete-item secondary-content';
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>'; // this innerHTML tag creates the 'x' icon to the right of the li 

  // Append the link to the li
  li.appendChild(link);
  // Append the li to the ul 
  taskList.appendChild(li);


  // Store in Local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input after each use 
  taskInput.value = '';


  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks; // this is creating a variable in the function
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    

  }

  




// Remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){ // adds alert 'Are you sure?'
    console.log(e.target);
    e.target.parentElement.parentElement.remove();// selects the parent of the 'icon' fa fa remove which is the 'a' tag, then selects the parent of the 'a' tag which is the li. We want to delete the li so we use event delegation to go down from the parent to the child 

      // Romove from local storage
      removeTaskFromLocalStorage
      (e.target.parentElement.parentElement);

    }
  }
}

// Remove from Local Storage 
function removeTaskFromLocalStorage(taskItem){
  // console.log(taskItem);
  let tasks = [];
  if(localStorage.getItem('tasks') === null){
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  
  });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Clear Tasks

function clearTasks(e){
  // taskList.innerHTML = ''; // clears task list SUPER EASY but 
  
 // OR

  //Faster
  while(taskList.firstChild){

    taskList.removeChild(taskList.firstChild)
    //^^ remove li of taskList -- faster in browser 
  }

   // Clear From Local Storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !=-1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }

  });
}
