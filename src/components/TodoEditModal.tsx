import { useTasks } from "../context/TaskContext"

type TodoModalType = {
    isModalOpen: string,
    selectedTaskId: number | undefined,
    handleCloseModal: () => void
}

export const TodoEditModal = ({ isModalOpen, selectedTaskId, handleCloseModal }: TodoModalType) => {
    const {tasks, editTask, toggleTask} = useTasks();

    if (!isModalOpen || (isModalOpen && (selectedTaskId === null || selectedTaskId === undefined)) || (isModalOpen && isModalOpen != "editModal")) return null
    
    const selectedTask = tasks.find(t => t.id === selectedTaskId);
    if (!selectedTask) return null;

    const taskEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        editTask(
            selectedTask.id,
            e.currentTarget.taskTitle.value,
            e.currentTarget.descr.value
        )
        handleCloseModal();
    }

    return (
        <div className="border border-white pt-10 pb-10 pl-5 pr-5 relative rounded-[28px] bg-white">
            <form className="flex flex-col gap-5 text-black" onSubmit={taskEdit} key={selectedTask.id}>
                <input className="border border-black rounded-[28px] text-center p-3 max-w-[80vw] min-w-[300px]" type="text" name="taskTitle" id="taskTitle" defaultValue={selectedTask.name} placeholder="Title of the task"/>
                <textarea name="descr" id="descr" className="border border-black rounded-[28px] text-center p-3 max-w-[80vw] min-w-[300px]" defaultValue={selectedTask.descr} placeholder="Description of the task"></textarea>
                <div className="flex flex-row justify-center items-center gap-1">
                    <input className="cursor-pointer w-[30px] h-[30px]" type="checkbox" name="done" id={"done_"+selectedTask.id} checked={selectedTask.done} onChange={() => toggleTask(selectedTask.id)}/>
                    <label className="cursor-pointer" htmlFor={"done_" + selectedTask.id}>Is it done?</label>
                </div>
                <button className="cursor-pointer border border-black rounded-[28px] text-center p-3 max-w-[80vw] min-w-[300px] hover:bg-black hover:text-white transition duration-300 ease-in-out">Submit</button>
            </form>
            <span className="text-2xl text-black absolute top-1 right-2 cursor-pointer rounded-full pl-1 p-1 leading-none hover:text-red-500 transition duration-300 ease-in-out" onClick={handleCloseModal}>✕</span>
        </div>

    )
}