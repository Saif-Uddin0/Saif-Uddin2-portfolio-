"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiPhone, FiCheckCircle, FiArrowRight, FiX, FiInfo, FiSend } from "react-icons/fi";

const contactInfo = [
    { icon: <FiMail />, label: "Email", value: "mahirr.846@gmail.com", href: "mailto:mahirr.846@gmail.com" },
    { icon: <FiMapPin />, label: "Location", value: "Dhaka, Bangladesh", href: "https://www.google.com/maps/place/Wireless+Gate+Rd,+%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE+1212/@23.7790506,90.4008474,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c76fbbb870a1:0x4761db6526741db5!8m2!3d23.7790457!4d90.4034223!16s%2Fg%2F11tc3r82c4?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D" },
    { icon: <FiPhone />, label: "Availability", value: "Open for Collaboration", href: "#" },
];

// ── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            style={{
                position: "fixed",
                top: "40px",
                right: "40px",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                background: "rgba(10, 10, 10, 0.85)",
                backdropFilter: "blur(24px)",
                border: `1px solid ${type === "success" ? "rgba(255,255,255,0.15)" : "rgba(248,113,113,0.25)"}`,
                borderRadius: "16px",
                boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
                minWidth: "300px",
            }}
        >
            <div style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: type === "success" ? "rgba(255,255,255,0.08)" : "rgba(248,113,113,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: type === "success" ? "#fff" : "#f87171",
                fontSize: "1.2rem", flexShrink: 0
            }}>
                {type === "success" ? <FiCheckCircle /> : <FiInfo />}
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#fff", fontWeight: 600 }}>
                    {type === "success" ? "Message sent!" : "Something went wrong"}
                </p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#666", marginTop: "2px" }}>{message}</p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", padding: "4px", lineHeight: 1 }}>
                <FiX />
            </button>
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                style={{
                    position: "absolute", bottom: 0, left: 0, height: "2px",
                    background: type === "success" ? "#fff" : "#f87171",
                    opacity: 0.2, borderRadius: "0 0 16px 16px"
                }}
            />
        </motion.div>
    );
};

// ── FormField ─────────────────────────────────────────────────────────────────
interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    textarea?: boolean;
}

const FormField = ({ label, name, type = "text", value, placeholder, onChange, required, textarea }: FormFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;

    return (
        <div style={{ position: "relative", marginBottom: "32px" }}>
            {/* Floating label */}
            <label style={{
                display: "block",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "8px",
                transition: "color 0.25s",
                color: isFocused ? "#ffffff" : hasValue ? "#aaa" : "#444",
            }}>
                {label}
            </label>

            {textarea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    rows={4}
                    placeholder={placeholder}
                    style={{
                        width: "100%",
                        padding: "14px 0 14px",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isFocused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)"}`,
                        color: "#fff",
                        fontSize: "1rem",
                        outline: "none",
                        resize: "none",
                        fontFamily: "inherit",
                        lineHeight: 1.6,
                        transition: "border-color 0.3s",
                        boxSizing: "border-box",
                    }}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    required={required}
                    placeholder={placeholder}
                    style={{
                        width: "100%",
                        padding: "14px 0",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isFocused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)"}`,
                        color: "#fff",
                        fontSize: "1rem",
                        outline: "none",
                        fontFamily: "inherit",
                        transition: "border-color 0.3s",
                        boxSizing: "border-box",
                    }}
                />
            )}

            {/* Animated underline */}
            <motion.div
                initial={false}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "1px",
                    background: "#ffffff",
                    transformOrigin: "left",
                    boxShadow: "0 0 12px rgba(255,255,255,0.4)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            />
        </div>
    );
};

