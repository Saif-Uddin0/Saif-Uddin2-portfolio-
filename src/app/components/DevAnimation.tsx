"use client";

import { motion } from "framer-motion";

const codeLines = [
    { text: "class saifuddin {", indent: 0, color: "#f87171" }, // Red
    { text: "  constructor() {", indent: 0, color: "#60a5fa" }, // Blue
    { text: "    this.name = 'Saif Uddin';", indent: 1, color: "#fff" },
    { text: "    this.role = 'MERN Stack Developer';", indent: 1, color: "#fff" },
    { text: "    this.passion = 'Building scalable systems';", indent: 1, color: "#fff" },
    { text: "  }", indent: 0, color: "#60a5fa" },
    { text: "  ", indent: 0, color: "#fff" },
    { text: "  async solve(problem) {", indent: 1, color: "#4ade80" }, // Green
    { text: "    return await this.code(problem);", indent: 2, color: "#fff" },
    { text: "  }", indent: 1, color: "#4ade80" },
    { text: "}", indent: 0, color: "#f87171" },
];

export default function DevAnimation() {
    return (
        <div
            style={{
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "24px",
                padding: "24px 28px",
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: "min(0.85rem, 3.5vw)",
                lineHeight: 1.7,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.02)",
                backdropFilter: "blur(40px)"
            }}
        >
            {/* Top Bar / IDE Frame */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                paddingBottom: "12px",
                margin: "-4px -8px 20px -8px"
            }}>
                <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f56", border: "1px solid rgba(0,0,0,0.1)" }} />
                    <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ffbd2e", border: "1px solid rgba(0,0,0,0.1)" }} />
                    <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27c93f", border: "1px solid rgba(0,0,0,0.1)" }} />
                </div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>saif.cpp</div>
                <div style={{ width: "40px" }} /> {/* Spacer */}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                {codeLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                        style={{
                            paddingLeft: `${line.indent * 24}px`,
                            color: line.color,
                            whiteSpace: "pre",
                            display: "flex",
                            alignItems: "flex-start"
                        }}
                    >
                        <span style={{
                            color: "rgba(255,255,255,0.1)",
                            marginRight: "20px",
                            fontSize: "0.75rem",
                            userSelect: "none",
                            width: "14px",
                            textAlign: "right",
                            fontFamily: "var(--font-heading)"
                        }}>{i + 1}</span>
                        <span style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>{line.text}</span>
                    </motion.div>
                ))}
            </div>

            {/* Scanline Effect */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.01), rgba(0, 255, 0, 0.005), rgba(0, 0, 255, 0.01))",
                    backgroundSize: "100% 4px, 3px 100%",
                    pointerEvents: "none",
                    opacity: 0.3
                }}
            />
        </div>
    );
}
