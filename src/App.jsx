import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
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
    n: '01', img: '/work/work-frontend.png', tag: 'Full Stack · DevOps',
    title: 'CryptoTerminal — Real-Time Trading Platform',
    detail: 'A React + FastAPI trading terminal streaming live data from Binance, OKX, Bybit and Hyperliquid — liquidations, funding, whale tracking — deployed on AWS with Terraform and secretless CI/CD.',
    live: 'http://51.20.93.124',
  },
  {
    n: '02', img: '/work/work-alkilic.png', tag: 'Design · Frontend',
    title: 'Alkılıç Hukuk Bürosu',
    detail: 'A self-designed brand site for a law firm — dark, editorial layout built to read as authoritative and trustworthy.',
    live: 'https://d1y6ddqubs82wc.cloudfront.net',
  },
  {
    n: '03', img: '/work/work-croffie.png', tag: 'Design · Frontend',
    title: 'Boutique Café Brand Site',
    detail: 'A self-designed café brand site — warm, tactile visuals paired with a clean, fast-loading storefront.',
    live: 'https://d3qwvb9vkbiwqf.cloudfront.net',
  },
  {
    n: '04', img: '/work/work-acelya.png', tag: 'Design · Frontend',
    title: 'Dietitian Booking Platform',
    detail: 'A self-designed booking and progress-tracking site for a dietitian practice, with a soft, health-forward visual language.',
    live: 'https://d156hxen0v55yq.cloudfront.net',
  },
  {
    n: '05', img: '/work/work-monitoring.png', tag: 'DevOps · Linux',
    title: 'Linux Server Health Monitoring & Backup',
    detail: 'Bash scripts hardened with set -euo pipefail, scheduled via systemd timers and cron, watching CPU/RAM/disk and running automated, self-pruning backups over key-based SSH.',
    source: 'https://github.com/mehmetcankavak/linux-monitoring-system',
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
      <motion.h2 {...fadeUp(0.05)} className="font-display text-5xl font-normal tracking-tight sm:text-6xl">
        <span className="text-muted">{plain}</span> {strong}
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
    <header className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${scrolled || open ? 'liquid-glass mx-4 sm:mx-auto' : ''}`}>
        <a href="#home" className="font-display text-2xl tracking-tight" onClick={() => setOpen(false)}>Mehmet Can Kavak</a>
        <ul className="hidden items-center gap-9 text-sm font-medium text-muted md:flex">
          {NAV.map((n) => (<li key={n.href}><a href={n.href} className="transition-colors hover:text-ink">{n.label}</a></li>))}
        </ul>
        <a href="#contact" className="btn-invert hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex">Contact Me</a>
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
          className="liquid-glass mx-4 mt-3 rounded-3xl px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-1 text-base font-medium text-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn-invert mt-4 flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors">
            Contact Me
          </a>
        </motion.div>
      )}
    </header>
  )
}

/* ── Hero (cinematic, centered) ─────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="cinematic-bg pointer-events-none -z-10" />
      <div className="grain-overlay -z-10" />
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pt-40 pb-24 text-center sm:pt-52">
        <p className="animate-fade-rise mb-6 text-sm font-medium tracking-[0.2em] text-faint uppercase">
          Backend &amp; DevOps Engineer — Based in Turkey
        </p>

        <h1 className="animate-fade-rise-delay font-display text-6xl leading-[0.95] font-normal tracking-[-0.02em] sm:text-8xl">
          Systems that <em className="text-muted not-italic">hold</em>,
          <br />
          <em className="text-muted not-italic">from code to production.</em>
        </h1>

        <p className="animate-fade-rise-delay-2 mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          I design and run infrastructure people can rely on — writing the backend,
          shipping the pipeline and keeping it alive in production.
        </p>

        <div className="animate-fade-rise-delay-2 mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#work" className="btn-invert inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.03]">
            View My Work <ArrowRight size={16} />
          </a>
          <a href="#contact" className="liquid-glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]">
            Contact Me
          </a>
        </div>
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
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          speed={900}
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
                  {(w.source || w.live) && (
                    <div className="mt-5 flex gap-6 border-t border-line pt-4 text-sm">
                      {w.source && (
                        <a href={w.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-ink transition-opacity hover:opacity-70">
                          <SiGithub size={15} /> Source <ArrowUpRight size={13} />
                        </a>
                      )}
                      {w.live && (
                        <a href={w.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-ink transition-opacity hover:opacity-70">
                          Live Demo <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
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
    { icon: MapPin, label: 'Location', value: 'Remote · Worldwide' },
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
            <button type="submit" disabled={status === 'sending'} className="btn-invert inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.01] disabled:opacity-70">
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
          <motion.h2 {...fadeUp()} className="font-display max-w-md text-4xl leading-[1.05] font-normal tracking-tight sm:text-5xl">
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
