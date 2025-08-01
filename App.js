function App() {
  const [task, setTask] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  async function addTask() {
    if (!task.trim()) return;

    let category = "Other";
    try {
      const resp = await fetch("http://localhost:5000/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
      });
      const jo = await resp.json();
      category = jo.category || category;
    } catch (err) {
      console.error("AI error:", err);
    }

    setTodos([{ task, category }, ...todos]);
    setTask("");
  }

  function removeTask(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div className="container">
      <h2>AI‑Powered To‑Do</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task…"
      />
      <button onClick={addTask}>Add with AI</button>
      <ul>
        {todos.map(({ task, category }, i) => (
          <li key={i}>
            <div>
              <strong>{task}</strong>
              <small> [{category}]</small>
            </div>
            <button onClick={() => removeTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}