import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowRight, Briefcase, GraduationCap } from "lucide-react";

// Background
const ItachiBackground = () => (
  <div
    aria-hidden
    className="fixed inset-0 -z-30 bg-cover bg-center"
    style={{ backgroundImage: "url('/itachi-bg.jpg')", filter: "brightness(0.35)" }}
  />
);

// Rotating Sharingan
const Sharingan = ({ size = 20 }: { size?: number }) => (
  <motion.img
    src="/sharingan.svg"
    alt="Sharingan"
    width={size}
    height={size}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    className="inline-block"
  />
);

// Navbar
const Navbar = () => (
  <div className="sticky top-0 z-50 border-b border-red-900/60 backdrop-blur supports-[backdrop-filter]:bg-black/55">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <div className="font-semibold tracking-wide text-white flex items-center gap-2">
        <Sharingan size={18} /> Naveen
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {[["About","about"],["Skills","skills"],["Projects","projects"],["Experience","experience"],["Contact","contact"]].map(([label,id])=> (
          <a key={id} href={`#${id}`} className="text-zinc-300 hover:text-red-400 transition-colors">{label}</a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <a href="/Naveen_Topno_Resume.pdf" download className="rounded-full border border-red-700 bg-red-700/10 px-4 py-2 text-sm text-red-200 hover:bg-red-700/20 transition flex items-center gap-2">
          <Sharingan size={16} /> Download Resume
        </a>
      </div>
    </div>
  </div>
);

// Tilt hero
const Hero = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-50, 50], [8, -8]);
  const rotateY = useTransform(mx, [-50, 50], [-8, 8]);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      mx.set(x / 4);
      my.set(y / 4);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs text-red-200 shadow-[0_0_0_1px_rgba(239,68,68,0.25)]">
          <Sharingan size={14} /> Open to Internship / PPO
        </div>
        <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white text-shadow-glow-red">
          Hi, I’m <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">Naveen Topno</span>
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300 text-base sm:text-lg leading-relaxed">
          MCA graduate & developer focused on Generative AI, Process Mining, and modern web development. I build elegant, practical products at the intersection of <span className="text-red-300">AI</span>, <span className="text-red-300">Data</span>, and <span className="text-red-300">Frontend Engineering</span>.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3" style={{ transform: "translateZ(40px)" }}>
          <a href="#projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-zinc-50 font-semibold hover:opacity-90 transition flex items-center gap-2 shadow-glow-red">
            <Sharingan size={16} /> Explore Projects <ArrowRight className="h-4 w-4"/>
          </a>
          <a href="#contact" className="px-6 py-3 rounded-full border border-red-500/50 text-red-200 hover:bg-red-500/10 transition flex items-center gap-2">
            <Sharingan size={16} /> Let’s Connect <ArrowRight className="h-4 w-4"/>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
    <div className="mb-8 flex items-center gap-3">
      <div className="rounded-2xl bg-red-500/10 p-2 shadow-[0_0_0_1px_rgba(239,68,68,0.25)]">
        <Sharingan size={18} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h2>
    </div>
    {children}
  </section>
);

// Skills as tags
const SkillTag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full border border-red-500/40 text-red-300 text-xs">{children}</span>
);

const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="flex flex-wrap gap-2">
      {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Python", "LLMs", "RAG", "Vector DBs", "Docker", "Git"].map((s, i) => (
        <SkillTag key={i}>{s}</SkillTag>
      ))}
    </div>
  </Section>
);

// Projects (two only)
const PROJECTS = [
  {
    name: "Get AI News",
    desc: "React app delivering AI-powered news summaries & daily DSA challenges with Judge0 runtime.",
    tech: ["React", "Google Gemini AI", "Judge0"],
    git: "#",
  },
  {
    name: "RAG Pipeline",
    desc: "Retrieval-Augmented Generation pipeline using LLM, Vector Database, and Docker for scalable Q&A on custom datasets.",
    tech: ["LLM", "Vector DB", "Docker", "Python"],
    git: "#",
  },
] as const;

