import useMutateTodo from "../hooks/useMutateTodo"


export interface Todo {
    id: number,
    task: string,
    completed: boolean
}

interface TodoItemProps {
    todo: Todo,
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const { updateTodo, deleteTodo } = useMutateTodo()
    return (
        <article className="flex items-center justify-between gap-x-2 rounded-md border px-2 py-2 transition-all">
            <button type="button" onClick={() => { updateTodo(todo.id) }} className={`h-3 w-3 rounded-full border ${todo.completed ? "bg-[#eee]" : "bg-none"}`} />
            <p className={`flex-1 ${todo.completed ? 'line-through' : ""}`}>{todo.task}</p>
            <button type="button" onClick={() => { deleteTodo(todo.id) }} className="rounded-full">
                <img src="/trash.png" width={13} height={13} alt="" />
            </button>
        </article>
    )
}

export default TodoItem