import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/auth.jsx";
import { db } from "../../firebase/firebaseConfig.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const Todos = () => {
  const { logOut, authUser } = useContext(AuthContext);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const addToDo = async () => {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        owner: authUser.uid,
        content: todoInput,
        completed: false,
        timestamp: serverTimestamp(),
      });
      setTodoInput("");
      fetchTodos(authUser.uid);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (docId) => {
    try {
      await deleteDoc(doc(db, "todos", docId));
      fetchTodos(authUser.uid);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodos = async (uid) => {
    try {
      const q = query(
        collection(db, "todos"),
        where("owner", "==", uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };
  const markAsCompleted = async (event, docId) => {
    try {
      const docRefId = doc(db, "todos", docId);
      await updateDoc(docRefId, {
        completed: event.target.checked,
      });
      fetchTodos(authUser.uid);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (authUser) {
      fetchTodos(authUser.uid);
    }
  }, []);
  return (
    <>
      <div className="relative h-screen">
        <p>Hello Todos</p>
        <input
          type="text"
          className="border border-gray-300 p-2 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addToDo();
            }
          }}
        />

        <button className="border-gray border-2 p-2 ml-2" onClick={addToDo}>
          ADD
        </button>
        {todos.map((item, index) => (
          <>
            <div key={index} className="p-2">
              <input
                type="checkbox"
                checked={item?.completed}
                id={item?.id}
                onChange={(e) => markAsCompleted(e, item?.id)}
              />
              <label>{item.content}</label>
              <span
                className="border-black border-[1px] ml-2 cursor-pointer"
                onClick={() => deleteTodo(item?.id)}
              >
                delete
              </span>
            </div>
          </>
        ))}
        <button
          onClick={logOut}
          className="absolute right-10 bottom-20 border-black border-2 p-2 "
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Todos;
