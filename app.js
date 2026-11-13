const { createElement: h, useEffect, useState } = React;
// Google Apps Script Web App endpoint for Google Sheet and Email notifications
const enquiryScriptUrl = 'https://script.google.com/macros/s/AKfycbw3vuI0EaK1UyySIze-W1E_DP1yVUWz_Lox4JhLBnJ_9M9PslyvsD6I-9x0USqJTc_R/exec';
const onlineBooking = 'https://www.dermaphiaesthetics.com/book-your-appointment';
const booking = 'contact/index.html#appointment';
const whatsapp = message => 'https://wa.me/918098070829?text=' + encodeURIComponent(message);
const chat = whatsapp('Hello Dermaphi Aesthetics, I’d like to enquire about an appointment.');
const studioAddress = '1, 1st Floor, NSR Road, Hasthinapuram, Chromepet, Chennai 600044';
const mapQuery = encodeURIComponent(studioAddress);
const directions = 'https://www.google.com/maps/dir/?api=1&destination=' + mapQuery;
const services = [
  ['01', 'Microblading', 'Fine, hair-like strokes for softly defined brows.', '⟋'],
  ['02', 'Combination Brows', 'Microblading and shading for natural-looking depth.', '◒'],
  ['03', 'Ombré Brows', 'A soft gradient with a fuller, more defined finish.', '◐'],
  ['04', 'Lip Blush', 'A sheer tint that brings out your natural lip colour.', '◇']
];
const navigation = [['Home', 'home'], ['About Us', 'about'], ['Treatments & Services', 'treatments'], ['Gallery & Testimonials', 'results'], ['Contact & Book Appointment', 'contact']];
const treatments = [
  ['microblading', 'Microblading', "Fine, hair-like strokes add definition to sparse areas while following the look of your existing brow hairs.", 'Discuss your natural brow shape, where you would like more definition, and how closely you want the strokes to follow your existing brow pattern.'],
  ['combination-brows', 'Combination Brows', "Hair strokes and soft shading give the brow more depth. Explore this option if you like the detail of microblading and want a softly filled-in finish.", 'Bring examples of the brow definition you like so you and Preethi can discuss where to place strokes and where a shaded finish may suit you.'],
  ['ombre-brows', 'Ombré Brows', "Graduated shading gives brows a softer front and more definition through the arch and tail, similar to lightly applied brow powder.", 'At your consultation, discuss how soft you want the front of the brow to look and how much definition you prefer through the arch and tail.'],
  ['lip-blush', 'Lip Blush', "A tinted finish enhances your natural lip colour and defines the lip outline. Talk through the shade and how subtle or noticeable you want it to look.", 'Discuss the shade and degree of definition you prefer with Preethi before booking your treatment.'],
  ['eyebrow-lamination', 'Eyebrow Lamination', 'Reshapes and sets natural brow hairs for a fuller, groomed appearance.', 'Discuss the direction and amount of lift you prefer.'],
  ['lip-neutralization', 'Lip Neutralization', 'Helps balance the appearance of uneven or darker lip tones.', 'Ask about the colour approach for your natural lip tone.'],
  ['lip-liner', 'Lip Liner', 'Adds definition along the natural lip contour.', 'Discuss how subtle or defined you want the outline to look.'],
  ['scalp-micropigmentation', 'Scalp Micropigmentation (SMP)', 'Small pigment impressions can create the appearance of greater hair density or a closely shaved hairstyle.', 'Bring a reference for the hairline or finish you want to discuss.'],
  ['bb-glow', 'BB Glow', 'A skin treatment aimed at a more even-looking, radiant complexion.', 'Ask the studio what the treatment involves and discuss suitability for your skin.'],
  ['microneedling', 'Serum-Infused Microneedling', 'Combines microneedling with selected topical serums.', 'Discuss your skincare routine and ask which serum, if any, is appropriate for your skin.'],
  ['medi-facials', 'Medi Facials', 'Targeted facials tailored to your skin type and concerns.', 'Share your skincare goals and any sensitivities during the consultation.']
];
const url = page => page === 'home' ? 'index.html' : page + '/index.html';
const pages = {
  home: ['Permanent Makeup in Chennai', 'Explore microblading, combination brows, ombré brows and lip blush at Dermaphi Aesthetics in Chennai.'],
  treatments: ['PMU & Skincare Treatments in Chennai', 'Explore Dermaphi’s eyebrow, lip, scalp and skincare treatments in Chromepet, Chennai.'],
  results: ['Gallery & Testimonials', 'See before-and-after photos from Dermaphi Aesthetics, a permanent makeup studio in Chennai.'],
  about: ['Preethi Sadha, PMU Artist in Chennai', 'Meet Preethi Sadha, founder of Dermaphi Aesthetics and certified PhiBrows artist.'],
  contact: ['Contact & Book Appointment in Chennai', 'Contact Dermaphi Aesthetics in Chennai or book a consultation with Preethi Sadha.']
};
const link = (label, href, className) => h('a', { href, className }, label);
const socialProfiles = [
  ['Instagram', 'https://www.instagram.com/dermaphi_aesthetics/', 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M17.5 6.5h.01'],
  ['Facebook', 'https://www.facebook.com/dermaphi_aesthetics', 'M14 21v-8h3l.5-4H14V7a1 1 0 0 1 1-1h2V3h-3a4 4 0 0 0-4 4v2H7v4h3v8'],
  ['LinkedIn', 'https://www.linkedin.com/company/dermaphi-aesthetics/', 'M5 9v11 M5 5h.01 M10 20V9 M10 13a4 4 0 0 1 8 0v7']
];
function SocialIcon({ name, href, path }) {
  const container = React.useRef(null);
  const player = React.useRef(null);
  const active = React.useRef({ hover: false, focus: false });
  const key = name.toLowerCase();
  useEffect(() => {
    const data = window.dermaphiSocialAnimations?.[key];
    if (!data || !window.lottie) return;
    const icon = container.current;
    const animation = lottie.loadAnimation({
      container: icon, renderer: 'svg', loop: key !== 'instagram', autoplay: false,
      animationData: JSON.parse(JSON.stringify(data))
    });
    player.current = animation;
    const ready = () => { icon.dataset.ready = 'true'; };
    animation.addEventListener('DOMLoaded', ready);
    return () => { delete icon.dataset.ready; animation.destroy(); player.current = null; };
  }, [key]);
  function update(mode, value) {
    active.current[mode] = value;
    const animation = player.current;
    if (!animation) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { animation.goToAndStop(0, true); return; }
    const playing = active.current.hover || active.current.focus;
    if (key === 'instagram') { animation.setDirection(playing ? 1 : -1); animation.play(); }
    else if (playing) animation.play();
    else animation.goToAndStop(0, true);
  }
  return h('a', {
    href, 'aria-label': 'Dermaphi on ' + name, title: name,
    onMouseEnter: () => update('hover', true), onMouseLeave: () => update('hover', false),
    onFocus: () => update('focus', true), onBlur: () => update('focus', false)
  },
    h('span', { className: 'social-lottie', ref: container, 'aria-hidden': 'true' }),
    h('svg', { className: 'social-fallback', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' }, h('path', { d: path })));
}
function SocialLinks() {
  return h('nav', { className: 'social-links', 'aria-label': 'Dermaphi on social media' },
    socialProfiles.map(([name, href, path]) => h(SocialIcon, { key: name, name, href, path })));
}

const quickReplies = [
  ['Treatments', 'Explore brow, lip and skincare services, or use the Finish Finder to compare looks.', 'Explore treatments', url('treatments')],
  ['Appointments', 'Choose a treatment and share your preferred time. The studio will confirm availability.', 'Open enquiry form', booking],
  ['Contact the studio', 'Chat with Dermaphi on WhatsApp for help with your visit or questions about a service.', 'Open WhatsApp', chat]
];
function BrandLogo({ className }) {
  return h('a', { className, href: url('home') }, h('img', {
    className: 'brand-logo', src: 'assets/dermaphi-logo.jpg',
    alt: 'Dermaphi Aesthetics home', width: 1600, height: 535
  }));
}
function SiteFooter({ page }) {
  return h('footer', { className: 'site-footer' }, h('div', { className: 'wrap' },
    h('div', { className: 'footer-invite', 'data-reveal': '' },
      h('div', null, h('p', { className: 'eyebrow' }, 'DERMAPHI AESTHETICS · CHROMEPET'), h('h2', null, 'Let’s talk about your visit.')),
      link('Request an Appointment ↗', booking, 'button')),
    h('div', { className: 'footer-grid' },
      h('div', { className: 'footer-brand' },
        h(BrandLogo, { className: 'footer-wordmark' }),
        h('p', null, 'Permanent makeup and skincare with Preethi Sadha.'),
        h(SocialLinks)),
      h('nav', { 'aria-label': 'Footer navigation' }, h('h3', null, 'Explore'),
        navigation.map(([label, path]) => h('a', { key: path, href: url(path) }, label))),
      h('div', null, h('h3', null, 'Visit the studio'),
        h('address', null, studioAddress),
        link('Get directions ↗', directions, 'footer-directions'),
        link('+91 80980 70829', 'tel:+918098070829'),
        link('everything4aesthetic@gmail.com', 'mailto:everything4aesthetic@gmail.com'))),
    h('div', { className: 'footer-base' }, h('span', null, 'Dermaphi Aesthetics'), link('Back to top ↑', url(page) + '#main'))));
}
function FloatingTools() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [reply, setReply] = useState(null);
  const helpButton = React.useRef(null);

  function closeOnEscape(event) {
    if (event.key !== 'Escape' || !helpOpen) return;
    setHelpOpen(false);
    helpButton.current.focus();
  }

  return h('aside', { className: 'floating-tools', 'aria-label': 'Social links and studio help', onKeyDown: closeOnEscape },
    h('div', { className: 'floating-dock' },
      h(SocialLinks),
      h('button', {
        ref: helpButton, className: 'dock-help', type: 'button', title: 'Studio help',
        'aria-label': 'Studio help', 'aria-expanded': helpOpen, 'aria-controls': 'floating-help', onClick: () => setHelpOpen(open => !open)
      },
        h('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' },
          h('path', { d: 'M20 11.5a7.5 7.5 0 0 1-7.5 7.5H9l-4 2v-4a7.5 7.5 0 1 1 15-5.5Z M9 11.5h.01 M12.5 11.5h.01 M16 11.5h.01' })))),
    h('div', { id: 'floating-help', className: 'floating-panel', hidden: !helpOpen },
      h('h2', null, 'Dermaphi Help'),
      h('p', null, 'Hi! What would you like help with?'),
      h('div', { className: 'quick-replies' }, quickReplies.map(([label], index) =>
        h('button', { key: label, type: 'button', 'aria-pressed': index === reply, onClick: () => setReply(index) }, label))),
      h('div', { 'aria-live': 'polite' }, reply !== null && h('div', { className: 'bot-reply' },
        h('p', null, quickReplies[reply][1]), link(quickReplies[reply][2], quickReplies[reply][3], 'text-link')))));
}

function usePortfolioMotion(slide) {
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('.client-notes, .credential-strip').forEach(section => {
        gsap.from(section.querySelectorAll('.motion-item'), {
          y: 18, duration: .65, stagger: .09, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: section, start: 'top 88%', once: true }
        });
      });
    });
    return () => motion.revert();
  }, []);
  useEffect(() => {
    if (!slide.revision || !window.gsap || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const photo = document.querySelector('.result-image img');
    if (!photo) return;
    const tween = gsap.fromTo(photo,
      { clipPath: slide.direction === 'previous' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)', xPercent: slide.direction === 'previous' ? -5 : 5 },
      { clipPath: 'inset(0% 0% 0% 0%)', xPercent: 0, duration: .62, ease: 'power3.out', clearProps: 'clipPath,transform' });
    return () => tween.kill();
  }, [slide]);
}

