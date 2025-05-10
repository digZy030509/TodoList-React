import { useState, useEffect } from "react";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }
    setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
    setNewTask("");
    console.log("Task added:", newTask);

    // Save tasks to local storage
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...tasks,
        { id: Date.now(), name: newTask, completed: false },
      ])
    );
  };
  useEffect(() => {
    const storeTask = localStorage.getItem("tasks");
    if (storeTask) {
      setTasks(JSON.parse(storeTask));
    }
  }, []);

  const toggleChecked = (task) => {
    setTasks(
      tasks.map((checkedTask) =>
        checkedTask.id === task.id
          ? {
              ...checkedTask,
              completed: !checkedTask.completed,
            }
          : checkedTask
      )
    );
  };
  const deleteTask = (task) => {
    return () => {
      setTasks(tasks.filter((checkedTask) => checkedTask.id !== task.id));
      // delete from local storage
      const storeTask = localStorage.getItem("tasks");
      if (storeTask) {
        const tasks = JSON.parse(storeTask);
        const updatedTasks = tasks.filter(
          (checkedTask) => checkedTask.id !== task.id
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    };
  };

  return (
    <div className="w-3xl h-auto py-10 px-10 mx-auto mt-10 bg-white  shadow-2xl rounded-lg max-sm:w-full max-sm:mx-2">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-bold">My Todo List</h1>
        <div className="w-full mt-4 flex items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full mt-4 focus:outline-none focus:border-blue-500 transition duration-300"
          />
          <button
            className="w-1/4 max-sm:w-1/2 bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 hover:bg-blue-600 transition duration-300"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className="w-full mt-4">
          <ul className="list-disc list-inside">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2"
              >
                {task.completed ? (
                  <span className="line-through text-green-500">
                    {task.name}
                  </span>
                ) : (
                  <span className="text-gray-500  ">{task.name}</span>
                )}
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    name="completed"
                    id="completed "
                    className="w-4 h-4"
                    checked={task.completed}
                    onChange={() => toggleChecked(task)}
                  />
                  <button
                    className=" bg-red-500 text-white rounded-lg px-4 py-2  hover:bg-red-600 transition duration-300"
                    onClick={deleteTask(task)}
                    id={task.id}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
