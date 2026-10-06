import { FaBarsStaggered } from "react-icons/fa6";
import { useTasks } from "../context/TaskContext";
import { useState } from "react";

type className = {
    className: string,
    handleOpenEditModal: (d: number) => void;
}

export const Header = ({className,handleOpenEditModal}: className) => {
    const {tasks} = useTasks();
    const [searchResult, setSearchResult] = useState<typeof tasks>([]);
    const [searchValue, setSearchValue] = useState("");

    const overall = tasks.length;
    const done = tasks.filter(t => t.done === true).length;
    const percentage = (done/overall) * 100;

    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        const input = e.target.value.trim().toLowerCase();
        if(!input) {
            setSearchResult([]);
            return;
        }
        setSearchResult(() => {
            return (
                tasks.filter(t => (t.name.includes(input) || t.descr.includes(input)) && t)
            );
        });
    }
    const closeSearch = () => {
        setSearchResult([]);
        setSearchValue("");
    }

    return (
        <header className={className + " gap-4"}>
            <div className="left flex w-(--width-gap-4) order-1 lg:order-1 lg:w-1/5 items-center">
                <a href="/" className="m-auto w-full sm:w-[50%] lg:w-1/3 rounded-4xl overflow-hidden">
                    <img src="../public/hc_logo.webp" alt="" />
                </a>
                <button className="bg-white p-4 rounded-full ml-5 hidden">
                    <FaBarsStaggered />
                </button>
            </div>
            <div className="center w-full order-3 lg:order-2 lg:w-3/5 flex items-center">
                <div className="search w-full relative">
                    <input type="text" name="search" id="search" className="p-4 bg-white w-full rounded-4xl" value={searchValue} onChange={searchChange} />
                    {
                        Boolean(searchResult?.length) && (
                            <div key="searchResult" className="mt-2 absolute w-full bg-white max-h-[400px] overflow-y-auto rounded-[10px] p-2">
                                {searchResult.map((t) => 
                                    <div className="p-2 cursor-pointer" key={"searcResult_" + t.id} onClick={() => handleOpenEditModal(t.id)}>
                                        {t.name}
                                    </div>
                                )}
                            </div> 
                        )
                    }
                    {Boolean(searchValue.length) && <span className="text-2xl text-black absolute top-3 right-2 cursor-pointer rounded-full pl-1 p-1 leading-none hover:text-red-500 transition duration-300 ease-in-out" onClick={closeSearch}>✕</span>}
                </div>
            </div>
            <div className="right w-(--width-gap-4) order-2 lg:order-3 lg:w-1/5 flex flex-col items-center justify-center text-white gap-4">
                <div className="counter text-xl">
                    {percentage === 100 ? "Great u have done all the tasks" : done + "/" + overall}
                </div>
                <div className={`countBar w-full h-[3px] relative ${percentage === 100 && "done"}`}>
                    <span className="below block h-full bg-white rounded-[10px]" key={"percentageOverall_" + overall}></span>
                    <span className="above block h-full absolute top-[0px] bg-hcblue rounded-[10px]" key={"percentageDone_" + done} style={{width: percentage+"%"}}></span>
                </div>
            </div>
        </header>
    )
}