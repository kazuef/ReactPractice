import './App.css';
import { useState, useRef } from "react";
import TodoList from "./TodoList"
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [names, setNames] = useState([]);

  const todoNameRef = useRef();


  // ボタンを押すと全件表示
  const handleClick = async () => {
    await fetch("http://localhost:80/", {
      method: "Get",
      mode: "no-cors",
      headers: {
        "Context-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("fetchに失敗しました" + res.ok);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("エラーです", error));
  };
  

  const handleAddTodo = (e) => {
    // タスクを追加する
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      {/* <button onClick={handleAddTodo}>タスクの追加</button> */}
      <button onClick={handleClick}>タスクの追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
