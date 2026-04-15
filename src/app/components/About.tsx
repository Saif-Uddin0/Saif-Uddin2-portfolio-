"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiMapPin, FiBookOpen, FiCode, FiTarget, FiUser, FiActivity, FiZap } from "react-icons/fi";
import DevAnimation from "./DevAnimation";

const highlights = [
    { icon: <FiMapPin />, label: "Location", value: "Dhaka, Bangladesh", color: "#f87171" },
    { icon: <FiBookOpen />, label: "Education", value: "Diploma in CSE", color: "#60a5fa" },
    { icon: <FiCode />, label: "Focus", value: "Full Stack & AI", color: "#4ade80" },
    { icon: <FiTarget />, label: "2026 Goal", value: "Backend Developer", color: "#fbbf24" },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-16 lg:py-20 relative z-10 overflow-hidden">
            {/* Sophisticated Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

            <div className="container-custom relative" ref={ref}>
                {/* Section Header - Sophisticated & Professional */}
                <div className="mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <span className="text-[10px] font-bold tracking-[0.4em] text-white/40 uppercase">Discover / 01</span>
                        <div className="h-[1px] w-12 bg-white/10" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl lg:text-8xl font-black leading-none tracking-tighter text-center"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                    >
                        Quality <span className="italic" style={{ color: "var(--text-secondary)" }}>Defined.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-30 items-start">
                    {/* Visual Segment - The IDE Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-12 xl:col-span-5 order-2 lg:order-1"
                    >
                        <div className="relative group max-w-[600px] mx-auto lg:mx-0">
                            {/* Ambient Glow */}
                            <motion.div
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 8, repeat: Infinity }}
                                className="absolute -inset-4 bg-white/5 rounded-[2.5rem] blur-3xl z-0"
                            />

                            <div className="relative z-10 glass-panel p-3 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl">
                                <DevAnimation />
                            </div>

                            {/* Professional Status Module */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="hidden xl:flex absolute -bottom-10 -right-10 w-56 p-6 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl z-20 items-center gap-5"
                            >
                                <div className="relative">
                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.1em", fontWeight: 900, textTransform: "uppercase", marginBottom: "4px" }}>Status Report</span>
                                    <span style={{ fontSize: "12px", color: "var(--text-primary)", fontWeight: 700, letterSpacing: "-0.05em" }}>Active Development</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Minimalist Grid of Modules (Moved from Right Column) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 max-w-[600px] mx-auto lg:mx-0 pl-4 lg:pl-12">
                            {highlights.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div
                                        style={{ color: item.color, background: `${item.color}15` }}
                                        className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl border border-white/[0.05] transition-all group-hover:bg-white/[0.05] group-hover:-translate-y-1 shadow-lg"
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.4em", lineHeight: 1, marginBottom: "8px" }}>{item.label}</span>
                                        <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 700, letterSpacing: "-0.05em" }}>{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Segment - Precise Bio */}
                    <div className="lg:col-span-12 xl:col-span-7 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h3 className="text-3xl lg:text-6xl font-bold leading-[1.1] mb-10 text-center xl:text-left" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-1px", color: "var(--text-primary)" }}>
                                Building digital products with <br />
                                <span className="italic" style={{ color: "var(--text-secondary)" }}>purpose and precision.</span>
                            </h3>

                            <div className="space-y-6 text-xl lg:text-2xl leading-relaxed max-w-3xl mb-12 text-center xl:text-left mx-auto xl:mx-0" style={{ color: "var(--text-secondary)" }}>
                                <p>
                                    I’m Saif Uddin, a passionate MERN Stack Developer from Bangladesh 🇧🇩, building modern & responsive web applications.
                                    I am completing my Diploma in <span style={{ color: "var(--text-primary)" }}>Computer Science</span> from Feni Computer Institute (Session 2021-2022), which is helping me build a strong foundation for web development.I focus on the intersection of
                                    <span style={{ color: "var(--text-primary)" }}> high-performance architecture</span> and
                                    <span style={{ color: "var(--text-primary)", fontWeight: 500 }}> intelligent user behaviors.</span>
                                </p>
                                <p className="text-lg lg:text-xl" style={{ color: "var(--text-muted)" }}>
                                    I believe in the power of professional minimalism. My objective is to
                                    distill complex requirements into high-fidelity experiences that feel
                                    as effortless as they are robust.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-10 items-center justify-center xl:justify-start">
                                <a href="https://drive.google.com/file/d/1HcoKzY339n3Q1AlCa5CVkpLL6YQ6UhoL/view" target="_blank" className="btn-primary" style={{ padding: "20px 56px", borderRadius: "12px", fontSize: "1rem", fontWeight: 800 }}>
                                    Download CV
                                </a>
                                <a href="#contact" className="group flex items-center gap-5 transition-all no-underline" style={{ color: "var(--text-secondary)" }}>
                                    <span style={{ fontWeight: 900, letterSpacing: "0.3em", fontSize: "10px", textTransform: "uppercase", color: "var(--text-primary)" }}>Initiate Project</span>
                                    <div className="relative h-px w-10 bg-white/10 group-hover:w-16 group-hover:bg-white transition-all overflow-hidden">
                                        <motion.div
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 bg-white/40"
                                        />
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
