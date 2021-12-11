import React, { useReducer, useState } from "react";
import "./App.css";
import Todo from "./Todo";

const App = () => {
  const [name, setName] = useState();

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: Date.now(), name: action.payload.name, completed: false },
        ];
      case "toggle":
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
      case "delete":
        return state.filter((value) => value.id !== action.payload.id);
      default:
        return state;
    }
  };
  const handleAdd = () => {
    dispatch({ type: "add", payload: { name: name } });
    setName("");
  };
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    <div className="app">
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <div>
        {todos.map((value) => {
          return <Todo value={value} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
};

export default App;
