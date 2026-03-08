import React, { useState, useEffect, useRef } from "react";

const BASE = "/hazimwaqar_portfolio";

/* ── TECH grouped by category — NOW 57 TECHNOLOGIES ── */
const TECH_CATEGORIES = [
  {
    cat: "Languages",
    items: [
      {n:"Python",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},
      {n:"JavaScript",  img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
      {n:"TypeScript",  img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},
      {n:"C++",         img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"},
      {n:"SQL",         img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg"},
      {n:"Dart",        img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg"},
    ]
  },
  {
    cat: "Frameworks & Libraries",
    items: [
      {n:"React",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},
      {n:"Next.js",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"},
      {n:"Flutter",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"},
      {n:"Tailwind",    img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"},
      {n:"FastAPI",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"},
      {n:"Django",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"},
      {n:"Flask",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg"},
      {n:"Node.js",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},
    ]
  },
  {
    cat: "AI / ML",
    items: [
      {n:"PyTorch",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"},
      {n:"TensorFlow",  img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"},
      {n:"Keras",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg"},
      {n:"OpenCV",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"},
      {n:"Scikit",      img:"https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"},
      {n:"HuggingFace", img:"https://huggingface.co/front/assets/huggingface_logo-noborder.svg"},
      {n:"OpenAI",      img:"https://cdn.worldvectorlogo.com/logos/openai-2.svg"},
      {n:"Ollama",      img:"https://avatars.githubusercontent.com/u/151674099?s=200&v=4"},
    ]
  },
  {
    cat: "Databases & Storage",
    items: [
      {n:"MongoDB",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"},
      {n:"PostgreSQL",  img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"},
      {n:"MySQL",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},
      {n:"Redis",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"},
      {n:"Pinecone",    img:"https://avatars.githubusercontent.com/u/54333248?s=200&v=4"},
      {n:"Chroma",      img:"https://avatars.githubusercontent.com/u/107834131?s=200&v=4"},
      {n:"SQLite",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg"},
    ]
  },
  {
    cat: "DevOps & Cloud",
    items: [
      {n:"Docker",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"},
      {n:"Kubernetes",  img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"},
      {n:"Git",         img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},
      {n:"GitHub",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"},
      {n:"Vercel",      img:"https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"},
      {n:"Nginx",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"},
    ]
  },
  {
    cat: "Tools & Analytics",
    items: [
      {n:"Postman",     img:"https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"},
      {n:"Figma",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"},
      {n:"Jupyter",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg"},
      {n:"Pandas",      img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"},
      {n:"NumPy",       img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"},
      {n:"Streamlit",   img:"https://streamlit.io/images/brand/streamlit-mark-color.svg"},
      {n:"Grafana",     img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg"},
      {n:"MLflow",      img:"https://avatars.githubusercontent.com/u/32349634?s=200&v=4"},
      {n:"W&B",         img:"https://avatars.githubusercontent.com/u/26401354?s=200&v=4"},
      {n:"Matplotlib",  img:"https://matplotlib.org/stable/_static/logo_light.svg"},
      {n:"Seaborn",     img:"https://seaborn.pydata.org/_static/logo-wide-lightbg.svg"},
    ]
  },
  {
    cat: "Automation & Agentic",
    items: [
      {n:"n8n",           img:"https://avatars.githubusercontent.com/u/45487711?s=200&v=4"},
      {n:"LangChain",     img:"https://avatars.githubusercontent.com/u/126733545?s=200&v=4"},
      {n:"LangGraph",     img:"https://avatars.githubusercontent.com/u/126733545?s=200&v=4"},
      {n:"CrewAI",        img:"https://avatars.githubusercontent.com/u/163286037?s=200&v=4"},
      {n:"AutoGen",       img:"https://avatars.githubusercontent.com/u/143295884?s=200&v=4"},
      {n:"OpenAI API",    img:"https://cdn.worldvectorlogo.com/logos/openai-2.svg"},
      {n:"MCP",           img:"https://avatars.githubusercontent.com/u/182288589?s=200&v=4"},
      {n:"Zapier",        img:"https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg"},
      {n:"Make",          img:"https://images.ctfassets.net/qqlj6g4ee76j/1MRWsGm0E7aLuPbV6eFRhL/f6a0f95aef2a764c06b4f7a72e7de5ac/Make_Logo_for_Light_Background.svg"},
      {n:"LlamaIndex",    img:"https://avatars.githubusercontent.com/u/130722866?s=200&v=4"},
      {n:"Celery",        img:"https://docs.celeryq.dev/en/stable/_static/celery_512.png"},
    ]
  },
];

const TECH = TECH_CATEGORIES.flatMap(c => c.items);

function PyramidTechGrid() {
  const [active, setActive] = useState("All");
  const [hov, setHov] = useState(null);

  const allItems = TECH_CATEGORIES.flatMap(c => c.items.map(t => ({ ...t, cat: c.cat })));
  const cats = ["All", ...TECH_CATEGORIES.map(c => c.cat)];
  const visible = active === "All" ? allItems : allItems.filter(t => t.cat === active);

  const pyramidRows = [14, 12, 10, 8, 6, 4, 2, 1];

  const arrangeInPyramid = () => {
    const rows = [];
    let index = 0;
    for (let rowSize of pyramidRows) {
      if (index >= visible.length) break;
      rows.push(visible.slice(index, index + rowSize));
      index += rowSize;
    }
    while (index < visible.length) {
      const remainingItems = visible.length - index;
      const rowSize = Math.min(14, remainingItems);
      rows.push(visible.slice(index, index + rowSize));
      index += rowSize;
    }
    return rows;
  };

  const pyramidData = arrangeInPyramid();

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(6px, 1vw, 10px)", marginBottom: "clamp(24px, 3vw, 36px)", justifyContent: "center", padding: "0 clamp(8px, 2vw, 0px)" }}>
        {cats.map(cat => {
          const isActive = active === cat;
          const num = cat === "All" ? allItems.length : TECH_CATEGORIES.find(c => c.cat === cat)?.items.length;
          return (
            <button key={cat} onClick={() => { setActive(cat); setHov(null); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "clamp(4px, 0.7vw, 7px)",
                padding: "clamp(6px, 1vw, 8px) clamp(12px, 2vw, 18px)", borderRadius: 99, cursor: "pointer",
                fontFamily: "inherit", fontSize: "clamp(11px, 1.2vw, 13px)", fontWeight: 700,
                background: isActive ? "linear-gradient(135deg,rgba(124,58,237,0.5),rgba(168,85,247,0.4))" : "rgba(255,255,255,0.04)",
                border: "1px solid " + (isActive ? "rgba(168,85,247,0.7)" : "rgba(110,70,170,0.3)"),
                color: isActive ? "#f0e0ff" : "rgba(185,160,230,0.6)",
                boxShadow: isActive ? "0 0 18px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(110,50,200,0.2)"; e.currentTarget.style.borderColor = "rgba(140,90,220,0.5)"; e.currentTarget.style.color = "rgba(210,185,255,0.9)"; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(110,70,170,0.3)"; e.currentTarget.style.color = "rgba(185,160,230,0.6)"; }}}
            >
              {isActive && <span style={{ width: "clamp(5px, 0.6vw, 6px)", height: "clamp(5px, 0.6vw, 6px)", borderRadius: "50%", background: "#c084fc", display: "inline-block", boxShadow: "0 0 6px #a855f7" }} />}
              {cat}
              <span style={{
                fontSize: "clamp(9px, 1vw, 11px)", fontWeight: 700,
                background: isActive ? "rgba(200,150,255,0.2)" : "rgba(255,255,255,0.07)",
                border: "1px solid " + (isActive ? "rgba(200,150,255,0.3)" : "rgba(255,255,255,0.1)"),
                borderRadius: 99, padding: "1px clamp(5px, 0.8vw, 7px)",
                color: isActive ? "#d8b4fe" : "rgba(180,155,215,0.5)",
              }}>{num}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(6px, 1vw, 8px)", minHeight: 200, padding: "0 10px" }}>
        {pyramidData.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", flexWrap: "wrap", gap: "clamp(6px, 0.8vw, 8px)", justifyContent: "center", maxWidth: "100%" }}>
            {row.map((tech, colIndex) => {
              const globalIndex = pyramidRows.slice(0, rowIndex).reduce((sum, size) => sum + size, 0) + colIndex;
              const on = hov === `${active}-${globalIndex}`;
              return (
                <div key={tech.n + active}
                  onMouseEnter={() => setHov(`${active}-${globalIndex}`)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    width: "clamp(50px, 5.5vw, 65px)", height: "clamp(50px, 5.5vw, 65px)", flexShrink: 0,
                    background: on ? "rgba(90,40,160,0.65)" : "rgba(28,10,55,0.82)",
                    border: "1px solid " + (on ? "rgba(190,130,255,0.7)" : "rgba(110,70,170,0.35)"),
                    borderRadius: "clamp(10px, 1.2vw, 14px)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: "clamp(3px, 0.5vw, 5px)",
                    cursor: "default",
                    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                    boxShadow: on
                      ? "0 0 28px rgba(150,90,255,0.5), inset 0 1px 0 rgba(255,255,255,0.12)"
                      : "0 4px 18px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
                    transition: "all 0.2s ease",
                    transform: on ? "translateY(-3px) scale(1.05)" : "none",
                    animation: "fadeIn 0.25s ease both",
                  }}
                >
                  <img src={tech.img} alt={tech.n}
                    style={{
                      width: "clamp(26px, 3vw, 32px)", height: "clamp(26px, 3vw, 32px)", objectFit: "contain",
                      filter: on ? "brightness(1.2) drop-shadow(0 0 8px rgba(200,150,255,0.6))" : "brightness(0.95) saturate(0.9)",
                      transition: "filter 0.2s",
                    }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <span style={{
                    fontSize: "clamp(7px, 0.85vw, 9px)", fontWeight: 600,
                    color: on ? "#f0e0ff" : "rgba(195,170,235,0.75)",
                    textAlign: "center", lineHeight: 1.1,
                    maxWidth: "90%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    transition: "color 0.2s", padding: "0 2px",
                  }}>
                    {tech.n}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const PROJECTS = [
  {title:"MCP Implementation",img:`${BASE}/mcp.jpg`,desc:"A system demonstrating the Model Context Protocol for sharing contextual information across AI models.",tags:["MCP","AI","Context"],href:"https://github.com/Hazimleets/mcp",type:"AI SYSTEMS"},
  {title:"Multimodal RAG",img:`${BASE}/multimodal.jpg`,desc:"Combines text, images, and documents in a unified RAG pipeline for richer context-aware AI responses.",tags:["RAG","Multimodal","LangChain"],href:"#",type:"GENERATIVE AI"},
  {title:"Multi-Agent HR System",img:`${BASE}/hr_agent.jpg`,desc:"Autonomous multi-agent pipeline that screens candidates, schedules interviews, and drafts offer letters.",tags:["Agents","NLP","FastAPI"],href:"https://github.com/Hazimleets/Hiring-HR-Agent",type:"AGENTIC AI"},
  {title:"GoGreen Carbon Monitor",img:`${BASE}/gogreen.jpg`,desc:"AIoT carbon monitoring platform with real-time CO₂ tracking and AI-driven emission insights.",tags:["Flutter","FastAPI","IoT"],href:"https://github.com/Hazimleets/Carbon-Monitoring",type:"AIoT"},
  {title:"Supply Chain Risk Automation",img:`${BASE}/risk.jpg`,desc:"Automated supply chain risk platform with real-time supplier monitoring and AI-driven risk detection.",tags:["n8n","Slack API","Jira"],href:"https://github.com/Hazimleets/Automation_Projects",type:"AUTOMATION"},
  {title:"Proposal & Pitch Deck Generator",img:`${BASE}/pitch.jpg`,desc:"Web MVP that auto-generates professional business proposals and investor pitch decks with PDF export.",tags:["Django","Next.js","OpenAI"],href:"https://github.com/Hazimleets/AI-Powered-Proposal-Pitch-Deck-Generator",type:"GENERATIVE AI"},
];

const SYS = `You are Hazim Waqar's AI portfolio assistant. Answer concisely in 2-3 sentences. Hazim is an AI Engineer from Pakistan specialising in Generative AI, LLMs, RAG, multi-agent systems and MLOps. Education: B.S. Artificial Intelligence, National Textile University (2022-2026). Services: (1) Machine Learning — end-to-end pipelines; (2) NLP & Text Analytics — sentiment, translation, summarisation, semantic search; (3) Generative AI — RAG, fine-tuned LLMs, conversational AI; (4) Agentic AI — autonomous agents using LangChain, CrewAI, MCP. Approach: understands the problem deeply, picks the right stack, builds iteratively with production-ready code, ships with MLOps and monitoring. Prioritises real-world impact over academic complexity. Contact: hazimwaqar.contact@gmail.com, GitHub: hazimleets, LinkedIn: hazimwaqar.`;

function getFallback(q) {
  const l = q.toLowerCase();
  if (l.match(/skill|tech|python|torch|lang/)) return "Hazim works with Python, LangChain, PyTorch, FastAPI, React, Flutter, Docker and 57 technologies across 7 categories.";
  if (l.match(/project|github|rag|hr|carbon/)) return "Hazim built MCP systems, multimodal RAG, multi-agent HR automation, an AIoT carbon monitor, and more.";
  if (l.match(/contact|email|hire|work/)) return "Reach Hazim at hazimwaqar.contact@gmail.com or on GitHub (hazimleets) and LinkedIn (hazimwaqar).";
  if (l.match(/service|offer|provide|build|develop|what do you do/)) return "Hazim offers 4 core services: (1) Machine Learning with end-to-end pipelines from data to deployment; (2) NLP & Text Analytics — sentiment analysis, translation, summarisation & semantic search; (3) Generative AI and RAG systems, fine-tuned LLMs, and conversational AI; (4) Agentic AI, autonomous multi-agent systems using LangChain, CrewAI, and MCP.";
  if (l.match(/approach|process|workflow|method|how do you work|how does hazim work/)) return "Hazim's approach: he starts by deeply understanding the problem, then selects the right AI stack, builds iteratively with clean production-ready code, and ships with monitoring and MLOps best practices baked in. He prioritises real-world impact over academic complexity.";
  return "I'm Hazim's AI assistant — ask me about his skills, projects, services, approach, or how to hire him!";
}

async function askAI(q, hist) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 300, system: SYS, messages: [...hist, { role: "user", content: q }] }),
    });
    const d = await res.json();
    return d.content?.map(b => b.text || "").join("") || getFallback(q);
  } catch { return getFallback(q); }
}

function useInView() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold: 0.05 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
}

function Fade({ children, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(24px)", transition: `opacity .65s ${delay}s ease, transform .65s ${delay}s ease` }}>
      {children}
    </div>
  );
}

function CircuitBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const nodes = [];
    const cols = 18, rows_c = 14;
    const W = () => canvas.width, H = () => canvas.height;
    for (let r = 0; r < rows_c; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({
          x: (c / (cols - 1)) * 0.9 + 0.05 + (Math.random() - 0.5) * 0.04,
          y: (r / (rows_c - 1)) * 0.85 + 0.075 + (Math.random() - 0.5) * 0.04,
          pulse: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.01,
          bright: Math.random(),
        });
      }
    }

    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 0.1 && Math.random() > 0.45) edges.push([i, j]);
      }
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      t += 0.012;
      const cx = W() / 2, cy = H() / 2;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W(), H()) * 0.6);
      grad.addColorStop(0, "rgba(120,40,200,0.18)");
      grad.addColorStop(0.5, "rgba(80,20,140,0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W(), H());

      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j];
        const ax = a.x * W(), ay = a.y * H();
        const bx = b.x * W(), by = b.y * H();
        const distFromCenter = Math.sqrt(Math.pow((ax + bx) / 2 - cx, 2) + Math.pow((ay + by) / 2 - cy, 2));
        const maxDist = Math.sqrt(cx*cx + cy*cy);
        const proximity = 1 - (distFromCenter / maxDist);
        const pulse = (Math.sin(t + a.pulse) + 1) / 2;
        const alpha = (0.03 + proximity * 0.12 + pulse * 0.04);
        ctx.strokeStyle = `rgba(160,100,255,${alpha})`;
        ctx.lineWidth = 0.5 + proximity * 0.5;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });

      nodes.forEach(node => {
        node.pulse += node.speed;
        const px = node.x * W(), py = node.y * H();
        const distFromCenter = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
        const maxDist = Math.sqrt(cx*cx + cy*cy);
        const proximity = 1 - (distFromCenter / maxDist);
        const glow = (Math.sin(node.pulse) + 1) / 2;
        const alpha = 0.15 + proximity * 0.5 + glow * 0.2;
        const r = 1.2 + proximity * 1.5 + glow * 0.8;

        const ng = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
        ng.addColorStop(0, `rgba(180,120,255,${alpha * 0.6})`);
        ng.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(200,160,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
  );
}

// ── FIXED ChatBox — scrolls container only, never page ──
function ChatBox() {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState("");
  const [busy, setBusy] = useState(false);
  const hist = useRef([]);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, busy]);

  const send = async (q) => {
    const text = (q || inp).trim();
    if (!text || busy) return;
    setInp("");
    setMsgs(m => [...m, { r: "u", t: text }]);
    setBusy(true);
    const ans = await askAI(text, hist.current);
    hist.current = [...hist.current, { role: "user", content: text }, { role: "assistant", content: ans }];
    setMsgs(m => [...m, { r: "a", t: ans }]);
    setBusy(false);
  };

  const quick = ["What are his skills?", "Tell me about projects", "How to hire Hazim?", "Services offered?", "How does Hazim work?"];

  return (
    <div style={{ background: "rgba(20,8,40,0.85)", border: "1px solid rgba(140,80,255,0.2)", borderRadius: "clamp(16px, 2vw, 20px)", boxShadow: "0 28px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(140,80,255,0.08)", overflow: "hidden", backdropFilter: "blur(20px)", maxWidth: "100%" }}>
      <div ref={scrollRef} style={{ minHeight: "clamp(180px, 25vw, 210px)", maxHeight: "clamp(240px, 35vw, 290px)", overflowY: msgs.length ? "auto" : "hidden", padding: msgs.length ? "clamp(14px, 2vw, 18px) clamp(14px, 2vw, 18px) 8px" : 0, display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 10px)", position: "relative" }}>
        {msgs.length === 0 && !busy && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
            <span style={{ fontSize: "clamp(13px,2vw,19px)", color: "rgba(200,170,255,0.4)", fontWeight: 500, letterSpacing: "-.01em", userSelect: "none", textAlign: "center" }}>Ask me anything about Hazim...</span>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.r === "u" ? "flex-end" : "flex-start", alignItems: "flex-start", gap: "clamp(6px, 1vw, 8px)" }}>
            {m.r === "a" && (
              <div style={{ width: "clamp(22px, 3vw, 26px)", height: "clamp(22px, 3vw, 26px)", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(8px, 1vw, 9px)", fontWeight: 800, color: "#fff", flexShrink: 0 }}>H</div>
            )}
            <div style={{ maxWidth: "78%", padding: "clamp(7px, 1vw, 9px) clamp(11px, 1.5vw, 14px)", borderRadius: m.r === "u" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.r === "u" ? "rgba(140,80,255,0.2)" : "rgba(255,255,255,0.05)", border: "1px solid " + (m.r === "u" ? "rgba(140,80,255,0.35)" : "rgba(255,255,255,0.08)"), fontSize: "clamp(12px, 1.5vw, 14px)", color: "#e0d4ff", lineHeight: 1.65 }}>
              {m.t}
            </div>
          </div>
        ))}
        {busy && (
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 8px)" }}>
            <div style={{ width: "clamp(22px, 3vw, 26px)", height: "clamp(22px, 3vw, 26px)", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(8px, 1vw, 9px)", fontWeight: 800, color: "#fff", flexShrink: 0 }}>H</div>
            <div style={{ padding: "clamp(7px, 1vw, 9px) clamp(11px, 1.5vw, 14px)", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 5, alignItems: "center" }}>
              {[0,1,2].map(i => <span key={i} style={{ width: "clamp(5px, 0.7vw, 6px)", height: "clamp(5px, 0.7vw, 6px)", borderRadius: "50%", background: "#a855f7", display: "block", animation: `tb 1.2s ease ${i * .2}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      {/* Quick suggestion pills — only shown before first message */}
      {msgs.length === 0 && (
        <div style={{ padding: "clamp(6px, 1vw, 8px) clamp(10px, 1.5vw, 14px)", display: "flex", gap: "clamp(4px, 0.8vw, 6px)", flexWrap: "wrap" }}>
          {quick.map(q => (
            <button key={q} onClick={() => send(q)} style={{ padding: "clamp(4px, 0.6vw, 5px) clamp(9px, 1.2vw, 12px)", borderRadius: 99, border: "1px solid rgba(140,80,255,0.25)", background: "rgba(140,80,255,0.08)", color: "rgba(200,170,255,0.7)", fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .18s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(140,80,255,0.2)"; e.currentTarget.style.color = "#d8b4fe"; e.currentTarget.style.borderColor = "rgba(140,80,255,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(140,80,255,0.08)"; e.currentTarget.style.color = "rgba(200,170,255,0.7)"; e.currentTarget.style.borderColor = "rgba(140,80,255,0.25)"; }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 8px)", padding: "clamp(7px, 1vw, 9px) clamp(10px, 1.5vw, 12px)", borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.2)" }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && !busy && send()}
          placeholder="Ask anything about Hazim..."
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e0d4ff", fontSize: "clamp(12px, 1.5vw, 14px)", fontFamily: "inherit", padding: "5px 6px", minWidth: 0 }} />
        <button onClick={() => send()} disabled={!inp.trim() || busy}
          style={{ width: "clamp(28px, 4vw, 32px)", height: "clamp(28px, 4vw, 32px)", borderRadius: "clamp(6px, 1vw, 8px)", background: inp.trim() && !busy ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(255,255,255,0.06)", border: "none", cursor: inp.trim() && !busy ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", color: inp.trim() && !busy ? "#fff" : "rgba(255,255,255,0.25)", transition: "all .2s", flexShrink: 0 }}>
          <svg width="clamp(11px, 1.5vw, 13px)" height="clamp(11px, 1.5vw, 13px)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
        </button>
      </div>
    </div>
  );
}

function ProjCard({ p, i }) {
  const [hov, setHov] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        overflow: "hidden",
        flexShrink: 0,
        width: "calc((100% - 30px) / 3)",
        minWidth: "calc((100% - 30px) / 3)",
        transition: "border-color .25s, transform .25s",
        transform: hov ? "translateY(-4px)" : "none",
        ...(hov ? { borderColor: "rgba(160,100,255,0.4)" } : {}),
      }}
    >
      <div style={{ height: 220, position: "relative", overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
        {p.img && !err
          ? <img src={p.img} alt={p.title} onError={() => setErr(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s", transform: hov ? "scale(1.04)" : "scale(1)" }} />
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,rgba(80,20,140,0.5),rgba(20,5,50,0.8))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="48" height="48" viewBox="0 0 52 52" fill="none"><rect width="52" height="52" rx="14" fill="rgba(140,80,255,0.15)"/><path d="M14 38L22 24L29 34L33 26L38 38H14Z" stroke="#a855f7" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><circle cx="33" cy="18" r="5" stroke="#a855f7" strokeWidth="1.5" fill="none"/></svg>
            </div>}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.2) 40%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "rgba(200,170,255,0.9)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.type}</div>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(168,85,247,0.6)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")} ——</span>
          <h3 style={{ fontWeight: 800, color: "#ffffff", fontSize: 16, lineHeight: 1.25, margin: 0 }}>{p.title}</h3>
        </div>
        <p style={{ fontSize: 13, color: "rgba(200,175,235,0.5)", lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {p.tags.map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "3px 9px", fontSize: 10, fontWeight: 600, color: "rgba(200,180,240,0.7)", letterSpacing: "0.02em" }}>{t}</span>
            ))}
          </div>
          <a href={p.href} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontWeight: 700, fontSize: 12, padding: "6px 14px", borderRadius: 7, textDecoration: "none", boxShadow: "0 3px 12px rgba(124,58,237,0.35)", transition: "opacity .2s, transform .2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = ".85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}>
            Repo <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectSection() {
  const [page, setPage] = useState(0);
  const wrapRef = useRef(null);
  const total = Math.ceil(PROJECTS.length / 3);
  const timerRef = useRef(null);

  const slide = (p) => {
    if (!wrapRef.current) return;
    const w = wrapRef.current.offsetWidth;
    const cardW = (w - 30) / 3;
    const offset = p * (cardW + 15) * 3;
    const track = wrapRef.current.querySelector(".proj-track");
    if (track) track.style.transform = `translateX(-${offset}px)`;
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPage(p => {
        const next = (p + 1) % total;
        slide(next);
        return next;
      });
    }, 3500);
  };

  useEffect(() => {
    const init = setTimeout(() => { slide(0); startTimer(); }, 300);
    return () => { clearTimeout(init); clearInterval(timerRef.current); };
  }, []);

  useEffect(() => { slide(page); }, [page]);

  const manualGo = (p) => {
    const next = ((p % total) + total) % total;
    setPage(next);
    slide(next);
    startTimer();
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 10 }}>
        <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.03em" }}>Recent Projects</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginRight: 6 }}>
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} onClick={() => manualGo(i)} style={{ width: i === page ? 22 : 7, height: 7, borderRadius: 99, background: i === page ? "#a855f7" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: 0, transition: "all .35s ease" }} />
            ))}
          </div>
          <button onClick={() => manualGo(page - 1)} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.color = "#c084fc"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button onClick={() => manualGo(page + 1)} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.color = "#c084fc"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <p style={{ color: "rgba(180,155,215,0.6)", fontSize: 15, maxWidth: 480, lineHeight: 1.75, marginBottom: 20 }}>Each project is a focused solution to a real AI challenge, built from scratch and deployed.</p>
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 99, marginBottom: 24, overflow: "hidden" }}>
        <div key={page} style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#7c3aed,#a855f7)", animation: "progBar 3.5s linear forwards" }} />
      </div>
      <div ref={wrapRef} style={{ overflow: "hidden", paddingBottom: 8 }}>
        <div className="proj-track" style={{ display: "flex", gap: 15, transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)" }}>
          {PROJECTS.map((p, i) => <ProjCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </div>
  );
}

function SLabel({ text }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(140,80,255,0.1)", border: "1px solid rgba(140,80,255,0.25)", borderRadius: 99, padding: "3px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "#c084fc", marginBottom: 14 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a855f7", display: "inline-block", animation: "pu 2s infinite" }} />{text}
    </div>
  );
}

const NAV = [{ id: "home", l: "Home" }, { id: "about", l: "About" },{ id: "techstack", l: "Tech" }, { id: "services", l: "Services" }, { id: "portfolio", l: "Projects" }, { id: "experience", l: "Experience" }, { id: "contact", l: "Contact" }];

function BentoInfoCard({ label, title, sub, icon, col, row }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: col, gridRow: row,
        background: hovered ? "rgba(90,30,160,0.5)" : "rgba(20,8,44,0.75)",
        border: "1px solid " + (hovered ? "rgba(190,130,255,0.5)" : "rgba(110,70,170,0.25)"),
        borderRadius: 18, padding: "20px 20px",
        transition: "all 0.25s ease", cursor: "default", overflow: "hidden", position: "relative",
        minHeight: 130, display: "flex", flexDirection: "column", justifyContent: "space-between",
        boxShadow: hovered ? "0 8px 32px rgba(120,60,200,0.3), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
      }}>
      <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(180,140,255,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#f0e8ff", lineHeight: 1.3, marginBottom: 5 }}>{title}</div>
        <div style={{ fontSize: 12, color: "rgba(190,165,230,0.65)", lineHeight: 1.6, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.25s ease" }}>{sub}</div>
      </div>
      <div style={{ fontSize: 26, position: "absolute", bottom: 14, right: 16, opacity: hovered ? 0.9 : 0.2, transition: "opacity 0.25s" }}>{icon}</div>
    </div>
  );
}

function HoverRevealPanel() {
  const [hovered, setHovered] = useState(false);
  const cards = [
    { label: "DEGREE", title: "B.S. Artificial Intelligence", body: "National Textile University, Faisalabad · 2022–2026. Specializing in ML, deep learning, computer vision and NLP." },
    { label: "UNIVERSITY", title: "National Textile University", body: "One of Pakistan's leading technical universities. Ranked top engineering institution in Punjab." },
    { label: "SPECIALISATION", title: "Generative AI & MLOps", body: "LLMs · RAG systems · Multi-Agent pipelines · Production MLOps · Agentic Automation at scale." },
  ];
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "18px 20px", position: "relative", overflow: "hidden", minHeight: 168, transition: "border-color .25s", ...(hovered ? { borderColor: "rgba(168,85,247,0.35)" } : {}) }}>
      <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 700, color: "rgba(168,85,247,0.5)", letterSpacing: "0.16em", textTransform: "uppercase", opacity: hovered ? 0 : 1, transition: "opacity 0.2s ease", whiteSpace: "nowrap", zIndex: 2 }}>HOVER TO READ MORE</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, height: "100%", opacity: hovered ? 0 : 1, transition: "opacity 0.2s ease", position: "absolute", inset: "18px 20px" }}>
        {cards.map(c => (
          <div key={c.label} style={{ paddingTop: 28 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(168,85,247,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", lineHeight: 1.35 }}>{c.title}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, height: "100%", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>
        {cards.map((c, i) => (
          <div key={c.label} style={{ padding: "14px 16px", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: "#a855f7", letterSpacing: "0.16em", textTransform: "uppercase" }}>{c.label}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: "rgba(200,175,235,0.55)", lineHeight: 1.65 }}>{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [mob, setMob] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" });

  useEffect(() => {
    const ids = NAV.map(n => n.id);
    const fn = () => {
      let cur = "home";
      ids.forEach(id => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 140) cur = id; });
      setActive(cur);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMob(false); };

  const pBtn = { display: "inline-flex", alignItems: "center", gap: "clamp(4px, 0.7vw, 6px)", padding: "clamp(8px, 1.2vw, 10px) clamp(18px, 2.5vw, 24px)", borderRadius: "clamp(7px, 1vw, 9px)", background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontWeight: 700, fontFamily: "inherit", fontSize: "clamp(12px, 1.5vw, 14px)", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.4)", transition: "opacity .2s, transform .2s" };
  const gBtn = { display: "inline-flex", alignItems: "center", gap: "clamp(4px, 0.7vw, 6px)", padding: "clamp(8px, 1.2vw, 10px) clamp(18px, 2.5vw, 24px)", borderRadius: "clamp(7px, 1vw, 9px)", border: "1px solid rgba(140,80,255,0.3)", color: "#d8b4fe", fontWeight: 600, fontFamily: "inherit", fontSize: "clamp(12px, 1.5vw, 14px)", background: "transparent", cursor: "pointer", textDecoration: "none", transition: "border-color .2s, background .2s" };

  const cardStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "clamp(14px, 2vw, 18px)", padding: "clamp(20px, 3vw, 28px)", height: "100%", transition: "box-shadow .28s, border-color .28s, background .28s, transform .22s" };
  const hov = e => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(160,100,255,0.4), 0 8px 32px rgba(120,60,200,0.2)"; e.currentTarget.style.borderColor = "rgba(160,100,255,0.35)"; e.currentTarget.style.background = "rgba(100,40,180,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; };
  const unh = e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "none"; };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0414", color: "#f0e8ff", fontFamily: "'Plus Jakarta Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        ::selection{background:rgba(168,85,247,0.35);color:#fff;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#7c3aed;border-radius:4px;}
        .w{max-width:1100px;margin:0 auto;padding:0 28px;}
        section,footer,nav,.w{position:relative;z-index:1;}

        body::before{
          content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px),
            radial-gradient(circle, rgba(200,160,255,0.2) 1px, transparent 1px);
          background-size:80px 80px, 130px 130px;
          background-position:0 0, 40px 60px;
        }
        body::after{
          content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
          background:
            radial-gradient(ellipse 70% 55% at 15% 25%, rgba(100,30,160,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 85% 65%, rgba(70,15,130,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 50% 45%, rgba(120,40,180,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 70% 20%, rgba(90,25,150,0.18) 0%, transparent 60%);
        }

        @keyframes hf{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        @keyframes sb{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(5px);opacity:.75}}
        @keyframes pu{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
        @keyframes tb{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px) scale(0.96)}to{opacity:1;transform:none}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 30px rgba(168,85,247,0.3)}50%{box-shadow:0 0 60px rgba(168,85,247,0.6)}}
        @keyframes progBar{from{width:0%}to{width:100%}}

        @media(max-width:820px){
          .ac2{grid-template-columns:1fr!important;}
          .cc2{grid-template-columns:1fr!important;}
          .dn{display:none!important;}
          .dnc{display:none!important;}
          .hb{display:flex!important;}
          .w{padding:0 20px!important;}
          #about-bento{grid-template-columns:1fr!important;}
          #about-bento > *{grid-column:1!important;grid-row:auto!important;}
          #about-bento-row2{grid-template-columns:1fr!important;}
        }
        @media(max-width:560px){
          .pg{grid-template-columns:1fr!important;}
          .fr{grid-template-columns:1fr!important;}
          .w{padding:0 16px!important;}
          section{padding:60px 0!important;}
        }
        @media(max-width:400px){
          .w{padding:0 12px!important;}
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, height: "clamp(56px, 8vw, 64px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px, 3vw, 28px)", background: "rgba(8,3,18,0.75)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <ul className="dn" style={{ display: "flex", gap: 0, listStyle: "none", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 99, padding: "4px 4px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {NAV.map(n => (
            <li key={n.id}>
              <button onClick={() => go(n.id)} style={{ background: active === n.id ? "rgba(255,255,255,0.1)" : "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "clamp(11px, 1.15vw, 13px)", fontWeight: active === n.id ? 600 : 400, color: active === n.id ? "#ffffff" : "rgba(200,175,235,0.5)", padding: "6px clamp(10px, 1.2vw, 14px)", borderRadius: 99, transition: "color .2s, background .2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { if (active !== n.id) { e.currentTarget.style.color = "rgba(220,200,255,0.85)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}}
                onMouseLeave={e => { if (active !== n.id) { e.currentTarget.style.color = "rgba(200,175,235,0.5)"; e.currentTarget.style.background = "none"; }}}>
                {n.l}
              </button>
            </li>
          ))}
        </ul>
        <button className="hb" onClick={() => setMob(o => !o)} style={{ display: "none", flexDirection: "column", gap: "clamp(4px, 0.6vw, 5px)", background: "none", border: "none", cursor: "pointer", padding: 6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: "clamp(18px, 2.5vw, 22px)", height: 1.5, background: "#c084fc", display: "block", borderRadius: 2 }} />)}
        </button>
      </nav>

      {mob && (
        <div style={{ position: "fixed", top: "clamp(56px, 8vw, 64px)", left: 0, right: 0, zIndex: 299, background: "rgba(10,4,20,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "clamp(8px, 1.5vw, 10px) clamp(16px, 2.5vw, 20px)", display: "flex", flexDirection: "column", backdropFilter: "blur(20px)" }}>
          {NAV.map(n => <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontSize: "clamp(14px, 1.8vw, 15px)", fontWeight: 600, color: "rgba(200,175,235,0.8)", padding: "clamp(7px, 1.2vw, 9px) 4px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{n.l}</button>)}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "clamp(56px, 8vw, 64px)", paddingBottom: "clamp(32px, 5vw, 40px)", position: "relative" }}>
        <div style={{ position: "absolute", width: 700, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(ellipse,rgba(120,40,200,0.2) 0%,transparent 65%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 740, padding: "0 20px", textAlign: "center" }}>
          <div style={{ animation: "hf .8s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(140,80,255,0.1)", border: "1px solid rgba(140,80,255,0.25)", borderRadius: 99, padding: "4px 14px", fontSize: 11, fontWeight: 700, color: "#c084fc", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", animation: "pu 2s infinite", display: "inline-block" }} />
              Open to collaboration
            </div>
            <h1 style={{ fontFamily: "inherit", fontSize: "clamp(30px,5vw,56px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.03em", color: "#fff", marginBottom: 14 }}>
              {"Hi, I'm "}
              <span style={{ background: "linear-gradient(90deg,#a855f7,#c084fc,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Hazim Waqar</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(200,175,235,0.6)", fontWeight: 500, marginBottom: 32 }}>AI Engineer · Generative AI · Automation · MLOps</p>
          </div>
          <div style={{ animation: "hf .8s .1s ease both" }}>
            {/* ── FIXED: no scrollTo prop ── */}
            <ChatBox />
          </div>
          <div style={{ textAlign: "center", marginTop: 28, animation: "hf .8s .3s ease both" }}>
            <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 5, color: "rgba(180,140,255,0.4)", cursor: "pointer" }} onClick={() => go("about")}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Scroll to explore</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "sb 2s ease-in-out infinite" }}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "96px 0" }}>
        <div className="w">
          <Fade><SLabel text="About Me" /></Fade>
          <Fade delay={0.04}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 32 }}>
              {"I'm Hazim Waqar, an "}
              <span style={{ background: "linear-gradient(90deg,#a855f7,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI Engineer</span>
            </h2>
          </Fade>
          <Fade delay={0.06}>
            <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 10, marginBottom: 10 }}>
              <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 26px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 168 }}>
                <div>
                  <div style={{ fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-.02em", lineHeight: 1.0, textTransform: "uppercase" }}>HAZIM<br />WAQAR</div>
                  <div style={{ marginTop: 10, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.28)", letterSpacing: "0.24em", textTransform: "uppercase" }}>AI ENGINEER</div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                  <button onClick={() => go("contact")} style={{ ...pBtn, padding: "8px 20px", fontSize: 12, borderRadius: 8 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = ".85"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>Hire Me</button>
                  <a href={`${BASE}/Hazim_Resume.pdf`} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 600, fontFamily: "inherit", background: "transparent", cursor: "pointer", textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.55)"; e.currentTarget.style.color = "#c084fc"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>CV</a>
                </div>
              </div>
              <HoverRevealPanel />
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div id="about-bento" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {/* Mindset Card */}
              <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "26px 24px", transition: "border-color .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Mindset</h3>
                <div style={{ width: 28, height: 3, background: "linear-gradient(90deg,#7c3aed,#a855f7)", borderRadius: 99, marginBottom: 18 }} />
                <p style={{ color: "rgba(200,175,235,0.85)", lineHeight: 1.8, fontSize: 13.5, marginBottom: 10 }}><strong style={{ color: "#f0e8ff" }}>Building intelligent systems, not just models.</strong> Passionate about the full AI lifecycle — from exploratory research to production deployment.</p>
                <p style={{ color: "rgba(180,155,215,0.55)", lineHeight: 1.8, fontSize: 12.5, marginBottom: 20 }}>Fast learner with a bias toward shipping. I stay current through hands-on experimentation and genuine curiosity about what's next in AI.</p>
                <div style={{ background: "rgba(140,80,255,0.08)", border: "1px solid rgba(140,80,255,0.18)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ color: "#a855f7", flexShrink: 0 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Philosophy</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#e0d4ff" }}>Mastering AI to solve real problems</div>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(200,175,235,0.6)", lineHeight: 1.7 }}><strong style={{ color: "#f0e8ff" }}>Curiosity and execution</strong> are my path to excellence.</p>
              </div>

              {/* Photo + Location Card */}
              <div style={{ borderRadius: 16, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 320 }}>
                  <img src={`${BASE}/hazim.jpg`} alt="Hazim Waqar" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", bottom: 14, left: 14, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 99, padding: "5px 12px", zIndex: 2 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block", animation: "pu 2s infinite" }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(180,255,180,0.9)" }}>Open to Work</span>
                  </div>
                </div>
                <div style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "14px 18px" }}>
                  <div style={{ fontSize: "clamp(13px,1.6vw,17px)", fontWeight: 900, color: "#fff", letterSpacing: "-.01em", textTransform: "uppercase" }}>KARACHI, PAKISTAN 🇵🇰</div>
                </div>
              </div>

              {/* Craft Card */}
              <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "26px 24px", transition: "border-color .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Craft</h3>
                <div style={{ width: 28, height: 3, background: "linear-gradient(90deg,#7c3aed,#a855f7)", borderRadius: 99, marginBottom: 18 }} />
                <p style={{ color: "rgba(200,175,235,0.85)", lineHeight: 1.8, fontSize: 13.5, marginBottom: 10 }}>Building <strong style={{ color: "#f0e8ff" }}>scalable AI pipelines, agentic systems, and LLM applications</strong> that solve real-world problems end-to-end.</p>
                <p style={{ color: "rgba(180,155,215,0.55)", lineHeight: 1.8, fontSize: 12.5, marginBottom: 20 }}>From clinical RAG systems to multi-agent HR automation — I understand what production AI actually requires and deliver it with care.</p>
                <h4 style={{ fontWeight: 800, color: "#f0e8ff", fontSize: 11, marginBottom: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>Education</h4>
                <div style={{ position: "relative", paddingLeft: 20, borderLeft: "1px solid rgba(140,80,255,0.2)" }}>
                  {[
                    { date: "Sep 2022 – Jul 2026", title: "B.S. Artificial Intelligence", sub: "National Textile University" },
                    { date: "Aug 2018 – Aug 2020", title: "F.Sc Pre-Engineering", sub: "Shiblee College" },
                  ].map((edu, i) => (
                    <div key={i} style={{ position: "relative", marginBottom: i === 0 ? 18 : 0 }}>
                      <div style={{ position: "absolute", left: -20, transform: "translateX(-50%)", top: 4, width: 9, height: 9, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 0 3px rgba(168,85,247,0.15)" }} />
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#a855f7", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>{edu.date}</div>
                      <div style={{ fontWeight: 700, color: "#f0e8ff", fontSize: 13, marginBottom: 1 }}>{edu.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(180,155,215,0.5)" }}>{edu.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block", animation: "pu 2s infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(180,255,180,0.7)" }}>Open to collaboration &amp; freelance</span>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="techstack" style={{ padding: "80px 0 90px", position: "relative", overflow: "hidden" }}>
        <CircuitBg />
        <div className="w" style={{ position: "relative", zIndex: 1 }}>
          <Fade>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <h2 style={{ fontSize: "clamp(36px,5vw,70px)", fontWeight: 900, color: "#fff", lineHeight: 1.0, letterSpacing: "-.04em", marginBottom: 10, textShadow: "0 0 80px rgba(168,85,247,0.5)" }}>TECH STACK</h2>
              <p style={{ fontSize: 14, color: "rgba(180,155,215,0.5)" }}>{TECH.length} technologies in pyramid formation</p>
            </div>
          </Fade>
          <Fade delay={0.1}><PyramidTechGrid /></Fade>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "88px 0" }}>
        <div className="w">
          <Fade><SLabel text="What I Do" /></Fade>
          <Fade delay={0.04}><h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 10 }}>Services</h2></Fade>
          <Fade delay={0.07}><p style={{ color: "rgba(180,155,215,0.6)", fontSize: 15, maxWidth: 480, lineHeight: 1.75, marginBottom: 32 }}>Specialised AI & ML services delivered with precision and real-world impact.</p></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {[
              { title:"Machine Learning", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>, desc:"End-to-end ML pipelines — from data preprocessing to model training, evaluation, and production deployment." },
              { title:"NLP & Text Analytics", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, desc:"Sentiment analysis, multilingual translation, summarisation, and semantic search using state-of-the-art transformers." },
              { title:"Generative AI", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, desc:"LLM-powered apps including RAG systems, fine-tuned models, text and image generation pipelines, and conversational AI." },
              { title:"Agentic AI", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, desc:"Autonomous AI agents capable of planning, reasoning, tool usage, and multi-step task execution using LangChain, CrewAI, and MCP." },
            ].map((s,i) => (
              <Fade key={s.title} delay={i * .07}>
                <div style={{ ...cardStyle, padding: 24, borderRadius: 16 }} onMouseEnter={hov} onMouseLeave={unh}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(140,80,255,0.08)", border: "1px solid rgba(140,80,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#a855f7" }}>{s.icon}</div>
                  <h4 style={{ fontWeight: 700, color: "#f0e8ff", marginBottom: 8, fontSize: 15 }}>{s.title}</h4>
                  <p style={{ fontSize: 13, color: "rgba(180,155,215,0.6)", lineHeight: 1.72 }}>{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="portfolio" style={{ padding: "88px 0" }}>
        <div className="w">
          <Fade><SLabel text="My Work" /></Fade>
          <Fade delay={0.06}><ProjectSection /></Fade>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "88px 0" }}>
        <div className="w">
          <Fade><SLabel text="Experience" /></Fade>
          <Fade delay={0.04}><h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 10 }}>My Work Experience</h2></Fade>
          <Fade delay={0.07}><p style={{ color: "rgba(180,155,215,0.6)", fontSize: 15, maxWidth: 480, lineHeight: 1.75, marginBottom: 32 }}>Hands-on experience across the full AI development lifecycle.</p></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14, marginBottom: 48 }}>
            {[
              {title:"Generative & Agentic AI Engineer",date:"Jan 2025 – Present",desc:"Production-grade AI systems: clinical RAG, fine-tuned DeepSeek, Whisper speech pipelines, and multilingual NLP tools."},
              {title:"Machine Learning Researcher",date:"2024",desc:"Deep learning models for sentiment analysis, English-to-Urdu RNN translation, LLM summarisation, and custom transformers."},
              {title:"Freelance AI Developer",date:"2023 – Present",desc:"AI-powered client solutions: chatbots, automated reporting tools, and intelligent data pipelines."},
              {title:"B.S. Artificial Intelligence",date:"Sep 2022 – Jul 2026",desc:"National Textile University, Pakistan. Machine learning, deep learning, computer vision, and NLP."},
            ].map((exp,i) => (
              <Fade key={exp.title} delay={i * .07}>
                <div style={{ ...cardStyle, padding: 22, borderRadius: 16 }} onMouseEnter={hov} onMouseLeave={unh}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#a855f7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{exp.date}</div>
                  <h4 style={{ fontWeight: 800, color: "#f0e8ff", marginBottom: 7, fontSize: 14, lineHeight: 1.3 }}>{exp.title}</h4>
                  <p style={{ fontSize: 13, color: "rgba(180,155,215,0.6)", lineHeight: 1.65 }}>{exp.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
          <Fade>
            <div style={{ background: "rgba(120,40,200,0.12)", border: "1px solid rgba(140,80,255,0.22)", borderRadius: 22, padding: "44px 36px", textAlign: "center" }}>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 800, color: "#fff", letterSpacing: "-.025em", marginBottom: 10 }}>Ready to build something intelligent?</h3>
              <p style={{ color: "rgba(180,155,215,0.6)", marginBottom: 26, fontSize: 14 }}>Reach out today and let's discuss how I can help achieve your goals.</p>
              <button onClick={() => go("contact")} style={pBtn} onMouseEnter={e => { e.currentTarget.style.opacity = ".85"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}>Let's get in touch</button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "88px 0" }}>
        <div className="w">
          <Fade><SLabel text="Contact" /></Fade>
          <Fade delay={0.04}><h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 28 }}>Let's Work Together</h2></Fade>
          <div className="cc2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44, alignItems: "start" }}>
            <Fade delay={0.06}>
              <p style={{ color: "rgba(180,155,215,0.65)", fontSize: 15, lineHeight: 1.82, marginBottom: 24 }}>Have a project in mind? Whether it's a machine learning model, a generative AI app, or an NLP pipeline — I'd love to hear about it.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  {lbl:"GitHub",href:"https://github.com/hazimleets",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>},
                  {lbl:"LinkedIn",href:"https://www.linkedin.com/in/hazimwaqar/",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>},
                  {lbl:"Medium",href:"https://medium.com/@hazimwaqar.contact",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>},
                  {lbl:"Email",href:"mailto:hazimwaqar.contact@gmail.com",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>},
                ].map(s => (
                  <a key={s.lbl} href={s.href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 700, color: "rgba(200,175,235,0.75)", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#c084fc"; e.currentTarget.style.borderColor = "rgba(168,85,247,0.35)"; e.currentTarget.style.background = "rgba(140,80,255,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(200,175,235,0.75)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    {s.icon} {s.lbl}
                  </a>
                ))}
              </div>
            </Fade>
            <Fade delay={0.1}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24 }}>
                <div className="fr" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  {[["name","Your Name","text"],["email","Your Email","email"]].map(([k,ph,t]) => (
                    <input key={k} type={t} placeholder={ph} value={form[k]||""} onChange={e => setForm({...form,[k]:e.target.value})}
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, padding: "11px 14px", color: "#f0e8ff", fontFamily: "inherit", fontSize: 14, outline: "none", width: "100%", transition: "border-color .2s" }}
                      onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.45)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; }} />
                  ))}
                </div>
                <input type="text" placeholder="Subject" value={form.subject||""} onChange={e => setForm({...form,subject:e.target.value})}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, padding: "11px 14px", color: "#f0e8ff", fontFamily: "inherit", fontSize: 14, outline: "none", width: "100%", marginBottom: 12, display: "block", transition: "border-color .2s" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.45)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; }} />
                <textarea placeholder="Your Message" rows={5} value={form.msg||""} onChange={e => setForm({...form,msg:e.target.value})}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 9, padding: "11px 14px", color: "#f0e8ff", fontFamily: "inherit", fontSize: 14, outline: "none", width: "100%", marginBottom: 14, resize: "vertical", transition: "border-color .2s" }}
                  onFocus={e => { e.target.style.borderColor = "rgba(168,85,247,0.45)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; }} />
                <a href={`mailto:hazimwaqar.contact@gmail.com?subject=${encodeURIComponent(form.subject||"")}&body=${encodeURIComponent("Name: "+(form.name||"")+"\nEmail: "+(form.email||"")+"\n\n"+(form.msg||""))}`}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "13px", borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff", fontWeight: 700, fontFamily: "inherit", fontSize: 14, boxShadow: "0 4px 18px rgba(124,58,237,0.4)", transition: "opacity .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = ".85"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                  Send Message
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "22px 28px" }}>
        <div className="w" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "rgba(180,155,215,0.45)" }}>
            {"© 2025 "}<span style={{ color: "#a855f7", fontWeight: 700 }}>Hazim Waqar</span>{". All rights reserved."}
          </p>
          <div style={{ display: "flex", gap: 22 }}>
            {[["GitHub","https://github.com/hazimleets"],["LinkedIn","https://www.linkedin.com/in/hazimwaqar/"],["Medium","https://medium.com/@hazimwaqar.contact"]].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "rgba(180,155,215,0.45)", transition: "color .2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#c084fc"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(180,155,215,0.45)"; }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}