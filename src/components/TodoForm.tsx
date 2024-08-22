import { FormEvent } from "react"
import { useAccount } from "wagmi"

const TodoForm = ({ onSubmit }: { onSubmit: (todo: string)=> void }) => {
    const { isDisconnected } = useAccount()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const task = formData.get('task')?.toString()
        if (!task) {
            return
        }

        onSubmit(task)
    }
    return (
        <form onSubmit={handleSubmit} className="my-2">
            <input disabled={isDisconnected} type="text" className="rounded-md bg-[#333] px-3 py-2 disabled:cursor-not-allowed" name="task" placeholder="Enter a task" />
        </form>
    )
}

export default TodoForm