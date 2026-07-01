import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import {
  Mail, MapPin, Phone, ArrowUpRight, ArrowRight, ArrowDown, ChevronDown,
  Server, Cloud, Code2, Terminal as TerminalIcon,
} from 'lucide-react'
import {
  SiPython, SiFastapi, SiPostgresql, SiRedis,
  SiReact, SiVite, SiTailwindcss, SiJavascript,
  SiTerraform, SiDocker, SiGithubactions, SiGithub, SiInstagram,
} from 'react-icons/si'
import { FaAws, FaLinkedinIn } from 'react-icons/fa'

/* ── Typewriter ─────────────────────────────────────────────── */
function useTypewriter(words, { type = 85, del = 45, hold = 1500 } = {}) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const current = words[i % words.length]
    let t
    if (!deleting && text === current) t = setTimeout(() => setDeleting(true), hold)
    else if (deleting && text === '') { setDeleting(false); setI((v) => v + 1) }
    else t = setTimeout(() => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)), deleting ? del : type)
    return () => clearTimeout(t)
  }, [text, deleting, i, words, type, del, hold])
  return text
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

/* ── Data ───────────────────────────────────────────────────── */
const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Works' },
  { href: '#services', label: 'Services' },
  { href: '#skills', label: 'Skills' },
]

const TECH = [
  { icon: SiPython, color: '#4B8BBE' },
  { icon: SiFastapi, color: '#05998b' },
  { icon: SiPostgresql, color: '#4169E1' },
  { icon: SiRedis, color: '#FF4438' },
  { icon: FaAws, color: '#FF9900' },
  { icon: SiTerraform, color: '#7B42BC' },
  { icon: SiDocker, color: '#2496ED' },
  { icon: SiGithubactions, color: '#2088FF' },
  { icon: SiReact, color: '#61DAFB' },
  { icon: SiVite, color: '#646CFF' },
  { icon: SiJavascript, color: '#F7DF1E' },
  { icon: SiTailwindcss, color: '#38BDF8' },
]

const WORK = [
  {
    n: '01', img: '/work/work-frontend.png', tag: 'Web · Frontend',
    title: 'Real-Time Trading Interface',
    detail: 'A React + Vite terminal UI rendering live websocket data with sub-50ms latency, packaged into a native iOS app.',
  },
  {
    n: '02', img: '/work/work-backend.png', tag: 'Backend · Data',
    title: 'Multi-Exchange Data Engine',
    detail: 'FastAPI + asyncpg backend streaming from Binance, OKX, Bybit and Hyperliquid — liquidations, funding, whale tracking and risk rules.',
  },
  {
    n: '03', img: '/work/work-devops.png', tag: 'DevOps · Cloud',
    title: 'AWS Infrastructure — IaC & CI/CD',
    detail: 'EC2 + RDS + ElastiCache defined entirely in Terraform. Secretless CI/CD via GitHub Actions + OIDC, with CloudWatch metrics, logs and alarms.',
  },
]

const SERVICES = [
  {
    icon: Server, title: 'Backend Development',
    tags: ['Python', 'FastAPI', 'asyncpg', 'REST API', 'WebSocket', 'PostgreSQL'],
    detail: 'API design, database modeling and real-time data pipelines. Scalable, testable services built to last.',
  },
  {
    icon: Cloud, title: 'DevOps & Cloud',
    tags: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'CloudWatch', 'IAM'],
    detail: 'CI/CD pipelines, Infrastructure as Code, container deploys, monitoring and alerting — shipping code to production with confidence.',
  },
  {
    icon: TerminalIcon, title: 'System Design',
    tags: ['Architecture', 'Scalability', 'Security', 'Least Privilege'],
    detail: 'Small but solid systems: clear boundaries, least-privilege access and observability from day one.',
  },
]

