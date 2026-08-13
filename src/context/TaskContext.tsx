import { createContext, useContext, useEffect, useState } from "react";

type TasksContextType = {
    overallTasks: number,
    doneTasks: number,
    addOverallTasks: () => void,
    subOverallTasks: () => void
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({children}: { children: React.ReactNode }) => {
    const [overallTasks, setOverallTasks] = useState<number>(() => {
        const storage = localStorage.getItem("overallTasks");
        if(!storage) return 0

        const saved = Number.parseInt(storage,10);
        return Number.isNaN(saved) ? 0 : saved;
    });
    const [doneTasks, setDoneTasks] = useState<number>(() => {
        const storage = localStorage.getItem("doneTasks");
        if(!storage) return 0

        const saved = Number.parseInt(storage,10);
        return Number.isNaN(saved) ? 0 : saved;
    });

    useEffect(()=> {
        localStorage.setItem("overallTasks", String(overallTasks));
    },[overallTasks]);
    useEffect(()=> {
        localStorage.setItem("doneTasks", String(doneTasks));
    },[doneTasks]);

    const addOverallTasks = () => {
        setOverallTasks((prev) => prev + 1);
    }
    const subOverallTasks = () => {
        setOverallTasks((prev) => prev !== 0 ? prev - 1 : 0);
    }

    return (
        <TasksContext.Provider value={{overallTasks, doneTasks, addOverallTasks, subOverallTasks}}>
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => {
    const context = useContext(TasksContext);
    if(!context || context === undefined) throw new Error("useTasks must be used within TasksProvider");
    return context;
};