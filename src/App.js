import "./App.css";
import { doc, getDocs } from "firebase/firestore";
import { colRef } from "./components/firebase";
import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(colRef);
      setTodos(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      console.log(data);
    };
    getTodos();
  }, [getDocs]);

  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  );
}

export default App;
