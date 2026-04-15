"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiPhone, FiCheckCircle, FiArrowRight, FiX, FiInfo, FiSend, FiExternalLink } from "react-icons/fi";

const contactInfo = [
    { icon: <FiMail />, label: "Email", value: "mahirr.846@gmail.com", href: "mailto:mahirr.846@gmail.com" },
    { icon: <FiMapPin />, label: "Location", value: "Dhaka, Bangladesh", href: "https://www.google.com/maps/place/Wireless+Gate+Rd,+%E0%A6%A2%E0%A6%BE%E0%A6%95%E0%A6%BE+1212/@23.7790506,90.4008474,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c76fbbb870a1:0x4761db6526741db5!8m2!3d23.7790457!4d90.4034223!16s%2Fg%2F11tc3r82c4?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D" },
    { icon: <FiPhone />, label: "Availability", value: "Open for Collaboration", href: "#" },
];

// ── Success Modal ──────────────────────────────────────────────────────────────
const SuccessModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-[500px] overflow-hidden rounded-[32px] border border-white/10 bg-[#080816] p-10 text-center shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
            >
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-cyan-500/10 blur-[100px]" />
                
                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                    >
                        <FiCheckCircle size={44} />
                    </motion.div>

                    <h2 className="mt-8 text-3xl font-bold tracking-tight text-white">Message Delivered!</h2>
                    <p className="mt-4 text-base leading-relaxed text-neutral-400">
                        Thanks for reaching out! I've received your message and will get back to you personally within <span className="text-cyan-400 font-semibold">24–48 hours</span>.
                    </p>

                    <div className="mt-10 flex flex-col gap-3">
                        <button
                            onClick={onClose}
                            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-sm font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue Browsing
                            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </button>
                        <a 
                            href="https://linkedin.com/in/saif-uddin0/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 py-4 text-sm font-semibold text-white/70 transition-all hover:bg-white/10 hover:text-white"
                        >
                            Connect on LinkedIn
                            <FiExternalLink size={14} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-[10px] uppercase tracking-widest text-white/20">
                    Portfolio of Saif Uddin • MERN Specialist
                </div>
            </motion.div>
        </motion.div>
    );
};

// ── Toast (For Errors) ────────────────────────────────────────────────────────
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
                position: "fixed", top: "40px", right: "40px", zIndex: 9999,
                display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px",
                background: "var(--bg-glass)", backdropFilter: "blur(24px)",
                border: "1px solid rgba(248,113,113,0.3)", borderRadius: "20px",
                boxShadow: "0 24px 48px rgba(0,0,0,0.3)", minWidth: "320px",
            }}
        >
            <div style={{
                width: "44px", height: "44px", borderRadius: "14px",
                background: "rgba(248,113,113,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#f87171", fontSize: "1.3rem", flexShrink: 0,
            }}>
                <FiInfo />
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 700 }}>
                    Action Failed
                </p>
                <p style={{ margin: 0, fontSize: "0.80rem", color: "var(--text-secondary)", marginTop: "2px" }}>{message}</p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                <FiX size={18} />
            </button>
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
            <label style={{
                display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase", marginBottom: "8px", color: isFocused ? "#ffffff" : hasValue ? "#aaa" : "#444",
            }}>
                {label}
            </label>

            {textarea ? (
                <textarea
                    name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                    required={required} rows={4} placeholder={placeholder}
                    className="w-full bg-transparent border-none border-b border-white/10 text-white text-base outline-none transition-all p-0 py-3"
                    style={{ borderBottom: `1px solid ${isFocused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}` }}
                />
            ) : (
                <input
                    type={type} name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                    required={required} placeholder={placeholder}
                    className="w-full bg-transparent border-none border-b border-white/10 text-white text-base outline-none transition-all p-0 py-3"
                    style={{ borderBottom: `1px solid ${isFocused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}` }}
                />
            )}

            <motion.div
                initial={false}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#ffffff", transformOrigin: "left", boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            />
        </div>
    );
};

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [showSuccess, setShowSuccess] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "error" } | null>(null);

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

            if (response.ok) {
                setStatus("idle");
                setFormData({ name: "", email: "", subject: "", message: "" });
                setShowSuccess(true);
            } else {
                const result = await response.json();
                setStatus("error");
                setToast({ message: result.error || "Failed to send message.", type: "error" });
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setToast({ message: "Network error. Please try again.", type: "error" });
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="section" style={{ position: "relative", zIndex: 1 }}>
            {/* Modal & Toast */}
            <AnimatePresence>
                {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
                {toast && <Toast message={toast.message} type="error" onClose={() => setToast(null)} />}
            </AnimatePresence>

            <div className="container-custom" ref={ref}>
                <div className="contact-grid grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-20">

                    {/* Left: Info */}
                    <div className="flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 mb-6">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Available For Work</span>
                            </div>

                            <h2 className="text-5xl xl:text-7xl font-bold tracking-tighter leading-none mb-6">
                                Let&apos;s build <br />
                                <span className="text-neutral-700 dark:text-neutral-500">something great.</span>
                            </h2>
                            <p className="text-neutral-500 max-w-sm leading-relaxed text-lg">
                                Currently open to new opportunities and world-class collaborations. Drop a line and let's engineer something together.
                            </p>
                        </motion.div>

                        <div className="flex flex-col gap-6">
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={info.label} href={info.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex items-center gap-4 group no-underline"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] text-neutral-500 transition-all group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-500/20">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-600 mb-1">{info.label}</p>
                                        <p className="text-neutral-200 font-medium group-hover:text-white transition-colors">{info.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-4">
                            {[
                                { href: "https://github.com/Saif-Uddin0", icon: <FiGithub size={20} /> },
                                { href: "https://linkedin.com/in/saif-uddin0/", icon: <FiLinkedin size={20} /> },
                            ].map((s, i) => (
                                <motion.a
                                    key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] text-neutral-500 hover:bg-white hover:text-black transition-all"
                                    whileHover={{ y: -5 }}
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-[40px] border border-white/5 bg-white/[0.02] p-10 xl:p-14 backdrop-blur-3xl overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 blur-[80px]" />
                        
                        <div className="relative z-10">
                            <div className="mb-10">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-neutral-600 mb-2 block">Send Message</span>
                                <h3 className="text-3xl font-bold text-white tracking-tight">Start a Conversation</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Saif Uddin" required />
                                    <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="saif@dev.com" required />
                                </div>
                                <FormField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" />
                                <FormField label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Hi Saif, I would like to discuss..." textarea required />

                                <motion.button
                                    type="submit"
                                    disabled={status === "loading"}
                                    whileHover={status === "idle" ? { scale: 1.02 } : {}}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-5 text-sm font-bold text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_20px_40px_rgba(255,255,255,0.15)] shadow-xl"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <FiSend className="animate-pulse" />
                                            Gearing up...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <FiArrowRight />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
