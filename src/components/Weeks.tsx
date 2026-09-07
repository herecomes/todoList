import { useDate } from "../context/DateContext";

export const Weeks = () => {
    const {monthIndex, year} = useDate();

    const daysCalc = (new Date(year, monthIndex + 1, 0)).getDate();
    const daysArr = Array.from({ length: daysCalc }, (_, i) => i);
    const firstDay = ((new Date(year, monthIndex, 1).getDay()) + 6) % 7;
    const firstDayArr = Array.from({ length: firstDay }, (_, i) => i);
    console.log(firstDay)
    return (
        <section id="weeks">
            {
                <div className="days">
                    {
                        firstDayArr.map(() => {
                            return <div className="empty-day">empty</div>;
                        })
                    }
                    {
                        daysArr.map((d) => {
                            return <div className="day">{d + 1}</div>;
                        })
                    }
                </div>
            }
        </section>
    );
}