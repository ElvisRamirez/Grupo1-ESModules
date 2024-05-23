

// Módulo de administrador de tareas
const taskManager = (() => {
  // Array para almacenar las tareas
  let tasks = [];

  // Función para agregar una tarea
  const addTask = (taskName) => {
    if (taskName.trim() !== "") {
      // Crear un objeto tarea
      const task = {
        id: Date.now().toString(),
        name: taskName.trim(),
        completed: false
      };
      // Agregar la tarea al array
      tasks.push(task);
      // Guardar las tareas en el almacenamiento local y renderizarlas
      saveTasks();
      renderTasks();
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    // Filtrar las tareas para mantener solo las que no coinciden con el ID proporcionado
    tasks = tasks.filter(task => task.id !== taskId);
    // Guardar las tareas actualizadas en el almacenamiento local y renderizarlas
    saveTasks();
    renderTasks();
  };

  // Función para tachar el estado de una tarea
  const toggleTaskStatus = (taskId) => {
    // Iterar sobre las tareas y cambiar el estado de la tarea con el ID proporcionado
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
    });
    // Guardar las tareas actualizadas en el almacenamiento local y renderizarlas
    saveTasks();
    renderTasks();
  };

  // Función para guardar las tareas en el almacenamiento local
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Función para cargar las tareas desde el almacenamiento local
  const loadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
    // Renderizar las tareas
    renderTasks();
  };

  // Función para renderizar las tareas en la página
  const renderTasks = () => {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";
    tasks.forEach(task => {
      const taskItem = document.createElement("li");
      taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
      taskItem.innerHTML = `
        <span class="${task.completed ? 'text-decoration-line-through' : ''}">${task.name}</span>
        <div>
          <button class="btn btn-danger btn-sm me-2 delete-task-btn" data-task-id="${task.id}">
            <i class="bi bi-trash"></i> Eliminar
          </button>
          <button class="btn btn-secondary btn-sm toggle-task-btn" data-task-id="${task.id}">
            <i class="bi bi-check-lg"></i> Marcar
          </button>
        </div>
      `;
      taskListElement.appendChild(taskItem);
    });
  };

  // Métodos públicos que se pueden acceder fuera del módulo
  return {
    addTask,
    deleteTask,
    toggleTaskStatus,
    loadTasks
  };
})();

export default taskManager;
