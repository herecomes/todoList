import { useDate } from "../context/DateContext";
type WeeksProps = {
    handleOpenModal: (d: Date | null) => void;
};
export const Weeks = ({handleOpenModal}: WeeksProps) => {
    const {monthIndex, year} = useDate();

    const daysCalc = (new Date(year, monthIndex + 1, 0)).getDate();
    const daysArr = Array.from({ length: daysCalc }, (_, i) => i);
    const firstDay = ((new Date(year, monthIndex, 1).getDay()) + 6) % 7;
    const firstDayArr = Array.from({ length: firstDay }, (_, i) => i);
    const clickedDate = (i: number) => {
        const dateClicked = new Date(year, monthIndex, i);
        handleOpenModal(dateClicked);
    }
    return (
        <section id="weeks">
            {
                <div className="days">
                    {
                        firstDayArr.map((_,i) => {
                            return <div className="empty-day" key={"empty-" + year + "-" + monthIndex + "-" + i}>empty</div>;
                        })
                    }
                    {
                        daysArr.map((d,i) => {
                            return (
                                <div className="day" key={i}>
                                    {d + 1}
                                    <button onClick={() => clickedDate(d + 1)}>Click me</button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </section>
    );
}