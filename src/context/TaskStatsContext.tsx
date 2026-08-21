import { createContext, useContext, useMemo } from "react";
import { useTasks } from "./TaskContext";

type TasksStats = {
    done: number,
    undone: number,
    percentage: number
}

const TasksStatsContext = createContext<TasksStats | undefined>(undefined);

export const TaskStatsProvider = ({children}: {children: React.ReactNode}) => {
    const {tasks} = useTasks();
    const value = useMemo(() => {
        const stats: TasksStats = {done:0, undone: 0, percentage: 0};
        const total = tasks.length;
        if(total === 0) return stats;
        stats.done = tasks.filter((t) => t.done).length;
        stats.undone = total - stats.done;
        stats.percentage = Math.round((stats.done / total) * 100);
        return stats;
    },[tasks]);

    return <TasksStatsContext.Provider value={value}>{children}</TasksStatsContext.Provider>
}

export const useTasksStats = () => {
    const context = useContext(TasksStatsContext);
    if(!context) throw new Error("U can't use useTasksStats outside of TaskStatsProvider")
    return context;
}