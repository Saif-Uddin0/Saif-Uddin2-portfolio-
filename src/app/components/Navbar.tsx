"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active Section Scrollspy Logic
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            let current = 'home';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Init on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Synchronize URL with active section smoothly
    useEffect(() => {
        if (activeSection === 'home') {
            window.history.replaceState(null, '', window.location.pathname);
        } else if (activeSection) {
            window.history.replaceState(null, '', `#${activeSection}`);
        }
    }, [activeSection]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: scrolled ? "16px 0" : "28px 0",
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none"
            }}
        >
            <div
                className="container-custom"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: scrolled ? "12px 32px" : "16px 40px",
                    background: scrolled ? "rgba(10, 10, 10, 0.7)" : "transparent",
                    backdropFilter: scrolled ? "blur(24px)" : "none",
                    borderRadius: "20px",
                    border: scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    width: "95%",
                    maxWidth: scrolled ? "1100px" : "1400px",
                    boxShadow: scrolled ? "0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02)" : "none",
                    pointerEvents: "auto",
                    gap: "24px"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <motion.a
                        href="#home"
                        style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div style={{ position: "relative" }}>
                            <Image id="navbar-logo" src="/Star1.png" alt="SAMIO" width={36} height={36} style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }} />
                            {scrolled && (
                                <motion.div
                                    layoutId="logo-glow"
                                    style={{ position: "absolute", inset: "-4px", background: "rgba(255,255,255,0.1)", filter: "blur(12px)", borderRadius: "12px", zIndex: -1 }}
                                />
                            )}
                        </div>
                        <span
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 800,
                                fontSize: "1.25rem",
                                color: "#fff",
                                letterSpacing: "1.5px",
                                textTransform: "uppercase"
                            }}
                        >
                            SAIF
                        </span>
                    </motion.a>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    <div className="hidden md:flex items-center gap-8" style={{ marginRight: "12px" }}>
                        {[
                            { name: 'Home', href: '#home' },
                            { name: 'About', href: '#about' },
                            { name: 'Skills', href: '#skills' },
                            { name: 'Projects', href: '#projects' },
                            { name: 'Contact', href: '#contact' }
                        ].map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    style={{
                                        color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                                        fontSize: "0.85rem",
                                        fontWeight: isActive ? 700 : 600,
                                        textDecoration: "none",
                                        transition: "all 0.3s ease",
                                        position: "relative"
                                    }}
                                    whileHover={{ color: "#fff", scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-indicator"
                                            style={{
                                                position: "absolute",
                                                bottom: "-8px",
                                                left: 0,
                                                right: 0,
                                                height: "2px",
                                                background: "#fff",
                                                borderRadius: "2px"
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </div>
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <FiMoon size={18} color="#00ffd1" /> : <FiSun size={18} color="#e0e0e0" />}
                        </button>
                    )}
                    <a
                        id="navbar-cv-btn"
                        href="https://drive.google.com/file/d/1HcoKzY339n3Q1AlCa5CVkpLL6YQ6UhoL/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                            padding: "12px 32px",
                            fontSize: "0.9rem",
                            borderRadius: "12px",
                            fontWeight: 700,
                            letterSpacing: "0.5px"
                        }}
                    >
                        Resume ↗
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
