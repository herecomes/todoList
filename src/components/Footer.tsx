import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer>
            <div className="links">
                <a href="">
                    <FaLinkedin/>
                </a>
                <a href="">
                    <FaGithub/>
                </a>
                <a href="">
                    <FaEnvelope/>
                </a>
            </div>
            <div className="copyright">
                Copyright © 2026 Herecomes
            </div>
        </footer>
    );
}