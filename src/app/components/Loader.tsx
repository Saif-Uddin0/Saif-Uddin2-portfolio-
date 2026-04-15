"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const technicalSteps = [
    "Initializing Kernel...",
    "Syncing Neural Patterns...",
    "Loading Full-Stack Modules...",
    "Optimizing AI/ML Engine...",
    "Calibrating Orbital Layout...",
    "Establishing Secure Connection...",
    "Preparing Digital Portfolio...",
];

export default function Loader() {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Cinematic loading experience (approx 4.5s)
        const duration = 4500;
        const interval = 45; // Update every 45ms for smooth 100 steps

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, interval);

        // Update text steps staggered
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => (prev < technicalSteps.length - 1 ? prev + 1 : prev));
        }, duration / technicalSteps.length);

        return () => {
            clearInterval(timer);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "#000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
            }}
        >
            {/* Dynamic Grid Background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                    opacity: 0.5
                }}
            />

            <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>

                {/* Animated Tech Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{ marginBottom: "60px" }}
                >
                    <div style={{ position: "relative", width: "120px", height: "120px" }}>
                        {/* Rotating Hexagon */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                border: "2px solid rgba(255,255,255,0.1)",
                                borderRadius: "20%",
                            }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: "absolute",
                                inset: "15%",
                                border: "1px solid rgba(255,255,255,0.05)",
                                borderRadius: "30%",
                            }}
                        />

                        {/* Central Pulse */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.7, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                position: "absolute",
                                inset: "35%",
                                background: "#fff",
                                borderRadius: "50%",
                                filter: "blur(8px)"
                            }}
                        />
                    </div>
                </motion.div>

                {/* Branding */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "#fff",
                            letterSpacing: "8px",
                            textTransform: "uppercase",
                            margin: 0
                        }}
                    >
                        Saif Uddin
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ height: "1px", background: "rgba(255,255,255,0.2)", marginTop: "8px" }}
                    />
                </div>

                {/* Technical Status Steps */}
                <div style={{ height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
                                fontFamily: "var(--font-mono, monospace)",
                                fontSize: "0.75rem",
                                color: "#666",
                                letterSpacing: "1px",
                                margin: 0,
                                textTransform: "uppercase"
                            }}
                        >
                            {technicalSteps[currentStep]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress System */}
                <div style={{ width: "300px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.7rem", color: "#444", fontFamily: "var(--font-mono, monospace)" }}>
                        <span>MOD_0{currentStep + 1}</span>
                        <span>{progress}%</span>
                    </div>
                    <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                        <motion.div
                            style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "#fff",
                                boxShadow: "0 0 10px rgba(255,255,255,0.5)"
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Cinematic Overlays */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)",
                    pointerEvents: "none"
                }}
            />
        </motion.div>
    );
}
