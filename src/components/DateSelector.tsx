import { useDate } from "../context/DateContext";

const months = Array.from({length: 12}, (_, i) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2026, i));
})

const yearNow = new Date().getFullYear() - 1;
const years = Array.from({length: 3}, (_,i) => {
    return yearNow + i;
});

export const DateSelector = () => {
    const {monthIndex, year, changeMonth, changeYear} = useDate();

    return (
        <section id="date_selector">
            <select name="month" id="month" value={monthIndex} onChange={changeMonth}>
                <option value="" disabled>Select a Month</option>
                {
                    months.map((m, i) => (
                        <option value={i} key={m}>{m}</option>
                    ))
                }
            </select>
            <select name="year" id="year" value={year} onChange={changeYear}>
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