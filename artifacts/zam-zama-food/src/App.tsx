import { useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import heroFood from '@assets/unnamed_1789221621263.webp';
import familyTable from '@assets/unnamed_(1)_1789221634345.webp';
import diningRoom from '@assets/unnamed_(2)_1789221638574.webp';
import familySpread from '@assets/unnamed_(5)_1789221642702.webp';
import interiorSignage from '@assets/unnamed_(6)_1789221657831.webp';
import menuPageOne from '@assets/images_(4)_1789221887851.jpg';
import menuPageTwo from '@assets/zamzama-foods-menu-1-e2kt7K2w_1789221883307.webp';
import menuPageThree from '@assets/images_(1)_1789221875124.jpg';
import menuPageFour from '@assets/images_(6)_1789221879178.jpg';
import storefront from '@assets/images_(3)_1789221892194.jpg';

const queryClient = new QueryClient();

type ImageItem = { src: string; alt: string; label: string };

const gallery: ImageItem[] = [
  { src: familyTable, alt: 'A family table with grilled food and fresh naan', label: 'Bring everyone' },
  { src: diningRoom, alt: 'Warm Zam Zama Food dining room', label: 'Settle in' },
  { src: familySpread, alt: 'A generous spread of burgers, fries and baked food', label: 'Share the table' },
  { src: interiorSignage, alt: 'Zam Zama Foods restaurant wall and signage', label: 'Made in Gulshan-e-Hadeed' },
  { src: storefront, alt: 'Zam Zama Foods storefront at night', label: 'Find us tonight' },
];

const menuPages = [menuPageOne, menuPageTwo, menuPageThree, menuPageFour];

const menuHighlights = [
  {
    title: 'Authentic Chicken',
    description: 'Crisp, juicy and seasoned all the way through.',
    price: 'From Rs 420',
    tag: 'The crowd pleaser',
    image: heroFood,
  },
  {
    title: 'BBQ & Grills',
    description: 'Seekh, tikka, boti — smoky plates for sharing.',
    price: 'From Rs 330',
    tag: 'On the grill',
    image: menuPageTwo,
  },
  {
    title: 'Burgers & Fries',
    description: 'Proper stacked burgers with the fries to match.',
    price: 'From Rs 330',
    tag: 'Always a good idea',
    image: familySpread,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  dark?: boolean;
}) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="section-title">{title}</h2>
      </div>
      {copy && <p className={`section-copy${dark ? ' section-copy--dark' : ''}`}>{copy}</p>}
    </div>
  );
}

