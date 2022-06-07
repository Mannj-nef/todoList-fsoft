import Todo from "./component/Todo";
import TodoList from "./component/TodoList";

function App() {
  return (
    <div className="App">
      <TodoList>
        <Todo></Todo>
      </TodoList>
    </div>
  );
}

export default App;
