"use client";

import { FiGithub, FiLinkedin, FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

const links = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Footer() {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer
            style={{
                position: "relative",
                zIndex: 1,
                borderTop: "1px solid rgba(255,255,255,0.04)",
                background: "transparent",
            }}
        >
            <div
                className="container-custom flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8 sm:gap-4"
                style={{
                    padding: "36px 24px",
                }}
            >
                <p className="text-center sm:text-left" style={{ color: "#555", fontSize: "0.88rem" }}>
                    © 2025 Saif Uddin
                </p>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                    {links.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            style={{
                                color: "#444",
                                textDecoration: "none",
                                fontSize: "0.82rem",
                                transition: "color 0.3s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#ccc")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-3">
                    <a href="https://github.com/Saif-Uddin0" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ width: "36px", height: "36px", fontSize: "0.95rem" }}>
                        <FiGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/saif-uddin0/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ width: "36px", height: "36px", fontSize: "0.95rem" }}>
                        <FiLinkedin />
                    </a>
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "#fff",
                            border: "none",
                            color: "#000",
                            fontSize: "1rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "4px",
                        }}
                    >
                        <FiArrowUp />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
