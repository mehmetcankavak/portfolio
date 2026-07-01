import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import {
  Mail, MapPin, ArrowUpRight, ArrowRight, ChevronDown,
  Server, Cloud, Terminal as TerminalIcon,
} from 'lucide-react'
import {
  SiPython, SiFastapi, SiPostgresql, SiRedis,
  SiReact, SiVite, SiTailwindcss, SiJavascript,
  SiTerraform, SiDocker, SiGithubactions, SiGithub,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

/* ── Daktilo efekti ─────────────────────────────────────────── */
function useTypewriter(words, { type = 90, del = 45, hold = 1400 } = {}) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[i % words.length]
    let t
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setI((v) => v + 1)
    } else {
      t = setTimeout(() => {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1))
      }, deleting ? del : type)
    }
    return () => clearTimeout(t)
  }, [text, deleting, i, words, type, del, hold])

  return text
}

/* ── Reveal animasyonu ──────────────────────────────────────── */
function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

/* ── Veri ───────────────────────────────────────────────────── */
const NAV = [
  { href: '#home', label: 'Ana Sayfa' },
  { href: '#work', label: 'Çalışmalar' },
  { href: '#services', label: 'Neler Yaparım' },
  { href: '#skills', label: 'Yetenekler' },
]

const MARQUEE = [
  'Python', 'FastAPI', 'AWS', 'Terraform', 'Docker', 'CI/CD',
  'PostgreSQL', 'Redis', 'GitHub Actions', 'CloudWatch', 'React', 'IaC',
]

const WORK = [
  {
    n: '01',
    img: '/work/work-frontend.png',
    tag: 'Web · Frontend',
    title: 'Gerçek Zamanlı Trading Arayüzü',
    detail:
      'React + Vite ile <50ms gecikmeli, canlı websocket verisiyle çalışan bir trading terminali arayüzü. iOS native uygulamaya paketlendi.',
  },
  {
    n: '02',
    img: '/work/work-backend.png',
    tag: 'Backend · Data',
    title: 'Çok Borsalı Veri Motoru',
    detail:
      'FastAPI + asyncpg backend; Binance, OKX, Bybit ve Hyperliquid için websocket akışları, likidasyon/funding/whale takibi ve risk kuralları.',
  },
  {
    n: '03',
    img: '/work/work-devops.png',
    tag: 'DevOps · Cloud',
    title: 'AWS Altyapısı — IaC & CI/CD',
    detail:
      'EC2 + RDS + ElastiCache, tamamen Terraform ile kod olarak. GitHub Actions + OIDC ile secretsiz CI/CD, CloudWatch ile metrik, log ve alarm.',
  },
]

const SERVICES = [
  {
    icon: Server,
    title: 'Backend Geliştirme',
    tags: ['Python', 'FastAPI', 'asyncpg', 'REST API', 'WebSocket', 'PostgreSQL'],
    detail:
      'API tasarımı, veritabanı modelleme ve gerçek zamanlı veri akışları. Ölçeklenebilir, test edilebilir servisler kuruyorum.',
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud Altyapı',
    tags: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'CloudWatch', 'IAM'],
    detail:
      'CI/CD pipeline kurulumu, Infrastructure as Code, container deploy, izleme ve alarm sistemleri — kodu güvenle production’a taşıyorum.',
  },
  {
    icon: TerminalIcon,
    title: 'Sistem Tasarımı',
    tags: ['Mimari', 'Ölçeklenebilirlik', 'Güvenlik', 'Least Privilege'],
    detail:
      'Küçük ama sağlam sistemler tasarlıyorum: doğru sınırlar, en az yetki prensibi ve gözlemlenebilirlik ilk günden itibaren.',
  },
]

