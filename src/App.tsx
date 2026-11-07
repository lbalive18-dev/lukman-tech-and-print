import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { business, generalEnquiry, whatsappLink } from './config/business'
import { portfolio } from './data/portfolio'
import { services } from './data/services'

const categories = ['All', ...Array.from(new Set(portfolio.map((item) => item.category)))]

function ContactLink({ message = generalEnquiry, children, className = 'button button-primary' }: { message?: string; children: ReactNode; className?: string }) {
  return <a className={className} href={whatsappLink(message)} target="_blank" rel="noreferrer">{children}</a>
}

function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let completed = false
    const finish = () => {
      if (completed) return
      completed = true
      sessionStorage.setItem('ltp-intro-seen', 'yes')
      setVisible(false)
      window.setTimeout(onDone, reduced ? 0 : 500)
    }
    if (sessionStorage.getItem('ltp-intro-seen') === 'yes' || reduced) { onDone(); return }
    setVisible(true)
    const timer = window.setTimeout(finish, 3900)
    return () => window.clearTimeout(timer)
  }, [onDone])
  if (!visible) return null
  return <div className="intro" role="dialog" aria-label="Lukman Tech and Print introduction">
    <div className="intro-glow" />
    <img className="intro-image" src="/images/cinematic-intro.webp" alt="Professional printing equipment at work" onError={(event) => { event.currentTarget.style.display = 'none' }} />
    <div className="intro-content"><span className="intro-logo-panel"><img src="/images/lukman-tech-logo.png" alt="Lukman Tech & Print official logo" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} /></span><span className="eyebrow">YOUR IDEAS, MADE VISIBLE</span><h1>{business.name}</h1><p>{business.tagline}</p><span className="intro-rule" /></div>
    <button className="skip-intro" onClick={() => { sessionStorage.setItem('ltp-intro-seen', 'yes'); setVisible(false); onDone() }}>Skip intro <span aria-hidden="true">→</span></button>
  </div>
}

