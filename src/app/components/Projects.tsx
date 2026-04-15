"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight, FiCode, FiLayers, FiX, FiCpu, FiGlobe, FiDatabase, FiSmartphone } from "react-icons/fi";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    clientRepo: string;
    serverRepo?: string;
    liveUrl: string;
    details: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Zap Shift – Parcel Management",
        description: "Full-stack parcel management system with role-based access for Users, Admins, and Riders, automating end-to-end delivery workflows across 64 districts.",
        image: "/zap-shift-pic.png",
        technologies: ["React", "Express.js", "Node.js", "MongoDB", "Tailwind CSS", "Firebase Auth", "Stripe", "Leaflet", "Lottie"],
        clientRepo: "https://github.com/Saif-Uddin0/zap-shift",
        serverRepo: "https://github.com/Saif-Uddin0/zap-shift-server",
        liveUrl: "https://zap-shift-8ec53.web.app/",
        details: "Designed and developed a full-stack parcel management system featuring role-based access for Users, Admins, and Riders. The platform automates end-to-end delivery workflows from booking to delivery across 64 districts. It implements secure authentication using Firebase for protected role-based access and data integrity. Additional technologies include context API, SweetAlert2, Toastify, Stripe payments, React Leaflet for interactive maps, and Lottie animations."
    },
    {
        id: 2,
        title: "Artify Gallery Website",
        description: "Artify is a modern MERN-based artwork marketplace with category filtering, secure authentication, wishlist, and user dashboard.",
        image: "https://i.postimg.cc/BZ171219/artify.jpg",
        technologies: ["React", "Express", "Node.js", "MongoDB", "Firebase"],
        clientRepo: "https://github.com/Saif-Uddin0/Artify-clinet",
        serverRepo: "https://github.com/Saif-Uddin0/Artify-Server",
        liveUrl: "https://artify-c4d2a.web.app/",
        details: "Artify is a modern MERN-based artwork marketplace with category filtering, secure authentication, wishlist, and user dashboard. Built with React, Node.js, MongoDB, and Firebase. The platform ensures seamless navigation and robust data management for both artists and buyers."
    },
    {
        id: 3,
        title: "EduCare Learning Platform",
        description: "The platform features a clean and responsive UI, category filters, and user-friendly navigation to enhance the learning experience.",
        image: "https://i.postimg.cc/xTff27G6/Edu-Care.jpg",
        technologies: ["React", "Tailwind CSS", "DaisyUI", "Vite"],
        clientRepo: "https://github.com/Saif-Uddin0/Edu-Care",
        liveUrl: "https://edu-care-xi.vercel.app/",
        details: "EduCare is a learning platform with a clean and responsive UI. It features advanced category filters, intuitive course layouts, and user-friendly navigation. Built with React, Tailwind CSS, and DaisyUI to ensure a highly responsive and fast experience across all devices."
    },
    {
        id: 4,
        title: "Nest Ecommerce",
        description: "Nest Mart is a responsive grocery e-commerce platform built with React & Tailwind. It features category filtering, product details pages, and beautiful UI.",
        image: "https://i.postimg.cc/qvp1YYDx/project-nest.jpg",
        technologies: ["React", "Tailwind CSS", "Framer Motion"],
        clientRepo: "https://github.com/Saif-Uddin0/Nest-Mart-And-Grosery",
        liveUrl: "https://nest-mart-and-grosery.vercel.app/",
        details: "Nest Mart provides a robust grocery shopping experience. It's built with React, Tailwind CSS, and Framer Motion for highly interactive and smooth animations. The platform includes category filtering, product pages, and a modular reusable component architecture."
    },
    {
        id: 5,
        title: "Learn Hut Platform",
        description: "Learn Hut is an educational learning platform with course filtering, clean UI, authentication, and responsive pages. Built using React, Firebase & Tailwind.",
        image: "https://i.postimg.cc/m2sjzJ4x/learnhut.jpg",
        technologies: ["React", "Firebase", "Tailwind CSS", "Axios"],
        clientRepo: "https://github.com/Saif-Uddin0/Learn-Hut",
        liveUrl: "https://learn-hut-f8527.web.app/skill",
        details: "Learn Hut is an interactive educational platform complete with robust user authentication, integrated course filtering, and dynamic content serving. Powered by React and Firebase with Axios for data handling, the app provides a secure and sleek learning environment tailored for modern students."
    },
    {
        id: 6,
        title: "E-Shop eCommerce",
        description: "E-Shop is a stylish and user-friendly eCommerce website built with a clean modern interface, smart category filtering, and dynamic hero section.",
        image: "https://i.postimg.cc/T2rq60D5/E-Shop.jpg",
        technologies: ["React", "Tailwind CSS", "DaisyUI"],
        clientRepo: "https://github.com/Saif-Uddin0/E-Shop",
        liveUrl: "https://e-shop-sand-chi.vercel.app/",
        details: "E-Shop is built specifically for high sales conversion with a modern, stylish interface. It features smart category filtering, a highly dynamic hero section, intuitive user navigation, and an optimized product browsing flow. Built completely with React and Tailwind CSS."
    }
];

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
    const [isHovered, setIsHovered] = useState(false);

    // Aesthetic Gradient Palettes for Placeholders
    const gradients = [
        "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
        "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)",
        "linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)",
        "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
        "linear-gradient(135deg, #5EE7DF 0%, #B490FF 100%)",
        "linear-gradient(135deg, #FCCB90 0%, #D57EEB 100%)",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group cursor-pointer"
            onClick={() => onOpen(project)}
            style={{ position: "relative" }}
        >
            <div
                style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "24px",
                    padding: "16px",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}
                className="group-hover:border-white/20 group-hover:bg-white/[0.04] group-hover:translate-y-[-10px]"
            >
                {/* Image / Placeholder Area */}
                <div style={{ height: "240px", width: "100%", position: "relative", overflow: "hidden", borderRadius: "16px" }}>
                    {/* Fallback Gradient Backdrop (Behind Image) */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: gradients[index % gradients.length],
                            opacity: 0.5,
                            filter: "blur(60px)",
                            zIndex: 0
                        }}
                    />

                    {/* Actual Project Image */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            unoptimized={true}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Subtle dark overlay for better text contrast */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))" }} />
                    </div>

                    {/* Hover Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.4)",
                            backdropFilter: "blur(8px)",
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: "16px"
                        }}
                    >
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                            className="btn-primary"
                            style={{ padding: "12px 24px", boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                        >
                            View Details <FiArrowRight />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Details Inner Box */}
                <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                        <h3
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: 700,
                                color: "var(--text-primary)",
                                fontFamily: "var(--font-heading)",
                                letterSpacing: "-0.01em"
                            }}
                        >
                            {project.title}
                        </h3>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <a href={project.clientRepo} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/40 transition-colors" title="Client Repository" onClick={(e) => e.stopPropagation()}>
                                <FiGithub size={18} />
                            </a>
                            {project.serverRepo && (
                                <a href={project.serverRepo} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/40 transition-colors" title="Server Repository" onClick={(e) => e.stopPropagation()}>
                                    <FiDatabase size={18} />
                                </a>
                            )}
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white text-white/40 transition-colors" title="Live Site" onClick={(e) => e.stopPropagation()}>
                                <FiExternalLink size={18} />
                            </a>
                        </div>
                    </div>

                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
                        {project.description}
                    </p>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
                        {project.technologies.slice(0, 3).map(tech => (
                            <span
                                key={tech}
                                style={{
                                    fontSize: "0.7rem",
                                    color: "var(--text-muted)",
                                    background: "rgba(255,255,255,0.03)",
                                    padding: "4px 10px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(255,255,255,0.05)"
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>+{project.technologies.length - 3}</span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedProject]);

    return (
        <section id="projects" className="section" style={{ position: "relative", zIndex: 1 }}>
            <div className="container-custom" ref={ref}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "48px" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="section-label">
                            <FiCode size={14} /> Portfolio
                        </div>
                    </motion.div>

                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                        Featured <span style={{ color: "var(--text-secondary)" }}>Work</span>
                    </motion.h2>

                    <motion.div
                        style={{ width: "60px", height: "3px", background: "var(--text-primary)", marginTop: "16px", borderRadius: "10px" }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 60 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                        gap: "32px",
                    }}
                    className="projects-grid"
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onOpen={setSelectedProject}
                        />
                    ))}
                </div>

                <motion.div
                    style={{ marginTop: "40px", textAlign: "center" }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    <p style={{ color: "#555", marginBottom: "24px" }}>Interested in deep detail?</p>
                    <a
                        href="https://github.com/Saif-Uddin0"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "16px 36px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "16px",
                            color: "var(--text-primary)",
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            textDecoration: "none",
                            transition: "all 0.3s ease"
                        }}
                        className="hover:bg-white/10 hover:scale-105 hover:shadow-[inset_0_4px_10px_rgba(255,255,255,0.03),inset_0_-4px_10px_rgba(0,0,0,0.2)]"
                    >
                        Check more in Github <FiArrowRight size={20} />
                    </a>
                </motion.div>
            </div>

            {/* Project Deep-Dive Modal / Drawer */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "rgba(0,0,0,0.8)",
                                backdropFilter: "blur(12px)",
                                zIndex: 10000,
                                cursor: "pointer"
                            }}
                        />

                        {/* Responsive Container */}
                        <div style={{
                            position: "fixed",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001,
                            pointerEvents: "none",
                            padding: "20px"
                        }}>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: window.innerWidth < 768 ? "100%" : 40,
                                    scale: window.innerWidth < 768 ? 1 : 0.95
                                }}
                                animate={{
                                    opacity: 1,
                                    y: window.innerWidth < 768 ? "0%" : 0,
                                    scale: 1
                                }}
                                exit={{
                                    opacity: 0,
                                    y: window.innerWidth < 768 ? "100%" : 40,
                                    scale: window.innerWidth < 768 ? 1 : 0.95
                                }}
                                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                                style={{
                                    width: "100%",
                                    maxWidth: "960px",
                                    maxHeight: window.innerWidth < 768 ? "95vh" : "85vh",
                                    height: window.innerWidth < 768 ? "auto" : "auto",
                                    background: "rgba(10, 10, 10, 0.95)",
                                    backdropFilter: "blur(40px)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: window.innerWidth < 768 ? "32px 32px 0 0" : "32px",
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    pointerEvents: "auto",
                                    alignSelf: window.innerWidth < 768 ? "flex-end" : "center",
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
                                    position: "relative"
                                }}
                            >
                                {/* Drag Handle (Mobile only) */}
                                {window.innerWidth < 768 && (
                                    <div style={{ width: "40px", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", margin: "12px auto 0" }} />
                                )}

                                {/* Modal Header */}
                                <div style={{
                                    padding: "32px 40px",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                        <div style={{
                                            padding: "12px",
                                            borderRadius: "14px",
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <FiCode size={22} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <h2 style={{
                                                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                                                fontWeight: 800,
                                                color: "var(--text-primary)",
                                                fontFamily: "var(--font-heading)",
                                                letterSpacing: "-0.02em",
                                                margin: 0
                                            }}>
                                                {selectedProject.title}
                                            </h2>
                                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginTop: "4px" }}>Project Deep-Dive</span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, background: "rgba(255, 255, 255, 0.08)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setSelectedProject(null)}
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            borderRadius: "50%",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            background: "rgba(255,255,255,0.03)",
                                            color: "#888",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        <FiX size={24} />
                                    </motion.button>
                                </div>

                                {/* Modal Body - Shared Scrollable Area */}
                                <div
                                    style={{
                                        padding: "40px",
                                        overflowY: "auto",
                                        flexGrow: 1,
                                        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.01))"
                                    }}
                                    className="scrollbar-hide"
                                >
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "64px" }}>
                                        {/* Content Left */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                                            <div>
                                                <h4 style={{
                                                    color: "#fff",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 800,
                                                    marginBottom: "20px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "2px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    opacity: 0.6
                                                }}>
                                                    <FiGlobe size={16} /> Overview
                                                </h4>
                                                <p style={{
                                                    color: "var(--text-secondary)",
                                                    lineHeight: 1.9,
                                                    fontSize: "1.15rem",
                                                    fontFamily: "var(--font-sans)",
                                                    fontWeight: 400
                                                }}>
                                                    {selectedProject.details}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Content Right */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                                            <div>
                                                <h4 style={{
                                                    color: "#fff",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 800,
                                                    marginBottom: "24px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "2px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    opacity: 0.6
                                                }}>
                                                    <FiCpu size={16} /> Technical Stack
                                                </h4>
                                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                                    {selectedProject.technologies.map((tech, i) => (
                                                        <motion.span
                                                            key={tech}
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.1 + i * 0.05 }}
                                                            style={{
                                                                padding: "10px 18px",
                                                                background: "rgba(255, 255, 255, 0.03)",
                                                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                                                borderRadius: "14px",
                                                                color: "var(--text-primary)",
                                                                fontSize: "0.85rem",
                                                                fontWeight: 500,
                                                                backdropFilter: "blur(5px)"
                                                            }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ marginTop: "auto" }}>
                                                <div style={{
                                                    display: "flex",
                                                    gap: "16px",
                                                    flexWrap: "wrap",
                                                    flexDirection: window.innerWidth < 480 ? "column" : "row"
                                                }}>
                                                    <a
                                                        href={selectedProject.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-primary"
                                                        style={{
                                                            flexGrow: 1,
                                                            justifyContent: "center",
                                                            padding: "18px 24px",
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        Live Experience <FiExternalLink />
                                                    </a>
                                                    <a
                                                        href={selectedProject.clientRepo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn-outline"
                                                        style={{
                                                            flexGrow: 1,
                                                            justifyContent: "center",
                                                            padding: "18px 24px",
                                                            fontSize: "1rem",
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }}
                                                    >
                                                        Client Code <FiGithub />
                                                    </a>
                                                    {selectedProject.serverRepo && (
                                                        <a
                                                            href={selectedProject.serverRepo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-outline"
                                                            style={{
                                                                flexGrow: 1,
                                                                justifyContent: "center",
                                                                padding: "18px 24px",
                                                                fontSize: "1rem",
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px'
                                                            }}
                                                        >
                                                            Server Code <FiDatabase />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

