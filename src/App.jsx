import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail, ArrowUpRight, ChevronDown,
  Server, Cloud, Terminal, Code2, Database, Boxes,
} from 'lucide-react'

function Github({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

const NAV = [
  { href: '#work', label: 'Çalışmalar' },
  { href: '#skills', label: 'Yetenekler' },
  { href: '#contact', label: 'İletişim' },
]

const WORK = [
  {
    n: '01',
    tag: 'Backend',
    title: 'Gerçek Zamanlı Trading Motoru',
    detail:
      'FastAPI + asyncpg üzerinde kurulu backend. Binance, OKX, Bybit ve Hyperliquid için websocket fiyat akışları; haber-varlık eşleştirme (entity resolution) motoru; risk kuralları ve portföy takibi.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
  {
    n: '02',
    tag: 'Frontend',
    title: 'Web ve iOS Arayüzü',
    detail:
      'React + Vite ile hızlı, gerçek zamanlı bir trading terminali arayüzü. Capacitor ile iOS native uygulamaya paketlendi.',
    tech: ['React', 'Vite', 'TanStack Query', 'Capacitor'],
  },
  {
    n: '03',
    tag: 'DevOps',
    title: 'AWS Altyapısı — Sıfırdan Kurulum',
    detail:
      'Production Railway üzerinde; paralel bir AWS ortamı EC2 + RDS + ElastiCache üzerine, tamamen Terraform ile kod olarak tanımlı. GitHub Actions ile OIDC tabanlı CI/CD (secret veya SSH gerektirmeden SSM üzerinden deploy). CloudWatch ile metrik, log ve alarm.',
    tech: ['Terraform', 'GitHub Actions', 'CloudWatch', 'Docker'],
  },
]

const WHAT_I_DO = [
  {
    icon: Server,
    title: 'Backend Geliştirme',
    detail: 'Python/FastAPI ile API tasarımı, veritabanı modelleme, gerçek zamanlı veri akışları.',
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud Altyapı',
    detail: 'AWS üzerinde CI/CD pipeline kurulumu, Infrastructure as Code (Terraform), container orkestrasyon, izleme/alarm sistemleri.',
  },
  {
    icon: Terminal,
    title: 'Sürekli Öğrenme',
    detail: 'Yazılım mühendisliği son sınıf öğrencisiyim — her projeyi DevOps pratiklerini derinleştirmek için bir fırsat olarak kullanıyorum.',
  },
]

const SKILLS = [
  {
    category: 'Backend',
    icon: Database,
    items: ['Python', 'FastAPI', 'asyncpg', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'Frontend',
    icon: Code2,
    items: ['React', 'Vite', 'TanStack Query', 'TailwindCSS'],
  },
  {
    category: 'DevOps / Cloud',
    icon: Boxes,
    items: ['AWS (EC2, RDS, ECR, IAM)', 'Terraform', 'Docker', 'GitHub Actions', 'CloudWatch'],
  },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function Section({ id, eyebrow, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-6 py-24 sm:py-32 ${className}`}>
      {eyebrow && (
        <motion.p {...fadeUp()} className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
          {eyebrow}
        </motion.p>
      )}
      {children}
    </section>
  )
}

function App() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute inset-x-0 top-0 h-[600px]" />

      <header className="fixed top-0 right-0 left-0 z-20 border-b border-line bg-bg-0/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-sm font-medium">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Mehmet Can Kavak
          </a>
          <ul className="flex gap-7 text-sm text-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="relative">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-44 pb-28 sm:pt-56 sm:pb-36">
          <motion.p {...fadeUp()} className="mb-6 flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Merhaba, ben Mehmet Can — Türkiye merkezli
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-7xl"
          >
            Backend Geliştiriyor,
            <br />
            <span className="text-accent">DevOps'a</span> Geçiyorum.
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-8 max-w-xl text-lg text-muted">
            Yazılım mühendisliği son sınıf öğrencisi. Gerçek bir projeyi (CryptoTerminal)
            production'a taşıyıp, üzerine CI/CD, Terraform ve cloud izleme kurarak
            DevOps'u pratikte öğreniyorum.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-10 flex items-center gap-6">
            <a
              href="#work"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg-0 transition-opacity hover:opacity-90"
            >
              Çalışmalarımı Gör
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              İletişime geç →
            </a>
          </motion.div>
        </section>

        {/* Work */}
        <Section id="work" eyebrow="Çalışmalar">
          <motion.h2 {...fadeUp()} className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            CryptoTerminal
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="mt-3 max-w-2xl text-muted">
            Haber odaklı, gerçek zamanlı bir kripto trading terminali — üç farklı katmanda
            gerçek mühendislik problemleri çözüldü.
          </motion.p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {WORK.map((w, i) => (
              <motion.div
                key={w.n}
                {...fadeUp(0.1 * i)}
                className="flex flex-col rounded-2xl border border-line bg-bg-2/60 p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-2xl font-bold text-accent">{w.n}</span>
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-faint">
                    {w.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {w.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.2)} className="mt-8 flex gap-6 text-sm">
            <a
              href="https://github.com/mehmetcankavak/TerminalProject"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent"
            >
              <Github size={16} /> Kaynak Kod <ArrowUpRight size={14} />
            </a>
            <a
              href="https://cryptoterminal-production.up.railway.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent"
            >
              Canlı Demo <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </Section>

        <div className="mx-auto h-px max-w-5xl bg-line" />

        {/* What I do */}
        <Section eyebrow="Neler Yapıyorum">
          <div className="divide-y divide-line border-t border-b border-line">
            {WHAT_I_DO.map((item, i) => {
              const Icon = item.icon
              const open = openIdx === i
              return (
                <div key={item.title}>
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={20} className="text-accent" />
                      <span className="text-lg font-medium">{item.title}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-faint transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="max-w-2xl pb-6 text-muted"
                    >
                      {item.detail}
                    </motion.p>
                  )}
                </div>
              )
            })}
          </div>
        </Section>

        <div className="mx-auto h-px max-w-5xl bg-line" />

        {/* Skills */}
        <Section id="skills" eyebrow="Yetenekler">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {SKILLS.map((s, i) => {
              const Icon = s.category === 'Backend' ? Database : s.category === 'Frontend' ? Code2 : Boxes
              return (
                <motion.div
                  key={s.category}
                  {...fadeUp(0.1 * i)}
                  className="rounded-2xl border border-line bg-bg-2/60 p-6"
                >
                  <div className="flex items-center gap-2.5 text-accent">
                    <Icon size={18} />
                    <h3 className="font-semibold text-ink">{s.category}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-md border border-line-soft bg-white/5 px-2.5 py-1 text-xs text-muted"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Section>

        <div className="mx-auto h-px max-w-5xl bg-line" />

        {/* Contact */}
        <Section id="contact" eyebrow="İletişim" className="pb-40">
          <motion.h2 {...fadeUp()} className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Bir proje konuşalım.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-4 max-w-md text-muted">
            Staj, iş birliği veya sadece merhaba demek için bana ulaşabilirsin.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-xl">
            <motion.a
              {...fadeUp(0.15)}
              href="mailto:mckavak10@gmail.com"
              className="flex items-center gap-3 rounded-2xl border border-line bg-bg-2/60 p-5 transition-colors hover:border-accent/40"
            >
              <Mail size={18} className="text-accent" />
              <div>
                <p className="text-xs text-faint">E-posta</p>
                <p className="text-sm font-medium">mckavak10@gmail.com</p>
              </div>
            </motion.a>
            <motion.a
              {...fadeUp(0.2)}
              href="https://github.com/mehmetcankavak"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-line bg-bg-2/60 p-5 transition-colors hover:border-accent/40"
            >
              <Github size={18} className="text-accent" />
              <div>
                <p className="text-xs text-faint">GitHub</p>
                <p className="text-sm font-medium">mehmetcankavak</p>
              </div>
            </motion.a>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} Mehmet Can Kavak</p>
          <a
            href="https://github.com/mehmetcankavak"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            <Github size={18} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
