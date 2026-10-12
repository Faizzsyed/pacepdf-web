import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Minimize2,
  ArrowRight,
  Menu,
  X,
  Sun,
  Moon,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Expand,
  Globe,
  Code2,
  BriefcaseBusiness,
  Check,
} from 'lucide-react';
import { product, navigation } from './config';
import { previews } from './content';

export function Brand({ inverse = false }) {
  return (
    <a className={`brand ${inverse ? 'brand-inverse' : ''}`} href="#home" aria-label="PacePDF home">
      <img src="/assets/pacepdf-logo.webp" width="38" height="38" alt="" />
      <span>
        Pace<span className="brand-red">PDF</span>
      </span>
    </a>
  );
}

export function Availability({ compact = false, className = '' }) {
  if (product.playUrl)
    return (
      <a
        className={`button button-primary ${className}`}
        href={product.playUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Smartphone size={18} />
        Get it on Google Play
        <ArrowUpRight size={17} />
      </a>
    );
  return (
    <a className={`button button-primary ${className}`} href="#availability">
      <Smartphone size={18} />
      {compact ? 'Closed Testing' : product.availability}
      <ArrowUpRight size={17} />
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [dark, setDark] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === 'dark');
    sync();
    const media = matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      let saved;
      try {
        saved = localStorage.getItem('pacepdf-theme');
      } catch {
        /* Theme still works without storage. */
      }
      if (!saved) document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
      sync();
    };
    media.addEventListener('change', listener);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );
    navigation.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      observer.disconnect();
      media.removeEventListener('change', listener);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector('a')?.focus();
    const key = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll('a')];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const desktop = matchMedia('(min-width: 960px)');
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', resize);
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', key);
      desktop.removeEventListener('change', resize);
    };
  }, [open]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('pacepdf-theme', next ? 'dark' : 'light');
    } catch {
      /* No persistence in restricted browsers. */
    }
  };
  const links = navigation.map(([id, label]) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? 'location' : undefined}
      onClick={() => {
        setActive(id);
        setOpen(false);
      }}
    >
      {label}
    </a>
  ));

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Sun size={19} className="sun-icon" />
            <Moon size={19} className="moon-icon" />
          </button>
          <div className="nav-cta">
            <Availability compact />
          </div>
          <button
            ref={toggleRef}
            className="icon-button menu-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <>
        {open && (
          <motion.nav
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            {links}
            <Availability compact />
          </motion.nav>
        )}
      </>
    </header>
  );
}

