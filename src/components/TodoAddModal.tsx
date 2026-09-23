import { useTasks } from "../context/TaskContext"

type TodoModalType = {
    isModalOpen: string,
    selectedDate: string,
    handleCloseModal: () => void
}

export const TodoAddModal = ({ isModalOpen, selectedDate, handleCloseModal }: TodoModalType) => {
    const {tasks,addTask} = useTasks();

    if (!isModalOpen || (isModalOpen && !selectedDate) || (isModalOpen && isModalOpen != "addModal")) return null

    const idOfLastTask = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;

    const taskSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTask({
            id: idOfLastTask,
            date: selectedDate,
            name: e.currentTarget.taskTitle.value,
            descr: e.currentTarget.descr.value,
            done: e.currentTarget.done.checked
        })
        handleCloseModal();
    }

    return (
        <div className="border border-white p-5 relative">
            <form className="flex gap-2 text-white" onSubmit={taskSubmit}>
                <input className="border border-white" type="text" name="taskTitle" id="taskTitle" />
                <textarea name="descr" id="descr" className="border border-white"></textarea>
                <input type="checkbox" name="done" id="done" />
                <label htmlFor="done">Is it done?</label>
                <button>Submit</button>
            </form>
            <span className="border border-white text-white absolute top-0 right-0" onClick={handleCloseModal}>close</span>
        </div>

    )
}