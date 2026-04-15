"use client";

import dynamic from "next/dynamic";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { FiDownload, FiGithub, FiLinkedin, FiArrowRight, FiDatabase } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiDocker, SiRedux, SiPostgresql, SiPython } from "react-icons/si";
import { HiOutlineSparkles } from "react-icons/hi";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const roles = [
    "MERN-Stack Developer",
    "Learning Backend Development",
    "React Specialist",
    "Next.js Developer",
];


const orbitIcons = [
    { icon: <SiReact size={22} />, label: "React", orbit: "path-1", delay: 0, speed: 25, color: "#61DAFB", bg: "rgba(97,218,251,0.1)" },
    { icon: <SiNextdotjs size={22} />, label: "Next.js", orbit: "path-2", delay: -5, speed: 35, color: "#ffffff", bg: "rgba(255,255,255,0.06)" },
    { icon: <FiDatabase size={22} />, label: "Database", orbit: "path-3", delay: -10, speed: 30, color: "#47A248", bg: "rgba(71,162,72,0.1)" },
    { icon: <HiOutlineSparkles size={22} />, label: "AI", orbit: "path-1", delay: -12.5, speed: 25, color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
    { icon: <SiDocker size={22} />, label: "Docker", orbit: "path-2", delay: -22, speed: 35, color: "#2496ED", bg: "rgba(36,150,237,0.1)" },
    { icon: <SiRedux size={22} />, label: "Redux", orbit: "path-3", delay: -15, speed: 30, color: "#764ABC", bg: "rgba(118,74,188,0.1)" },
    { icon: <SiPostgresql size={22} />, label: "PostgreSQL", orbit: "path-1", delay: -8, speed: 25, color: "#4169E1", bg: "rgba(65,105,225,0.1)" },
    { icon: <SiPython size={22} />, label: "Python", orbit: "path-2", delay: -12, speed: 35, color: "#3776AB", bg: "rgba(55,118,171,0.1)" },
];

function AnimatedCounter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "0px" });
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

    useEffect(() => {
        if (inView) {
            const controls = animate(count, to, { duration: 2, ease: "easeOut" });
            return controls.stop;
        } else {
            count.set(from); // reset when out of view
        }
    }, [count, from, to, inView]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting && displayText === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(
                () => {
                    setDisplayText(
                        isDeleting
                            ? currentRole.substring(0, displayText.length - 1)
                            : currentRole.substring(0, displayText.length + 1)
                    );
                },
                isDeleting ? 40 : 80
            );
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    return (
        <section
            id="home"
            style={{
                zIndex: 1,
                overflow: "hidden",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
            }}
        >

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
                    pointerEvents: "none",
                }}
            />

            <div
                className="container-custom hero-wrapper"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "60px",
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                    paddingTop: "120px",
                    paddingBottom: "80px",
                    flexWrap: "wrap",
                }}
            >
                {/* ===== Left Content ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="hero-left"
                    style={{ flex: "1 1 420px", maxWidth: "580px" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="section-label mb-6 md:mb-8"
                    >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
                        Available for freelance & full-time
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        style={{
                            fontFamily: "var(--font-space-grotesk)",
                            fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            marginBottom: "16px",
                            color: "var(--text-primary)",
                            letterSpacing: "-0.04em",
                        }}
                    >
                        I&apos;m
                        <br />
                        <span style={{ background: "linear-gradient(90deg, var(--text-primary), var(--text-muted))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Saif Uddin
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-5 md:mb-6"
                        style={{ height: "40px", display: "flex", alignItems: "center" }}
                    >
                        <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--text-secondary)", fontWeight: 400 }}>
                            {displayText}
                            <span className="cursor-blink" />
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-8 md:mb-10 text-[1.1rem] leading-[1.8] max-w-[500px]"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        Building functional, user-friendly and modern web interfaces that help your business grow and improve user engagement.
                    </motion.p>

                    {/* Social Icons & Buttons Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
                        className="hero-actions gap-4 md:gap-5"
                    >

                        {/* Buttons */}
                        <div className="flex items-center gap-4 pt-2">
                            <Link
                                href="#contact"
                                className="group overflow-hidden flex items-center gap-1.5 px-6 py-3 rounded-[12px] font-semibold transform hover:-translate-y-1 transition-all duration-300"
                                style={{ background: "var(--accent)", color: "var(--bg-primary)", boxShadow: "0 10px 30px var(--accent-dim)" }}
                            >
                                <span className="transition-all duration-500 ease-in-out group-hover:translate-x-6">
                                    Let's Talk
                                </span>
                                <BsArrowRight className="shrink-0 transition-all duration-500 ease-in-out group-hover:-translate-x-[5.5rem]" />
                            </Link>
                            <Link
                                href="#projects"
                                className="group z-10 overflow-hidden flex items-center gap-1.5 px-6 py-3 rounded-[12px] font-semibold shadow transform border hover:-translate-y-1 transition-all duration-500"
                                style={{ background: "var(--bg-glass)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
                            >
                                <span className="transition-all duration-500 ease-in-out group-hover:translate-x-6">
                                    My Works
                                </span>
                                <FiArrowRight className="shrink-0 transition-all duration-500 ease-in-out group-hover:-translate-x-[5.5rem]" />
                            </Link>
                        </div>


                        {/* Repositioned Social Icons */}
                        <div style={{ display: "flex", gap: "14px", marginLeft: "8px" }} className="hero-social-row">
                            <motion.a
                                href="https://github.com/Saif-Uddin0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                                style={{ width: "50px", height: "50px" }}
                            >
                                <FiGithub size={20} />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/saif-uddin0/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                                style={{ width: "50px", height: "50px" }}
                            >
                                <FiLinkedin size={20} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Performance Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="hero-stats mt-10 md:mt-14 pt-8 md:pt-10"
                        style={{
                            display: "flex",
                            gap: "clamp(24px, 4vw, 48px)",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* <div className="stat-item">
                            <div className="stat-number">15+</div>
                            <div className="stat-label">Projects Done</div>
                        </div> */}
                        <div className="stat-item">
                            <div className="stat-number"><AnimatedCounter from={0} to={1} suffix="+" /></div>
                            <div className="stat-label">Years of Code</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number"><AnimatedCounter from={0} to={15} suffix="+" /></div>
                            <div className="stat-label">Tech Tools</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ===== Right — High-End Profile Photo w/ Galaxy Orbiting Icons ===== */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="hero-photo-container"
                    style={{
                        flex: "0 0 auto",
                        position: "relative",
                        width: "550px",
                        height: "550px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        perspective: "1000px",
                    }}
                >
                    {/* Decorative Galaxy Elements */}
                    <div className="galaxy-elements">
                        <div className="orbit-galaxy orbit-path-1" />
                        <div className="orbit-galaxy orbit-path-2" />
                        <div className="orbit-galaxy orbit-path-3" />
                    </div>

                    {/* Galaxy Orbiting Icons */}
                    <div className="orbit-icons-group">
                        {orbitIcons.map((item, i) => (
                            <div
                                key={i}
                                className={`orbit-icon-wrapper galaxy-${item.orbit}`}
                                style={{
                                    animationDuration: `${item.speed}s`,
                                    animationDelay: `${item.delay}s`,
                                }}
                            >
                                <div
                                    className="orbit-icon"
                                    style={{
                                        animationDuration: `${item.speed}s`,
                                        animationDelay: `${item.delay}s`,
                                    }}
                                >
                                    <div
                                        className="orbit-icon-inner"
                                        style={{
                                            background: item.bg,
                                            border: `1px solid ${item.color}30`,
                                            color: item.color,
                                            padding: "12px 16px",
                                            borderRadius: "16px",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                                        }}
                                    >
                                        {item.icon}
                                        <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", opacity: 0.8 }}>
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Profile Photo */}
                    <motion.div
                        style={{
                            width: "400px",
                            height: "400px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "3px solid rgba(255,255,255,0.08)",
                            position: "relative",
                            zIndex: 2,
                            boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
                        }}
                        whileHover={{ scale: 1.05, rotateZ: 2 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src="/saif.png"
                            alt="Saif Uddin"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="scroll-indicator"
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--text-muted), transparent)" }}
                />
            </motion.div>
        </section>
    );
}