export function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.07 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduced]);
  // Content is always visible in server HTML and when JavaScript or motion is disabled.
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-heading ${centered ? 'centered' : ''}`}>
      <span className="eyebrow">
        <span className="tiny-line" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Phone({ screen = 'home', eager = false, className = '' }) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-camera" aria-hidden="true" />
      <img
        src={`/previews/${screen}.svg`}
        width="360"
        height="760"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        alt={`PacePDF ${screen} illustrative interface preview, not an app screenshot`}
      />
      <div className="phone-home" aria-hidden="true" />
    </div>
  );
}

export function ScreenshotGallery() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const track = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const active = previews[index];

  useEffect(() => {
    if (expanded) dialogRef.current?.showModal();
    else if (dialogRef.current?.open) dialogRef.current.close();
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      triggerRef.current?.focus();
    };
  }, [expanded]);

  const move = (next) => {
    const i = Math.max(0, Math.min(previews.length - 1, next));
    const card = track.current?.children[i];
    track.current?.scrollTo({
      left: card.offsetLeft - track.current.offsetLeft,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
    setIndex(i);
  };

  return (
    <>
      <div className="gallery-top">
        <SectionHeading
          eyebrow="A CLOSER LOOK"
          title={
            <>
              A little less friction.
              <br />A lot more flow.
            </>
          }
          description="A focused Android experience, from the first page to the final file."
        />
        <div className="gallery-controls">
          <button
            className="icon-button"
            aria-label="Previous app preview"
            disabled={index === 0}
            onClick={() => move(index - 1)}
          >
            <ChevronLeft />
          </button>
          <button
            className="icon-button"
            aria-label="Next app preview"
            disabled={index === previews.length - 1}
            onClick={() => move(index + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <p className="preview-disclosure">
        <span className="status-dot" />
        Illustrative interface previews · Actual app screenshots to be added.
      </p>
      <div
        className="gallery-track"
        ref={track}
        tabIndex="0"
        role="region"
        aria-roledescription="carousel"
        aria-label="PacePDF interface previews"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            move(index + 1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            move(index - 1);
          }
        }}
      >
        {previews.map((screen, i) => (
          <figure
            className="gallery-card"
            key={screen.id}
            aria-label={`${i + 1} of ${previews.length}: ${screen.label}`}
          >
            <button
              className="preview-button"
              aria-label={`Enlarge ${screen.label} illustrative preview (0${i + 1})`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setExpanded(screen);
              }}
            >
              <div className="gallery-stage">
                <span className="stage-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <Phone screen={screen.id} />
                <span className="expand-badge">
                  <Expand size={17} />
                </span>
              </div>
            </button>
            <figcaption>
              <span className="gallery-label">{screen.label}</span>
              <h3>{screen.title}</h3>
              <p>{screen.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-bottom">
        <div className="gallery-dots">
          {previews.map((screen, i) => (
            <button
              key={screen.id}
              aria-label={`Go to ${screen.label} preview`}
              aria-pressed={index === i}
              className={index === i ? 'selected' : ''}
              onClick={() => move(i)}
            />
          ))}
        </div>
        <span className="sr-only" aria-live="polite">
          {active.label} preview, {index + 1} of {previews.length}
        </span>
        <span className="gallery-count" aria-hidden="true">
          0{index + 1} / 0{previews.length}
        </span>
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby="preview-title"
        onCancel={() => setExpanded(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setExpanded(null);
        }}
        onClose={() => setExpanded(null)}
      >
        {expanded && (
          <div className="lightbox-content">
            <button
              className="icon-button lightbox-close"
              aria-label="Close preview"
              onClick={() => setExpanded(null)}
              autoFocus
            >
              <X />
            </button>
            <h3 id="preview-title">{expanded.label}</h3>
            <p>Illustrative preview · Not an app capture</p>
            <Phone screen={expanded.id} />
          </div>
        )}
      </dialog>
    </>
  );
}

export function DeveloperCard({ developer }) {
  const icons = { website: Globe, github: Code2, linkedin: BriefcaseBusiness };
  return (
    <article className="developer-card">
      <div className="developer-top">
        <div className="developer-avatar" aria-hidden="true">
          {developer.initials}
          <span className="avatar-mark">
            <CodeMark />
          </span>
        </div>
        <span className="developer-badge">THE PEOPLE BEHIND PACEPDF</span>
      </div>
      <h3>{developer.name}</h3>
      <span className="developer-role">{developer.role}</span>
      <p>{developer.description}</p>
      <div className="developer-links">
        {developer.links.map((link) => {
          const Icon = icons[link.icon];
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${developer.name} ${link.label} (opens in a new tab)`}
            >
              <Icon size={16} />
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          );
        })}
      </div>
    </article>
  );
}

function CodeMark() {
  return <span>&lt;/&gt;</span>;
}

export function PaperGraphic({ variant = 'read' }) {
  return (
    <div className={`paper-graphic paper-${variant}`} aria-hidden="true">
      <div className="mini-paper">
        <span className="paper-kicker">PACE / DOCUMENTS</span>
        <span className="paper-title">A fresh perspective.</span>
        <div className="paper-rule" />
        <div className="paper-lines">
          <i />
          <i />
          <i />
          <i />
        </div>
        {variant === 'edit' ? (
          <span className="paper-signature">Your signature</span>
        ) : (
          <div className="paper-block" />
        )}
        <span className="paper-number">01</span>
      </div>
      {variant === 'files' && (
        <div className="graphic-chip">
          <Check size={14} />
          Everything in order
        </div>
      )}
      {variant === 'compress' && (
        <div className="graphic-chip">
          <Minimize2 size={14} />
          Ready to share
        </div>
      )}
      {variant === 'convert' && (
        <span className="format-chip">
          JPG <ArrowRight size={14} /> PDF
        </span>
      )}
      {variant === 'share' && (
        <div className="graphic-chip">
          <Check size={14} />
          Your next step
        </div>
      )}
    </div>
  );
}
