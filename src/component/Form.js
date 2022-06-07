import React, { forwardRef, memo, useRef } from "react";

const Form = ({ submit, value, change, formRef }, inputRef) => {
  // const inputRef = useRef();
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

export default memo(forwardRef(Form));
