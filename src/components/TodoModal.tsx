type TodoModalType = {
    isModalOpen: boolean,
    selectedDate: Date | null
    handleCloseModal: () => void
}

export const TodoModal = ({isModalOpen,selectedDate, handleCloseModal}: TodoModalType) => {
    if(!isModalOpen) return null
    console.log(selectedDate);
    return (
        <div>
            hi!
            <button onClick={handleCloseModal}>close</button>
        </div>
        
    )
}