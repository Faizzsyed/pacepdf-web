import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Combine,
  Minimize2,
  PenLine,
  Smartphone,
  Check,
  ChevronDown,
  Code2,
  Heart,
  Layers,
} from 'lucide-react';
import {
  Header,
  Brand,
  Availability,
  Reveal,
  SectionHeading,
  Phone,
  ScreenshotGallery,
  DeveloperCard,
  PaperGraphic,
} from './components';
import { product, navigation, developers } from './config';
import { tools, essentials, benefits, faqs } from './content';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span className="status-dot" />
            {product.availability}
          </span>
          <h1>
            Everything You
            <br className="desktop-break" /> Need for PDFs.
            <br />
            <span>All in One Place.</span>
          </h1>
          <p className="hero-description">
            PacePDF brings powerful PDF tools together in a simple Android app. Read, merge, split,
            compress, organize, sign and manage your documents with ease.
          </p>
          <div className="hero-actions">
            <Availability />
            <a className="text-link" href="#features">
              Explore features
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <Smartphone size={16} />
              Made for Android
            </span>
            <span className="meta-divider" />
            <span>Built with Flutter. Made for real life.</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" aria-hidden="true" />
          <div className="hero-orbit orbit-two" aria-hidden="true" />
          <div className="hero-halo" aria-hidden="true" />
          <div className="hero-phone">
            <Phone eager />
            <span className="hero-preview-caption">Illustrative interface preview</span>
          </div>
          <div className="floating-card float-merge" aria-hidden="true">
            <span className="float-icon">
              <Combine size={21} />
            </span>
            <div>
              <strong>Bring it together.</strong>
              <span>Merge your PDFs</span>
            </div>
            <Check size={15} className="float-check" />
          </div>
          <div className="floating-card float-sign" aria-hidden="true">
            <span className="float-icon">
              <PenLine size={20} />
            </span>
            <div>
              <strong>Make it official.</strong>
              <span>Add your signature</span>
            </div>
          </div>
          <div className="floating-label" aria-hidden="true">
            <span className="label-icon">
              <Minimize2 size={18} />
            </span>
            Smaller files. Same focus.
          </div>
          <span className="visual-note" aria-hidden="true">
            LESS FRICTION.
            <br />
            MORE POSSIBILITIES.
          </span>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>YOUR DOCUMENTS. YOUR PACE.</span>
        <div>
          <span>
            <BookOpen size={17} />
            Read
          </span>
          <span>
            <Layers size={17} />
            Organize
          </span>
          <span>
            <PenLine size={17} />
            Sign
          </span>
          <span>
            <ArrowUpRight size={17} />
            Share
          </span>
        </div>
        <a href="#overview" aria-label="Discover PacePDF product overview">
          <ArrowRight size={19} />
        </a>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section id="overview" className="section overview-section">
      <div className="container">
        <Reveal>
          <div className="overview-heading">
            <SectionHeading
              eyebrow="MEET PACEPDF"
              title={
                <>
                  One App.
                  <br />
                  All Your PDF Essentials.
                </>
              }
            />
            <p>
              For the files that fill your day.
              <br />
              The notes, the forms, the projects.
              <br />
              <span>One thoughtful app to keep them moving.</span>
            </p>
          </div>
        </Reveal>
        <div className="essentials-grid">
          {essentials.map((item) => (
            <Reveal key={item.title}>
              <article className="essential-card">
                <div className="essential-top">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  <ArrowUpRight size={17} />
                </div>
                <PaperGraphic variant={item.visual} />
                <div className="essential-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [filter, setFilter] = useState('All tools');
  const visible = filter === 'All tools' ? tools : tools.filter((tool) => tool.category === filter);
  return (
    <section id="features" className="section features-section">
      <div className="container">
        <Reveal>
          <div className="feature-heading">
            <SectionHeading
              eyebrow="A TOOL FOR EVERY NEXT STEP"
              title={
                <>
                  Your PDFs.
                  <br />
                  <span className="muted-heading">Handled.</span>
                </>
              }
              description="From a quick read to a final signature. Find the tool you need, right when you need it."
            />
            <div className="feature-side-note">
              <span className="little-brand">
                <img src="/assets/pacepdf-logo.webp" width="44" height="44" loading="lazy" alt="" />
              </span>
              <p>
                Built around the document.
                <br />
                <strong>Designed around you.</strong>
              </p>
            </div>
          </div>
        </Reveal>
        <div className="tool-filters" aria-label="Filter PDF tools">
          {['All tools', 'Read & manage', 'Edit', 'Organize', 'Convert', 'Create'].map((label) => (
            <button
              key={label}
              aria-pressed={filter === label}
              className={filter === label ? 'active' : ''}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="tools-grid">
          {visible.map((tool) => (
            <article key={tool.name} className="tool-card">
              <span className="tool-icon">
                <tool.icon size={24} strokeWidth={1.6} />
              </span>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              {tool.note && <span className="tool-note">{tool.note}</span>}
            </article>
          ))}
        </div>
        <p className="tools-footnote">
          <span className="status-dot" />
          Tools shown are implemented in the current app. OCR is coming soon.
        </p>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="section why-section">
      <div className="container why-grid">
        <Reveal>
          <div className="why-intro">
            <span className="eyebrow">
              <span className="tiny-line" />
              THOUGHTFULLY PRACTICAL
            </span>
            <h2>
              Built to Make
              <br />
              PDFs Simpler.
            </h2>
            <p>
              Good tools should let you get on with your day. That’s the idea behind every part of
              PacePDF.
            </p>
            <div className="why-art" aria-hidden="true">
              <span className="why-art-word">
                Less
                <br />
                <em>busywork.</em>
              </span>
              <div className="why-art-paper">
                <PaperGraphic />
              </div>
              <span className="why-art-footer">MORE ROOM FOR WHAT MATTERS.</span>
            </div>
          </div>
        </Reveal>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <Reveal key={benefit.title}>
              <article className="benefit">
                <span className="benefit-icon">
                  <benefit.icon size={23} strokeWidth={1.6} />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <Reveal>
          <div className="story-grid">
            <div>
              <span className="eyebrow">
                <span className="tiny-line" />
                THE STORY SO FAR
              </span>
              <h2>
                From an Idea
                <br />
                to a Real
                <br />
                <span className="red-text">Android App.</span>
              </h2>
              <div className="story-stack">
                <span className="stack-dot" />
                Flutter<span>+</span>Native Android<span>+</span>Careful iteration
              </div>
            </div>
            <div className="story-copy">
              <p className="story-lead">
                A PDF app sounds simple.
                <br />
                Making it feel simple takes work.
              </p>
              <p>
                PacePDF grew from a practical idea: reading a document and working on it should feel
                like one continuous flow.
              </p>
              <p>
                Behind that flow are the details—getting PDF pages to render correctly, handling
                Android storage and file permissions, and connecting Flutter screens to native
                document tools.
              </p>
              <p>
                We keep working on the parts you feel: opening files, responsive previews, efficient
                processing and carrying a document from one tool to the next. Device testing,
                performance checks and small refinements are part of the process.
              </p>
              <span className="story-signoff">
                Still building. Still improving. One document at a time.
              </span>
            </div>
          </div>
        </Reveal>
        <div className="developer-section">
          <Reveal>
            <SectionHeading
              eyebrow="MEET THE DEVELOPERS"
              title="Two creators. One shared idea."
              description="PacePDF is co-created by Isa Shaikh and Faiz Sayyed."
            />
          </Reveal>
          <div className="developers-grid">
            {developers.map((developer) => (
              <Reveal key={developer.name}>
                <DeveloperCard developer={developer} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-grid">
        <Reveal>
          <SectionHeading
            eyebrow="A FEW THINGS TO KNOW"
            title={
              <>
                Good questions.
                <br />
                Clear answers.
              </>
            }
            description="The essentials about PacePDF, its tools and where things stand today."
          />
          <a
            className="text-link faq-policy"
            href={product.privacyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the existing privacy policy
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
        <div className="faq-list">
          {faqs.map(([question, answer], i) => (
            <details className="faq-item" key={question}>
              <summary>
                <span className="faq-number">0{i + 1}</span>
                <h3>{question}</h3>
                <ChevronDown size={19} />
              </summary>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="availability" className="availability-section">
      <div className="container">
        <Reveal>
          <div className="cta-panel">
            <div className="cta-copy">
              <span className="eyebrow">
                <Smartphone size={16} />
                PACEPDF FOR ANDROID
              </span>
              <h2>
                Your PDFs.
                <br />
                <span>Simplified.</span>
              </h2>
              <p>
                Your everyday PDF toolkit is ready to download.
                <br />
                Available on Google Play for Android.
              </p>
              <div className="cta-status">
                <span className="status-dot" />
                {product.availability}
              </div>
              <Availability />
              <span className="cta-footnote">Download PacePDF for Android from Google Play.</span>
            </div>
            <div className="cta-art">
              <div className="cta-ring" aria-hidden="true" />
              <Phone screen="tools" />
              <span className="cta-preview-caption">Illustrative interface preview</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              Everyday PDF tools.
              <br />
              One thoughtful Android app.
            </p>
            <span className="footer-android">
              <Smartphone size={14} />
              Made for Android
            </span>
          </div>
          <nav aria-label="Footer navigation">
            <span className="footer-label">EXPLORE</span>
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="footer-people">
            <span className="footer-label">THE DEVELOPERS</span>
            <a href="https://isa-shaikh-app.web.app/" target="_blank" rel="noopener noreferrer">
              Isa Shaikh
              <ArrowUpRight size={14} />
            </a>
            <a href="https://faizsayyed.vercel.app/" target="_blank" rel="noopener noreferrer">
              Faiz Sayyed
              <ArrowUpRight size={14} />
            </a>
            <a href="https://github.com/Faizzsyed" target="_blank" rel="noopener noreferrer">
              <Code2 size={14} />
              Faiz’s GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-info">
            <span className="footer-label">GOOD TO KNOW</span>
            <a href={product.privacyUrl} target="_blank" rel="noopener noreferrer">
              Privacy Policy
              <ArrowUpRight size={14} />
            </a>
            <a href={product.contactUrl}>
              Contact
              <ArrowUpRight size={14} />
            </a>
            <a href={product.playUrl} target="_blank" rel="noopener noreferrer">
              Get it on Google Play
              <ArrowUpRight size={14} />
            </a>
            <span>OCR · Coming soon</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PacePDF. All rights reserved.</span>
          <span>
            Built by Isa Shaikh &amp; Faiz Sayyed
            <Heart size={13} />
          </span>
          <a href="#home">
            Back to top
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Overview />
        <Features />
        <section id="screenshots" className="section screenshots-section">
          <div className="container">
            <ScreenshotGallery />
          </div>
        </section>
        <Why />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </MotionConfig>
  );
}
