const formTasks = document.querySelector('.form-tasks');
const listNew = document.querySelector('.list-new');
const listDone = document.querySelector('.list-done');
const inputTasks = document.querySelector('.input-tasks');

const DONE = 'Done';
const INPROGRESS = 'In Progress';
const NODONE = 'No Done';
const NOTDEFINED = 'Not Defined';

const toDo = [];

function addTask(taskName, status = NOTDEFINED) {
  const task = toDo.find((elem) => elem.task === taskName);

  if (!task) {
    if (taskName.length > 20) {
      throw new Error('слишком длинное название!');
    }
    const newTask = { task: taskName, status };
    toDo.push(newTask);
    return 'задача добавлена';
  } else {
    throw new Error('такая задача уже есть');
  }
}

function delTask(taskName) {
  const task = toDo.find((elem) => elem.task === taskName);

  if (!task) {
    throw new Error('такой задачи нет');
  }
  const index = toDo.indexOf(task);

  toDo.splice(index, 1);
  return 'Задача удалена';
}

function changeStatus(taskName, newStatus) {
  const task = toDo.find((item) => item.task === taskName);

  if (task) {
    task.status = newStatus;
    return 'Статус изменен';
  } else {
    throw new Error('такой задачи нет');
  }
}

// Функция для рендера задач
function renderTasks() {
  // Очищаем списки
  listNew.innerHTML = '';
  listDone.innerHTML = '';

  toDo.forEach((task) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('task');

    const taskValue = document.createElement('span');
    taskValue.textContent = task.task;
    taskValue.classList.add('task-value');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    // Устанавливаем состояние чекбокса в зависимости от статуса задачи
    if (task.status === DONE) {
      checkbox.checked = true;
      newDiv.style.backgroundColor = '#e7e4e4';
    }

    checkbox.addEventListener('click', () => {
      if (checkbox.checked) {
        changeStatus(task.task, DONE);
        newDiv.style.backgroundColor = '#e7e4e4';
      } else {
        changeStatus(task.task, NODONE);
        newDiv.style.backgroundColor = '';
      }
      renderTasks();
    });

    const delButton = document.createElement('button');
    delButton.classList.add('del-button');
    const icon = document.createElement('img');
    icon.src = 'images/del.png';
    delButton.appendChild(icon);

    delButton.addEventListener('click', () => {
      try {
        delTask(task.task);
        renderTasks();
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    });

    newDiv.append(checkbox, taskValue, delButton);

    if (task.status === DONE) {
      listDone.appendChild(newDiv);
    } else {
      listNew.appendChild(newDiv);
    }
  });
}

formTasks.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputText = inputTasks.value;

  try {
    addTask(inputText);
    renderTasks();
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }

  inputTasks.value = '';
});

renderTasks();
