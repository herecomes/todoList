import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { DateTime } from "luxon";

type Task = {
  id: number,
  date: string,
  name: string,
  descr: string,
  done: boolean
}

type TasksContextType = {
  tasks: Task[],
  addTask: (t: Task) => void,
  removeTask: (id: number) => void,
  toggleTask: (id: number) => void
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    if(!stored) return [];

    try{
      const parsed = JSON.parse(stored);
      return parsed.map((p: Task) => {
        const parsedDate = p.date;
        const newDate = DateTime.now().toISO()
        return {...p, date: parsedDate ? parsedDate : newDate}
      });
    } catch {
      return []
    }
  });

  const addTask = useCallback((t: Task) => {
    setTasks((prev) => prev.concat(t));
  },[]);

  const removeTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter(f => f.id !== id));
  },[]);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) => prev.map(f => f.id === id ? { ...f, done: !f.done } : f));
  },[]);

  useEffect(()=> {
    const serialized = tasks.map((t) => ({
      ...t,
      date: DateTime.fromJSDate(new Date(t.date)).toISODate(),
    }));
    localStorage.setItem("tasks", JSON.stringify(serialized));
  },[tasks])

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      removeTask,
      toggleTask,
    }),
    [tasks, addTask, removeTask, toggleTask]
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