const SKILLS = [
  {
    group: 'Backend',
    items: [
      { icon: SiPython, label: 'Python', color: '#4B8BBE' },
      { icon: SiFastapi, label: 'FastAPI', color: '#009688' },
      { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
      { icon: SiRedis, label: 'Redis', color: '#FF4438' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { icon: SiReact, label: 'React', color: '#61DAFB' },
      { icon: SiVite, label: 'Vite', color: '#646CFF' },
      { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E' },
      { icon: SiTailwindcss, label: 'Tailwind', color: '#38BDF8' },
    ],
  },
  {
    group: 'DevOps & Cloud',
    items: [
      { icon: FaAws, label: 'AWS', color: '#FF9900' },
      { icon: SiTerraform, label: 'Terraform', color: '#7B42BC' },
      { icon: SiDocker, label: 'Docker', color: '#2496ED' },
      { icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF' },
    ],
  },
]

/* ── Bileşenler ─────────────────────────────────────────────── */
function Heading({ children, id, kicker }) {
  return (
    <div id={id} className="mb-14 text-center">
      {kicker && (
        <motion.p {...fadeUp()} className="mb-3 text-sm font-medium tracking-[0.25em] text-accent uppercase">
          {kicker}
        </motion.p>
      )}
      <motion.h2 {...fadeUp(0.05)} className="text-4xl font-bold tracking-tight sm:text-5xl">
        {children}
      </motion.h2>
    </div>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled ? 'bg-bg-0/80 py-3 backdrop-blur-md' : 'py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-semibold tracking-tight">
          mck<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-9 text-sm text-muted md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition-colors hover:text-ink">{n.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn-accent rounded-full px-5 py-2.5 text-sm font-semibold">
          İletişime Geç
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  const typed = useTypewriter(['DevOps Engineer', 'Cloud Mühendisi', 'Sistem Tasarımcısı'])
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-36 pb-20 lg:grid-cols-2 lg:pt-40">
        {/* Sol */}
        <div>
          <motion.p {...fadeUp()} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Merhaba! Ben Mehmet Can — Türkiye merkezli 🇹🇷
          </motion.p>

          <motion.h1 {...fadeUp(0.08)} className="text-5xl leading-[1.08] font-extrabold tracking-tight sm:text-6xl">
            Backend Developer &
            <br />
            <span className="type-cursor text-accent">{typed}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-7 max-w-md text-lg text-muted">
            Sorunları çözen sistemler ve altyapılar kuruyorum — kodun yazımından
            production’da izlenmesine kadar.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#work" className="btn-accent inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              Çalışmalarımı Gör <ArrowRight size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-ink">
              İletişime Geç
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="mt-12 flex gap-10">
            {[
              ['3+', 'Katmanlı Proje'],
              ['7', 'DevOps Fazı'],
              ['100%', 'IaC Kapsam'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-accent">{v}</p>
                <p className="mt-1 text-xs tracking-wide text-faint uppercase">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sağ — deploy terminali (referanstaki foto kartının yerine) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/20 blur-3xl" />
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-1 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs text-faint">deploy — main</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-accent">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> LIVE
              </span>
            </div>
            <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
              <p className="text-muted"><span className="text-accent">➜</span> git push origin main</p>
              <p className="text-faint">✓ test · ruff · pytest <span className="text-accent">passed</span></p>
              <p className="text-faint">✓ docker build → push to ECR</p>
              <p className="text-faint">✓ ssm deploy → EC2 (OIDC)</p>
              <p className="text-faint">✓ cloudfront invalidation</p>
              <p className="text-accent">● deployed in 23s <span className="type-cursor" /></p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alt kayan şerit */}
      <div className="relative border-y border-line bg-white/[0.02] py-4">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6 text-sm font-medium text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="relative py-28">
      <div className="section-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-6">
        <Heading id="work" kicker="Portfolyo">
          Çalışma<span className="text-accent">larım</span>
        </Heading>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          grabCursor
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1.1, centeredSlides: true },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.4 },
          }}
        >
          {WORK.map((w) => (
            <SwiperSlide key={w.n}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-1 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
                    {w.tag}
                  </span>
                  <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-black/40 text-ink backdrop-blur transition-colors group-hover:bg-accent group-hover:text-bg-0">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-3xl font-bold text-accent/90">{w.n}</span>
                  <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.detail}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-10 flex justify-center gap-6 text-sm">
          <a
            href="https://github.com/mehmetcankavak/TerminalProject"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
          >
            <SiGithub size={16} /> Kaynak Kodu <ArrowUpRight size={14} />
          </a>
          <a
            href="http://51.20.93.124"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
          >
            Canlı Demo <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Heading id="services" kicker="Ne Sunuyorum">
          Neler <span className="text-accent">Yaparım</span>
        </Heading>
        <div className="space-y-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            const active = open === i
            return (
              <motion.div
                key={s.title}
                {...fadeUp(0.06 * i)}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  active ? 'border-accent/40 bg-bg-1' : 'border-line bg-bg-1/50'
                }`}
              >
                <button
                  onClick={() => setOpen(active ? -1 : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? 'bg-accent text-bg-0' : 'bg-white/5 text-accent'}`}>
                    <Icon size={20} />
                  </span>
                  <span className="text-lg font-semibold">{s.title}</span>
                  <ChevronDown
                    size={20}
                    className={`ml-auto text-faint transition-transform ${active ? 'rotate-180 text-accent' : ''}`}
                  />
                </button>
                {active && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.35 }}
                    className="px-6 pb-6"
                  >
                    <p className="max-w-2xl pl-15 text-muted">{s.detail}</p>
                    <div className="mt-4 flex flex-wrap gap-2 pl-15">
                      {s.tags.map((t) => (
                        <span key={t} className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent">
                          {t}
                        </span>
                      ))}
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

function Skills() {
  return (
    <section className="relative py-28">
      <div className="section-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-6">
        <Heading id="skills" kicker="Teknolojiler">
          Yetenek<span className="text-accent">lerim</span>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.group}
              {...fadeUp(0.08 * i)}
              className="rounded-3xl border border-line bg-bg-1 p-7"
            >
              <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
                <span className="h-4 w-1 rounded-full bg-accent" />
                {s.group}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {s.items.map((it) => {
                  const Icon = it.icon
                  return (
                    <div
                      key={it.label}
                      className="flex items-center gap-3 rounded-xl border border-line-soft bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-accent/30"
                    >
                      <Icon size={22} style={{ color: it.color }} />
                      <span className="text-sm text-muted">{it.label}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Heading id="contact" kicker="İletişim">
          Bir proje <span className="text-accent">konuşalım</span>
        </Heading>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <motion.a
            {...fadeUp(0.05)}
            href="mailto:mckavak10@gmail.com"
            className="group flex items-center gap-4 rounded-2xl border border-line bg-bg-1 p-6 transition-colors hover:border-accent/40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Mail size={22} />
            </span>
            <div>
              <p className="text-xs tracking-wide text-faint uppercase">E-posta</p>
              <p className="font-medium">mckavak10@gmail.com</p>
            </div>
            <ArrowUpRight size={18} className="ml-auto text-faint transition-colors group-hover:text-accent" />
          </motion.a>

          <motion.a
            {...fadeUp(0.12)}
            href="https://github.com/mehmetcankavak"
            target="_blank" rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-line bg-bg-1 p-6 transition-colors hover:border-accent/40"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <SiGithub size={22} />
            </span>
            <div>
              <p className="text-xs tracking-wide text-faint uppercase">GitHub</p>
              <p className="font-medium">mehmetcankavak</p>
            </div>
            <ArrowUpRight size={18} className="ml-auto text-faint transition-colors group-hover:text-accent" />
          </motion.a>

          <motion.div
            {...fadeUp(0.18)}
            className="flex items-center gap-4 rounded-2xl border border-line bg-bg-1 p-6 sm:col-span-2"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <MapPin size={22} />
            </span>
            <div>
              <p className="text-xs tracking-wide text-faint uppercase">Konum</p>
              <p className="font-medium">Türkiye · Uzaktan çalışmaya açık</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line py-20">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2 {...fadeUp()} className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Birlikte bir şeyler <span className="text-accent">inşa edelim</span>.
        </motion.h2>
        <motion.a
          {...fadeUp(0.1)}
          href="mailto:mckavak10@gmail.com"
          className="btn-accent mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          Mesaj Gönder <ArrowRight size={16} />
        </motion.a>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Mehmet Can Kavak</p>
          <a href="https://github.com/mehmetcankavak" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
            <SiGithub size={20} />
          </a>
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
