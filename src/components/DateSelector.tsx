import { useState } from "react";

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
const months = Array.from({ length: 12 }, (_, i) => 
    monthFormatter.format(new Date(2026, i))
);

let yearNow = new Date().getFullYear() - 1;
const years = Array.from({length: 3}, (_,i) => 
    yearNow + i
);

const [month, setMonth] = useState(() => {
    try {
        return localStorage.getItem("selectedMonth");
    } catch {
        return;
    }
});
setMonth(() => {
    const selected = document.getElementById("month");
});

export const DateSelector = () => {
    return (
        <section>
            <select name="month" id="month">
                <option value="">Select a Month</option>
                {
                    months.map((m) => (
                        <option value={m} key={m}>{m}</option>
                    ))
                }
            </select>
            <select name="year" id="year">
                <option value="">Select a Year</option>
                {
                    years.map((y) =>(
                        <option value={y} key={y}>{y}</option>
                    ))
                }
            </select>
        </section>
    );
}