function Modal({
  children,
  onClose,
  image = false,
}: {
  children: ReactNode;
  onClose: () => void;
  image?: boolean;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className={`modal${image ? ' modal--image' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="icon-button modal__close" onClick={onClose} aria-label="Close dialog" data-testid="button-close-modal">
          <X size={17} />
        </button>
        {children}
      </div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Modal onClose={onClose}>
      {submitted ? (
        <div className="success" data-testid="status-reservation-success">
          <div className="success__mark"><Check size={23} /></div>
          <h3>We&apos;ll see you soon.</h3>
          <p>
            Thanks for reaching out. Call <a href="tel:02134712929">021 34712929</a> for a quick confirmation, or send us
            the same details on WhatsApp.
          </p>
          <a className="button button--dark" href="https://wa.me/923023339073?text=Hi%20Zam%20Zama%20Food%2C%20I%20sent%20a%20reservation%20request." target="_blank" rel="noreferrer" data-testid="link-success-whatsapp">
            Continue on WhatsApp <ArrowUpRight size={15} />
          </a>
        </div>
      ) : (
        <>
          <div className="eyebrow">A table for your people</div>
          <h2>Make an evening of it.</h2>
          <p className="modal__intro">Tell us when you&apos;re coming and we&apos;ll have the warm welcome ready. For immediate orders, call or WhatsApp us.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="reservation-name">Your name</label>
                <input id="reservation-name" name="name" required placeholder="e.g. Sana" data-testid="input-reservation-name" />
              </div>
              <div className="field">
                <label htmlFor="reservation-phone">Phone</label>
                <input id="reservation-phone" name="phone" type="tel" required placeholder="03xx xxx xxxx" data-testid="input-reservation-phone" />
              </div>
              <div className="field">
                <label htmlFor="reservation-date">Date</label>
                <input id="reservation-date" name="date" type="date" required data-testid="input-reservation-date" />
              </div>
              <div className="field">
                <label htmlFor="reservation-guests">People</label>
                <select id="reservation-guests" name="guests" defaultValue="4" data-testid="select-reservation-guests">
                  <option value="2">2 people</option>
                  <option value="4">4 people</option>
                  <option value="6">6 people</option>
                  <option value="8+">8+ people</option>
                </select>
              </div>
              <div className="field field--full">
                <label htmlFor="reservation-note">Anything we should know?</label>
                <textarea id="reservation-note" name="note" placeholder="Birthday, family dinner, high chair..." data-testid="input-reservation-note" />
              </div>
            </div>
            <button className="button button--primary form-submit" type="submit" data-testid="button-submit-reservation">
              Send reservation request <ChevronRight size={16} />
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<ImageItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuPage, setActiveMenuPage] = useState(0);

  const closeMobile = () => setMobileOpen(false);
  const openMenu = () => {
    setActiveMenuPage(0);
    setMenuOpen(true);
  };

  return (
    <div className="site-shell">
      <div className="topbar">
        <div className="container">
          <span>Gulshan-e-Hadeed&apos;s family table since day one</span>
          <div className="topbar__right">
            <span className="dot" />
            <span>Open today · dinner until 10 pm</span>
            <a href="tel:02134712929" data-testid="link-topbar-call">021 34712929</a>
          </div>
        </div>
      </div>

      <header className="nav">
        <div className="container nav__inner">
          <a className="brand" href="#top" onClick={closeMobile} data-testid="link-brand-home">
            <span className="brand__mark">ZZ</span>
            <span className="brand__words">
              <span className="brand__name">Zam Zama</span>
              <span className="brand__sub">Food · Karachi</span>
            </span>
          </a>
          <nav className={`nav__links${mobileOpen ? ' nav__links--open' : ''}`} aria-label="Main navigation">
            <a href="#story" onClick={closeMobile} data-testid="link-nav-story">Our story</a>
            <a href="#menu" onClick={closeMobile} data-testid="link-nav-menu">Menu</a>
            <a href="#gallery" onClick={closeMobile} data-testid="link-nav-gallery">Photos</a>
            <a href="#visit" onClick={closeMobile} data-testid="link-nav-visit">Find us</a>
          </nav>
          <div className="nav__actions">
            <a className="nav__phone" href="tel:02134712929" data-testid="link-nav-call"><Phone size={15} /> 021 34712929</a>
            <button className="button button--primary" onClick={() => setContactOpen(true)} data-testid="button-nav-reserve">Reserve a table</button>
            <button className="nav__toggle" onClick={() => setMobileOpen((current) => !current)} aria-label="Toggle menu" data-testid="button-mobile-menu">
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero__grid">
            <div className="hero__copy reveal">
              <div className="eyebrow">The neighborhood table</div>
              <h1>Come hungry.<br /><em>Leave happy.</em></h1>
              <p className="hero__lead">Big flavor, generous plates and the kind of welcome that keeps Gulshan-e-Hadeed coming back. Chicken, grills, burgers and family time — all in one place.</p>
              <div className="hero__buttons">
                <a className="button button--primary" href="#menu" data-testid="link-hero-menu">See what&apos;s cooking <ArrowUpRight size={16} /></a>
                <a className="button button--ghost" href="https://wa.me/923023339073?text=Hi%20Zam%20Zama%20Food%2C%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" data-testid="link-hero-whatsapp">
                  <MessageCircle size={16} /> WhatsApp us
                </a>
              </div>
              <div className="hero__note"><Stars count={5} /><span><strong>3.8</strong> from 130 Google reviews</span></div>
            </div>
            <div className="hero__visual reveal reveal--delay">
              <div className="hero__image-frame">
                <img src={heroFood} alt="Golden fried chicken and fries at Zam Zama Food" data-testid="img-hero-food" />
              </div>
              <div className="hero__float"><strong>Made to share.</strong><span>Rs 1–1,000 · fast food & family dining</span></div>
              <div className="hero__badge">Good food<small>good company</small></div>
              <div className="hero__scroll">Scroll for a seat <ChevronRight size={14} /></div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Food highlights">
          <div className="marquee__track">
            <span>Authentic Chicken</span><span>—</span><span>Smoky BBQ</span><span>—</span><span>Loaded Burgers</span><span>—</span><span>Family Tables</span><span>—</span>
            <span>Authentic Chicken</span><span>—</span><span>Smoky BBQ</span><span>—</span><span>Loaded Burgers</span><span>—</span><span>Family Tables</span><span>—</span>
          </div>
        </div>

        <section className="section story" id="story">
          <div className="container story__grid">
            <div className="story__photos reveal">
              <img className="story__main-photo" src={familyTable} alt="Family meal at a Zam Zama Food table" data-testid="img-story-family" />
              <img className="story__small-photo" src={interiorSignage} alt="Zam Zama Foods interior wall art" data-testid="img-story-interior" />
              <div className="story__stamp">Karachi<br />made<br />memories</div>
            </div>
            <div className="story__copy reveal reveal--delay">
              <div className="eyebrow">More than a meal</div>
              <h2 className="section-title">A familiar<br />kind of special.</h2>
              <div className="story__rule" />
              <p>Zam Zama Food is where dinner plans become the table everyone talks about. We cook with the generous spirit of Karachi: food that arrives hot, portions that invite sharing, and a room made for one more.</p>
              <p>From a quick crispy chicken fix to a full family spread, we keep it honest, hearty and easy to come back to.</p>
              <div className="story__signature"><span className="story__signature-mark">Zam Zama</span><small>Family food, from our family to yours</small></div>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="menu">
          <div className="container">
            <div className="menu-section__intro">
              <div>
                <div className="eyebrow">Come with an appetite</div>
                <h2 className="section-title">The table<br />starts here.</h2>
              </div>
              <p className="section-copy">There&apos;s a favorite for every person at the table. Start with the classics, then pass everything around.</p>
            </div>
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              <button className="menu-tab menu-tab--active" role="tab" data-testid="tab-menu-all">All-time favorites</button>
              <button className="menu-tab" role="tab" onClick={openMenu} data-testid="tab-menu-full">Full menu</button>
              <button className="menu-tab" role="tab" onClick={openMenu} data-testid="tab-menu-grills">BBQ & grills</button>
              <button className="menu-tab" role="tab" onClick={openMenu} data-testid="tab-menu-chicken">Chicken & broast</button>
            </div>
            <div className="menu-grid">
              {menuHighlights.map((dish, index) => (
                <article className="dish-card" key={dish.title} data-testid={`card-dish-${index}`}>
                  <img src={dish.image} alt={dish.title} />
                  <span className="dish-card__tag">{dish.tag}</span>
                  <h3>{dish.title}</h3>
                  <p>{dish.description}</p>
                  <div className="dish-card__price">{dish.price}</div>
                </article>
              ))}
            </div>
            <div className="menu-reference">
              <div className="menu-reference__copy">
                <div className="menu-reference__icon"><FileText size={20} /></div>
                <div><strong>See the full Zam Zama menu</strong><span>Prices, platters, karahi, sandwiches and everything in between.</span></div>
              </div>
              <button className="button button--dark" onClick={openMenu} data-testid="button-view-menu">View menu pages <ArrowUpRight size={15} /></button>
            </div>
          </div>
        </section>

        <section className="section gallery" id="gallery">
          <div className="container">
            <SectionHeading eyebrow="Inside Zam Zama" title="Pull up a chair." copy="A little peek at the room, the plates and the people who make it feel like your place." />
            <div className="gallery__grid">
              {gallery.map((item, index) => (
                <button className="gallery-card" key={item.label} onClick={() => setActiveImage(item)} data-testid={`button-gallery-image-${index}`}>
                  <img src={item.src} alt={item.alt} />
                  <span className="gallery-card__label">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="container reviews__grid">
            <div className="reveal">
              <div className="eyebrow">What the neighborhood says</div>
              <h2 className="section-title">Worth the<br />drive across town.</h2>
              <div className="reviews__score"><strong>3.8</strong><div><Stars count={4} /><small>130 Google reviews</small></div></div>
            </div>
            <article className="review-card reveal reveal--delay" data-testid="card-featured-review">
              <blockquote>“The food is fresh, the portions are generous and the ambiance is perfect for family dinners.”</blockquote>
              <div className="review-card__footer"><strong>A Google reviewer</strong><span>Gulshan-e-Hadeed, Karachi</span></div>
            </article>
          </div>
        </section>

        <section className="section visit" id="visit">
          <div className="container visit__grid">
            <div>
              <div className="eyebrow">Your next dinner plan</div>
              <h2 className="section-title">Find your way<br />to the good part.</h2>
              <div className="visit__details">
                <div className="visit__detail"><MapPin className="visit__detail-icon" size={20} /><div><strong>Come see us</strong><span>A 826, Gulshan e Hadeed Phase 1,<br />Bin Qasim Town, Karachi, 75010</span></div></div>
                <div className="visit__detail"><Phone className="visit__detail-icon" size={20} /><div><strong>Call for orders</strong><a href="tel:02134712929" data-testid="link-visit-call">021 34712929</a></div></div>
                <div className="visit__detail"><MessageCircle className="visit__detail-icon" size={20} /><div><strong>WhatsApp orders</strong><a href="https://wa.me/923023339073?text=Hi%20Zam%20Zama%20Food%2C%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer" data-testid="link-visit-whatsapp">0302 3339073</a></div></div>
              </div>
              <div className="visit__actions">
                <a className="button button--primary" href="https://www.google.com/maps/search/?api=1&query=Zam+Zama+Food+Gulshan+e+Hadeed+Karachi" target="_blank" rel="noreferrer" data-testid="link-get-directions">Get directions <ArrowUpRight size={15} /></a>
                <button className="button button--ghost" onClick={() => setContactOpen(true)} data-testid="button-visit-reserve"><CalendarDays size={15} /> Plan a visit</button>
              </div>
            </div>
            <div className="visit__hours">
              <h3>When to drop in</h3>
              <div className="hours-row"><span>Monday – Sunday</span><strong>Open</strong></div>
              <div className="hours-row"><span>Popular dinner window</span><strong>2 pm – 10 pm</strong></div>
              <div className="hours-row"><span>Price for a happy table</span><strong>Rs 1–1,000</strong></div>
              <div className="hours-row"><span>On Facebook</span><a href="https://www.facebook.com/ZamzamaFoods" target="_blank" rel="noreferrer" data-testid="link-facebook">/Zamzama Foods</a></div>
              <div className="visit__actions"><a className="button button--dark" href="tel:02134712929" data-testid="link-hours-call"><Clock3 size={15} /> Call the restaurant</a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Zam Zama Food · Made for Karachi appetites.</span>
          <div className="footer__social"><a href="https://www.facebook.com/ZamzamaFoods" target="_blank" rel="noreferrer" data-testid="link-footer-facebook">Facebook</a><a href="#top" data-testid="link-footer-top">Back to top ↑</a></div>
        </div>
      </footer>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      {activeImage && (
        <Modal onClose={() => setActiveImage(null)} image>
          <img src={activeImage.src} alt={activeImage.alt} data-testid="img-gallery-lightbox" />
        </Modal>
      )}
      {menuOpen && (
        <Modal onClose={() => setMenuOpen(false)} image>
          <div className="menu-viewer">
            <img src={menuPages[activeMenuPage]} alt={`Zam Zama Food menu page ${activeMenuPage + 1}`} data-testid="img-menu-page" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '12px 4px 2px' }}>
              <button className="button button--ghost" onClick={() => setActiveMenuPage((page) => (page === 0 ? menuPages.length - 1 : page - 1))} data-testid="button-menu-previous">Previous</button>
              <span style={{ color: '#f7f0e7', fontSize: '.75rem' }}>Page {activeMenuPage + 1} of {menuPages.length}</span>
              <button className="button button--primary" onClick={() => setActiveMenuPage((page) => (page + 1) % menuPages.length)} data-testid="button-menu-next">Next <ChevronRight size={15} /></button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;