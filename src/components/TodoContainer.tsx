import { ReactNode } from "react"


const TodoContainer = ({ children }: { children: ReactNode }) => {
    return (
        <section className="transition-all space-y-3">
            {children}
        </section>
    )
}

export default TodoContainer