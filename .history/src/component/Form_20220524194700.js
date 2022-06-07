import React, { memo, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Form = ({ submit, value, change, formRef }) => {
  const inputRef = useContext(ThemeContext);
  return (
    <form ref={formRef} className="todo-form" onSubmit={submit}>
      <label className="todo-lable" htmlFor="todo">
        Todo-List
      </label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={change}
        id="todo"
        className="input-control"
        autoComplete="off"
      />
      <button className="btn btn-add">ADD</button>
    </form>
  );
};

export default memo(Form);