function App({ page }) {
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState({ index: 0, direction: 'next', revision: 0 });
  usePortfolioMotion(slide);
  function browse(step) {
    setSlide(previous => ({
      index: (previous.index + step + 3) % 3,
      direction: step > 0 ? 'next' : 'previous',
      revision: previous.revision + 1
    }));
  }
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('waiting');
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.1 });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top >= innerHeight) element.classList.add('waiting');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  const sections = homeSections(slide, browse);
  return h(React.Fragment, null,
    link('Skip to content', url(page) + '#main', 'skip'),
    h('div', { className: 'topline' }, 'PERMANENT MAKEUP STUDIO  /  CHENNAI'),
    h('header', { className: 'nav wrap' },
      h(BrandLogo, { className: 'brand' }),
      h('button', { className: 'menu-toggle', type: 'button', 'aria-expanded': menu, 'aria-controls': 'navigation', onClick: () => setMenu(!menu) }, menu ? 'Close' : 'Menu'),
      h('nav', { id: 'navigation', className: menu ? 'open' : '', 'aria-label': 'Main navigation' }, navigation.map(([label, path]) => h('a', { href: url(path), key: path, 'aria-current': page === path ? 'page' : undefined, onClick: () => setMenu(false) }, label))),
      link('Book a Consultation ↗', booking, 'nav-cta')),
    h('main', { id: 'main' }, page === 'home' ? h(StudioHome) : h(InteriorPage, { page, sections })),
    h('div', { className: 'reading-progress', 'aria-hidden': 'true' }),
    h(FloatingTools),
    h(SiteFooter, { page })
  );
}
const studioPhotos = [
  ['studio-3.jpg', 'Meet Preethi Sadha', 'Preethi holds a brow measuring tool. At your consultation, talk through the shape and amount of definition you want.'],
  ['studio-1.jpg', 'A treatment in progress', 'A close view of Preethi at work. Ask what your chosen appointment involves and what to expect afterwards.'],
  ['studio-2.jpg', 'Another angle from the studio', 'Bring a photo of how you normally style your brows or the lip colour you reach for most. It can make your preferences easier to explain.'],
  ['studio-4.jpg', 'A training milestone', 'A photo from Preethi’s training journey. She is a certified PhiBrows artist, permanent makeup specialist and trainer.'],
  ['studio-5.jpg', 'A moment away from the treatment chair', 'Preethi at a beauty event. If you have questions about how two techniques differ, bring them to your consultation.'],
  ['studio-6.jpg', 'A wider view of the event', 'The event space includes a brow illustration. Compare hair-stroke, shaded and combination finishes before deciding what to ask about.'],
  ['studio-7.jpg', 'From Preethi’s photo album', 'Another portrait from the event. Get in touch if you’d like to discuss a visit to the Chromepet studio.']
];