// ── Contact ───────────────────────────────────────────────────────────────────
export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                setStatus("idle");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setToast({ message: "I'll get back to you within 24–48 hours.", type: "success" });
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Something went wrong.");
                setToast({ message: result.error || "Failed to send message.", type: "error" });
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setErrorMessage("Failed to send message.");
            setToast({ message: "Network error. Please try again.", type: "error" });
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="section" style={{ position: "relative", zIndex: 1 }}>
            {/* Toast */}
            <AnimatePresence>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </AnimatePresence>

            <div className="container-custom" ref={ref}>
                <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "80px" }} className="contact-grid">

                    {/* ── Left: Info ── */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center xl:items-start"
                        >
                            {/* Section label */}
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "100px", padding: "6px 14px",
                                marginBottom: "28px",
                            }}>
                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", display: "inline-block" }} />
                                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>
                                    Available for Work
                                </span>
                            </div>

                            <h2
                                className="text-center xl:text-left"
                                style={{
                                    fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                                    fontWeight: 700, lineHeight: 1.05,
                                    marginBottom: "20px", letterSpacing: "-0.03em"
                                }}
                            >
                                Let&apos;s build <br />
                                <span style={{ color: "#444" }}>something great.</span>
                            </h2>
                            <p className="text-center xl:text-left" style={{ color: "#666", maxWidth: "380px", fontSize: "1rem", lineHeight: 1.7 }}>
                                I&apos;m currently open to new opportunities and collaborations. Drop me a line and let&apos;s start a conversation.
                            </p>
                        </motion.div>

                        <div style={{ marginTop: "44px" }}>
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                    className="flex items-center justify-center xl:justify-start gap-4 mb-5 text-center xl:text-left group no-underline"
                                    style={{
                                        color: "#ccc", transition: "color 0.2s",
                                    }}
                                    whileHover={{ x: 4 }}
                                >
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "10px",
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "1rem", color: "#666", flexShrink: 0,
                                    }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "0.6rem", color: "#444", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "2px", fontWeight: 700 }}>{info.label}</p>
                                        <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#ddd" }}>{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}

                            {/* Social links */}
                            <motion.div
                                className="flex justify-center xl:justify-start gap-3 mt-8"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 }}
                            >
                                {[
                                    { href: "https://github.com/Saif-Uddin0", icon: <FiGithub /> },
                                    { href: "https://www.linkedin.com/in/saif-uddin0/", icon: <FiLinkedin /> },
                                ].map((s) => (
                                    <motion.a
                                        key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                                        className="social-icon"
                                        whileHover={{ y: -3, background: "rgba(255,255,255,0.1)" }}
                                        style={{ transition: "background 0.2s" }}
                                    >
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        style={{ position: "relative" }}
                    >
                        {/* Subtle glow behind card */}
                        <div style={{
                            position: "absolute", top: "-40px", right: "-40px",
                            width: "200px", height: "200px",
                            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                            pointerEvents: "none",
                        }} />

                        <form
                            onSubmit={handleSubmit}
                            style={{
                                padding: "48px 52px",
                                background: "rgba(255,255,255,0.015)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "28px",
                                backdropFilter: "blur(16px)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Top inner accent */}
                            <div style={{
                                position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                            }} />

                            {/* Form header */}
                            <div style={{ marginBottom: "36px" }}>
                                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", color: "#555", textTransform: "uppercase", margin: "0 0 8px" }}>
                                    Send a message
                                </p>
                                <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                                    Start a Conversation
                                </h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="form-row">
                                <FormField label="Your name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                                <FormField label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                            </div>
                            <FormField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Collaboration" />
                            <div style={{ position: "relative" }}>
                                <FormField label="Your message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." textarea required />
                                {/* Character count */}
                                {formData.message.length > 0 && (
                                    <span style={{
                                        position: "absolute", bottom: "8px", right: "0",
                                        fontSize: "0.68rem", color: "#444",
                                    }}>
                                        {formData.message.length} chars
                                    </span>
                                )}
                            </div>

                            {/* Submit button */}
                            <div style={{ marginTop: "8px" }}>
                                <motion.button
                                    type="submit"
                                    disabled={status === "loading"}
                                    style={{
                                        width: "100%", padding: "17px",
                                        background: status === "loading" ? "rgba(255,255,255,0.08)" : "var(--accent)",
                                        color: status === "loading" ? "#555" : "var(--bg-primary)",
                                        borderRadius: "16px",
                                        fontWeight: 700, fontSize: "0.95rem",
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                                        cursor: status === "loading" ? "not-allowed" : "pointer",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        boxShadow: status === "loading" ? "none" : "0 8px 32px rgba(255,255,255,0.08)",
                                        transition: "all 0.25s",
                                        letterSpacing: "0.01em",
                                    }}
                                    whileHover={status !== "loading" ? { y: -2, boxShadow: "0 16px 48px rgba(255,255,255,0.15)" } : {}}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {status === "loading" ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                style={{ display: "inline-block", fontSize: "1rem" }}
                                            >
                                                <FiSend />
                                            </motion.span>
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FiArrowRight />
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {status === "error" && !toast && (
                                <p style={{ color: "#f87171", fontSize: "0.82rem", marginTop: "14px", textAlign: "center" }}>
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </motion.div>

                </div>
            </div>

            <style jsx>{`
                @media (max-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                        gap: 56px !important;
                    }
                    .form-row {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
}