function App() {
  const [introDone, setIntroDone] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const filteredPortfolio = filter === 'All' ? portfolio : portfolio.filter((item) => item.category === filter)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.title = 'Lukman Tech & Print | Printing, Design & Digital Solutions in Uganda'
    if (business.domain) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
      canonical.href = business.domain
    }
  }, [])

  const nav = [['Home', '#home'], ['Services', '#services'], ['About', '#about'], ['Our work', '#work'], ['Contact', '#contact']]
  return <>
    {!introDone && <Intro onDone={() => setIntroDone(true)} />}
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="Lukman Tech and Print home"><img className="brand-logo" src="/images/lukman-tech-logo.png" alt="Lukman Tech & Print" /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<ContactLink message="Hello Lukman Tech & Print. I would like to request a quotation. Kindly let me know what information you need." className="button button-small">Request a Quotation <span aria-hidden="true">↗</span></ContactLink></nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-copy"><span className="eyebrow eyebrow-light"><i /> PRINT · DESIGN · DIGITAL</span><h1>Ideas deserve to be seen.<br /><em>We bring them to life.</em></h1><p>From professional printing and creative design to modern digital solutions, we help individuals, businesses and institutions bring their ideas to life.</p><div className="hero-actions"><a className="button button-light" href="#services">Explore our services <span>↘</span></a><ContactLink className="button button-outline">Chat with Us <span>↗</span></ContactLink></div><div className="hero-foot"><span><b>01</b> &nbsp; Thoughtful service</span><span className="hero-line" /><span>Across Uganda</span></div></div>
        <div className="hero-visual"><div className="hero-photo-wrap"><img src="/images/hero-printing.webp" alt="Large digital printing equipment processing paper" fetchPriority="high" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} /><div className="hero-logo-panel"><img src="/images/lukman-tech-logo.png" alt="Lukman Tech & Print official logo" /></div><div className="photo-label"><span className="label-mark">L.</span><span>Good ideas<br /><b>deserve good print.</b></span></div></div><div className="hero-orbit" /><span className="hero-index">LTP — 001 / STUDIO</span></div>
        <a className="scroll-cue" href="#services"><span /> Scroll to explore</a>
      </section>

      <section className="trust-strip"><p>CREATIVE THINKING. QUALITY FINISHES. PRACTICAL TECHNOLOGY.</p><span>For people, businesses & institutions</span></section>

      <section className="section services-section" id="services"><div className="section-heading"><div><span className="eyebrow">WHAT WE DO</span><h2>One partner.<br /><em>Many ways forward.</em></h2></div><p>From the first draft to the final print, we bring creative and practical services together to make getting things done easier.</p></div>
        {['Printing & documentation', 'Graphic design & creative', 'Technology & digital'].map((category) => <div className="service-group" key={category}><div className="group-heading"><h3>{category}</h3><span>{String(services.filter((service) => service.category === category).length).padStart(2, '0')} services</span></div><div className="service-grid">{services.filter((service) => service.category === category).map((service, index) => <article className="service-card" key={service.title}><div className="service-photos" style={{ '--photo-count': service.photos.length } as CSSProperties}>{service.photos.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />)}</div><div className="service-card-top"><span className="service-icon" aria-hidden="true">{service.icon}</span><span className="card-index">0{index + 1}</span></div><h4>{service.title}</h4><p>{service.description}</p><ContactLink message={`Hello Lukman Tech & Print. I am interested in your ${service.title.toLowerCase()} service. Kindly provide more information and a quotation.`} className="text-link">Enquire About This Service <span>↗</span></ContactLink></article>)}</div></div>)}
      </section>

      <section className="why-section"><div className="why-image"><img src="/images/why-team.webp" alt="Small team collaborating on a creative project" loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} /><span className="image-caption">GOOD WORK STARTS WITH A CONVERSATION</span></div><div className="why-copy"><span className="eyebrow eyebrow-light">A PARTNER IN YOUR CORNER</span><h2>Thoughtful work.<br /><em>Made with purpose.</em></h2><p>Every project matters. We bring care to the details, clear communication to the process and a practical mindset to the work we do.</p><div className="value-list"><div><span>01</span><p><b>Quality in every detail</b><br />Careful work from first conversation to final handover.</p></div><div><span>02</span><p><b>Clear, reliable service</b><br />Helpful communication and a process you can understand.</p></div><div><span>03</span><p><b>Solutions that fit</b><br />Creative and technology services shaped around your needs.</p></div></div><a className="button button-outline" href="#about">Get to know us <span>↗</span></a></div></section>

      <section className="section work-section" id="work"><div className="section-heading"><div><span className="eyebrow">A LITTLE INSPIRATION</span><h2>Ideas take <em>shape.</em></h2></div><p>Explore a few visual references for the work we can create together. These illustrative samples are stock imagery, not completed client projects.</p></div><div className="filters" aria-label="Filter portfolio samples">{categories.map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="portfolio-grid">{filteredPortfolio.map((item, index) => <button className={`portfolio-card portfolio-card-${index % 3}`} key={item.title} onClick={() => setActiveImage(item.image)} aria-label={`View illustrative sample: ${item.title}`}><img src={item.image} alt={item.alt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} /><span className="portfolio-overlay"><small>{item.category} · ILLUSTRATIVE SAMPLE</small><b>{item.title}</b><span className="portfolio-arrow">↗</span></span></button>)}</div></section>

      <section className="process-section"><div className="section-heading"><div><span className="eyebrow eyebrow-light">HOW IT WORKS</span><h2>Clear from<br /><em>the start.</em></h2></div><p>A straightforward process keeps your request moving. Tell us what you need and we’ll help you take the next step.</p></div><div className="process-steps"><article><span>01</span><h3>Tell us your idea</h3><p>Share the service you need, your goals and any useful details.</p></article><article><span>02</span><h3>Get a clear response</h3><p>We’ll discuss the options, timing and quotation for your request.</p></article><article><span>03</span><h3>Bring it to life</h3><p>Once the details are agreed, we get to work on your project.</p></article></div></section>

      <section className="about-section" id="about"><div className="about-stamp"><span>YOUR TECH<br />& PRINT<br /><b>PARTNER</b></span><i>✳</i></div><div className="about-copy"><span className="eyebrow">ABOUT LUKMAN TECH & PRINT</span><h2>Practical ideas.<br /><em>Meaningful impact.</em></h2><p className="about-lead">Lukman Tech & Print brings printing, creative design and technology services together to help people communicate, operate and grow.</p><div className="mission-vision"><div><span>OUR MISSION</span><p>To provide reliable, quality and accessible printing, design and technology solutions that help individuals, businesses and institutions communicate, operate and grow.</p></div><div><span>OUR VISION</span><p>To become a trusted printing and technology solutions partner serving individuals, businesses and institutions across Uganda.</p></div></div></div></section>

      <section className="contact-section" id="contact"><div className="contact-top"><div><span className="eyebrow eyebrow-light">LET’S MAKE IT HAPPEN</span><h2>What can we<br /><em>help you create?</em></h2></div><p>Tell us what you have in mind. We’re ready to discuss your next print, design or technology project.</p></div><div className="contact-bottom"><ContactLink className="button button-light button-large">WhatsApp Us <span>↗</span></ContactLink><div className="contact-details"><div><small>WHATSAPP</small><a href={whatsappLink(generalEnquiry)} target="_blank" rel="noreferrer">Chat with Us ↗</a></div><div><small>SERVICE COVERAGE</small><span>{business.coverage}</span></div></div></div><div className="contact-decoration" aria-hidden="true">L.</div></section>
    </main>

    <footer className="footer"><div className="footer-main"><a className="brand brand-footer" href="#home" aria-label="Lukman Tech and Print home"><span className="footer-logo-panel"><img src="/images/lukman-tech-logo.png" alt="Lukman Tech & Print" /></span></a><p>Creative thinking, quality print<br />and practical digital solutions.</p><div className="footer-links"><div><small>EXPLORE</small>{nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div><small>OUR SERVICES</small><a href="#services">Printing & documentation</a><a href="#services">Graphic design</a><a href="#services">Technology & digital</a></div></div><ContactLink>WhatsApp Us ↗</ContactLink></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}</span><span>{business.tagline}</span><span>{business.coverage}</span></div></footer>
    <a className="floating-wa" href={whatsappLink(generalEnquiry)} target="_blank" rel="noreferrer" aria-label="Chat with Us on WhatsApp"><span>◉</span> Chat with Us</a>
    {activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfolio image preview" onClick={() => setActiveImage(null)}><button aria-label="Close image preview" onClick={() => setActiveImage(null)}>×</button><img src={activeImage} alt="Illustrative portfolio sample" onClick={(event) => event.stopPropagation()} /></div>}
  </>
}

export default App