const clientPhotos = [
  ['client-2.jpg', 'Brow portfolio · defined arches', 'Look at how the shape and definition change across the two photos.'],
  ['client-3.jpg', 'Brow portfolio · fuller outline', 'Bring a reference if you want to discuss more definition through the brow.'],
  ['client-4.jpg', 'Brow portfolio · front view', 'Notice the shape from the front of the brow through the tail.'],
  ['client-5.jpg', 'Brow portfolio · close-up', 'Use the close-up to discuss how much detail you want in your own finish.'],
  ['client-6.jpg', 'Lip portfolio · colour close-up', 'Ask Preethi how your starting lip tone informs the choice of colour.'],
  ['client-7.jpg', 'Lip portfolio · tinted finish', 'Bring a shade you wear often if you want to discuss a subtle or more defined tint.']
];
function galleryFrame(index, position, count, variant) {
  const half = count / 2;
  const offset = ((index - position + half) % count + count) % count - half;
  const depth = Math.abs(offset);
  const circular = variant === 'orbit';
  const angle = offset * .63;
  const x = circular ? Math.sin(angle) * 137 : offset * 68;
  const y = circular ? (1 - Math.cos(angle)) * 23 : Math.sin(offset * .9) * 32;
  const z = circular ? (Math.cos(angle) - 1) * 240 : -depth * 66;
  const turn = circular ? -offset * 23 : -offset * 13;
  const roll = circular ? 0 : Math.sin(offset * .9) * 11;
  return {
    transform: 'translate3d(' + x + '%, ' + y + '%, ' + z + 'px) rotateY(' + turn + 'deg) rotateZ(' + roll + 'deg)',
    filter: 'blur(' + Math.min(4, depth * (circular ? 1.35 : 1.7)) + 'px)',
    opacity: Math.max(0, Math.min(1, (half - depth) * 1.25)),
    zIndex: Math.round(100 - depth * 20)
  };
}

function useCarouselAutoplay(advance, selection) {
  const region=React.useRef(null);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    if(paused||!region.current||!('IntersectionObserver' in window))return;
    const element=region.current;
    let visible=false;
    let timer;
    function schedule(){
      clearInterval(timer);
      if(visible&&!document.hidden&&!preference.matches&&!element.matches(':hover, :focus-within')){
        timer=setInterval(advance,5500);
      }
    }
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule();},{threshold:.15});
    observer.observe(element);
    const events=['pointerenter','pointerleave','focusin','focusout'];
    const afterFocus=()=>queueMicrotask(schedule);
    events.forEach(name=>element.addEventListener(name,afterFocus));
    document.addEventListener('visibilitychange',schedule);
    preference.addEventListener('change',schedule);
    return ()=>{
      clearInterval(timer);
      observer.disconnect();
      events.forEach(name=>element.removeEventListener(name,afterFocus));
      document.removeEventListener('visibilitychange',schedule);
      preference.removeEventListener('change',schedule);
    };
  },[paused,selection]);
  return {region,paused,toggle:()=>setPaused(value=>!value)};
}
function AutoplayButton({autoplay}) {
  return h('button',{type:'button',className:'autoplay-toggle',onClick:autoplay.toggle},autoplay.paused?'Play slideshow':'Pause slideshow');
}

