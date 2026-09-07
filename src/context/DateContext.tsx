import React, { createContext, useContext, useMemo, useState } from "react";

type ContextDateType = {
    monthIndex: number,
    year: number,
    changeMonth: (e: React.ChangeEvent<HTMLSelectElement, Element>) => void,
    changeYear: (e: React.ChangeEvent<HTMLSelectElement, Element>) => void
}

const DateContext = createContext<ContextDateType | undefined>(undefined);

export const DateProvider = ({children}: {children: React.ReactNode}) => {
    const [monthIndex, setMonth] = useState(() => {
        const saved = localStorage.getItem("monthIndex");
        return saved !== null && saved !== "" ? Number(saved) : new Date().getMonth();
    });
    const changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setMonth(Number(val));
        localStorage.setItem("monthIndex",val)
    }

    const [year, setYear] = useState(() => {
        const saved = localStorage.getItem("year");
        return saved !== null && saved !== "" ? Number(saved) : new Date().getFullYear()
    });
    const changeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setYear(Number(val));
        localStorage.setItem("year", val);
    }

    const value = useMemo(() => ({
        monthIndex,
        year,
        changeMonth,
        changeYear
    }),[monthIndex, year, changeMonth, changeYear]);

    return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}

export const useDate = () => {
    const context = useContext(DateContext);
    if(!context) throw new Error("useTasks must be used within TasksProvider");
    return context;
};