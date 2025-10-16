const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const bulkInput = document.getElementById('bulkInput');
const bulkAddBtn = document.getElementById('bulkAddBtn');

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText === '') {
    alert('الرجاء إدخال مهمة!');
    return;
  }
  
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  
  tasks.push(task);
  taskInput.value = '';
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.style.background = '#f8f9fa';
    li.style.padding = '15px';
    li.style.marginBottom = '10px';
    li.style.borderRadius = '8px';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.listStyle = 'none';
    
    if (task.completed) {
      li.style.opacity = '0.6';
      li.style.textDecoration = 'line-through';
    }
    
    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    span.onclick = () => toggleTask(task.id);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.style.background = '#e74c3c';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '8px 15px';
    deleteBtn.style.borderRadius = '5px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.onclick = () => deleteTask(task.id);
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
  
  document.getElementById('totalTasks').textContent = tasks.length;
  document.getElementById('completedTasks').textContent = tasks.filter(t => t.completed).length;
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

clearBtn.addEventListener('click', function() {
  if (tasks.length === 0) {
    alert('القائمة فارغة!');
    return;
  }
  
  if (confirm('هل أنت متأكد من حذف كل المهام؟')) {
    tasks = [];
    renderTasks();
  }
});

bulkAddBtn.addEventListener('click', function() {
  const text = bulkInput.value.trim();
  
  if (text === '') {
    alert('الرجاء إدخال مهام!');
    return;
  }
  
  const lines = text.split('\n');
  
  lines.forEach(line => {
    const taskText = line.trim();
    if (taskText !== '') {
      const task = {
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false
      };
      tasks.push(task);
    }
  });
  
  bulkInput.value
