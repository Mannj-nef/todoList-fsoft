import React, { memo } from "react";

const TodoItem = ({ id, doubleCkick, check, todoText, remove, data }) => {
  return (
    <p className="todo-item" onDoubleClick={doubleCkick}>
      <span className="todo-content">
        <span className="todo-check" data={data} onClick={check}>
          ✔
        </span>
        <span className={`todo-text-${id}`}>{todoText}</span>
      </span>
      <i
        className="fa-solid fa-trash-can btn icon-remove"
        id={id}
        onClick={() => remove(id)}
      ></i>
    </p>
  );
};

export default memo(TodoItem);
