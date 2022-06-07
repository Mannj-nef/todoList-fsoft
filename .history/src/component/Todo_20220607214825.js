import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { deleteApi, getApi, postApi, putApi } from "../api";
import Form from "./Form";
import TodoItem from "./TodoItem";

const TodoStyle = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  margin: 100px auto;
  padding: 50px;

  border-radius: 20px;
  text-align: center;
  color: var(--text);

  -webkit-box-shadow: 6px 7px 28px 7px rgba(0, 0, 0, 0.26);
  box-shadow: 6px 7px 28px 7px rgba(0, 0, 0, 0.26);
  .todo-title {
    margin-bottom: 20px;
  }
  .todo-form {
    width: 100%;
    display: flex;
    margin-bottom: 40px;

    position: relative;
    border-radius: 8px;
    .todo-lable {
      display: inline-block;
      font-weight: 500;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 10px;
      background-color: var(--white);
      padding: 1px 5px;
      font-size: 15px;
      transform: translateY(-50%);
      color: var(--text);
    }

    .input-control {
      border: 1px solid #ccc;
      padding: 10px 15px;
      outline: none;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      width: 100%;
    }
    .btn-add {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  }
  .dashed-loading {
    position: relative;
    height: 50px;
  }

  .dashed-loading:after,
  .dashed-loading:before {
    --size: 40px;
    content: "";
    position: absolute;
    top: 0;
    left: calc(50% - var(--size) / 2px);
    /* transform: translateX(-50%); */
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
  }

  .dashed-loading:before {
    z-index: 5;
    border: 3px dashed var(--primary);
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    -webkit-animation: dashed 1s linear infinite;
    animation: dashed 1s linear infinite;
  }

  .dashed-loading:after {
    z-index: 10;
    border: 3px solid var(--primary);
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    -webkit-animation: dashed 1s ease infinite;
    animation: dashed 1s ease infinite;
  }

  @keyframes dashed {
    to {
      transform: rotate(360deg);
    }
  }
  .todo-list {
    width: 100%;
    list-style: none;
    .todo-item {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 10px;
      margin-bottom: 10px;

      border: 1px solid #ccc;
      border-radius: 10px;

      user-select: none;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      .todo-content {
        display: flex;
        align-items: center;
        .todo-check {
          --size: 15px;
          width: var(--size);
          height: var(--size);
          margin-right: 10px;
          border-radius: 100%;

          user-select: none;
          font-weight: 700;
          font-size: 10px;
          color: var(--white);

          display: inline-flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
          border: 1px solid var(--primary);
        }
      }
      .icon-remove {
        border-radius: 8px;
        padding: 10px;
        background-color: var(--red);
      }
    }
  }
`;

const Todo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [idValue, setIdVAlue] = useState(0);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef();
  const formRef = useRef();
  const isMouned = useRef(false);

  const apiUrl = "https://626158b4327d3896e27a39aa.mockapi.io/todo-app";
  const btnSubmit = document.querySelector(".btn-add");

  useEffect(() => {
    handleGetApi();
  }, []);

  useEffect(() => {
    isMouned.current = true;
    return () => (isMouned.current = false);
  }, []);

  async function handleGetApi() {
    try {
      const data = await getApi(apiUrl);
      setLoading(false);
      if (isMouned) {
        setTodos(data);
      }
    } catch (error) {
      console.log("looix");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.length <= 0) return;

    if (btnSubmit.textContent === "ADD") {
      addTodo();
    }

    if (btnSubmit.textContent === "UPPDATE") {
      btnSubmit.textContent = "ADD";
      uppdateTodo();
    }

    setValue("");
  };

  async function addTodo() {
    try {
      setLoading(true);
      const data = await postApi(apiUrl, { todo: value });
      setLoading(false);
      setTodos([...todos, data]);

      formRef.current.focus();
      console.log(formRef.current);
    } catch (error) {
      console.log("looix");
    }
  }

  async function uppdateTodo() {
    try {
      const data = await putApi(apiUrl, idValue, {
        todo: value,
      });

      const todoCopy = [...todos];
      const index = todos.findIndex((item) => item.id === data.id);

      todoCopy[index].todo = data.todo;

      setTodos(todoCopy);
    } catch (error) {
      console.log("looix update");
    }
  }

  const handleUpdate = useCallback((id) => {
    const btnSubmit = document.querySelector(".btn-add");
    const textTodo = document.querySelector(`.todo-text-${id}`);
    const value = textTodo.textContent;

    btnSubmit.textContent = "UPPDATE";

    setIdVAlue(id);
    setValue(value);

    console.log(formRef.current);
  }, []);

  const handleRemoveTodo = useCallback((id) => {
    try {
      const liTag = document.querySelector(`.todo-item-${id}`);
      liTag.parentNode.removeChild(liTag);

      deleteApi(apiUrl, id);
    } catch (error) {
      console.log("looix");
    }
  }, []);

  const handleCheck = useCallback((e, id) => {
    const clicked = e.target;
    const todoTexts = document.querySelector(`.todo-text-${id}`);

    clicked.classList.toggle("checked");
    todoTexts.classList.toggle("line");
  }, []);

  return (
    <TodoStyle>
      <h1 className="todo-title">Todo List</h1>

      <Form
        formRef={formRef}
        inputref={inputRef}
        submit={(e) => handleSubmit(e)}
        value={value}
        change={(e) => setValue(e.target.value.trim())}
      ></Form>

      {loading && <div className="dashed-loading"></div>}

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className={`todo-item-${item.id}`}>
            <TodoItem
              doubleCkick={() => handleUpdate(item.id)}
              check={(e) => handleCheck(e, item.id)}
              todoText={item.todo}
              id={item.id}
              remove={() => handleRemoveTodo(item.id)}
            ></TodoItem>
          </li>
        ))}
      </ul>
    </TodoStyle>
  );
};

export default Todo;
