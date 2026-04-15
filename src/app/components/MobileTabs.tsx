"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiCode, FiLayers, FiMail } from "react-icons/fi";

const tabs = [
    { name: "Home", href: "#home", icon: <FiHome /> },
    { name: "About", href: "#about", icon: <FiUser /> },
    { name: "Skills", href: "#skills", icon: <FiCode /> },
    { name: "Projects", href: "#projects", icon: <FiLayers /> },
    { name: "Contact", href: "#contact", icon: <FiMail /> },
];

export default function MobileTabs() {
    const [activeTab, setActiveTab] = useState("home");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);

            // Update active tab based on scroll position
            const sections = tabs.map(t => t.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 300) {
                    setActiveTab(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="md:hidden flex justify-center"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "20px",
                        right: "20px",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            background: "rgba(10, 10, 10, 0.8)",
                            backdropFilter: "blur(20px)",
                            borderRadius: "100px",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            padding: "8px 12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            width: "100%",
                            justifyContent: "space-between"
                        }}
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.href.replace("#", "");
                            return (
                                <a
                                    key={tab.name}
                                    href={tab.href}
                                    onClick={() => setActiveTab(tab.href.replace("#", ""))}
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "10px",
                                        borderRadius: "50px",
                                        color: isActive ? "#fff" : "rgba(255, 255, 255, 0.3)",
                                        textDecoration: "none",
                                        transition: "all 0.3s ease",
                                        flex: 1
                                    }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "rgba(255, 255, 255, 0.06)",
                                                borderRadius: "50px",
                                                zIndex: -1
                                            }}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
                                    <span style={{ fontSize: "0.6rem", fontWeight: 700, marginTop: "4px" }}>{tab.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