const Projects = () => (
  <Section id="projects" title="Signature Projects">
    <div className="grid md:grid-cols-2 gap-6">
      {PROJECTS.map((p, i) => (
        <div key={i} className="relative rounded-2xl border border-red-900/40 bg-zinc-900/50 backdrop-blur-xl p-6 transition hover:border-red-400/60">
          <h3 className="text-xl font-semibold text-white">{p.name}</h3>
          <p className="mt-2 text-zinc-300">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full border border-red-500/40 text-red-300 text-xs">{t}</span>
            ))}
          </div>
          <div className="mt-5">
            <a href={p.git} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl border border-zinc-700 text-zinc-200 hover:border-zinc-500 transition flex items-center gap-2">
              <Github className="h-4 w-4"/> GitHub
            </a>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

// About
const About = () => (
  <Section id="about" title="About Me">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 rounded-2xl border border-red-900/40 bg-zinc-900/50 backdrop-blur-xl p-6 text-zinc-300">
        I thrive at the intersection of <span className='text-red-300'>AI</span>, <span className='text-red-300'>data</span>, and <span className='text-red-300'>frontend engineering</span>—turning ideas into polished, fast experiences. Recent work spans <span className="text-zinc-100">Get AI News</span> and an enterprise-ready <span className="text-zinc-100">RAG Pipeline</span>.
      </div>
      <div className="rounded-2xl border border-red-900/40 bg-zinc-900/50 backdrop-blur-xl p-6 text-sm text-zinc-300 space-y-3">
        <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-red-300"/> naveentopno20@gmail.com</div>
        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-red-300"/> +91 9149307691</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-300"/> Moradabad, India</div>
        <a className="flex items-center gap-2 hover:text-red-400 transition" href="https://www.linkedin.com/in/naveen-topno-a360902b6" target="_blank" rel="noreferrer">
          <Linkedin className="h-4 w-4 text-red-300"/> LinkedIn
        </a>
      </div>
    </div>
  </Section>
);

// Experience (resume-derived placeholders)
const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-4">
      <div className="rounded-2xl border border-red-900/40 bg-zinc-900/50 backdrop-blur-xl p-6">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Briefcase className="h-4 w-4 text-red-300" /> Generative AI Intern — Eduskills (Remote)
        </div>
        <div className="text-xs text-zinc-400 mt-1">2024</div>
        <ul className="mt-3 list-disc list-inside text-zinc-300 text-sm space-y-1">
          <li>Built LLM-powered features and experimented with RAG for knowledge grounding.</li>
          <li>Optimized prompts and evaluated outputs for correctness and style.</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-red-900/40 bg-zinc-900/50 backdrop-blur-xl p-6">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Briefcase className="h-4 w-4 text-red-300" /> Process Mining Analyst Intern — Eduskills (Remote)
        </div>
        <div className="text-xs text-zinc-400 mt-1">2024</div>
        <ul className="mt-3 list-disc list-inside text-zinc-300 text-sm space-y-1">
          <li>Mapped processes and analyzed event logs to surface optimization opportunities.</li>
          <li>Collaborated with stakeholders to translate findings into improvements.</li>
        </ul>
      </div>
    </div>
  </Section>
);

// Contact
const Contact = () => (
  <Section id="contact" title="Contact">
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-zinc-300">Let’s collaborate! Reach out anytime.</p>
      <div className="mt-6 flex flex-col items-center gap-3 text-zinc-300">
        <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-red-300"/> naveentopno20@gmail.com</div>
        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-red-300"/> +91 9149307691</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-300"/> Moradabad, India</div>
      </div>
    </div>
  </Section>
);

export default function App() {
  return (
    <div className="relative min-h-screen text-white">
      <ItachiBackground />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Experience />
      <Contact />
      <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-zinc-300">
        © {new Date().getFullYear()} Naveen Topno · Itachi Uchiha Theme
      </footer>
    </div>
  );
}
