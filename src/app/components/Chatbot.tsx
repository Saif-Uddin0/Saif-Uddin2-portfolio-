"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiUser, FiCode, FiZap, FiCpu } from "react-icons/fi";

const KNOWLEDGE_BASE = [
  {
    id: "who",
    question: "Who is Saif Uddin?",
    keywords: ["who", "saif", "identity", "about"],
    answer: "I am a MERN Stack Developer driven by the challenge of transforming complex requirements into high-performance, user-centric web architectures. Currently completing my Diploma in Computer Science at Feni Computer Institute with a 3.50+ CGPA, I combine academic precision with extensive hands-on engineering experience. My philosophy is built on 'Quality Defined'—striking a perfect balance between robust back-end logic and sleek, modern front-end interfaces that feel as effortless as they are powerful.",
    icon: <FiUser />
  },
  {
    id: "skills",
    question: "What are your core technical skills?",
    keywords: ["skills", "tech", "stack", "mern", "knowledge", "tools"],
    answer: "My core expertise lies in the MERN stack (MongoDB, Express, React, Node.js), with a specialized focus on Next.js for building scalable, SEO-optimized production environments. On the front end, I leverage Tailwind CSS and Framer Motion to create engaging, high-fidelity experiences with smooth, micro-segmented animations. For state management and infrastructure, I’m proficient in Redux and Firebase, ensuring that every application I build is rock-solid and ready to handle high-traffic, real-world data complexity.",
    icon: <FiCode />
  },
  {
    id: "projects",
    question: "Can you tell me about your key projects?",
    keywords: ["projects", "work", "portfolio", "zap shift", "edu-care", "artify"],
    answer: "I prioritize projects that solve real-world problems. For instance, Zap Shift is a mission-critical parcel management system that automated delivery workflows across 64 districts in Bangladesh. Edu-Care is a modern learning platform where I prioritized smooth user engagement through interactive Framer Motion effects. Artify is a digital gallery where I engineered real-time data syncing with MongoDB to create a seamless marketplace for artists to showcase and save favorites.",
    icon: <FiZap />
  },
  {
    id: "backend",
    question: "What is your expertise in Backend Development?",
    keywords: ["backend", "node", "express", "database", "api", "architecture"],
    answer: "My backend philosophy is centered on building high-performance, resilient server-side architectures. I specialize in the Node.js and Express ecosystem, leveraging MongoDB for flexible, high-speed data management. I focus on engineering robust RESTful APIs, implementing secure authentication, and optimizing database performance to ensure seamless data flow even under peak loads. For 2026, my roadmap is set on Cloud Mastery and Advanced System Design to build global-scale applications.",
    icon: <FiCpu />
  },
  {
    id: "education",
    question: "What is your educational background?",
    keywords: ["education", "degree", "diploma", "institute", "college", "feni"],
    answer: "I am currently pursuing a Diploma in Computer Science and Engineering at Feni Computer Institute (Session 2021-2022). My academic journey has provided me with a strong theoretical foundation in algorithms, data structures, and software engineering principles, which I actively apply to my full-stack development projects. I currently maintain a CGPA of 3.50+.",
    icon: <FiCpu />
  },
  {
    id: "contact",
    question: "How to hire/contact you?",
    keywords: ["contact", "hire", "email", "linkedin", "reach out", "work together"],
    answer: "I'm always open to new opportunities and collaborations! You can reach out through the Contact section below, or connect with me directly on LinkedIn or GitHub. I'm currently based in Dhaka and available for both freelance projects and full-time roles where I can contribute to high-impact digital solutions.",
    icon: <FiMessageSquare />
  }
];

const AIIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-[35px] h-[35px] flex items-center justify-center">
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          className="absolute flex items-center justify-center"
        >
          <FiX size={28} className="text-white" />
        </motion.div>
      ) : (
        <motion.div
          key="ai"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute flex items-center justify-center"
        >
          <div className="relative">
            <FiCpu size={28} className="text-white" />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-cyan-400/30 blur-[5px] -translate-x-1/2 -translate-y-1/2 -z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Saif's AI assistant. Ready to answer anything about his Full-Stack journey and Backend Development focus. How can I help?" }
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

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInputMessage("");

    setIsTyping(true);
    
    // Simulate thinking/logic
    setTimeout(() => {
      setIsTyping(false);
      
      const prompt = userMsg.toLowerCase();
      let bestMatch = KNOWLEDGE_BASE.find(item => 
        item.keywords.some(keyword => prompt.includes(keyword))
      );

      const response = bestMatch 
        ? bestMatch.answer 
        : "That's a great question! While I don't have a specific answer for that, I can definitely tell you about Saif's skills, his projects like Zap Shift, or how to contact him. What would you like to know?";

      setMessages((prev) => [...prev, { role: "bot", content: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-[30px] right-[30px] z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-[380px] h-[580px] flex flex-col overflow-hidden mb-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-[24px] bg-[#050510] border border-white/10"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-white/5 bg-[#080816]">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                <span className="font-bold tracking-tight text-white/90">Saif AI Assistant</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <FiX size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide bg-[#050510]"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`max-w-[85%] p-4 text-[0.92rem] leading-relaxed shadow-lg ${
                    msg.role === "bot" 
                      ? "self-start bg-white/5 text-neutral-300 rounded-[18px_18px_18px_4px] border border-white/5" 
                      : "self-end bg-cyan-600/90 text-white rounded-[18px_18px_4px_18px] border border-cyan-400/20"
                  }`}
                >
                  {msg.content}
                </motion.div>
              ))}

              {isTyping && (
                <div className="self-start flex gap-1 items-center px-4 py-2 rounded-full bg-white/5">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] bg-cyan-500/60" />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] bg-cyan-500/60" />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-500/60" />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 flex flex-col gap-3 bg-[#080816] border-t border-white/5">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Suggestions</span>
              <div className="flex flex-wrap gap-2">
                {KNOWLEDGE_BASE.slice(0, 4).map(item => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                    onClick={() => handleQuestion(item.id)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all bg-white/5 border border-white/10 text-white/50 hover:text-white"
                  >
                    {item.question.split(' ').slice(-2).join(' ')}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 flex gap-2 bg-[#0a0a1f] border-t border-white/5"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-xl px-4 py-2 text-sm transition-all outline-none bg-black/40 border border-white/10 text-white placeholder:text-white/20 focus:ring-1 focus:ring-cyan-500/50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-[65px] h-[65px] rounded-full flex items-center justify-center cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-[#050510] border border-white/10 text-white"
      >
        <AIIcon isOpen={isOpen} />
      </motion.button>
    </div>
  );
}
