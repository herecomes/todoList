//todo - this should filter tasks
import { useState } from "react";

const MONTH_STORAGE_KEY = "selectedMonth"
const YEAR_STORAGE_KEY = "selectedYear"

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
const months = Array.from({ length: 12 }, (_, i) =>
    monthFormatter.format(new Date(2026, i))
);

const yearNow = new Date().getFullYear() - 1;
const years = Array.from({ length: 3 }, (_, i) =>
    yearNow + i
);

const selected = (key: string): string => {
    const selectedMY = localStorage.getItem(key);
    return selectedMY ?? "";
}

const change = (setter: React.Dispatch<React.SetStateAction<string>>, key: string) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setter(value);
        localStorage.setItem(key, value);
    }
}

export const DateSelector = () => {
    const [month, setMonth] = useState(() => {
        return selected(MONTH_STORAGE_KEY);
    });

    const [year, setYear] = useState(() => {
        return selected(YEAR_STORAGE_KEY);
    });


    return (
        <section>
            <select name="month" id="month" value={month} onChange={change(setMonth, MONTH_STORAGE_KEY)}>
                <option value="">Select a Month</option>
                {
                    months.map((m) => (
                        <option value={m} key={m}>{m}</option>
                    ))
                }
            </select>
            <select name="year" id="year" value={year} onChange={change(setYear, YEAR_STORAGE_KEY)}>
                <option value="">Select a Year</option>
                {
                    years.map((y) => (
                        <option value={y} key={y}>{y}</option>
                    ))
                }
            </select>
        </section>
    );
}