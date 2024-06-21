import './App.css';
import { useState, useRef } from "react";
import TodoList from "./TodoList"
import AddName from "./AddName"
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [names, setNames] = useState([]);

  const todoNameRef = useRef();
  const namesRef = useRef();


  // ボタンを押すと全件表示
  const handleAddName = () => {
    fetch("http://localhost:80/api/customers", /*{
      // http://localhost:80/
      // method: "Get",
      // mode: "no-cors"
      // headers: {
      //   "Context-Type": "application/json",
      //   "Access-Control-Allow-Origin": "http://localhost:3000"
      // }
    }*/)
      .then((res) => res.json())
      .then((json) => setNames(json))
      .catch((error) => console.error("エラーです", error));
  };

  console.log(names);


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
      <button onClick={handleAddTodo}>タスクの追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
      <br />
      <AddName names={names} />
      <button onClick={handleAddName}>名前追加</button>
    </div>
  );
}

export default App;
