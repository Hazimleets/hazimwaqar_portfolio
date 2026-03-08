import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TECH_GRID = [
  { name: "Python",           color: "#3776AB", cat: "Languages",       abbr: "PY"   },
  { name: "C++",              color: "#00599C", cat: "Languages",       abbr: "C++"  },
  { name: "Dart",             color: "#0175C2", cat: "Languages",       abbr: "DRT"  },
  { name: "JavaScript",       color: "#F7DF1E", cat: "Languages",       abbr: "JS"   },
  { name: "SQL",              color: "#E38C00", cat: "Languages",       abbr: "SQL"  },
  { name: "VS Code",          color: "#007ACC", cat: "Tools & Frameworks", abbr: "VSC"  },
  { name: "Google Colab",     color: "#F9AB00", cat: "Tools & Frameworks", abbr: "COL"  },
  { name: "Postman",          color: "#FF6C37", cat: "Tools & Frameworks", abbr: "POST" },
  { name: "n8n",              color: "#EA4B71", cat: "Tools & Frameworks", abbr: "N8N"  },
  { name: "Cursor AI",        color: "#888888", cat: "Tools & Frameworks", abbr: "CUR"  },
  { name: "Grafana",          color: "#F46800", cat: "Tools & Frameworks", abbr: "GRF"  },
  { name: "Arduino IDE",      color: "#00979D", cat: "Tools & Frameworks", abbr: "ARD"  },
  { name: "MQTT",             color: "#660066", cat: "Tools & Frameworks", abbr: "MQT"  },
  { name: "Slack",            color: "#4A154B", cat: "Tools & Frameworks", abbr: "SLK"  },
  { name: "Jira",             color: "#0052CC", cat: "Tools & Frameworks", abbr: "JRA"  },
  { name: "PyTorch",          color: "#EE4C2C", cat: "ML Framework",    abbr: "PT"   },
  { name: "TensorFlow",       color: "#FF6F00", cat: "ML Framework",    abbr: "TF"   },
  { name: "Scikit-Learn",     color: "#F89939", cat: "ML Framework",    abbr: "SKL"  },
  { name: "Keras",            color: "#D00000", cat: "ML Framework",    abbr: "KRS"  },
  { name: "OpenCV",           color: "#5C3EE8", cat: "ML Framework",    abbr: "CV2"  },
  { name: "LangChain",        color: "#1EC8A0", cat: "LLM & NLP",       abbr: "LC"   },
  { name: "LlamaIndex",       color: "#7C3AED", cat: "LLM & NLP",       abbr: "LLI"  },
  { name: "Hugging Face",     color: "#FFD21E", cat: "LLM & NLP",       abbr: "HF"   },
  { name: "OpenAI API",       color: "#10A37F", cat: "LLM & NLP",       abbr: "OAI"  },
  { name: "spaCy",            color: "#09A3D5", cat: "LLM & NLP",       abbr: "SPC"  },
  { name: "NLTK",             color: "#4A90D9", cat: "LLM & NLP",       abbr: "NLK"  },
  { name: "Transformers",     color: "#FF9D00", cat: "LLM & NLP",       abbr: "TRF"  },
  { name: "Whisper AI",       color: "#412991", cat: "LLM & NLP",       abbr: "WSP"  },
  { name: "FAISS",            color: "#00C4CC", cat: "LLM & NLP",       abbr: "FAI"  },
  { name: "React",            color: "#61DAFB", cat: "Frontend",         abbr: "Re"   },
  { name: "Next.js",          color: "#888888", cat: "Frontend",         abbr: "NXT"  },
  { name: "Flutter",          color: "#02569B", cat: "Frontend",         abbr: "FLT"  },
  { name: "Streamlit",        color: "#FF4B4B", cat: "Frontend",         abbr: "ST"   },
  { name: "HTML / CSS",       color: "#E34F26", cat: "Frontend",         abbr: "HTML" },
  { name: "Tailwind CSS",     color: "#06B6D4", cat: "Frontend",         abbr: "TWD"  },
  { name: "FastAPI",          color: "#009688", cat: "Backend",          abbr: "FAPI" },
  { name: "Django",           color: "#44B78B", cat: "Backend",          abbr: "DJG"  },
  { name: "Flask",            color: "#AAAAAA", cat: "Backend",          abbr: "FLK"  },
  { name: "Node.js",          color: "#339933", cat: "Backend",          abbr: "NODE" },
  { name: "MySQL",            color: "#4479A1", cat: "Databases",        abbr: "MYS"  },
  { name: "MongoDB",          color: "#47A248", cat: "Databases",        abbr: "MDB"  },
  { name: "PostgreSQL",       color: "#336791", cat: "Databases",        abbr: "PG"   },
  { name: "Chroma DB",        color: "#FF6B35", cat: "Databases",        abbr: "CHR"  },
  { name: "Pinecone",         color: "#1A8FE3", cat: "Databases",        abbr: "PIN"  },
  { name: "Weaviate",         color: "#4CAF50", cat: "Databases",        abbr: "WEV"  },
  { name: "InfluxDB",         color: "#22ADF6", cat: "Databases",        abbr: "IFX"  },
  { name: "Docker",           color: "#2496ED", cat: "MLOps & DevOps",   abbr: "DKR"  },
  { name: "Git / GitHub",     color: "#F05032", cat: "MLOps & DevOps",   abbr: "GIT"  },
  { name: "MLflow",           color: "#0194E2", cat: "MLOps & DevOps",   abbr: "MLF"  },
  { name: "DVC",              color: "#945DD6", cat: "MLOps & DevOps",   abbr: "DVC"  },
  { name: "Weights & Biases", color: "#FFBE00", cat: "MLOps & DevOps",   abbr: "W&B"  },
  { name: "Kubernetes",       color: "#326CE5", cat: "MLOps & DevOps",   abbr: "K8S"  },
  { name: "GitHub Actions",   color: "#2088FF", cat: "MLOps & DevOps",   abbr: "CI"   },
  { name: "Celery",           color: "#37814A", cat: "MLOps & DevOps",   abbr: "CEL"  },
  { name: "Redis",            color: "#DC382D", cat: "MLOps & DevOps",   abbr: "RDS"  },
  { name: "Pandas",           color: "#150458", cat: "Analytics",        abbr: "PD"   },
  { name: "NumPy",            color: "#4DABCF", cat: "Analytics",        abbr: "NP"   },
  { name: "Matplotlib",       color: "#11557C", cat: "Analytics",        abbr: "PLT"  },
  { name: "Jupyter",          color: "#F37626", cat: "Analytics",        abbr: "JPY"  },
];

