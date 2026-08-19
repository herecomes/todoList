import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

type TasksContextType = {
  overallTasks: number;
  doneTasks: number;
  addOverallTasks: () => void;
  subOverallTasks: () => void;
  addDoneTasks: () => void;
  subDoneTasks: () => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [overallTasks, setOverallTasks] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const storage = localStorage.getItem("overallTasks");
    if (!storage) return 0;
    const saved = Number.parseInt(storage, 10);
    return Number.isNaN(saved) ? 0 : saved;
  });

  const [doneTasks, setDoneTasks] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const storage = localStorage.getItem("doneTasks");
    if (!storage) return 0;
    const saved = Number.parseInt(storage, 10);
    return Number.isNaN(saved) ? 0 : saved;
  });

  useEffect(() => {
    localStorage.setItem("overallTasks", String(overallTasks));
  }, [overallTasks]);

  useEffect(() => {
    localStorage.setItem("doneTasks", String(doneTasks));
  }, [doneTasks]);

  const addOverallTasks = useCallback(() => {
    setOverallTasks((prev) => prev + 1);
  }, []);

  const subOverallTasks = useCallback(() => {
    setOverallTasks((prev) => Math.max(0, prev - 1));
  }, []);

  const addDoneTasks = useCallback(() => {
    setDoneTasks((prev) => prev + 1);
  }, []);

  const subDoneTasks = useCallback(() => {
    setDoneTasks((prev) => Math.max(0, prev - 1));
  }, []);

  const value = useMemo(
    () => ({
      overallTasks,
      doneTasks,
      addOverallTasks,
      subOverallTasks,
      addDoneTasks,
      subDoneTasks,
    }),
    [overallTasks, doneTasks, addOverallTasks, subOverallTasks, addDoneTasks, subDoneTasks]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }
  return context;
};