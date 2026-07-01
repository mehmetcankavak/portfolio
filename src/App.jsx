const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

const PROJECT = {
  name: 'CryptoTerminal',
  period: '2026',
  summary:
    'Haber odaklı, gerçek zamanlı bir kripto trading terminali — web, iOS ve CLI olarak çalışır.',
  facets: [
    {
      title: 'Uygulama',
      detail:
        'FastAPI + asyncpg backend; Binance, OKX, Bybit ve Hyperliquid için websocket fiyat akışları; haber-varlık eşleştirme (entity resolution) motoru; risk kuralları ve portföy takibi; JWT + Google OAuth.',
    },
    {
      title: 'Altyapı',
      detail:
        'Production Railway üzerinde. Paralel bir AWS ortamı: EC2 + RDS + ElastiCache, Terraform ile tamamen kod olarak tanımlı altyapı, GitHub Actions ile OIDC tabanlı CI/CD (SSH veya secret gerektirmeden SSM üzerinden deploy), CloudWatch ile metrik/log/alarm.',
    },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/mehmetcankavak/TerminalProject' },
    { label: 'Canlı (Railway)', href: 'https://cryptoterminal-production.up.railway.app' },
  ],
}

const STACK = [
  'Python', 'FastAPI', 'PostgreSQL', 'Redis',
  'React', 'Vite',
  'Docker', 'AWS (EC2, RDS, ECR, IAM, CloudWatch)',
  'Terraform', 'GitHub Actions',
]

function Section({ id, eyebrow, children, className = '' }) {
  return (
    <section id={id} className={`mx-auto max-w-3xl px-6 py-20 sm:py-28 ${className}`}>
      {eyebrow && (
        <p className="mb-8 text-sm tracking-widest text-muted uppercase">{eyebrow}</p>
      )}
      {children}
    </section>
  )
}

function App() {
  return (
    <div>
      <header className="fixed top-0 right-0 left-0 z-10 border-b border-line bg-paper/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-sm font-medium">
            Mehmet Can Kavak
          </a>
          <ul className="flex gap-6 text-sm text-muted">
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

      <main id="top">
        {/* Hero */}
        <Section className="pt-40 sm:pt-48">
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
            Mehmet Can Kavak
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Yazılım mühendisliği son sınıf öğrencisi. Backend geliştirme üzerine
            çalışıyor, DevOps'a doğru ilerliyorum — CI/CD, Infrastructure as Code
            ve cloud altyapı ile.
          </p>
        </Section>

        <div className="mx-auto h-px max-w-3xl bg-line" />

        {/* Work */}
        <Section id="work" eyebrow="Çalışma">
          <div className="border-t border-line">
            <div className="grid grid-cols-1 gap-8 border-b border-line py-10 sm:grid-cols-[1fr_2fr]">
              <div>
                <h2 className="text-xl font-semibold">{PROJECT.name}</h2>
                <p className="mt-1 text-sm text-muted">{PROJECT.period}</p>
              </div>

              <div>
                <p className="text-ink">{PROJECT.summary}</p>

                <dl className="mt-6 space-y-5">
                  {PROJECT.facets.map((f) => (
                    <div key={f.title}>
                      <dt className="text-sm font-medium text-muted">{f.title}</dt>
                      <dd className="mt-1 leading-relaxed text-ink">{f.detail}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex gap-5 text-sm">
                  {PROJECT.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <div className="mx-auto h-px max-w-3xl bg-line" />

        {/* Stack */}
        <Section id="stack" eyebrow="Teknolojiler">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {STACK.map((s) => (
              <li key={s} className="text-ink">
                {s}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mx-auto h-px max-w-3xl bg-line" />

        {/* Contact */}
        <Section id="contact" eyebrow="İletişim" className="pb-32">
          <p className="max-w-md text-lg">
            Bir proje konuşmak veya sadece merhaba demek için:
          </p>
          <a
            href="mailto:mckavak10@gmail.com"
            className="mt-4 inline-block text-2xl font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            mckavak10@gmail.com
          </a>
          <p className="mt-8 text-sm text-muted">
            <a href="https://github.com/mehmetcankavak" target="_blank" rel="noreferrer" className="hover:text-ink">
              GitHub
            </a>
          </p>
        </Section>
      </main>

      <footer className="border-t border-line px-6 py-8">
        <p className="mx-auto max-w-3xl text-sm text-muted">
          © {new Date().getFullYear()} Mehmet Can Kavak
        </p>
      </footer>
    </div>
  )
}

export default App
