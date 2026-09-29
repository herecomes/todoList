import { useDate } from "../context/DateContext";
import { DateTime } from "luxon";
import { useTasks } from "../context/TaskContext";

type WeeksProps = {
    handleOpenAddModal: (d: string) => void,
    handleOpenEditModal: (d: number) => void;
};
export const Weeks = ({handleOpenAddModal,handleOpenEditModal}: WeeksProps) => {
    const {monthIndex, year} = useDate();
    const {tasks, toggleTask} = useTasks();

    const daysCalc = (new Date(year, monthIndex + 1, 0)).getDate();
    const daysArr = Array.from({ length: daysCalc }, (_, i) => i);
    const firstDay = ((new Date(year, monthIndex, 1).getDay()) + 6) % 7;
    const firstDayArr = Array.from({ length: firstDay }, (_, i) => i);
    const clickedDate = (i: number) => {
        // const dateClicked = new Date(year, monthIndex, i);
        const dateClicked = DateTime.local(year, monthIndex + 1, i).toISO();
        handleOpenAddModal(dateClicked ? dateClicked : DateTime.now().toISO());
    }
    const toDoEachDay = (d: number) => {
        const passed = DateTime.local(year, monthIndex + 1, d);
        const dayTasks = tasks.filter(t => {
            const stored = DateTime.fromJSDate(new Date(t.date));
            return stored.hasSame(passed, 'day')
        });

        return (
            dayTasks.map((t) => {
                return (
                    <div key={t.id} className="day-task">
                        <span key={"taskName_" + t.id} className="taskName" onClick={() => handleOpenEditModal(t.id)}>{t.name}</span>
                        <input key={"taskDone_" + t.id} type="checkbox" name="done" id="done" checked={t.done} onChange={() => toggleTask(t.id)}/>
                    </div>
                );
            })
        );
    };
    return (
        <section id="weeks">
            {
                <div className="days grid grid-cols-7 gap-4 border-1 border-[#333537] rounded-[28px] overflow-hidden pt-[20px] pb-[20px] pl-[10px] pr-[10px]">
                    {
                        firstDayArr.map((_,i) => {
                            return <div className="empty-day flex-1" key={"empty-" + year + "-" + monthIndex + "-" + i}></div>;
                        })
                    }
                    {
                        daysArr.map((d,i) => {
                            return (
                                <div className="day flex flex-col text-center border-1 border-[#333537] rounded-[18px] overflow-hidden p-3" key={i}>
                                    {d + 1}
                                    {toDoEachDay(d + 1)}
                                    <button className="border border-white add-todo w-auto inline-block m-auto p-2 rounded-[18px] cursor-pointer mt-3" onClick={() => clickedDate(d + 1)}>Add the task</button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </section>
    );
}