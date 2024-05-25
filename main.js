
import taskManager from './taskManager.js';

// Cargar tareas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  taskManager.loadTasks();
});

// Event Listeners (Escuchadores de eventos)
document.getElementById("taskForm").addEventListener("submit", (event) => {
  //event.preventDefault();
  // Obtener el valor del campo de entrada de la tarea
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value;
  // Agregar una nueva tarea utilizando el administrador de tareas
  taskManager.addTask(taskName);
  // Limpiar el campo de entrada después de agregar la tarea
  taskInput.value = "";
});

document.getElementById("taskList").addEventListener("click", (event) => {
  // Si se hace clic en el botón de eliminar tarea
  if (event.target.classList.contains("delete-task-btn")) {
    // Obtener el ID de la tarea a eliminar
    const taskId = event.target.getAttribute("data-task-id");
    // Eliminar la tarea utilizando el administrador de tareas
    taskManager.deleteTask(taskId);
  }
// Si se hace clic en el botón de alternar estado de tarea
if (event.target.classList.contains("toggle-task-btn")) {
  // Obtener el ID de la tarea para cambiar su estado
  const taskId = event.target.getAttribute("data-task-id");
  // Cambiar el estado de la tarea utilizando el administrador de tareas
  taskManager.toggleTaskStatus(taskId);
}
});

