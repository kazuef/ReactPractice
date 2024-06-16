import React from 'react'

const TodoList = ({ todos }) => {
  return todos.map((todo) => <Todo todo={todo} />);
};

export default TodoList;