import "./App.css";
import React, { useState, useEffect } from "react";
import { db } from "./components/firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const colRef = collection(db, "todos");

  const getTodos = async () => {
    const data = await getDocs(colRef);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (inputText !== "") {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [inputText]);

  useEffect(
    () => {
      getTodos();
    },
    getTodos(),
    [inputText]
  );

  const addTodo = (e) => {
    e.preventDefault();
    addDoc(colRef, { name: inputText });
    setInputText("");
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    await getTodos();
  };

  return (
    <div className="App">
      <header>
        <h1>To do list</h1>
      </header>
      <form>
        <input
          value={inputText}
          className="todoInput"
          type="text"
          placeholder="Type here..."
          onChange={(e) => setInputText(e.target.value)}
        ></input>
        <button
          className="submit-button"
          onClick={addTodo}
          disabled={disableSubmit}
        >
          <i class="fa-solid fa-square-plus"></i>
        </button>
      </form>
      {todos.map((todos) => {
        return (
          <div className="list-of-todos" key={todos.id}>
            <h2 className="todos">{todos.name}</h2>
            <button onClick={() => deleteTodo(todos.id)} className="trash-btn">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