const CAT_COLORS = {
  "Languages":           "#3776AB",
  "Tools & Frameworks":  "#9333EA",
  "ML Framework":        "#EE4C2C",
  "LLM & NLP":           "#1EC8A0",
  "Frontend":            "#61DAFB",
  "Backend":             "#009688",
  "Databases":           "#47A248",
  "MLOps & DevOps":      "#2496ED",
  "Analytics":           "#F2C811",
};

const TECH_STACK = ["Python","MCP","LangChain","Mlops","React","Docker","FastAPI","MySQL","IOT"];
const BASE = "/hazimwaqar_portfolio";

const PROJECTS = [
  {
    title: "Model Context Protocol (MCP) Implementation",
    image: `${BASE}/mcp.jpg`,
    desc: "A system demonstrating the Model Context Protocol (MCP) for sharing contextual information across AI models.",
    tags: ["MCP", "AI", "Context Management"],
    href: "https://github.com/Hazimleets/mcp",
  },
  {
    title: "Multimodal Retrieval & Generation",
    image: `${BASE}/multimodal.jpg`,
    desc: "Combines text, images, and documents in a unified RAG pipeline for richer, context-aware AI responses.",
    tags: ["RAG", "Multimodal", "LangChain"],
    href: "#",
  },
  {
    title: "Multi-Agent AI Hiring HR System",
    image: `${BASE}/hr_agent.jpg`,
    desc: "An autonomous multi-agent pipeline that screens candidates, schedules interviews, and drafts offer letters.",
    tags: ["Agents","NLP","FastAPI"],
    href: "https://github.com/Hazimleets/Hiring-HR-Agent",
  },
  {
    title: "GoGreen Carbon Monitoring System",
    image: `${BASE}/gogreen.jpg`,
    desc: "An AIoT carbon monitoring platform with real-time CO₂ tracking, smart sensor integration, and AI-driven emission insights.",
    tags: ["Flutter", "FastAPI", "IoT", "Python"],
    href: "https://github.com/Hazimleets/Carbon-Monitoring",
  },
  {
    title: "Supply Chain Risk & Compliance Automation",
    image: `${BASE}/risk.jpg`,
    desc: "An automated supply chain risk platform with real-time supplier monitoring, AI-driven risk detection, and instant cross-team alerts.",
    tags: ["n8n", "Slack API", "Jira", "Google Sheets"],
    href: "https://github.com/Hazimleets/Automation_Projects/tree/main/supplier-news-risk",
  },
  {
    title: "Proposal & Pitch Deck Generator",
    image: `${BASE}/pitch.jpg`,
    desc: "A web MVP that auto-generates professional business proposals and investor pitch decks using AI, with PDF and PPTX export.",
    tags: ["Django", "Next.js", "OpenAI", "PostgreSQL"],
    href: "https://github.com/Hazimleets/AI-Powered-Proposal-Pitch-Deck-Generator",
  },
];

