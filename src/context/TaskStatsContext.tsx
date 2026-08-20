import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { useTasks } from "./TaskContext";

type TasksStats = {
    done: number,
    undone: number,
    percentage: number
}

type TasksStatsContextType = {
    stats: TasksStats
}

const TasksStatsContext = createContext<TasksStatsContextType | undefined>(undefined);

export const TaskStatsProvider = ({children}: {children: React.ReactNode}) => {
    const [stats, setStats] = useState<TasksStats>(() => {
        const saved = localStorage.getItem("TasksStats");
        if(!saved) return;
        try {
            return JSON.parse(saved);
        } catch {
            throw new Error("Parsing error");
        }
    });

    const {tasks} = useTasks();
    let doneC = 0;
    let undoneC = 0;
    let percentageC = 0;
    const call = useCallback(() => {
        tasks.forEach(e => {
            e.done ? ++doneC : ++undoneC; 
        });
        percentageC = (doneC / doneC + undoneC) * 100;

        if(!percentageC || percentageC === Infinity) throw new RangeError("Division by zero is not allowed.");

        setStats({done: doneC,undone: undoneC,percentage: percentageC});
    },[doneC, undoneC, percentageC]);

    localStorage.setItem("TasksStats", JSON.stringify(stats));

    const value = useMemo(() => ({
        stats
    }), [stats]);

    return <TasksStatsContext.Provider value={value}>{children}</TasksStatsContext.Provider>
}

export const useTasksStats = () => {
    const context = useContext(TasksStatsContext);
    if(!context) throw new Error("U can't use useTasksStats outside of TaskStatsProvider")
    return context;
}