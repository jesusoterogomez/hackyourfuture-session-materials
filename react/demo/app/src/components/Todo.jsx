import { useState, useEffect } from "react";

const Todo = () => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("the value has changed");
  }, [taskName]);

  // Event for button
  const handleAddTask = () => {
    if (taskName.length === 0) {
      alert("nope");
      return;
    }
    // Get the value from the text box
    const newTask = {
      checked: false,
      name: taskName,
    };

    // Update the tasks list with the new text
    setTasks([...tasks, newTask]);

    // Clear the text field
    setTaskName("");
  };

  const handleCheckTask = (isChecked, index) => {
    tasks[index].checked = isChecked;

    // Update the tasks list with the new text
    setTasks([...tasks]);
  };

  return (
    <div>
      <h3>Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={(event) => handleCheckTask(event.target.checked, index)}
            />
            <p
              style={{
                opacity: task.checked ? 0.5 : 1,
                textDecoration: task.checked ? "line-through" : "",
              }}
            >
              {task.name}
            </p>
          </li>
        ))}
      </ul>

      <h3>New task</h3>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <button onClick={handleAddTask}>Add new task</button>
    </div>
  );
};

export default Todo;
