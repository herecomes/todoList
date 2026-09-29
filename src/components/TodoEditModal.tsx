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
        <div className="border border-white p-5 relative">
            <form className="flex gap-2 text-white" onSubmit={taskEdit} key={selectedTask.id}>
                <input className="border border-white" type="text" name="taskTitle" id="taskTitle" defaultValue={selectedTask.name}/>
                <textarea name="descr" id="descr" className="border border-white" defaultValue={selectedTask.descr}></textarea>
                <input type="checkbox" name="done" id={"done_"+selectedTask.id} checked={selectedTask.done} onChange={() => toggleTask(selectedTask.id)}/>
                <label htmlFor={"done_"+selectedTask.id}>Is it done?</label>
                <button>Submit</button>
            </form>
            <span className="border border-white text-white absolute top-0 right-0 cursor-pointer" onClick={handleCloseModal}>close</span>
        </div>

    )
}