import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Mail, MapPin, ArrowUpRight, ArrowRight, ChevronDown,
  Server, Cloud, Code2, Terminal as TerminalIcon,
} from 'lucide-react'
import {
  SiPython, SiFastapi, SiPostgresql, SiRedis,
  SiReact, SiVite, SiTailwindcss, SiJavascript,
  SiTerraform, SiDocker, SiGithubactions, SiGithub, SiInstagram,
} from 'react-icons/si'
import { FaAws, FaLinkedinIn } from 'react-icons/fa'

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
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
    n: '01', img: '/work/work-frontend.png', tag: 'Full Stack · DevOps',
    title: 'CryptoTerminal — Real-Time Trading Platform',
    detail: 'A React + FastAPI trading terminal streaming live data from Binance, OKX, Bybit and Hyperliquid — liquidations, funding, whale tracking — deployed on AWS with Terraform and secretless CI/CD.',
    status: 'Live', live: 'http://51.20.93.124',
  },
  {
    n: '02', img: '/work/work-alkilic.png', tag: 'Design · Frontend',
    title: 'Alkılıç Hukuk Bürosu',
    detail: 'A self-designed brand site for a law firm — dark, editorial layout built to read as authoritative and trustworthy.',
    status: 'Live', live: 'https://d1y6ddqubs82wc.cloudfront.net',
  },
  {
    n: '03', img: '/work/work-croffie.png', tag: 'Design · Frontend',
    title: 'Boutique Café Brand Site',
    detail: 'A self-designed café brand site — warm, tactile visuals paired with a clean, fast-loading storefront.',
    status: 'Live', live: 'https://d3qwvb9vkbiwqf.cloudfront.net',
  },
  {
    n: '04', img: '/work/work-acelya.png', tag: 'Design · Frontend',
    title: 'Dietitian Booking Platform',
    detail: 'A self-designed booking and progress-tracking site for a dietitian practice, with a soft, health-forward visual language.',
    status: 'Live', live: 'https://d156hxen0v55yq.cloudfront.net',
  },
  {
    n: '05', img: '/work/work-monitoring.png', tag: 'DevOps · Linux',
    title: 'Linux Server Health Monitoring & Backup',
    detail: 'Bash scripts hardened with set -euo pipefail, scheduled via systemd timers and cron, watching CPU/RAM/disk and running automated, self-pruning backups over key-based SSH.',
    status: 'Source', source: 'https://github.com/mehmetcankavak/linux-monitoring-system',
  },
]

