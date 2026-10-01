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

    const overall = tasks.length;
    const done = tasks.filter(t => t.done === true).length;
    const percentage = (done/overall) * 100;

    const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <header className={className + " gap-4"}>
            <div className="left flex w-1/5 items-center">
                <a href="/" className="w-1/3 rounded-4xl overflow-hidden">
                    <img src="../public/hc_logo.webp" alt="" />
                </a>
                <button className="bg-white p-4 rounded-full ml-5 hidden">
                    <FaBarsStaggered />
                </button>
            </div>
            <div className="center w-3/5 flex items-center">
            <div className="search w-full relative">
                <input type="text" name="search" id="search" className="p-4 bg-white w-full rounded-4xl" onChange={searchChange} />
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
            </div>
            </div>
            <div className="right w-1/5 flex flex-col items-center justify-center text-white gap-4">
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