import { FaBarsStaggered } from "react-icons/fa6";

type className = {
    className: string
}

export const Header = ({className}: className) => {
    return (
        <header className={className}>
            <div className="left">
                <a href="/">
                    <img src="../public/hc_logo.webp" alt="" />
                </a>
                <button>
                    <FaBarsStaggered />
                </button>
            </div>
            <div className="center">
                <input type="text" name="search" id="search" />
            </div>
            <div className="right">
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