function StudioDepthGallery({ id, photos = studioPhotos, title = 'Inside the studio', intro = 'Browse photos of Preethi at work and moments from her training journey.', variant = 'ribbon' }) {
  const [selection, setSelection] = useState(0);
  const autoplay=useCarouselAutoplay(()=>setSelection(current=>current+1),selection);
  const caption = React.useRef(null);
  const lastSelection = React.useRef(0);
  const gesture = React.useRef(null);
  const count = photos.length;
  const active = ((selection % count) + count) % count;
  const move = step => setSelection(current => current + step);
  const select = index => {
    const difference = index - active;
    move(Math.abs(difference) > count / 2 ? difference - Math.sign(difference) * count : difference);
  };

  useEffect(() => {
    const previous = lastSelection.current;
    lastSelection.current = selection;
    if (previous === selection || !window.Motion || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const label = Motion.animate(caption.current, { opacity: [.55, 1], y: [7, 0] }, { duration: .3 });
    return () => label.stop();
  }, [selection]);

  return h('section', { id, className: 'studio-depth studio-depth--' + variant, ref:autoplay.region, 'aria-labelledby': id + '-title' },
    h('div', { className: 'wrap studio-section' },
      h('p', { className: 'eyebrow' }, 'DERMAPHI IN PHOTOGRAPHS'),
      h('h2', { id: id + '-title' }, title),
      h('p', { className: 'depth-intro' }, intro + ' Drag, swipe, or choose a photo below.'),
      h('div', {
        className: 'depth-stage',
        onPointerDown: event => {
          if (!event.isPrimary || event.button !== 0) return;
          gesture.current = { id: event.pointerId, x: event.clientX };
          event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerUp: event => {
          const start = gesture.current;
          gesture.current = null;
          if (start?.id !== event.pointerId) return;
          const delta = event.clientX - start.x;
          if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
        },
        onPointerCancel: () => { gesture.current = null; }
      },
        variant !== 'ribbon'
          ? photos.map(([src, label], index) => h('div', {
            key: src, className: 'depth-card', 'aria-hidden': index !== active,
            style: galleryFrame(index, selection, count, variant)
          }, h('img', { src: 'assets/' + src, alt: label, loading: 'lazy', draggable: false })))
          : h('div', { className: 'ribbon-film', key: selection }, [-1, 0, 1].map(step => {
            const [src, label] = photos[(active + step + count) % count];
            return h('figure', { key: src, 'data-step': step, 'aria-hidden': step !== 0 },
              h('img', { src: 'assets/' + src, alt: label, loading: 'lazy', draggable: false }));
          }))),
      h('div', { className: 'depth-caption', ref: caption, 'aria-live': autoplay.paused?'polite':'off' }, h('h3', null, photos[active][1]), h('p', null, photos[active][2])),
      h('div', {
        className: 'depth-controls', role: 'group', 'aria-label': title + ' controls', onKeyDown: event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      },
        h('button', { type: 'button', onClick: () => move(-1), 'aria-label': 'Previous studio photo' }, '←'),
        photos.map(([src, label], index) => h('button', {
          type: 'button', key: src, className: 'depth-thumb',
          'aria-pressed': index === active, 'aria-label': label, onClick: () => select(index)
        }, h('img', { src: 'assets/' + src, alt: '', loading: 'lazy' }))),
        h('button', { type: 'button', onClick: () => move(1), 'aria-label': 'Next studio photo' }, '→')),
      h(AutoplayButton,{autoplay}),link('Ask about a consultation ↗', booking, 'button')));
}

function moveHeroPerspective(event) {
  if (event.pointerType !== 'mouse' || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const scene = event.currentTarget;
  const bounds = scene.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  scene.style.setProperty('--hero-ry', x * 16 + 'deg');
  scene.style.setProperty('--hero-rx', y * -12 + 'deg');
}
function resetHeroPerspective(event) {
  event.currentTarget.style.removeProperty('--hero-ry');
  event.currentTarget.style.removeProperty('--hero-rx');
}
const heroPointer = { onPointerMove: moveHeroPerspective, onPointerLeave: resetHeroPerspective };

function StudioHome() {
  const [feature, setFeature] = useState(0);
  const autoplay=useCarouselAutoplay(()=>setFeature(current=>(current+1)%3),feature);
  const features = [
    { label: 'Meet your artist', title: 'Permanent makeup,', accent: 'made personal.', copy: 'Explore hair-stroke brows, soft shading and lip blush with Preethi Sadha, founder of Dermaphi Aesthetics and a certified PhiBrows artist.', image: 'founder.jpg', alt: 'Preethi Sadha holding a brow measuring tool', caption: 'Preethi Sadha', detail: 'Founder · Certified PhiBrows artist' },
    { label: 'Brow artistry', title: 'Brow definition', accent: 'that suits you.', copy: 'Compare individual hair strokes, combination brows and soft ombré shading. Talk through the shape and finish you like with Preethi.', image: 'client-2.jpg', alt: 'Before-and-after brow work from Dermaphi Aesthetics', caption: 'Brow portfolio', detail: 'Before & after from Dermaphi Aesthetics' },
    { label: 'Lip blush', title: 'A hint of colour,', accent: 'your kind of tint.', copy: 'Bring a shade you already love and discuss how subtle or defined you want your lip blush to look.', image: 'client-7.jpg', alt: 'Before-and-after lip work from Dermaphi Aesthetics', caption: 'Lip portfolio', detail: 'Before & after from Dermaphi Aesthetics' }
  ];
  const current = features[feature];
  return h('div', { className: 'studio-home' },
    h('section', { className: 'studio-hero hero-home concept-hero',ref:autoplay.region },
      h('div', { className: 'studio-hero-grid wrap' },
        h('div', { className: 'studio-hero-copy' },
          h('p', { className: 'eyebrow' }, 'PERMANENT MAKEUP & SKINCARE / CHROMEPET, CHENNAI'),
          h('div', { className: 'studio-feature-copy', key: feature, 'aria-live': autoplay.paused?'polite':'off' }, h('h1', null, current.title, ' ', h('em', null, current.accent)), h('p', null, current.copy)),
          h('div', { className: 'actions' }, link('Request a consultation ↗', booking, 'button'), link('Enquire on WhatsApp ↗', chat, 'text-link')),
          h('div', { className: 'studio-feature-tabs', role: 'group', 'aria-label': 'Featured services' }, features.map(({ label }, index) => h('button', { key: label, type: 'button', 'aria-pressed': feature === index, onClick: () => setFeature(index) }, label))),h(AutoplayButton,{autoplay})),
        h('div', { className: 'concept-scene concept-home-scene', ...heroPointer },
          h('div', { className: 'concept-layer' },
            h('figure', { className: 'studio-portrait', key: feature, 'data-feature': feature },
              h('img', { src: 'assets/' + current.image, alt: current.alt, fetchPriority: 'high' }),
              h('figcaption', null, h('strong', null, current.caption), h('span', null, current.detail))),
            h('a', { className: 'concept-preview', href: url('results') + '#client-portfolio' },
              h('img', { src: 'assets/studio-2.jpg', alt: '' }), h('span', null, 'Explore client results ↗')))))),
    h('div', { className: 'studio-trust' }, h('div', { className: 'wrap' }, h('span', null, 'Certified PhiBrows artist'), h('span', null, 'Permanent makeup specialist & trainer'), h('span', null, 'Chromepet, Chennai'))),
    h('section', { className: 'wrap studio-section studio-services', 'aria-labelledby': 'studio-services-title' },
      h('div', { className: 'studio-section-head' }, h('div', null, h('p', { className: 'eyebrow' }, 'TREATMENTS'), h('h2', { id: 'studio-services-title' }, 'What would you like to define?')), link('Explore all services ↗', url('treatments'), 'text-link')),
      h('div', { className: 'studio-service-grid' }, [
        ['Brows', 'Choose fine strokes, soft shading or a blend of both.', 'brows-and-lips'],
        ['Lip colour', 'Discuss a lip blush shade and how subtle you want the tint to look.', 'lip-blush'],
        ['Scalp', 'Explore scalp micropigmentation for the appearance of fuller density.', 'scalp-enhancement'],
        ['Skincare', 'Explore BB Glow, serum-infused microneedling and medi facials.', 'advanced-skincare']
      ].map(([title, copy, id]) => h('a', { key: id, href: url('treatments') + '#' + id },
        h('h3', null, title), h('p', null, copy), h('span', { 'aria-hidden': 'true' }, '↗'))))),
    h('section', { id: 'studio-work', className: 'studio-portfolio' },
      h('div', { className: 'wrap studio-section' },
        h('div', { className: 'studio-section-head' }, h('div', null, h('p', { className: 'eyebrow' }, 'BEFORE & AFTER'), h('h2', null, 'See the detail up close.')), link('Open the gallery ↗', url('results'), 'text-link')),
        h('div', { className: 'studio-proof-grid' }, [1, 2, 3].map(number => h('a', { key: number, href: url('results'), 'aria-label': 'Open Dermaphi’s before-and-after gallery' },
          h('img', { src: 'assets/work' + number + '.jpg', alt: 'Before-and-after work from Dermaphi Aesthetics, example ' + number, loading: 'lazy' })))),
        h('p', { className: 'studio-proof-note' }, 'Bring a reference you like to your consultation. Tell Preethi whether it’s the shape, colour or level of definition that caught your eye.'))),
    h('section',{className:'wrap section home-local'},
      h('div',null,h('p',{className:'eyebrow'},'CHROMEPET, CHENNAI'),h('h2',null,'Permanent makeup in Chromepet'),
        h('p',null,'At Dermaphi Aesthetics, you can talk through brow shape, lip colour or scalp definition with Preethi Sadha, a certified PhiBrows artist. The studio also offers customised facials and skin treatments.')),
      h('div',{className:'studio-questions'},
        h('details',{open:true},h('summary',null,'Microblading or ombré brows?'),h('p',null,'Microblading gives you individual hair-like strokes. Ombré shading gives a soft powder finish. Combination brows blend the two.'),link('Compare eyebrow treatments ↗',url('treatments')+'#brows-and-lips','text-link')),
        h('details',null,h('summary',null,'Lip blush or lip neutralization?'),h('p',null,'Lip blush adds a tint. Lip neutralization focuses on balancing the appearance of uneven lip tone. Ask Preethi how your starting colour affects the options.'),link('Explore lip treatments ↗',url('treatments')+'#lip-enhancements','text-link')))),
    h('section', { className: 'wrap studio-section studio-visit' },
      h('div', null, h('p', { className: 'eyebrow' }, 'YOUR FIRST VISIT'), h('h2', null, 'Before you book'),
        h('p', null, 'You can enquire even if you haven’t chosen a treatment. Preethi is a permanent makeup specialist and trainer who can help you compare finishes and discuss previous work.'),
        link('Meet Preethi ↗', url('about'), 'text-link')),
      h('div', { className: 'studio-questions' }, [
        ['What should I bring?', 'Bring a photo of the brow shape or lip shade you like. Tell us about any previous permanent makeup or recent skincare treatments.'],
        ['What can I ask about?', 'Ask which finish suits your goals, what the session involves, and what to plan for aftercare.'],
        ['How do I request a time?', 'Use the enquiry form or WhatsApp. Share the treatment you’re considering and your preferred day. The studio will confirm availability.']
      ].map(([question, answer], index) => h('details', { key: question, open: index === 0 },
        h('summary', null, question), h('p', null, answer))))),
    h('section', { className: 'wrap studio-location' },
      h('div', null, h('h2', null, 'Visit Dermaphi in Chromepet'), h('address', null, studioAddress)),
      h('div', { className: 'actions' }, link('Get directions ↗', directions, 'text-link'), link('Chat on WhatsApp ↗', chat, 'button'))));
}

function homeSections({ index: result, direction, revision }, browse) {
  return [
    h('section', { className: 'hero wrap', 'aria-labelledby': 'headline' },
      h('div', { className: 'hero-copy' }, h('p', { className: 'eyebrow' }, 'PERMANENT MAKEUP & SKINCARE · CHENNAI'),
        h('h1', { id: 'headline' }, h('span', null, 'Soft definition.'), h('span', null, h('em', null, 'Still unmistakably you.'))),
        h('p', { className: 'lede' }, 'A little more shape through the brows. A hint of colour on the lips. At Dermaphi Aesthetics in Chennai, permanent makeup artist Preethi Sadha helps you choose a shape, shade, and finish that feels right for your features and your everyday routine.'),
        h('div', { className: 'actions' }, link('Explore Treatments →', url('treatments'), 'button'), link('Enquire on WhatsApp ↗', chat, 'text-link'))),
      h('div', { className: 'portrait' }, h('img', { src: 'assets/hero.jpg', alt: 'Editorial beauty portrait' }), h('div', { className: 'stamp', 'aria-hidden': 'true' }, '✦'), h('div', { className: 'caption' }, 'THE DERMAPHI APPROACH', h('span', null, '01 / 03')))),
    h('div', { className: 'ribbon' }, h('div', { className: 'wrap' }, h('span', null, 'Precision in every detail'), h('i', { 'aria-hidden': 'true' }, '✦'), h('span', null, 'Designed for your features'), h('i', { 'aria-hidden': 'true' }, '✦'), h('span', null, 'Chennai, India'))),
    h('section', { id: 'treatments', className: 'section wrap', 'data-reveal': '' },
      h('p', { className: 'eyebrow' }, '01 / THE TREATMENT MENU'),
      h('div', { className: 'section-head' }, h('h2', null, 'Find your ', h('em', null, 'finish.')), h('p', null, 'Explore four signature finishes, from individual brow strokes to a soft tint on the lips.')),
      h('div', { className: 'service-grid' }, services.map(([n, title, copy, icon]) => h('article', { className: 'service', key: n },
        h('div', { className: 'service-top' }, h('span', null, n), h('span', { 'aria-hidden': 'true' }, icon)),
        h('h3', null, link(title, url('treatments') + '#' + treatments[Number(n) - 1][0])), h('p', null, copy))))),
    h('section', { id: 'results', className: 'results' }, h('div', { className: 'wrap split section', 'data-reveal': '' },
      h('div', { className: 'result-image motion-surface', 'data-slide': revision, 'data-direction': direction, ...highlightEvents, onTouchStart: event => { event.currentTarget.dataset.touchX = event.touches[0].clientX; }, onTouchEnd: event => { const start = event.currentTarget.dataset.touchX; delete event.currentTarget.dataset.touchX; if (start === undefined) return; const distance = event.changedTouches[0].clientX - Number(start); if (Math.abs(distance) > 60) browse(distance < 0 ? 1 : -1); } }, h('img', { key: revision, src: 'assets/work' + (result + 1) + '.jpg', alt: 'Before and after example ' + (result + 1) + ' from Dermaphi Aesthetics', loading: 'lazy' })),
      h('div', null, h('p', { className: 'eyebrow' }, '02 / THE PORTFOLIO'), h('h2', null, 'The difference ', h('em', null, 'is in the detail.')), h('p', null, 'Browse before-and-after work from Dermaphi. Notice the shape, where the definition is strongest, and how the finish sits with the surrounding features. Bring an example you like to your consultation.'), h('div', { className: 'actions' }, link('View Before & After →', url('results'), 'text-link'), link('Discuss a look you like →', booking, 'text-link')),
        h('div', { className: 'gallery-index', 'aria-label': 'Choose a gallery photo' }, [0, 1, 2].map(index => h('button', { key: index, type: 'button', 'aria-label': 'Show result ' + (index + 1), 'aria-pressed': index === result, onClick: () => { if (index !== result) browse(index - result); } }, h('img', { src: 'assets/work' + (index + 1) + '.jpg', alt: '', loading: 'lazy' })))),
        h('div', {
          className: 'controls', role: 'group', 'aria-label': 'Gallery controls', onKeyDown: event => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            browse(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }, h('button', { type: 'button', 'aria-label': 'Previous result', onClick: () => browse(-1) }, '←'), h('span', { 'aria-live': 'polite' }, '0' + (result + 1) + ' / 03'), h('button', { type: 'button', 'aria-label': 'Next result', onClick: () => browse(1) }, '→'))))),
    h('section', { id: 'artist', className: 'wrap split section artist', 'data-reveal': '' },
      h('div', null, h('p', { className: 'eyebrow' }, 'MEET THE ARTIST'), h('h2', null, 'Preethi ', h('em', null, 'Sadha.')), h('p', null, 'Founder of Dermaphi Aesthetics, certified PhiBrows artist, permanent makeup specialist and trainer. Preethi tailors her approach to each client’s individual features.'), link('Book a Consultation ↗', booking, 'button')),
      h('div', { className: 'artist-frame' }, h('img', { src: 'assets/founder.jpg', alt: 'Preethi Sadha, founder of Dermaphi Aesthetics', loading: 'lazy' }), h('span', { 'aria-hidden': 'true' }, '✦'))),
    h('section', { id: 'studio', className: 'wrap section studio', 'aria-labelledby': 'studio-title' },
      h('p', { className: 'eyebrow' }, '04 / CHENNAI STUDIO'),
      h('div', { className: 'split' },
        h('div', null,
          h('h2', { id: 'studio-title' }, 'Book a PMU consultation ', h('em', null, 'in Chennai.')),
          h('p', null, 'Talk with Preethi Sadha about the brow shape, definition or lip colour you have in mind. If you’re choosing between microblading and a softly shaded brow, bring your questions to the consultation.'),
          link('Book a Consultation ↗', booking, 'button')),
        h('div', { className: 'studio-contact' },
          h('h3', null, 'Dermaphi Aesthetics'),
          h('p', null, 'Chennai, Tamil Nadu, India'),
          link('+91 80980 70829', 'tel:+918098070829', 'text-link'),
          link('everything4aesthetic@gmail.com', 'mailto:everything4aesthetic@gmail.com', 'text-link'))))];
}

const finishOptions = [
  ['microblading', 'I want softer definition', 'Individual strokes can add detail where brow hairs look sparse. Bring a photo of how you usually fill in your brows, if you have one.'],
  ['combination-brows', 'I want a little more depth', 'Hair-like strokes and soft shading offer two kinds of definition. Tell Preethi where you want to see texture and where you prefer a fuller finish.'],
  ['ombre-brows', 'I like a soft powder finish', 'Graduated shading creates a softly filled-in look. Discuss how subtle you want the front of the brow and how defined you like the tail.'],
  ['lip-blush', 'I want a hint of lip colour', 'Think about a tint you would wear on an ordinary day. Bring a shade reference to talk through how subtle or noticeable you want the colour.']
];
function FinishFinder() {
  const [active, setActive] = useState(0);
  const [slug, , guidance] = finishOptions[active];
  const [, name] = treatments[active];
  return h('section', { className: 'wrap section finish-finder', 'data-reveal': '', 'aria-labelledby': 'finish-title' },
    h('p', { className: 'eyebrow' }, 'THE FINISH FINDER'),
    h('h2', { id: 'finish-title' }, 'What would you like to see in the mirror?'),
    h('p', null, 'Choose the look you’re drawn to. Use the suggestion as a starting point for your consultation.'),
    h('div', { className: 'finish-layout' },
      h('div', { className: 'finish-options', role: 'group', 'aria-label': 'Choose your preferred finish' },
        finishOptions.map(([id, label], index) => h('button', { key: id, type: 'button', 'aria-pressed': index === active, onClick: () => setActive(index) },
          h('span', { 'aria-hidden': 'true' }, '0' + (index + 1)), label, h('span', { 'aria-hidden': 'true' }, '↗')))),
      h('div', { className: 'finish-result' },
        h('div', { className: 'finish-art', key: slug }, h(LineArtwork, { drawing: treatmentArtwork[slug] })),
        h('div', { className: 'finish-copy', 'aria-live': 'polite' },
          h('p', { className: 'eyebrow' }, 'A TREATMENT TO EXPLORE'),
          h('h3', null, name), h('p', null, guidance)),
        link('Enquire about ' + name + ' ↗', 'contact/index.html?treatment=' + encodeURIComponent(slug) + '#appointment', 'button'))));
}

function EditorialSteps({ label, title, items }) {
  return h('section', { className: 'wrap section editorial-steps', 'data-reveal': '' },
    h('p', { className: 'eyebrow' }, label), h('h2', null, title),
    h('ol', null, items.map(([heading, copy]) => h('li', { key: heading },
      h('h3', null, heading), h('p', null, copy)))));
}

function ClientNotes({ portfolio = false }) {
  const entries = portfolio ? [
    ['Look at the shape', 'Compare how the brow starts, arches and tapers. Save an example that matches how you like to wear your brows.'],
    ['Check the photo stage', 'Ask whether the image was taken immediately after the appointment or after healing. Use that context when discussing the finish.'],
    ['Bring a reference', 'Tell Preethi what caught your eye in the photo. It could be the softer front, the definition through the tail or the lip colour.']
  ] : [
    ['Bring your everyday look', 'A photo of how you usually fill your brows or the lip colour you reach for most can make it easier to describe what you want.'],
    ['Share your treatment history', 'Mention any previous permanent makeup or recent skincare treatments. Ask whether anything should change before your appointment.'],
    ['Ask about the days after', 'Before choosing a date, ask the studio about the aftercare instructions and when to check in about healing or a touch-up.']
  ];
  return h('section', { className: 'wrap section client-notes' },
    h('p', { className: 'eyebrow' }, portfolio ? 'THE PORTFOLIO GUIDE' : 'CLIENT NOTES'),
    h('h2', null, portfolio ? 'How to read a before-and-after photo' : 'Before your studio visit'),
    portfolio ? h('div',{className:'portfolio-guide'},entries.map(([title,copy],index)=>h('details',{key:title,open:index===0,name:'portfolio-guide'},h('summary',null,title),h('p',null,copy)))) : h('div', { className: 'note-grid' }, entries.map(([title, copy], i) => h('article', { key: title, className: 'motion-item' },
      h('span', { 'aria-hidden': 'true' }, '0' + (i + 1)), h('h3', null, title), h('p', null, copy)))));
}

function FounderNote() {
  const photo = React.useRef(null);
  useEffect(() => {
    if (!window.Motion?.inView || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let animation;
    const stop = Motion.inView(photo.current, element => {
      animation = Motion.animate(element, { clipPath: ['inset(0 0 35% 0 round 12px)', 'inset(0 0 0% 0 round 12px)'], opacity: [.6, 1] }, { duration: .7, ease: [.22, .75, .25, 1] });
    });
    return () => { stop(); animation?.stop(); };
  }, []);
  return h('section', { className: 'wrap section founder-note', 'data-reveal': '' },
    h('div', null, h('p', { className: 'eyebrow' }, 'A NOTE FROM OUR FOUNDER'),
      h('h2', null, 'A vision rooted in artistry and natural beauty'),
      h('blockquote', null,
        h('p', null, 'At Dermaphi Aesthetics, my vision is to celebrate individuality through the art of enhancing natural beauty. As a certified PhiBrows Artist, Permanent Makeup Specialist and Trainer, I believe every face has its own character. Every enhancement should be thoughtfully designed to complement it.'),
        h('p', null, 'I bring precision, creativity and a commitment to continuous learning to each treatment. I’m equally passionate about sharing what I know and helping aspiring artists develop their skills through professional PMU training.'),
        h('p', null, 'Thank you for being part of the Dermaphi journey. I look forward to hearing what feels right for you.'),
        h('cite', null, 'Preethi Sadha · Founder and PMU Artist'))),
    h('figure', { ref: photo }, h('img', { src: 'assets/client-1.jpg', alt: 'Grand PMU India 2024 participant announcement featuring Preethi Sadha Mohan', loading: 'lazy' }),
      h('figcaption', null, 'Participant · Grand PMU India 2024, Chennai')));
}
function Credentials() {
  return h('section', { className: 'wrap section credential-strip', 'aria-labelledby': 'studio-expertise' },
    h('p', { className: 'eyebrow' }, 'WHO YOU’LL MEET'),
    h('h2', { id: 'studio-expertise' }, 'Your consultation starts with Preethi'),
    h('p', null, 'Preethi Sadha leads Dermaphi Aesthetics in Chromepet, Chennai. Bring your questions about brow definition, lip colour or a previous treatment and talk through your options with the artist.'),
    h('ul', null, ['Founder of Dermaphi Aesthetics', 'PhiBrows Artist certificate, 2024', 'Permanent makeup specialist and trainer'].map(item => h('li', { className: 'motion-item', key: item }, item))));
}

function TreatmentGuide() {
  const questions = [
    ['How do the brow techniques differ?', 'Microblading focuses on individual hair-like strokes. Combination brows pair strokes with shading. Ombré brows use graduated shading for a more filled-in look.'],
    ['What should I mention if I already have permanent makeup?', 'Tell Preethi which treatment you had and when. Ask whether a touch-up or another approach is appropriate for the existing work.'],
    ['Can I enquire if I haven’t chosen a treatment?', 'Yes. Select “Help me choose” in the enquiry form and tell the studio what you would like to change.']
  ];
  return h('section', { className: 'wrap section treatment-guide', 'data-reveal': '' },
    h('p', { className: 'eyebrow' }, 'THE CONSULTATION GUIDE'),
    h('h2', null, 'Choosing your treatment'),
    questions.map(([question, answer]) => h('details', { key: question },
      h('summary', null, question), h('div', { className: 'answer' }, h('p', null, answer)))),
    link('Ask Preethi about a treatment ↗', booking, 'button'));
}

const treatmentArtwork = {
  microblading: 'M25 67Q51 29 108 46 M34 63l15-16 M46 57l15-14 M59 53l15-11 M73 51l15-7 M86 51l13-4',
  'combination-brows': 'M20 65Q56 26 110 47Q82 39 33 66Z M36 60l14-12 M49 55l15-10 M64 50l15-6',
  'ombre-brows': 'M20 67Q58 28 110 47 M24 71Q60 36 109 48 M34 72Q68 44 105 49 M48 70Q77 49 98 51',
  'lip-blush': 'M22 58Q40 53 52 42Q59 38 65 44Q71 38 78 42Q90 53 108 58Q65 91 22 58Z M22 58Q49 60 65 55Q81 60 108 58',
  'pmu-touch-ups': 'M88 39A29 29 0 1 0 92 63 M87 28l2 13-13-1 M65 40v26 M52 53h26',
  microneedling: 'M42 68l31-31 12 12-31 31Z M70 41l8 8 M57 54l8 8 M35 75l-6 6 M42 82l-5 7 M49 88l-2 6',
  'chemical-peels': 'M65 26Q92 54 88 66A23 23 0 0 1 42 66Q38 54 65 26Z M51 66Q53 78 65 79'
};
// Pointer effects inspired by React Bits Magic Bento and Tilted Card.
function trackHighlight(event) {
  if (event.pointerType !== 'mouse' || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  element.style.setProperty('--light-x', x * 100 + '%');
  element.style.setProperty('--light-y', y * 100 + '%');
  element.style.setProperty('--tilt-x', (0.5 - y) * 6 + 'deg');
  element.style.setProperty('--tilt-y', (x - 0.5) * 8 + 'deg');
  element.dataset.pointerLit = 'true';
}
function clearHighlight(event) {
  delete event.currentTarget.dataset.pointerLit;
}
const highlightEvents = { onPointerMove: trackHighlight, onPointerLeave: clearHighlight, onPointerCancel: clearHighlight };

function LineArtwork({ drawing }) {
  return h('svg', { viewBox: '0 0 130 110', 'aria-hidden': 'true', focusable: 'false' },
    h('circle', { cx: 65, cy: 55, r: 43, className: 'art-orbit' }),
    h('path', { d: drawing, className: 'art-ink', pathLength: 1 }));
}
const treatmentGroups = [
  ['Eyebrow Enhancements', 'brows-and-lips', [0, 1, 2, 4]],
  ['Lip Enhancements', 'lip-enhancements', [5, 3, 6]],
  ['Scalp Enhancement', 'scalp-enhancement', [7]],
  ['Skin Treatments', 'advanced-skincare', [8, 9, 10]]
];
function TreatmentsPage() {
  return h('div', { className: 'wrap section' },
    h('p', { className: 'services-intro' }, 'Thoughtfully designed beauty enhancements to complement your natural features. At Dermaphi Aesthetics, we bring together artistry, precision and individual care.'),
    
    treatmentGroups.map(([category, id, indices]) => h('section', { className: 'treatment-group', id, key: category, 'data-reveal': '' },
      h('h2', null, category),
      h('div', { className: 'service-grid' }, indices.map(index => treatments[index]).map(([slug, name, description, consultation]) =>
        h('article', { className: 'service illustrated-service motion-surface', id: slug, key: slug,...highlightEvents },
          h('div',{className:'treatment-art'},h(LineArtwork,{drawing:treatmentArtwork[slug] || treatmentArtwork[slug.includes('lip')?'lip-blush':slug.includes('brow')?'microblading':'microneedling']})),
          h('h3', null, name), h('p', null, description), h('p', { className: 'consultation-note' }, consultation),
          link('Enquire about ' + name, 'contact/index.html?treatment=' + encodeURIComponent(slug) + '#appointment', 'text-link')))))));
}

function ContactPage() {
  const [mapOpen, setMapOpen] = useState(false);
  const [service, setService] = useState('');
  const [formState, setFormState] = useState({
    status: 'idle',
    message: '',
    data: null
  });

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('treatment');
    if (treatments.some(([slug]) => slug === requested)) setService(requested);
  }, []);

  async function enquire(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const selected = treatments.find(([slug]) => slug === service);
    const treatmentLabel = selected ? selected[1] : (service ? service : 'Help me choose');

    const payload = {
      name: (fields.get('name') || '').trim(),
      phone: (fields.get('phone') || '').trim(),
      email: (fields.get('email') || '').trim(),
      treatment: treatmentLabel,
      treatmentSlug: service,
      preferred: (fields.get('preferred') || '').trim(),
      message: (fields.get('message') || '').trim(),
      timestamp: new Date().toISOString()
    };

    setFormState({ status: 'submitting', message: '', data: payload });

    try {
      const response = await fetch(enquiryScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const receipt = await response.json();
      if (!response.ok || receipt.status !== 'success' || receipt.saved !== true) {
        throw new Error('The enquiry endpoint did not confirm the sheet write.');
      }
      setFormState({
        status: 'success',
        message: '',
        data: {...payload, emailSent: receipt.emailSent === true}
      });
      form.reset();
      setService('');
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setFormState({
        status: 'error',
        message: 'We couldn’t confirm that your enquiry was saved. Please contact the studio on WhatsApp.',
        data: payload
      });
    }
  }

  const waEnquiryText = formState.data ? [
    'Hello Dermaphi Aesthetics, I’d like to enquire about an appointment.',
    'Name: ' + formState.data.name,
    'Phone: ' + formState.data.phone,
    formState.data.email ? 'Email: ' + formState.data.email : '',
    'Treatment: ' + formState.data.treatment,
    formState.data.preferred ? 'Preferred day or time: ' + formState.data.preferred : '',
    formState.data.message ? 'Message: ' + formState.data.message : ''
  ].filter(Boolean).join('\n') : chat;

  return h('div', { className: 'wrap section split contact-layout', 'data-reveal': '' },
    h('section', { id: 'appointment' },
      h('h2', null, 'Appointment enquiry'),
      formState.status === 'success' ? h('div', { className: 'enquiry-card enquiry-card--success', role: 'status' },
        h('span', { className: 'enquiry-badge' }, '✓ Request Received'),
        h('h3', null, 'Thank you, ' + (formState.data ? formState.data.name : '') + '!'),
        h('p', null, 'Your appointment enquiry for ', h('strong', null, formState.data ? formState.data.treatment : 'a consultation'), ' has been recorded in our appointment sheet.'),
        formState.data && formState.data.emailSent ? h('p', null, 'A confirmation email with your request details has been sent to ', h('strong', null, formState.data.email), '. Please check your inbox.') : null,
        h('p', null, 'Preethi Sadha and our studio team will contact you shortly at ', h('strong', null, formState.data ? formState.data.phone : ''), ' to confirm timing and consultation availability.'),
        h('div', { className: 'enquiry-actions' },
          h('a', { href: whatsapp(waEnquiryText), className: 'button', target: '_blank', rel: 'noopener' }, 'Chat with us on WhatsApp ↗'),
          h('button', {
            type: 'button',
            className: 'button button--secondary',
            onClick: () => setFormState({ status: 'idle', message: '', data: null })
          }, 'Send another enquiry')))
      : h(React.Fragment, null,
          h('p', null, 'Enter your details below to request a studio visit. The studio will get in touch to confirm availability.'),
          formState.status === 'error' ? h('div', { className: 'enquiry-card enquiry-card--error', role: 'alert' },
            h('p', null, formState.message),
            h('div', { className: 'enquiry-actions' },
              h('a', { href: whatsapp(waEnquiryText), className: 'button button--secondary', target: '_blank', rel: 'noopener' }, 'Continue on WhatsApp ↗'))) : null,
          h('form', { className: 'enquiry', onSubmit: enquire },
            h('label', null, 'Full name', h('input', { name: 'name', autoComplete: 'name', required: true, maxLength: 100, placeholder: 'Your full name', defaultValue: formState.data ? formState.data.name : '' })),
            h('label', null, 'Phone number', h('input', { name: 'phone', type: 'tel', autoComplete: 'tel', required: true, maxLength: 25, placeholder: '+91 98765 43210', defaultValue: formState.data ? formState.data.phone : '' })),
            h('label', null, 'Email address', h('input', { name: 'email', type: 'email', autoComplete: 'email', required: true, maxLength: 100, placeholder: 'name@example.com', defaultValue: formState.data ? formState.data.email : '' })),
            h('label', null, 'Treatment', h('select', { name: 'treatment', value: service, onChange: event => setService(event.target.value) },
              h('option', { value: '' }, 'Help me choose'),
              treatments.map(([slug, name]) => h('option', { key: slug, value: slug }, name)))),
            h('label', null, 'Preferred day or time (optional)', h('input', { name: 'preferred', maxLength: 100, placeholder: 'For example, Saturday morning', defaultValue: formState.data ? formState.data.preferred : '' })),
            h('label', null, 'Questions or notes (optional)', h('textarea', { name: 'message', rows: 4, maxLength: 500, placeholder: 'Any questions, skin sensitivities or preferences...', defaultValue: formState.data ? formState.data.message : '' })),
            h('button', { type: 'submit', className: 'button', disabled: formState.status === 'submitting' },
              formState.status === 'submitting' ? 'Submitting enquiry…' : 'Submit Appointment Enquiry ↗'))),
      link('Use Dermaphi’s online booking form ↗', onlineBooking, 'text-link')),
    h('section', { className: 'studio-contact studio-ticket' },
      h('div', { className: 'ticket-art motion-surface', ...highlightEvents }, h('span', null, 'DERMAPHI / STUDIO'), h(LineArtwork, {
        drawing: 'M65 86Q37 62 43 45A23 23 0 0 1 87 45Q93 62 65 86Z M65 43a9 9 0 1 0 0 18a9 9 0 1 0 0-18 M27 75h16 M87 75h16'
      }), h('span', null, 'CHENNAI · INDIA')),
      h('h2', null, 'Chennai studio'),
      h('address', null, studioAddress),
      link('Call +91 80980 70829', 'tel:+918098070829', 'text-link'),
      link('Email the studio', 'mailto:everything4aesthetic@gmail.com', 'text-link'),
      h(SocialLinks),
      link('Chat on WhatsApp ↗', chat, 'text-link'),
      link('Search Google Maps ↗', 'https://www.google.com/maps/search/?api=1&query=' + mapQuery, 'text-link'),
      link('Get directions ↗', directions, 'text-link'),
      mapOpen ? h('iframe', { title: 'Google Maps search for Dermaphi Aesthetics, Chennai', src: 'https://maps.google.com/maps?q=' + mapQuery + '&output=embed', loading: 'lazy' })
        : h('button', { type: 'button', className: 'button', onClick: () => setMapOpen(true) }, 'Load Google Map')));
}

function ContactHero() {
  const actions = [
    ['Request an appointment', 'Share your treatment of interest and preferred time.', booking, 'Open enquiry form ↓'],
    ['Chat on WhatsApp', 'Ask the studio about treatments or availability.', chat, 'Message the studio ↗'],
    ['Find the Chromepet studio', studioAddress, directions, 'Get directions ↗']
  ];
  return h('section', { className: 'contact-welcome', 'aria-labelledby': 'contact-welcome-title' },
    h('div', { className: 'wrap' },
      h('div', { className: 'contact-welcome-copy' },
        h('p', { className: 'eyebrow' }, 'DERMAPHI AESTHETICS · CHROMEPET, CHENNAI'),
        h('h1', { id: 'contact-welcome-title' }, 'Plan your studio visit.'),
        h('p', null, 'Book a consultation with Preethi Sadha or get in touch before choosing a treatment.')),
      h('div', { className: 'contact-welcome-actions' },
        actions.map(([title, description, href, label]) => h('a', { key: title, href },
          h('h2', null, title), h('p', null, description), h('span', null, label))))));
}

function InteriorHero({ page, title, summary }) {
  if (page === 'contact') return h(ContactHero);
  const copy = h('div', { className: 'inner-hero-copy' },
    h('div', { className: 'breadcrumbs' }, link('Home', url('home'))),
    h('h1', null, title), h('p', null, summary),
    page==='treatments' && h('nav',{className:'service-hero-index','aria-label':'Treatment categories'},treatmentGroups.map(([name,id])=>h('a',{key:id,href:url('treatments')+'#'+id},name,h('span',{'aria-hidden':'true'},'↘')))));
  const artwork = {
    about: h('figure', { className: 'hero-founder founder-single' },
      h('img', { src: 'assets/studio-3.jpg', alt: 'Preethi Sadha holding a brow measuring tool', fetchPriority: 'high' }),
      h('figcaption', null, 'Preethi Sadha · Founder and PMU Artist')),
    treatments: h('figure', {className:'service-hero-photo'},
      h('img',{src:'assets/studio-1.jpg',alt:'Preethi working on a client’s brows at Dermaphi Aesthetics',fetchPriority:'high'}),
      h('figcaption',null,'Brow artistry at Dermaphi')),
    results: h('a',{className:'portfolio-hero-photo',href:url('results')+'#client-portfolio'},
      h('img',{src:'assets/client-4.jpg',alt:'Before-and-after brow comparison by Dermaphi'}),
      h('span',null,'Explore the portfolio ↓')),

  };
  return h('section', { className: 'inner-hero concept-hero inner-hero--' + page }, h('div', { className: 'wrap inner-hero-grid' }, copy, h('div', { className: 'concept-scene', ...heroPointer }, h('div', { className: 'concept-layer' }, artwork[page]))));
}

function InteriorPage({ page, sections }) {
  const [title, summary] = pages[page];
  const headings = { about: 'Meet the artist behind Dermaphi', treatments: 'Our services in Chennai', results: 'The details make the difference', contact: 'Let’s talk about your appointment' };
  const content = {
    treatments: h(React.Fragment, null, h(TreatmentsPage), h(FinishFinder), h(TreatmentGuide), h(ClientNotes)),
    contact: h(React.Fragment, null, h(ContactPage), h(ClientNotes), h(EditorialSteps, {
      label: 'AFTER YOU ENQUIRE', title: 'From enquiry to appointment',
      items: [
        ['Share your preferences', 'Choose a treatment or describe the brow, lip or skincare result you’re interested in.'],
        ['Send your enquiry', 'Submit your details online or message the studio on WhatsApp.'],
        ['Confirm with the studio', 'Ask the studio about availability, preparation and the exact address before making your visit.']
      ]
    })),
    about: h(React.Fragment, null, h(FounderNote), h(Credentials),
      h(StudioDepthGallery, { id: 'preethi-photo-story', variant: 'depth-ribbon', title: 'Behind the artistry', intro: 'See Preethi at work and explore photos from her permanent makeup training journey.' }), h('section', { className: 'wrap section studio' },
        h('h2', null, 'What does your everyday look like?'),
        h('p', null, 'Some clients want to fill a small gap in their brows. Others want the soft definition they usually create with a brow pencil. Preethi starts with what you like about your features, what you’d like to change, and how much definition you want to see day to day.'),
        link('Browse treatments →', url('treatments'), 'text-link')),
      h(EditorialSteps, {
        label: 'THE DERMAPHI APPROACH', title: 'How to prepare for your consultation',
        items: [
          ['Bring a reference', 'A photo can help you explain the shape, colour or finish you prefer.'],
          ['Mention previous permanent makeup', 'Tell Preethi what you had done and when, so you can discuss the next step together.'],
          ['Bring your questions', 'Ask about the treatment, preparation, aftercare and whether a follow-up may be needed.']
        ]
      })),
    results: h(React.Fragment, null, h(StudioDepthGallery, { id: 'client-portfolio', variant: 'orbit', photos: clientPhotos.filter(([src])=>src!=='client-4.jpg'), title: 'Brow and lip portfolio', intro: 'Explore Dermaphi’s latest brow comparisons and lip close-ups.' }), h(ClientNotes, { portfolio: true }), h('section', { className: 'wrap section' },
      h('h2', null, 'What would you like to ask Preethi?'),
      h('p', null, '“I like the shape in this photo. Can we keep the front of my brows softer?” Bring a question like this, or send us a reference you like.'),
      link('Talk to the studio on WhatsApp ↗',chat,'text-link')),
      h(EditorialSteps, {
        label: 'LOOKING AT THE DETAILS', title: 'What to notice in the gallery',
        items: [
          ['Shape', 'Compare the outline and the balance of the features in each photo.'],
          ['Definition', 'Look at where the detail is concentrated and where the finish is softer.'],
          ['Your preferences', 'Save an example you like and bring it to your consultation as a starting point.']
        ]
      }))
  };
  return h(React.Fragment, null,
    h(InteriorHero, { page, title: headings[page] || title, summary }),
    content[page]);
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  ReactDOM.hydrateRoot(root, h(App, { page: root.dataset.page }));
}

