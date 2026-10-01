import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";

type className = {
    className: string
}

export const Footer = ({className}: className) => {
    return (
        <footer className={className}>
            <div className="links flex flex-row justify-evenly w-[300px]">
                <a href="https://www.linkedin.com/in/alik-mukhammad/">
                    <FaLinkedin className="w-[70px] h-[70px]"/>
                </a>
                <a href="https://github.com/herecomes">
                    <FaGithub className="w-[70px] h-[70px]"/>
                </a>
                <a href="mailto:alikclown@gmail.com">
                    <FaEnvelope className="w-[70px] h-[70px]"/>
                </a>
            </div>
            <div className="copyright mt-4">
                Copyright © 2026 Herecomes
            </div>
        </footer>
    );
}