export const DateSelector = () => {
    return (//todo - rewrite it, there should be no manual insertion of the month/year
        <section>
            <select name="month" id="month">
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <select name="year" id="year">
                <option value="">Select Year</option>
                <option value="1">2026</option>
                <option value="2">2025</option>
                <option value="3">2024</option>
            </select>
        </section>
    );
}