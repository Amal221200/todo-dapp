import TodoContainer from "./components/TodoContainer"
import TodoForm from "./components/TodoForm"
import TodoItem, { Todo } from "./components/TodoItem";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, TodoABI } from "./blockchain/constants";
import useMutateTodo from "./hooks/useMutateTodo";


function App() {
  const { address } = useAccount()
  const { data: todos } = useReadContract({ abi: TodoABI, address: CONTRACT_ADDRESS, functionName: "getTodos", args: [], account: address })

  const { createTodo } = useMutateTodo()

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="text-center text-2xl font-semibold">Todo Dapp</h1>
        <TodoForm onSubmit={(todo) => createTodo(todo)} />
        <TodoContainer>
          {
            (todos as (Todo[] | undefined))?.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))
          }
        </TodoContainer>
      </div>
    </div>
  )
}

export default App