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
        <div className="border border-white pt-10 pb-10 pl-5 pr-5 relative rounded-[28px] bg-white">
            <form className="flex flex-col gap-5 text-black" key={"newTask_"+idOfLastTask} onSubmit={taskSubmit}>
                <input className="border border-black rounded-[28px] text-center p-3 max-w-[80vw] min-w-[600px]" type="text" name="taskTitle" id="taskTitle" placeholder="Title of the task" />
                <textarea name="descr" id="descr" className="border border-black rounded-[28px] text-center p-3 max-w-[80vw] min-w-[600px]" placeholder="Description of the task"></textarea>
                <div className="flex flex-row justify-center items-center gap-1">
                    <input className="cursor-pointer w-[30px] h-[30px]" type="checkbox" name="done" id={"done_" + idOfLastTask} />
                    <label className="cursor-pointer" htmlFor={"done_" + idOfLastTask}>Is it done?</label>
                </div>
                <button className="cursor-pointer border border-black rounded-[28px] text-center p-3 max-w-[80vw] min-w-[600px] hover:bg-black hover:text-white transition duration-300 ease-in-out">Submit</button>
            </form>
            <span className="text-2xl text-black absolute top-1 right-2 cursor-pointer rounded-full pl-1 p-1 leading-none hover:text-red-500 transition duration-300 ease-in-out" onClick={handleCloseModal}>✕</span>
        </div>

    )
}