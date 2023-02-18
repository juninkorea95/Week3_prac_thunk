import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getTodos } from "./modules/todoSlice";

function App() {

  const dispatch = useDispatch()

  const { isLoading, error, todos} = useSelector(state => {
    return state.todos;
  })

  
  useEffect(() => {
    dispatch(__getTodos())
  },[])

  if (isLoading) {
    return <div>로딩중...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      {
        todos.map((todo) => {
          return <div key= {todo.id}>
            {todo.title}
          </div>
        })
      }
    </div>
  );
}

export default App;
