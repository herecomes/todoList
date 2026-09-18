import { useTasks } from "../context/TaskContext"

type TodoModalType = {
    isModalOpen: boolean,
    selectedTaskId: number | undefined,
    handleCloseModal: () => void
}

export const TodoEditModal = ({ isModalOpen, selectedTaskId, handleCloseModal }: TodoModalType) => {
    const {tasks} = useTasks();

    if (!isModalOpen || (isModalOpen && selectedTaskId === null || undefined)) return null
    console.log(selectedTaskId);
    
    const selectedTask = tasks[selectedTaskId!]
    
    // const idOfLastTask = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;

    // const taskSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(e);


    //     addTask({
    //         id: idOfLastTask,
    //         date: selectedDate,
    //         name: e.currentTarget.taskTitle.value,
    //         descr: e.currentTarget.descr.value,
    //         done: e.currentTarget.done.checked
    //     })
    //     handleCloseModal();
    // }

    return (
        <div className="border border-white p-5 relative">
            <form className="flex gap-2 text-white">
                <input className="border border-white" type="text" name="taskTitle" id="taskTitle" value={selectedTask.name}/>
                <textarea name="descr" id="descr" className="border border-white" value={selectedTask.descr}></textarea>
                <input type="checkbox" name="done" id="done" checked={selectedTask.done}/>
                <label htmlFor="done">Is it done?</label>
                <button>Submit</button>
            </form>
            <span className="border border-white text-white absolute top-0 right-0" onClick={handleCloseModal}>close</span>
        </div>

    )
}