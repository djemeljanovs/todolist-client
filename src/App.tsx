import React from 'react';
import TodoListView from "./views/TodoListView";
import ApiProvider from "./components/providers/ApiProvider";

function App() {
  return (
      <ApiProvider>
        <TodoListView />
      </ApiProvider>
  );
}

export default App;
