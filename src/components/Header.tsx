import { FaBarsStaggered } from "react-icons/fa6";

type className = {
    className: string
}

export const Header = ({className}: className) => {
    return (
        <header className={className}>
            <div className="left flex w-1/5 items-center">
                <a href="/" className="w-1/3 rounded-4xl overflow-hidden">
                    <img src="../public/hc_logo.webp" alt="" />
                </a>
                <button className="bg-white p-4 rounded-full ml-5">
                    <FaBarsStaggered />
                </button>
            </div>
            <div className="center w-3/5 flex items-center">
                <input type="text" name="search" id="search" className="p-4 bg-white w-full rounded-4xl" />
            </div>
            <div className="right w-1/5 flex items-center justify-end text-white">
                <div className="counter">
                    12/35
                </div>
                <div className="countBar">
                    <span className="below"></span>
                    <span className="above"></span>
                </div>
            </div>
        </header>
    )
}