const SKILLS = [
  {
    group: 'Backend', icon: Server,
    items: [
      { icon: SiPython, label: 'Python', color: '#4B8BBE' },
      { icon: SiFastapi, label: 'FastAPI', color: '#05998b' },
      { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
      { icon: SiRedis, label: 'Redis', color: '#FF4438' },
    ],
  },
  {
    group: 'Frontend', icon: Code2,
    items: [
      { icon: SiReact, label: 'React', color: '#61DAFB' },
      { icon: SiVite, label: 'Vite', color: '#646CFF' },
      { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
      { icon: SiTailwindcss, label: 'Tailwind', color: '#38BDF8' },
    ],
  },
  {
    group: 'DevOps & Cloud', icon: Cloud,
    items: [
      { icon: FaAws, label: 'AWS', color: '#FF9900' },
      { icon: SiTerraform, label: 'Terraform', color: '#7B42BC' },
      { icon: SiDocker, label: 'Docker', color: '#2496ED' },
      { icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF' },
    ],
  },
]

const SOCIALS = [
  { icon: SiInstagram, href: 'https://instagram.com/mehmetcankvak', label: 'Instagram' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: SiGithub, href: 'https://github.com/mehmetcankavak', label: 'GitHub' },
]

/* ── Shared heading ─────────────────────────────────────────── */
function Heading({ id, kicker, plain, strong }) {
  return (
    <div id={id} className="mb-16 text-center">
      {kicker && (
        <motion.p {...fadeUp()} className="mb-3 text-xs font-medium tracking-[0.3em] text-faint uppercase">{kicker}</motion.p>
      )}
      <motion.h2 {...fadeUp(0.05)} className="text-4xl font-bold tracking-tight sm:text-5xl">
        <span className="text-muted">{plain}</span> {strong}
      </motion.h2>
    </div>
  )
}

/* ── Header ─────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-bg-0/80 py-3 backdrop-blur-md' : 'py-5'}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-semibold tracking-tight">Mehmet Can Kavak</a>
        <ul className="hidden items-center gap-9 text-sm font-medium text-muted md:flex">
          {NAV.map((n) => (<li key={n.href}><a href={n.href} className="transition-colors hover:text-ink">{n.label}</a></li>))}
        </ul>
        <a href="#contact" className="btn-invert rounded-full px-5 py-2.5 text-sm font-semibold transition-colors">Contact Me</a>
      </nav>
    </header>
  )
}

/* ── Hero (centered) ────────────────────────────────────────── */
function Hero() {
  const typed = useTypewriter(['DevOps Engineer', 'Cloud Engineer', 'System Designer'])
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-40 pb-16 text-center sm:pt-48">
        <motion.p {...fadeUp()} className="mb-6 text-base font-medium text-white/90">
          Hi! I'm Mehmet Can — Based in Turkey
        </motion.p>

        <motion.h1 {...fadeUp(0.08)} className="text-5xl leading-[1.08] font-bold tracking-tight sm:text-7xl">
          Backend Developer &
          <br />
          <span className="type-cursor text-muted">{typed}</span>
        </motion.h1>

        <motion.p {...fadeUp(0.16)} className="mt-7 max-w-xl text-lg text-white/85">
          I build systems and infrastructure that solve real problems —
          from writing the code to running it in production.
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#work" className="btn-invert inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors">
            View My Work <ArrowRight size={16} />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-ink hover:border-white/25">
            Contact Me
          </a>
        </motion.div>

        {/* Tilted deploy terminal + clickable scroll badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 w-full max-w-lg"
        >
          <div className="overflow-hidden rounded-3xl border border-line bg-card text-left shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-white/25" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-xs text-faint">deploy — main</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-ink">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> LIVE
              </span>
            </div>
            <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
              <p className="text-muted"><span className="text-ink">➜</span> git push origin main</p>
              <p className="text-faint">✓ test · ruff · pytest <span className="text-ink">passed</span></p>
              <p className="text-faint">✓ docker build → push to ECR</p>
              <p className="text-faint">✓ ssm deploy → EC2 (OIDC)</p>
              <p className="text-ink">● deployed in 23s <span className="type-cursor" /></p>
            </div>
          </div>

          <a href="#work" aria-label="Scroll to work" className="group absolute -bottom-8 -right-6 hidden h-24 w-24 sm:block">
            <span className="spin-badge absolute inset-0 block">
              <svg viewBox="0 0 100 100" className="h-full w-full fill-faint">
                <defs><path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                <text className="text-[11px] tracking-[0.25em] uppercase">
                  <textPath href="#circle">scroll down • explore more • </textPath>
                </text>
              </svg>
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-bg-0 transition-transform group-hover:translate-y-0.5">
                <ArrowDown size={18} />
              </span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Icon marquee — live brand colors */}
      <div className="marquee-mask relative border-y border-line bg-white/[0.015] py-6">
        <div className="marquee-track">
          {[...TECH, ...TECH].map(({ icon: Icon, color }, i) => (
            <span key={i} className="mx-8" style={{ color }}>
              <Icon size={30} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Works ──────────────────────────────────────────────────── */
function Work() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Heading id="work" kicker="Portfolio" plain="View My" strong="Work" />
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          grabCursor
          spaceBetween={24}
          breakpoints={{ 0: { slidesPerView: 1.1, centeredSlides: true }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2.4 } }}
        >
          {WORK.map((w) => (
            <SwiperSlide key={w.n}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={w.img} alt={w.title} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-ink backdrop-blur">{w.tag}</span>
                  <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-black/40 text-ink backdrop-blur transition-colors group-hover:bg-white group-hover:text-bg-0">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-3xl font-bold text-faint">{w.n}</span>
                  <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.detail}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-10 flex justify-center gap-8 text-sm">
          <a href="https://github.com/mehmetcankavak/TerminalProject" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-ink transition-opacity hover:opacity-70">
            <SiGithub size={16} /> Source Code <ArrowUpRight size={14} />
          </a>
          <a href="http://51.20.93.124" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-ink transition-opacity hover:opacity-70">
            Live Demo <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Services ───────────────────────────────────────────────── */
function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Heading id="services" kicker="What I Do" plain="My" strong="Services" />
        <div className="space-y-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            const active = open === i
            return (
              <motion.div key={s.title} {...fadeUp(0.06 * i)} className={`overflow-hidden rounded-3xl border transition-colors ${active ? 'border-white/20 bg-card' : 'border-line bg-card/60'}`}>
                <button onClick={() => setOpen(active ? -1 : i)} className="flex w-full items-center gap-4 px-6 py-5 text-left">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active ? 'bg-white text-bg-0' : 'bg-white/5 text-ink'}`}>
                    <Icon size={20} />
                  </span>
                  <span className="text-lg font-semibold">{s.title}</span>
                  <ChevronDown size={20} className={`ml-auto text-faint transition-transform ${active ? 'rotate-180 text-ink' : ''}`} />
                </button>
                {active && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.35 }} className="px-6 pb-6">
                    <p className="max-w-2xl pl-15 text-muted">{s.detail}</p>
                    <div className="mt-4 flex flex-wrap gap-2 pl-15">
                      {s.tags.map((t) => (<span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{t}</span>))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Skills (gray cards, white titles, colored logos) ───────── */
function Skills() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Heading id="skills" kicker="Toolbox" plain="My" strong="Skills" />
        <p className="mx-auto -mt-10 mb-14 max-w-lg text-center text-muted">
          The technologies I use to design, build and ship reliable systems.
        </p>
        <div className="space-y-5">
          {SKILLS.map((s, i) => {
            const Cat = s.icon
            return (
              <motion.div key={s.group} {...fadeUp(0.08 * i)} className="rounded-3xl border border-line bg-card p-7 md:flex md:items-center md:gap-10">
                <div className="mb-6 flex items-center gap-3 md:mb-0 md:w-56 md:shrink-0">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-ink"><Cat size={20} /></span>
                  <h3 className="text-xl font-semibold text-ink">{s.group}</h3>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {s.items.map((it) => {
                    const Icon = it.icon
                    return (
                      <div key={it.label} className="flex items-center gap-2.5">
                        <Icon size={22} style={{ color: it.color }} />
                        <span className="text-sm text-muted">{it.label}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/mckavak10@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio — message from ${form.name || 'someone'}`,
          _template: 'table',
        }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }
  const field = 'w-full rounded-2xl border border-line bg-card px-4 py-3.5 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-white/30 disabled:opacity-60'
  const info = [
    { icon: Mail, label: 'Email', value: 'mckavak10@gmail.com', href: 'mailto:mckavak10@gmail.com' },
    { icon: Phone, label: 'Phone', value: '0534 364 67 19', href: 'tel:+905343646719' },
    { icon: MapPin, label: 'Location', value: 'Turkey · Open to remote' },
  ]
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Heading id="contact" kicker="Get in Touch" plain="Contact" strong="Me" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.form {...fadeUp()} onSubmit={submit} className="space-y-4">
            <input required placeholder="Name" value={form.name} disabled={status === 'sending'} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
            <input required type="email" placeholder="Email" value={form.email} disabled={status === 'sending'} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
            <textarea required rows={5} placeholder="Message" value={form.message} disabled={status === 'sending'} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} />
            <button type="submit" disabled={status === 'sending'} className="btn-invert inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-colors disabled:opacity-70">
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent ✓' : (<>Send Message <ArrowRight size={16} /></>)}
            </button>
            {status === 'sent' && <p className="text-sm text-white/80">Thanks! Your message has been sent — I'll get back to you soon.</p>}
            {status === 'error' && <p className="text-sm text-red-400/90">Something went wrong. Please email me directly at mckavak10@gmail.com.</p>}
          </motion.form>

          <div className="flex flex-col gap-4">
            {info.map((c, i) => {
              const Icon = c.icon
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-ink"><Icon size={20} /></span>
                  <div><p className="text-xs tracking-wide text-faint uppercase">{c.label}</p><p className="text-sm font-medium">{c.value}</p></div>
                  {c.href && <ArrowUpRight size={18} className="ml-auto text-faint transition-colors group-hover:text-ink" />}
                </>
              )
              return c.href ? (
                <motion.a key={c.label} {...fadeUp(0.08 * i)} href={c.href} className="group flex items-center gap-4 rounded-3xl border border-line bg-card p-5 transition-colors hover:border-white/25">{inner}</motion.a>
              ) : (
                <motion.div key={c.label} {...fadeUp(0.08 * i)} className="flex items-center gap-4 rounded-3xl border border-line bg-card p-5">{inner}</motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer (two columns) ───────────────────────────────────── */
function Footer() {
  const links = NAV.filter((n) => n.href !== '#home')
  return (
    <footer className="relative overflow-hidden border-t border-line py-20">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          <motion.h2 {...fadeUp()} className="max-w-md text-3xl leading-tight font-extrabold tracking-tight uppercase sm:text-4xl">
            Collaborate with Mehmet Can and start your journey in software today.
          </motion.h2>
          <motion.div {...fadeUp(0.1)} className="md:justify-self-end md:text-right">
            <ul className="flex flex-wrap gap-7 text-sm text-muted md:justify-end">
              {links.map((n) => (<li key={n.href}><a href={n.href} className="transition-colors hover:text-ink">{n.label}</a></li>))}
            </ul>
            <div className="mt-6 flex gap-3 md:justify-end">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                   className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-white/25 hover:text-ink">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="mt-16 border-t border-line pt-8 text-center text-xs text-faint">
          © {new Date().getFullYear()} Mehmet Can Kavak. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