const EXPERIENCE = [
  {
    title: "Generative AI & NLP Engineer",
    date: "Jan 2025 – Present",
    desc: "Built production-grade AI systems: RAG for clinical diagnostic reasoning, fine-tuned DeepSeek, Whisper-based speech pipelines, Roman poetry generation, and multilingual NLP tools.",
  },
  {
    title: "Machine Learning Researcher",
    date: "2024",
    desc: "Designed deep learning models for sentiment analysis, English-to-Urdu RNN translation, LLM-based text summarisation, and a custom transformer summariser.",
  },
  {
    title: "Freelance AI Project Developer",
    date: "2023 – Present",
    desc: "Delivered AI-powered client solutions including chatbots, automated reporting tools, and intelligent data pipelines.",
  },
  {
    title: "B.S. Artificial Intelligence Student",
    date: "Sep 2022 – Jul 2026",
    desc: "National Textile University, Pakistan. Focused on machine learning, deep learning, computer vision, and NLP.",
  },
];

const PHASES = [
  {
    phase: "Phase 1",
    title: "Discovery & Planning",
    desc: "We define the problem scope, data requirements, and model architecture. I map out the full ML pipeline before writing a single line of code.",
  },
  {
    phase: "Phase 2",
    title: "Development & Iteration",
    desc: "I build, train, and iterate — logging every experiment, keeping you updated with progress reports and live demos along the way.",
  },
  {
    phase: "Phase 3",
    title: "Deployment & Handoff",
    desc: "The final model is packaged, deployed, and fully documented. Your team will be able to maintain and extend it with confidence.",
  },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home","about","services","portfolio","experience","contact"];
    const handler = () => {
      let cur = "home";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

/* ─────────────────────────────────────────────
   TYPING TEXT
───────────────────────────────────────────── */
function TypingText({ words }) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 55 : 100;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = charIndex + 1;
        setDisplay(currentWord.slice(0, next));
        setCharIndex(next);
        if (next === currentWord.length) {
          setIsPaused(true);
          setTimeout(() => { setIsDeleting(true); setIsPaused(false); }, 1600);
        }
      } else {
        const next = charIndex - 1;
        setDisplay(currentWord.slice(0, next));
        setCharIndex(next);
        if (next === 0) { setIsDeleting(false); setWordIndex((i) => (i + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [display, charIndex, isDeleting, isPaused, wordIndex, words]);

  return (
    <span style={{ color: "var(--purple)", fontWeight: 700 }}>
      {display}
      <span style={{ animation: "blink 1s step-end infinite", color: "var(--purple)" }}>|</span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   TECH CARD
───────────────────────────────────────────── */
function TechCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? item.color + "1a" : "rgba(255,255,255,0.025)",
        border: "1px solid " + (hovered ? item.color + "66" : "rgba(255,255,255,0.07)"),
        borderRadius: 14, padding: "0.85rem 0.4rem 0.75rem",
        textAlign: "center", cursor: "default", transition: "all 0.22s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 28px " + item.color + "28" : "none",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: item.color + "22", border: "1px solid " + item.color + "44",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 0.5rem",
        fontSize: "0.58rem", fontWeight: 800, color: item.color,
        letterSpacing: "0.02em", fontFamily: "'Plus Jakarta Sans',sans-serif",
        lineHeight: 1.1,
        boxShadow: hovered ? "0 0 12px " + item.color + "55" : "none",
        transition: "box-shadow 0.22s",
      }}>
        {item.abbr}
      </div>
      <div style={{ fontSize: "0.67rem", fontWeight: 700, color: hovered ? "var(--white)" : "var(--off)", lineHeight: 1.3, transition: "color 0.2s" }}>
        {item.name}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TECH STACK GRID
───────────────────────────────────────────── */
function TechStackGrid() {
  const [openCategory, setOpenCategory] = useState(null);
  const cats = Object.keys(CAT_COLORS);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
        {cats.map(cat => {
          const isActive = openCategory === cat;
          const col = CAT_COLORS[cat];
          const count = TECH_GRID.filter(t => t.cat === cat).length;
          return (
            <button key={cat} onClick={() => setOpenCategory(isActive ? null : cat)} style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.28rem 0.8rem", borderRadius: 99,
              border: "1px solid " + (isActive ? col + "66" : "rgba(255,255,255,0.08)"),
              background: isActive ? col + "1a" : "rgba(255,255,255,0.03)",
              color: isActive ? col : "var(--muted)",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.7rem", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              transition: "all 0.18s",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: col, display: "inline-block" }} />
              {cat}
              <span style={{ opacity: 0.6, marginLeft: "0.15rem" }}>({count})</span>
            </button>
          );
        })}
      </div>
      {openCategory && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            marginBottom: "0.75rem", padding: "0.5rem 0.9rem",
            background: CAT_COLORS[openCategory] + "0e",
            border: "1px solid " + CAT_COLORS[openCategory] + "28",
            borderRadius: 9,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: CAT_COLORS[openCategory] }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: CAT_COLORS[openCategory] }}>{openCategory}</span>
            <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>— {TECH_GRID.filter(t => t.cat === openCategory).length} technologies</span>
            <button onClick={() => setOpenCategory(null)} style={{
              marginLeft: "auto", fontSize: "0.65rem", color: "var(--muted)",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 99, padding: "0.1rem 0.55rem", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
            }}>✕</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(78px, 1fr))", gap: "0.55rem" }}>
            {TECH_GRID.filter(t => t.cat === openCategory).map(item => (
              <TechCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      )}
      {!openCategory && (
        <div style={{ textAlign: "center", padding: "1.5rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
          <p style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
            Click a category to explore <strong style={{ color: "var(--purple)" }}>{TECH_GRID.length}</strong> technologies
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FADE IN
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView(0.07);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD — exact reference image style
   • Pill label at top-center inside card
   • Thin vertical line from pill down to image edge
   • Image skewed in 3D (rotateX + rotateY) like a
     floating screen mockup tilted toward viewer
   • Glare sheen on the tilted surface
   • Title, desc, overlapping circles, Check Live Site
───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(36px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.45s cubic-bezier(.23,1,.32,1), box-shadow 0.4s, border-color 0.3s`,
        background: "var(--card)",
        border: `1px solid ${hovered ? "rgba(203,172,249,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 28px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(203,172,249,0.18), 0 0 50px rgba(203,172,249,0.07)"
          : "0 4px 24px rgba(0,0,0,0.35)",
      }}
    >
      {/* ══ TOP AREA: pill + line + 3D mockup ══ */}
      <div style={{
        position: "relative",
        background: hovered
          ? "linear-gradient(160deg, rgba(79,172,254,0.06) 0%, rgba(203,172,249,0.06) 100%)"
          : "linear-gradient(160deg, rgba(255,255,255,0.025) 0%, transparent 100%)",
        transition: "background 0.5s",
        padding: "1.6rem 1.4rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 280,
      }}>

        {/* ── PILL LABEL ── */}
        <div style={{
          background: "rgba(10,13,38,0.96)",
          border: `1px solid ${hovered ? "rgba(203,172,249,0.5)" : "rgba(255,255,255,0.14)"}`,
          borderRadius: 99,
          padding: "0.3rem 1rem",
          fontSize: "0.72rem",
          fontWeight: 700,
          color: hovered ? "var(--purple)" : "rgba(255,255,255,0.9)",
          whiteSpace: "nowrap",
          letterSpacing: "0.03em",
          transition: "border-color 0.3s, color 0.3s, box-shadow 0.3s",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: hovered
            ? "0 0 0 3px rgba(203,172,249,0.1), 0 4px 20px rgba(0,0,0,0.5)"
            : "0 2px 14px rgba(0,0,0,0.55)",
          position: "relative",
          zIndex: 5,
          flexShrink: 0,
        }}>
          {project.title.length > 28 ? project.title.slice(0, 28) + "…" : project.title}
        </div>

        {/* ── VERTICAL LINE: pill → mockup ── */}
        <div style={{
          width: 1,
          height: 20,
          flexShrink: 0,
          background: hovered
            ? "linear-gradient(180deg, rgba(203,172,249,0.65) 0%, rgba(203,172,249,0.15) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 100%)",
          transition: "background 0.3s",
          zIndex: 4,
        }} />

        {/* ── 3D TILTED SCREEN MOCKUP ── */}
        <div style={{ width: "100%", perspective: "700px", flexShrink: 0 }}>
          <div style={{
            /* Key: rotateX tilts top away, rotateY turns left side toward you */
            transform: hovered
              ? "rotateX(12deg) rotateY(6deg) rotateZ(-1deg) translateY(-6px) scale(1.02)"
              : "rotateX(22deg) rotateY(12deg) rotateZ(-2deg) translateY(0px) scale(1)",
            transformOrigin: "50% 100%",
            transition: "transform 0.65s cubic-bezier(.23,1,.32,1)",
            borderRadius: "10px 10px 0 0",
            overflow: "hidden",
            position: "relative",
            boxShadow: hovered
              ? "-6px 14px 40px rgba(0,0,0,0.7), 0 2px 12px rgba(203,172,249,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "-10px 20px 36px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "none",
          }}>
            {/* Glare sheen — top-left highlight like a real screen */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
              background: "linear-gradient(130deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 30%, transparent 55%)",
              transition: "opacity 0.4s",
              opacity: hovered ? 0.65 : 1,
            }} />
            {/* Bottom fade into card bg */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 40, zIndex: 6, pointerEvents: "none",
              background: "linear-gradient(to top, var(--card), transparent)",
            }} />

            {project.image && !imgError ? (
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                style={{ width: "100%", height: 175, objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{
                width: "100%", height: 175,
                background: "linear-gradient(135deg, #0d1730 0%, #160d30 100%)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}>
                <svg width="40" height="40" viewBox="0 0 52 52" fill="none">
                  <rect width="52" height="52" rx="14" fill="rgba(255,255,255,0.04)" />
                  <path d="M14 38L22 24L29 34L33 26L38 38H14Z" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                  <circle cx="33" cy="18" r="5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
                </svg>
                <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.14)", fontStyle: "italic" }}>No image</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ BOTTOM CONTENT ══ */}
      <div style={{ padding: "1.2rem 1.5rem 1.5rem" }}>
        <h3 style={{
          fontWeight: 800, color: "var(--white)", fontSize: "1.05rem",
          lineHeight: 1.35, marginBottom: "0.45rem", letterSpacing: "-0.015em",
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.65,
          marginBottom: "1.2rem",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {project.desc}
        </p>

        {/* Tags + CTA row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                background: hovered ? "rgba(203,172,249,0.1)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${hovered ? "rgba(203,172,249,0.28)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 6, padding: "0.2rem 0.6rem",
                fontSize: "0.7rem", fontWeight: 600,
                color: hovered ? "var(--purple)" : "var(--off)",
                letterSpacing: "0.03em",
                transition: "all 0.25s",
              }}>
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "linear-gradient(135deg,#4facfe 0%,#cbacf9 100%)",
              color: "#000", fontWeight: 800, fontSize: "0.82rem",
              padding: "0.45rem 1.1rem", borderRadius: 8,
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(79,172,254,0.3)",
              transition: "opacity 0.2s, transform 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Check Repo
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const Icons = {
  layers: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  chat:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  code:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  brain:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3 3 3 0 0 0 2 3v1a3 3 0 0 0 3 3" /><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3 3 3 0 0 1-2 3v1a3 3 0 0 1-3 3" /><path d="M9 10h6" /><path d="M9 14h6" /></svg>,
  github: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  medium: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>,
  mail:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  copy:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>,
  check:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  dot:    <svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4" /></svg>,
};

function SectionLabel({ text }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.5rem",
      background: "rgba(203,172,249,0.1)", border: "1px solid rgba(203,172,249,0.2)",
      borderRadius: 99, padding: "0.3rem 1rem",
      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      color: "var(--purple)", marginBottom: "1.25rem",
    }}>
      {Icons.dot} {text}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "services",   label: "Services" },
  { id: "portfolio",  label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Portfolio() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hazimwaqar.contact@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const btnPrimary = {
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.75rem 1.75rem", borderRadius: 10,
    background: "linear-gradient(135deg,#4facfe 0%,#cbacf9 100%)",
    color: "#000", fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: "0.9rem", border: "none", cursor: "pointer",
    letterSpacing: "0.01em",
  };

  const btnGhost = {
    display: "inline-flex", alignItems: "center", gap: "0.4rem",
    padding: "0.75rem 1.75rem", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)", color: "var(--white)",
    fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif",
    fontSize: "0.9rem", background: "rgba(255,255,255,0.04)",
    cursor: "pointer", textDecoration: "none",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        :root {
          --black: #04071d; --card: #0d1128; --card2: #111630;
          --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.13);
          --white: #ffffff; --off: #c1c2d3; --muted: #5c6080;
          --purple: #cbacf9; --blue: #4facfe;
          --grad: linear-gradient(135deg, #4facfe 0%, #cbacf9 100%);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--black); color: var(--off); font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1.6; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(203,172,249,0.28); color: #fff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--black); }
        ::-webkit-scrollbar-thumb { background: var(--purple); border-radius: 4px; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }
        @keyframes blink    { 50% { opacity: 0; } }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }
        @keyframes fadeIn   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 820px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .hero-right   { display: none !important; }
          .about-grid   { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .desktop-nav  { display: none !important; }
          .nav-cta      { display: none !important; }
          .hamburger    { display: flex !important; }
        }
        @media (max-width: 540px) {
          .section-pad { padding: 4rem 0 !important; }
          .form-row    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: 68,
        background: "rgba(4,7,29,0.85)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--white)", letterSpacing: "-0.03em", cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hazim</span>{" Waqar"}
        </div>
        <ul className="desktop-nav" style={{ display: "flex", gap: "0.15rem", listStyle: "none" }}>
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <button onClick={() => scrollTo(n.id)} style={{
                background: active === n.id ? "rgba(255,255,255,0.07)" : "none",
                border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontSize: "0.84rem", fontWeight: active === n.id ? 700 : 500,
                color: active === n.id ? "var(--white)" : "var(--muted)",
                padding: "0.45rem 0.95rem", borderRadius: 7, transition: "color 0.2s, background 0.2s",
              }}>{n.label}</button>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")} style={{ ...btnPrimary, padding: "0.55rem 1.3rem", fontSize: "0.84rem" }}>
          Book a Call
        </button>
        <button className="hamburger" onClick={() => setMenuOpen((o) => !o)}
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 1.5, background: "var(--white)", display: "block", borderRadius: 2 }} />)}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 199,
          background: "rgba(4,7,29,0.97)", borderBottom: "1px solid var(--border)",
          padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.15rem",
        }}>
          {NAV_ITEMS.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.95rem", fontWeight: 600,
              color: "var(--off)", padding: "0.65rem 0.4rem", borderBottom: "1px solid var(--border)",
            }}>{n.label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 68, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 700, height: 700, top: -200, right: -180, borderRadius: "50%", background: "rgba(203,172,249,0.11)", filter: "blur(160px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, bottom: 0, left: -100, borderRadius: "50%", background: "rgba(79,172,254,0.07)", filter: "blur(140px)", pointerEvents: "none" }} />
        <div className="container" style={{ width: "100%" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <FadeIn>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(79,172,254,0.1)", border: "1px solid rgba(79,172,254,0.22)", borderRadius: 99, padding: "0.35rem 1rem", fontSize: "0.72rem", fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
                Available for New Projects
              </div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(2.4rem,4.5vw,3.8rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
                Transforming Data into{" "}
                <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligent</span>{" "}
                Systems
              </h1>
              <p style={{ fontSize: "1.05rem", color: "var(--muted)", marginBottom: "2rem", lineHeight: 1.7 }}>
                {"Hi, I'm "}
                <strong style={{ color: "var(--white)", fontWeight: 700 }}>Hazim Waqar</strong>
                {", a "}
                <TypingText words={["AI Engineer", "GenAI Developer", "MLOps Learner"]} />
                {" based in Pakistan"}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("portfolio")} style={btnPrimary}>Show my Work</button>
                <a href={`${BASE}/Hazim_Resume.pdf`} target="_blank" rel="noreferrer" style={btnGhost}>Download CV</a>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="hero-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ gridColumn: "span 2", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>Core Tech Stack</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {TECH_STACK.map((t) => (
                      <span key={t} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "0.22rem 0.65rem", fontSize: "0.72rem", fontWeight: 600, color: "var(--off)", letterSpacing: "0.03em" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Technologies</p>
                  <p style={{ fontSize: "2rem", fontWeight: 800, background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{TECH_GRID.length}+</p>
                </div>
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Location</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--white)" }}>Pakistan</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.2rem" }}>Flexible with time zones</p>
                </div>
                <div style={{ gridColumn: "span 2", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "1rem 1.5rem" }}>
                  <button onClick={copyEmail} style={{ width: "100%", background: "rgba(203,172,249,0.1)", border: "1px solid rgba(203,172,249,0.22)", borderRadius: 10, padding: "0.7rem 1rem", color: "var(--purple)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    {copied ? Icons.check : Icons.copy}
                    {copied ? "Email Copied!" : "Copy my Email"}
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-pad" style={{ padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <SectionLabel text="About Me" />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>
              {"I'm Hazim Waqar, an "}
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Engineer</span>
            </h2>
          </FadeIn>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>
            <FadeIn delay={0.05}>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                Passionate AI student pursuing a degree in Artificial Intelligence at National Textile University. Specialised in designing, training, and deploying machine learning and deep learning models. Known for analytical thinking, problem-solving, and meeting tight deadlines.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem", marginTop: "1rem" }}>
                A fast learner who stays current with AI trends through hands-on practice and self-study. Committed to continuous learning and applying AI to create impactful, scalable technologies.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", margin: "1.75rem 0" }}>
                {[["Degree","Artificial Intelligence"],["University","National Textile University"],["Location","Pakistan"]].map(([k,v]) => (
                  <div key={k} style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1.2rem" }}>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{k}</div>
                    <div style={{ fontWeight: 700, color: "var(--purple)", fontSize: "0.88rem" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                <button onClick={() => scrollTo("contact")} style={btnPrimary}>Hire Me</button>
                <a href={`${BASE}/Hazim_Resume.pdf`} target="_blank" rel="noreferrer" style={btnGhost}>Download CV</a>
              </div>
              <h4 style={{ fontWeight: 800, color: "var(--white)", marginBottom: "1.25rem", fontSize: "0.95rem" }}>Education</h4>
              <div style={{ position: "relative", paddingLeft: "1.5rem", borderLeft: "1px solid var(--border)" }}>
                {[
                  { date: "Sep 2022 – Jul 2026 (Expected)", title: "B.S. in Artificial Intelligence", sub: "National Textile University" },
                  { date: "Aug 2018 – Aug 2020", title: "F.Sc Pre-Engineering", sub: "Shiblee College" },
                ].map((e, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: "1.75rem" }}>
                    <div style={{ position: "absolute", left: "-1.5rem", transform: "translateX(-50%)", top: 5, width: 10, height: 10, borderRadius: "50%", background: "var(--purple)", boxShadow: "0 0 0 3px rgba(203,172,249,0.18)" }} />
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--blue)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{e.date}</div>
                    <div style={{ fontWeight: 700, color: "var(--white)", fontSize: "0.92rem", marginBottom: "0.2rem" }}>{e.title}</div>
                    <div style={{ fontSize: "0.83rem", color: "var(--muted)" }}>{e.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h4 style={{ fontWeight: 800, color: "var(--white)", fontSize: "0.95rem", letterSpacing: "-0.01em", marginBottom: "0.4rem" }}>Tech Stack</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "1.1rem", lineHeight: 1.6 }}>
                Click a category to explore. {TECH_GRID.length} technologies across {Object.keys(CAT_COLORS).length} categories.
              </p>
              <TechStackGrid />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad" style={{ padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <SectionLabel text="What I Do" />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>Services</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 520, lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Specialised AI & ML services delivered with precision and a focus on real-world impact.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.25rem" }}>
            {[
              { title: "Machine Learning Solutions", icon: Icons.layers, desc: "End-to-end ML pipelines — from data preprocessing and feature engineering to model training, evaluation, and production deployment." },
              { title: "NLP & Text Analytics",       icon: Icons.code,   desc: "Sentiment analysis, multilingual translation, summarisation, and semantic search using state-of-the-art transformer architectures." },
              { title: "Generative AI Development",  icon: Icons.chat,   desc: "LLM-powered applications including RAG systems, fine-tuned models, text and image generation pipelines, and conversational AI." },
              { title: "Agentic AI Development",     icon: Icons.brain,  desc: "Autonomous AI agents capable of planning, reasoning, tool usage, memory management, and multi-step task execution using frameworks like LangChain, AutoGen, CrewAI, and MCP." },
            ].map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div
                  style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "2rem", transition: "border-color 0.25s,transform 0.3s,box-shadow 0.3s", cursor: "default" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(203,172,249,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(203,172,249,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(203,172,249,0.1)", border: "1px solid rgba(203,172,249,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.3rem" }}>
                    {s.icon}
                  </div>
                  <h4 style={{ fontWeight: 800, color: "var(--white)", marginBottom: "0.65rem", fontSize: "1rem" }}>{s.title}</h4>
                  <p style={{ fontSize: "0.87rem", color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="portfolio" className="section-pad" style={{ padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <SectionLabel text="My Work" />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>
              A Small Selection of<br />Recent Projects
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 520, lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Each project is a focused solution to a real AI challenge, built from scratch and deployed.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-pad" style={{ padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <SectionLabel text="Experience" />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "0.9rem" }}>
              My Work Experience
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 520, lineHeight: 1.75, marginBottom: "2.5rem" }}>
              Hands-on experience across the full AI development lifecycle — from research to production.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.08}>
                <div
                  style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.75rem", transition: "border-color 0.25s,transform 0.3s" }}
                  onMouseEnter={(el) => { el.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; el.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(el) => { el.currentTarget.style.borderColor = "var(--border)"; el.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{e.date}</div>
                  <h4 style={{ fontWeight: 800, color: "var(--white)", marginBottom: "0.6rem", fontSize: "0.95rem", lineHeight: 1.35 }}>{e.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h3 style={{ fontWeight: 800, color: "var(--white)", fontSize: "1.4rem", letterSpacing: "-0.025em", marginBottom: "1.75rem" }}>My Approach</h3>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
            {PHASES.map((p, i) => (
              <FadeIn key={p.phase} delay={i * 0.1}>
                <div
                  style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "2rem", transition: "border-color 0.25s,transform 0.3s" }}
                  onMouseEnter={(el) => { el.currentTarget.style.borderColor = "rgba(79,172,254,0.28)"; el.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(el) => { el.currentTarget.style.borderColor = "var(--border)"; el.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(79,172,254,0.1)", border: "1px solid rgba(79,172,254,0.22)", borderRadius: 99, padding: "0.25rem 0.75rem", fontSize: "0.68rem", fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>{p.phase}</span>
                  <h4 style={{ fontWeight: 800, color: "var(--white)", marginBottom: "0.65rem", fontSize: "1rem" }}>{p.title}</h4>
                  <p style={{ fontSize: "0.87rem", color: "var(--muted)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ marginTop: "4rem", background: "linear-gradient(135deg,rgba(79,172,254,0.08),rgba(203,172,249,0.08))", border: "1px solid rgba(203,172,249,0.15)", borderRadius: 24, padding: "3rem 2.5rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 800, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
                Ready to take your digital presence<br />to the next level?
              </h3>
              <p style={{ color: "var(--muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
                Reach out today and let's discuss how I can help you achieve your goals.
              </p>
              <button onClick={() => scrollTo("contact")} style={btnPrimary}>{"Let's get in touch"}</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-pad" style={{ padding: "6rem 0" }}>
        <div className="container">
          <FadeIn>
            <SectionLabel text="Contact" />
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.7rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "2rem" }}>
              {"Let's Work Together"}
            </h2>
          </FadeIn>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>
            <FadeIn delay={0.05}>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
                Have a project in mind? Whether it's a machine learning model, a generative AI app, or an NLP pipeline — I would love to hear about it. Reach out directly or fill out the form.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
                {[
                  { label: "GitHub",   href: "https://github.com/hazimleets",           icon: Icons.github },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/hazimwaqar/", icon: Icons.linkedin },
                  { label: "Medium",   href: "https://medium.com/@hazimwaqar.contact",  icon: Icons.medium },
                  { label: "Email",    href: "mailto:hazimwaqar.contact@gmail.com",     icon: Icons.mail },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.6rem 1.1rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--off)", transition: "border-color 0.2s,color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--purple)"; e.currentTarget.style.color = "var(--purple)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--off)"; }}
                  >{s.icon} {s.label}</a>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, padding: "2rem" }}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[["name","Your Name","text"],["email","Your Email","email"]].map(([k,ph,t]) => (
                    <input key={k} type={t} placeholder={ph} value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1.1rem", color: "var(--white)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.88rem", outline: "none", width: "100%" }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(203,172,249,0.45)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                    />
                  ))}
                </div>
                <input type="text" placeholder="Subject" value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1.1rem", color: "var(--white)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.88rem", outline: "none", width: "100%", marginBottom: "1rem", display: "block" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(203,172,249,0.45)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                />
                <textarea placeholder="Your Message" rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1.1rem", color: "var(--white)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.88rem", outline: "none", width: "100%", marginBottom: "1.25rem", resize: "vertical" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(203,172,249,0.45)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                />
                <a
                  href={`mailto:hazimwaqar.contact@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent("Name: " + form.name + "\nEmail: " + form.email + "\n\n" + form.message)}`}
                  style={{ display: "flex", justifyContent: "center", padding: "0.8rem", borderRadius: 10, background: "linear-gradient(135deg,#4facfe 0%,#cbacf9 100%)", color: "#000", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9rem" }}
                >
                  Send Message
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "1.75rem 1.5rem" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
            {"Copyright © 2025 "}
            <span style={{ color: "var(--purple)", fontWeight: 600 }}>Hazim Waqar</span>
            {". All rights reserved."}
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[["GitHub","https://github.com/hazimleets"],["LinkedIn","https://www.linkedin.com/in/hazimwaqar/"],["Medium","https://medium.com/@hazimwaqar.contact"]].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer"
                style={{ fontSize: "0.82rem", color: "var(--muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--purple)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted)"; }}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}