const SERVICES = [
  {
    icon: Server, title: 'Backend Development', category: 'Engineering',
    tags: ['Python', 'FastAPI', 'asyncpg', 'REST API', 'WebSocket', 'PostgreSQL'],
    detail: 'API design, database modeling and real-time data pipelines. Scalable, testable services built to last.',
  },
  {
    icon: Cloud, title: 'DevOps & Cloud', category: 'Infrastructure',
    tags: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'CloudWatch', 'IAM'],
    detail: 'CI/CD pipelines, Infrastructure as Code, container deploys, monitoring and alerting — shipping code to production with confidence.',
  },
  {
    icon: TerminalIcon, title: 'System Design', category: 'Architecture',
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
function Heading({ id, kicker, title, align = 'left' }) {
  const center = align === 'center'
  return (
    <div id={id} className={`mb-14 ${center ? 'text-center' : ''}`}>
      {kicker && (
        <motion.p {...fadeUp()} className="mb-3 text-xs font-semibold tracking-[0.25em] text-faint uppercase">{kicker}</motion.p>
      )}
      <motion.h2 {...fadeUp(0.05)} className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {title}
      </motion.h2>
    </div>
  )
}

/* ── Header ─────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  return (
    <header className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${scrolled || open ? 'border-b border-line bg-bg-0/90 backdrop-blur-md' : ''}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#home" className="shrink-0" onClick={() => setOpen(false)}>
          <motion.span
            layout
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block overflow-hidden text-sm font-extrabold tracking-[0.15em] text-ink whitespace-nowrap uppercase"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={scrolled ? 'short' : 'full'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {scrolled ? 'MCK' : 'Mehmet Can Kavak'}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </a>
        <ul className="font-serif hidden items-center gap-9 text-base text-muted md:flex">
          {NAV.map((n) => (<li key={n.href}><a href={n.href} className="transition-colors hover:text-ink">{n.label}</a></li>))}
        </ul>
        <a href="#contact" className="btn-dark hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex">Contact Me</a>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center text-ink md:hidden"
        >
          <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[5px]'}`} />
          <span className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[5px]'}`} />
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-line bg-bg-0 px-6 py-6 md:hidden"
        >
          <ul className="font-serif flex flex-col gap-1 text-base text-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn-dark mt-4 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors">
            Contact Me
          </a>
        </motion.div>
      )}
    </header>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const blockRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: blockRef, offset: ['start end', 'start start'] })
  const gutter = useTransform(scrollYProgress, [0, 1], [6, 0])
  const gutterStr = useTransform(gutter, (v) => `${v}vw`)
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0])
  const radiusStr = useTransform(radius, (v) => `${v}px`)

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-36 pb-16 sm:pt-44 md:grid-cols-[1.35fr_1fr] md:items-end">
        <h1 className="animate-fade-rise text-5xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl md:text-7xl">
          Systems that <span className="underline-accent">hold</span>,
          <br />
          from <span className="underline-accent">code</span> to production.
        </h1>
        <div className="animate-fade-rise-delay">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-faint uppercase">
            Backend &amp; DevOps Engineer — Based in Turkey
          </p>
          <p className="font-serif text-base leading-relaxed text-muted sm:text-lg">
            I design and run infrastructure people can rely on — writing the backend,
            shipping the pipeline and keeping it alive in production.
          </p>
        </div>
      </div>

      {/* Feature block — grows from a contained card to a full-bleed panel as it scrolls into view */}
      <div className="w-full pb-20">
        <motion.div
          ref={blockRef}
          style={{ marginLeft: gutterStr, marginRight: gutterStr, borderRadius: radiusStr }}
          className="overflow-hidden bg-black px-8 py-20 text-center sm:py-28"
        >
          <motion.h2 {...fadeUp()} className="font-display mx-auto max-w-2xl text-4xl leading-[1.1] font-normal text-ink-invert sm:text-5xl">
            Built on hard infrastructure problems.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="font-serif mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-invert sm:text-base">
            See how backend architecture, DevOps pipelines and production infrastructure
            come together across real, shipped projects.
          </motion.p>
          <motion.div {...fadeUp(0.18)}>
            <a href="#work" className="btn-light mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]">
              View My Work <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Icon marquee — live brand colors */}
      <div className="marquee-mask relative border-y border-line bg-bg-1 py-6">
        <div className="marquee-track">
          {[...TECH, ...TECH].map(({ icon: Icon, color }, i) => (
            <span key={i} className="mx-8" style={{ color }}>
              <Icon size={28} />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Works ──────────────────────────────────────────────────── */
function Work() {
  const grid = WORK.slice(0, 3)
  const rest = WORK.slice(3)
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Heading id="work" kicker="Portfolio" title="Latest work" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((w, i) => (
            <motion.article key={w.n} {...fadeUp(0.08 * i)} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card">
              <div className="relative aspect-16/10 overflow-hidden">
                <img src={w.img} alt={w.title} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-ink-invert backdrop-blur">{w.tag}</span>
                <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-ink-invert backdrop-blur transition-colors group-hover:bg-black">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-ink">{w.title}</h3>
                <p className="font-serif mt-2 flex-1 text-sm leading-relaxed text-muted">{w.detail}</p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs">
                  <div>
                    <p className="tracking-wide text-faint uppercase">Stack</p>
                    <p className="mt-0.5 font-medium text-ink">{w.tag}</p>
                  </div>
                  <div className="text-right">
                    <p className="tracking-wide text-faint uppercase">Status</p>
                    <p className="mt-0.5 font-medium text-ink">{w.status}</p>
                  </div>
                </div>

                {(w.source || w.live) && (
                  <a href={w.source || w.live} target="_blank" rel="noreferrer"
                     className="btn-dark mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02]">
                    {w.source ? 'Read source' : 'Live demo'} <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr]">
            <motion.div {...fadeUp()}>
              <h3 className="text-3xl leading-tight font-bold text-ink sm:text-4xl">
                More systems I&apos;ve shipped and kept alive.
              </h3>
            </motion.div>
            <div className="divide-y divide-line border-t border-b border-line">
              {rest.map((w, i) => (
                <motion.a
                  key={w.n} {...fadeUp(0.06 * i)}
                  href={w.source || w.live} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-ink"
                >
                  <span className="font-medium text-ink">{w.title}</span>
                  <span className="flex shrink-0 items-center gap-2 text-sm text-faint">
                    {w.tag}
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Services ───────────────────────────────────────────────── */
function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
          <motion.div {...fadeUp()}>
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-faint uppercase">What I Do</p>
            <h2 className="text-3xl leading-tight font-bold text-ink sm:text-4xl">
              I build backend systems and infrastructure that stay up.
            </h2>
          </motion.div>

          <div id="services" className="divide-y divide-line border-t border-b border-line">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              const active = open === i
              return (
                <motion.div key={s.title} {...fadeUp(0.06 * i)}>
                  <button onClick={() => setOpen(active ? -1 : i)} className="flex w-full items-center gap-4 py-6 text-left">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-ink">
                      <Icon size={18} />
                    </span>
                    <span className="text-lg font-semibold text-ink">{s.title}</span>
                    <span className="ml-auto hidden text-sm text-faint sm:inline">{s.category}</span>
                    <ChevronDown size={18} className={`shrink-0 text-faint transition-transform ${active ? 'rotate-180 text-ink' : ''}`} />
                  </button>
                  {active && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.35 }} className="overflow-hidden pb-6 pl-14">
                      <p className="font-serif max-w-xl text-muted">{s.detail}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tags.map((t) => (<span key={t} className="rounded-full bg-card px-3 py-1 text-xs text-muted">{t}</span>))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Skills ─────────────────────────────────────────────────── */
function Skills() {
  return (
    <section className="border-t border-line py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Heading id="skills" kicker="Toolbox" title="My Skills" align="center" />
        <motion.p {...fadeIn(0.1)} className="font-serif mx-auto -mt-8 mb-14 max-w-lg text-center text-muted">
          The technologies I use to design, build and ship reliable systems.
        </motion.p>
        <div className="space-y-5">
          {SKILLS.map((s, i) => {
            const Cat = s.icon
            return (
              <motion.div key={s.group} {...fadeUp(0.08 * i)} className="rounded-2xl bg-card p-7 md:flex md:items-center md:gap-10">
                <div className="mb-6 flex items-center gap-3 md:mb-0 md:w-56 md:shrink-0">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-0 text-ink"><Cat size={20} /></span>
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
  const field = 'w-full rounded-xl bg-card px-4 py-3.5 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:bg-card-2 disabled:opacity-60'
  const info = [
    { icon: Mail, label: 'Email', value: 'mckavak10@gmail.com', href: 'mailto:mckavak10@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Remote · Worldwide' },
  ]
  return (
    <section className="border-t border-line py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Heading id="contact" kicker="Get in Touch" title="Contact Me" align="center" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.form {...fadeUp()} onSubmit={submit} className="space-y-4">
            <input required placeholder="Name" value={form.name} disabled={status === 'sending'} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
            <input required type="email" placeholder="Email" value={form.email} disabled={status === 'sending'} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} />
            <textarea required rows={5} placeholder="Message" value={form.message} disabled={status === 'sending'} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} />
            <button type="submit" disabled={status === 'sending'} className="btn-dark inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] disabled:opacity-70">
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent ✓' : (<>Send Message <ArrowRight size={16} /></>)}
            </button>
            {status === 'sent' && <p className="text-sm text-muted">Thanks! Your message has been sent — I'll get back to you soon.</p>}
            {status === 'error' && <p className="text-sm text-red-600">Something went wrong. Please email me directly at mckavak10@gmail.com.</p>}
          </motion.form>

          <div className="flex flex-col gap-4">
            {info.map((c, i) => {
              const Icon = c.icon
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-0 text-ink"><Icon size={20} /></span>
                  <div><p className="text-xs tracking-wide text-faint uppercase">{c.label}</p><p className="text-sm font-medium text-ink">{c.value}</p></div>
                  {c.href && <ArrowUpRight size={18} className="ml-auto text-faint transition-colors group-hover:text-ink" />}
                </>
              )
              return c.href ? (
                <motion.a key={c.label} {...fadeUp(0.08 * i)} href={c.href} className="group flex items-center gap-4 rounded-2xl bg-card p-5 transition-colors hover:bg-card-2">{inner}</motion.a>
              ) : (
                <motion.div key={c.label} {...fadeUp(0.08 * i)} className="flex items-center gap-4 rounded-2xl bg-card p-5">{inner}</motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer (full black, multi-column) ─────────────────────── */
function Footer() {
  const links = NAV.filter((n) => n.href !== '#home')
  return (
    <footer className="bg-black py-20 text-ink-invert">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2 {...fadeUp()} className="max-w-xl text-3xl leading-[1.15] font-bold sm:text-4xl">
          Collaborate with Mehmet Can and start your journey in software today.
        </motion.h2>

        <motion.div {...fadeUp(0.1)} className="mt-14 grid grid-cols-2 gap-10 border-t border-line-invert pt-12 sm:grid-cols-4">
          <div>
            <p className="mb-4 text-xs font-medium text-ink-invert">Navigation</p>
            <ul className="font-serif space-y-3 text-sm text-muted-invert">
              {links.map((n) => (<li key={n.href}><a href={n.href} className="transition-colors hover:text-ink-invert">{n.label}</a></li>))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-medium text-ink-invert">Contact</p>
            <ul className="font-serif space-y-3 text-sm text-muted-invert">
              <li><a href="mailto:mckavak10@gmail.com" className="transition-colors hover:text-ink-invert">Email</a></li>
              <li><span>Remote · Worldwide</span></li>
            </ul>
          </div>
          <div className="col-span-2">
            <p className="mb-4 text-xs font-medium text-ink-invert">Connect</p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                   className="flex h-10 w-10 items-center justify-center rounded-full border border-line-invert text-muted-invert transition-colors hover:border-ink-invert/40 hover:text-ink-invert">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-16 border-t border-line-invert pt-8 text-xs text-faint-invert">
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
