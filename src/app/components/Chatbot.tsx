"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiUser, FiInfo, FiCode, FiZap, FiCpu } from "react-icons/fi";

const KNOWLEDGE_BASE = [
    {
        id: "who",
        question: "Who is Saif Uddin?",
        answer: "I’m a MERN Stack Developer driven by the challenge of transforming complex requirements into high-performance, user-centric web architectures. Currently completing my Diploma in Computer Science at Feni Computer Institute with a 3.50+ CGPA, I combine academic precision with extensive hands-on engineering experience. My philosophy is built on 'Quality Defined'—striking a perfect balance between robust back-end logic and sleek, modern front-end interfaces that feel as effortless as they are powerful.",
        icon: <FiUser />
    },
    {
        id: "skills",
        question: "What are your core technical skills?",
        answer: "My core expertise lies in the MERN stack (MongoDB, Express, React, Node.js), with a specialized focus on Next.js for building scalable, SEO-optimized production environments. On the front end, I leverage Tailwind CSS and Framer Motion to create engaging, high-fidelity experiences with smooth, micro-segmented animations. For state management and infrastructure, I’m proficient in Redux and Firebase, ensuring that every application I build is rock-solid and ready to handle high-traffic, real-world data complexity.",
        icon: <FiCode />
    },
    {
        id: "projects",
        question: "Can you tell me about your key projects?",
        answer: "I prioritize projects that solve real-world problems. For instance, Zap Shift is a mission-critical parcel management system that automated delivery workflows across 64 districts in Bangladesh. Edu-Care is a modern learning platform where I prioritized smooth user engagement through interactive Framer Motion effects. Artify is a digital gallery where I engineered real-time data syncing with MongoDB to create a seamless marketplace for artists to showcase and save favorites.",
        icon: <FiZap />
    },
    {
        id: "backend",
        question: "What is your expertise in Backend Development?",
        answer: "My backend philosophy is centered on building high-performance, resilient server-side architectures. I specialize in the Node.js and Express ecosystem, leveraging MongoDB for flexible, high-speed data management. I focus on engineering robust RESTful APIs, implementing secure authentication, and optimizing database performance to ensure seamless data flow even under peak loads. For 2026, my roadmap is set on Cloud Mastery and Advanced System Design to build global-scale applications.",
        icon: <FiCpu />
    },
    {
        id: "contact",
        question: "How to hire/contact you?",
        answer: "I'm always open to new opportunities and collaborations! You can reach out through the Contact section below, or connect with me directly on LinkedIn or GitHub. I'm currently based in Dhaka and available for both freelance projects and full-time roles where I can contribute to high-impact digital solutions.",
        icon: <FiMessageSquare />
    }
];

// Custom Animated AI Icon (Premium Vibe)
const AIIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div style={{ position: "relative", width: "35px", height: "35px", display: "flex", alignItems: "center", justifyItems: "center" }}>
        <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <FiX size={28} />
                </motion.div>
            ) : (
                <motion.div
                    key="ai"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <div style={{ position: "relative" }}>
                        <FiCpu size={28} />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.4)",
                                filter: "blur(5px)",
                                transform: "translate(-50%, -50%)",
                                zIndex: -1
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi! I'm saif's AI assistant. Ready to answer anything about his Full-Stack journey and Backend Development focus. How can I help?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleQuestion = (qId: string) => {
        const qa = KNOWLEDGE_BASE.find((item) => item.id === qId);
        if (!qa) return;

        setMessages((prev) => [...prev, { role: "user", content: qa.question }]);

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, { role: "bot", content: qa.answer }]);
        }, 800);
    };

    return (
        <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        style={{
                            width: "380px",
                            height: "550px",
                            background: "rgba(10, 10, 10, 0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "24px",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            marginBottom: "20px",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "10px", height: "10px", background: "#4ade80", borderRadius: "50%" }} />
                                <span style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: "#fff" }}>saif AI Assistant</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, color: "#fff" }}
                                onClick={() => setIsOpen(false)}
                                style={{ background: "none", border: "none", color: "#666", cursor: "pointer" }}
                            >
                                <FiX size={20} />
                            </motion.button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}
                            className="scrollbar-hide"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "bot" ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{
                                        alignSelf: msg.role === "bot" ? "flex-start" : "flex-end",
                                        maxWidth: "85%",
                                        background: msg.role === "bot" ? "rgba(255, 255, 255, 0.03)" : "#fff",
                                        color: msg.role === "bot" ? "#ccc" : "#000",
                                        padding: "12px 18px",
                                        borderRadius: msg.role === "bot" ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {msg.content}
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div style={{ alignSelf: "flex-start", opacity: 0.5, fontSize: "0.8rem", color: "#666" }}>
                                    AI is processing...
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", color: "#444", fontWeight: 700, marginBottom: "4px" }}>Train of Thought</span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {KNOWLEDGE_BASE.map(item => (
                                    <motion.button
                                        key={item.id}
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.2)" }}
                                        onClick={() => handleQuestion(item.id)}
                                        style={{
                                            padding: "8px 14px",
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "1px solid rgba(255, 255, 255, 0.06)",
                                            borderRadius: "10px",
                                            color: "#999",
                                            fontSize: "0.8rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        {item.icon} {item.id === "backend" ? "Backend Dev" : item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animated Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "50%",
                    background: "#fff",
                    color: "#000",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 10px 40px rgba(255, 255, 255, 0.15)",
                }}
            >
                <AIIcon isOpen={isOpen} />
            </motion.button>
        </div>
    );
}
