const { createElement: h, useEffect, useState } = React;
// Google Apps Script Web App endpoint for Google Sheet and Email notifications
const enquiryScriptUrl = 'https://script.google.com/macros/s/AKfycbw3vuI0EaK1UyySIze-W1E_DP1yVUWz_Lox4JhLBnJ_9M9PslyvsD6I-9x0USqJTc_R/exec';
const onlineBooking = 'https://www.dermaphiaesthetics.com/book-your-appointment';
const booking = 'contact/index.html#appointment';
const whatsapp = message => 'https://wa.me/918098070829?text=' + encodeURIComponent(message);
const chat = whatsapp('Hello Dermaphi Aesthetics, I’d like to enquire about an appointment.');
const studioAddress = '1, 1st Floor, NSR Road, Hasthinapuram, Chrompet, Chennai 600044';
const mapQuery = encodeURIComponent(studioAddress);
const directions = 'https://www.google.com/maps/dir/?api=1&destination=' + mapQuery;
const navigation = [['Home', 'home'], ['About Us', 'about'], ['Treatments & Services', 'treatments'], ['Gallery & Testimonials', 'results'], ['Contact & Book Appointment', 'contact']];
const headerLabels = { about: 'About', treatments: 'Treatments', results: 'Gallery', contact: 'Contact' };
const treatments = [
  ['microblading', 'Microblading', "Fine, hair-like strokes add definition to sparse areas while following the look of your existing brow hairs.", 'Discuss your natural brow shape, where you would like more definition, and how closely you want the strokes to follow your existing brow pattern.'],
  ['combination-brows', 'Combination Brows', "Hair strokes and soft shading give the brow more depth. Explore this option if you like the detail of microblading and want a softly filled-in finish.", 'Bring examples of the brow definition you like so you and Preethi can discuss where to place strokes and where a shaded finish may suit you.'],
  ['ombre-brows', 'Ombré Brows', "Graduated shading gives brows a softer front and more definition through the arch and tail, similar to lightly applied brow powder.", 'At your consultation, discuss how soft you want the front of the brow to look and how much definition you prefer through the arch and tail.'],
  ['lip-blush', 'Signature Lip Blush', 'A semi-permanent watercolor tint that adds soft, youthful flush and defined symmetry ("your-lips-but-better"). Lasts 1–3 years with 20-min pre-numbing; custom-blended to your unique undertone.', 'At your consultation, Preethi tests shades on your lips to achieve your ideal nude-pink or soft rose tint. If you have darker or uneven pigmentation, we pair this with lip neutralization so the color heals true.'],
  ['eyebrow-lamination', 'Eyebrow Lamination', 'Reshapes and sets natural brow hairs for a fuller, groomed appearance.', 'Discuss the direction and amount of lift you prefer.'],
  ['lip-neutralization', 'Dark Lip Neutralization', 'Targeted corrective pigments to cancel cool, dark, or patchy hyperpigmentation caused by sun exposure or melanin variations, restoring an even, warm base tone.', 'Preethi evaluates your natural lip melanin. Neutralization ensures that subsequent lip blush tints heal clean and radiant rather than muddy or dull.'],
  ['lip-liner', 'Lip Liner', 'Adds definition along the natural lip contour.', 'Discuss how subtle or defined you want the outline to look.'],
  ['scalp-micropigmentation', 'Scalp Micropigmentation (SMP)', 'Small pigment impressions can create the appearance of greater hair density or a closely shaved hairstyle.', 'Bring a reference for the hairline or finish you want to discuss.'],
  ['bb-glow', 'BB Glow', 'A skin treatment aimed at a more even-looking, radiant complexion.', 'Ask the studio what the treatment involves and discuss suitability for your skin.'],
  ['microneedling', 'Serum-Infused Microneedling', 'Combines microneedling with selected topical serums.', 'Discuss your skincare routine and ask which serum, if any, is appropriate for your skin.'],
  ['medi-facials', 'Medi Facials', 'Targeted facials tailored to your skin type and concerns.', 'Share your skincare goals and any sensitivities during the consultation.'],
  ['beauty-spot', 'Bespoke Beauty Spot', 'A delicate, semi-permanent cosmetic beauty mark (mole tattoo) placed to accentuate facial symmetry, eyes, lips, or cheekbones with classic elegance and zero daily makeup.', 'Preethi pencil-maps prospective placements with you in the studio mirror first. We custom-blend pigment to match your natural melanin undertone so the mark heals looking authentically yours.']
];
const url = page => page === 'home' ? 'index.html' : page + '/index.html';
const pages = {
  home: ['Permanent Makeup in Chennai', 'Explore microblading, ombré brows and lip blush with Preethi Sadha at Dermaphi Aesthetics in Chrompet, Chennai. View client results and request a consultation.'],
  treatments: ['PMU & Skincare Treatments in Chennai', 'Explore Dermaphi’s eyebrow, lip, scalp and skincare treatments in Chrompet, Chennai.'],
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

// ==========================================================================
// REACT BITS & THREE.JS / CANVAS ANIMATION SUITE
// ==========================================================================

// Interactive 3D Golden Ratio Canvas Particles (Three.js / WebGL inspired)
function GoldenCosmosCanvas({ className = 'hero-cosmos-canvas', count = 75, speed = 0.8, color = 'gold' }) {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let isVisible = true;
    let mouse = { x: width / 2, y: height / 2, active: false, radius: 140 };

    // Golden Ratio (Phi) Logarithmic Spiral Distribution
    const PHI = 1.6180339887;
    const particles = [];
    const particleCount = matchMedia('(max-width: 768px)').matches ? Math.round(count * 0.5) : count;

    const palette = color === 'rose'
      ? ['rgba(230, 150, 175, ', 'rgba(214, 110, 142, ', 'rgba(237, 203, 137, ', 'rgba(255, 230, 240, ']
      : ['rgba(237, 203, 137, ', 'rgba(245, 220, 160, ', 'rgba(214, 110, 142, ', 'rgba(255, 245, 230, '];

    for (let i = 0; i < particleCount; i++) {
      const angle = i * PHI * Math.PI * 2;
      const radius = Math.sqrt(i / particleCount) * (Math.min(width, height) * 0.48);
      particles.push({
        baseX: width / 2 + Math.cos(angle) * radius,
        baseY: height / 2 + Math.sin(angle) * radius,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        size: Math.random() * 2.2 + 0.8,
        colorPrefix: palette[i % palette.length],
        alpha: Math.random() * 0.6 + 0.25,
        angle: angle,
        orbitSpeed: (Math.random() * 0.003 + 0.001) * (i % 2 === 0 ? 1 : -1) * speed,
        orbitRadius: radius,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI
      });
    }

    function onResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function onMouseLeave() {
      mouse.active = false;
    }

    window.addEventListener('resize', onResize);
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    function render() {
      if (isVisible && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.angle += p1.orbitSpeed;
          p1.pulseVal += p1.pulseSpeed;
          const currentAlpha = p1.alpha * (0.7 + Math.sin(p1.pulseVal) * 0.3);

          let targetX = width / 2 + Math.cos(p1.angle) * p1.orbitRadius;
          let targetY = height / 2 + Math.sin(p1.angle) * p1.orbitRadius;

          if (mouse.active) {
            const dx = mouse.x - p1.x;
            const dy = mouse.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const force = (1 - dist / mouse.radius) * 24;
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * force;
            }
          }

          p1.x += (targetX - p1.x) * 0.06;
          p1.y += (targetY - p1.y) * 0.06;

          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
          ctx.fillStyle = p1.colorPrefix + currentAlpha + ')';
          ctx.shadowColor = p1.colorPrefix + '0.7)';
          ctx.shadowBlur = p1.size > 2 ? 8 : 4;
          ctx.fill();
          ctx.shadowBlur = 0;

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
            if (distSq < 4900) {
              const lineAlpha = (1 - Math.sqrt(distSq) / 70) * 0.16;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p1.colorPrefix + lineAlpha + ')';
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, [count, speed, color]);

  return h('canvas', { ref: canvasRef, className: className, 'aria-hidden': 'true' });
}

// React Bits: Shiny Text (Liquid Gold Light Sweep)
function ShinyText({ text, className = '', disabled = false, speed = 5 }) {
  return h('span', {
    className: 'shiny-text ' + className + (disabled ? ' disabled' : ''),
    style: { animationDuration: speed + 's' }
  }, text);
}

// React Bits: Spotlight Card (Cursor Radial Illumination)
function SpotlightCard({ children, className = '', spotlightColor = 'rgba(237, 203, 137, 0.2)', ...props }) {
  const cardRef = React.useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0, opacity: 0 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  }

  function handleMouseLeave() {
    setPosition(prev => ({ ...prev, opacity: 0 }));
  }

  return h('div', {
    ref: cardRef,
    className: 'reactbits-spotlight-card ' + className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...props
  },
    h('div', {
      className: 'spotlight-glow-overlay',
      style: {
        opacity: position.opacity,
        background: `radial-gradient(circle 260px at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
      },
      'aria-hidden': 'true'
    }),
    children
  );
}

// React Bits: Decrypted Text (Cyber-Luxury Scramble Reveal)
function DecryptedText({ text, className = '', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦Φ' }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = React.useRef(null);

  function triggerScramble() {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return text[index];
          return characters[Math.floor(Math.random() * characters.length)];
        }).join('')
      );
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, 30);
  }

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return h('span', {
    className: 'decrypted-text ' + className,
    onMouseEnter: triggerScramble
  }, displayText);
}

// React Bits: Star Border (Running Luminous Border Effect)
function StarBorder({ as = 'div', className = '', color = '#edcb89', speed = '6s', children, ...props }) {
  return h(as, {
    className: 'star-border-container ' + className,
    ...props
  },
    h('div', {
      className: 'star-border-glow',
      style: {
        background: `radial-gradient(circle, ${color} 10%, transparent 60%)`,
        animationDuration: speed
      },
      'aria-hidden': 'true'
    }),
    h('div', { className: 'star-border-inner' }, children)
  );
}

// ==========================================================================
// React Bits: TechText (Architectural Blueprint & Golden Ratio Heading Animation)
// Based on https://reactbits.dev/c/text-animations/tech-text
// Features: Architectural guidelines, cap/baseline metrics, dashed outline
// drafting, interactive spring physics, coordinate frames, and specks.
// ==========================================================================

const TECH_LABEL_FONT = '9px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const TECH_FALLOFF_STEPS = 8;
const TECH_SPRING = 320;
const TECH_INHERIT = /^(currentcolor|inherit)$/i;
const TECH_INTRO_DELAY = 0.08;
const TECH_KICK_DECAY = 0.62;

const techApproach = (current, target, dt, seconds) => current + (target - current) * (1 - Math.exp(-dt / seconds));
const techClamp01 = value => Math.min(1, Math.max(0, Number(value) || 0));
const techSmoothstep = (edge0, edge1, value) => {
  const t = techClamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
const techNoise = (...values) => {
  let h = 2166136261;
  for (const value of values) {
    h = Math.imul(h ^ (value | 0), 16777619);
    h ^= h >>> 13;
    h = Math.imul(h, 0x5bd1e995);
    h ^= h >>> 15;
  }
  return (h >>> 0) / 4294967296;
};
const techSigned = value => (value > 0 ? ('+' + value) : value < 0 ? ('−' + (-value)) : '0');

function TechText({
  text = '',
  fontFamily = "'Cormorant Garamond', Georgia, serif",
  fontStyle = '',
  fontWeight = 400,
  fontSize = 54,
  letterSpacing = -0.015,
  color = 'currentColor',
  accentColor = 'currentColor',
  align = 'left',
  reach = 180,
  softness = 0.75,
  dashLength = 4,
  dashGap = 2,
  strokeWidth = 1.4,
  lineStyle = 'dashed',
  reveal = 'letter',
  specks = 12,
  selection = true,
  labels = true,
  draggable = true,
  bounce = 0.45,
  sweep = true,
  speed = 1,
  clickKick = true,
  intro = 'metrics',
  introDuration = 1.6,
  guides = true,
  className = '',
  style
}) {
  const containerRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const settingsRef = React.useRef(null);
  const wakeRef = React.useRef(() => { });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    settingsRef.current = {
      text,
      fontFamily,
      fontStyle,
      fontWeight,
      fontSize,
      letterSpacing,
      color,
      accentColor,
      align,
      reach,
      softness,
      dashLength,
      dashGap,
      strokeWidth,
      lineStyle,
      reveal,
      specks,
      selection,
      labels,
      draggable,
      bounce,
      sweep,
      speed,
      clickKick,
      intro,
      introDuration,
      guides
    };
    wakeRef.current();
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    const scratch = document.createElement('canvas');
    const scratchCtx = scratch.getContext('2d');
    if (!ctx || !scratchCtx) return;

    setMounted(true);

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let visible = false;
    let alive = true;
    let layoutKey = '';
    let sizeDirty = true;
    let requestedFont = '';
    let word = null;
    let glyphs = [];
    let presence = 0;
    let clock = 0;
    let pulse = 0;
    let dragging = -1;
    let cursor = '';
    let introClock = 0;
    let introKind = '';
    let introducing = false;
    let fontsReady = !document.fonts;
    let guideAlpha = 0;
    const kicks = [];
    const press = { x: 0, y: 0, time: 0, index: -1 };
    const pointer = { x: 0, y: 0, inside: false };
    const grab = { x: 0, y: 0 };
    const lens = { x: 0, y: 0 };
    const frame = { x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0, index: -1 };

    const refreshFonts = () => {
      layoutKey = '';
      wakeRef.current();
    };

    const fontsLoaded = () => {
      fontsReady = true;
      refreshFonts();
    };

    const family = s => s.fontFamily || (typeof getComputedStyle !== 'undefined' ? getComputedStyle(container).fontFamily : 'serif') || 'serif';
    const fontFor = (s, size) => {
      const st = s.fontStyle ? (s.fontStyle + ' ') : '';
      return `${st}${s.fontWeight || 400} ${size}px ${family(s)}`;
    };

    const palette = s => {
      const current = (typeof getComputedStyle !== 'undefined' ? getComputedStyle(container).color : '#351624') || '#351624';
      const pick = value => (!value || TECH_INHERIT.test(String(value).trim()) ? current : value);
      return { ink: pick(s.color), accent: pick(s.accentColor) };
    };

    const setFont = (target, s, size) => {
      target.font = fontFor(s, size);
      if ('letterSpacing' in target) target.letterSpacing = `${s.letterSpacing * size}px`;
      target.textAlign = 'left';
      target.textBaseline = 'alphabetic';
    };

    const sprite = (s, view, glyph, stroke, ink) => {
      const pad = Math.ceil(s.strokeWidth * 2 + 4);
      const left = glyph.box.x1 - pad;
      const top = glyph.box.y1 - pad;
      const w = glyph.box.x2 - glyph.box.x1 + pad * 2;
      const h = glyph.box.y2 - glyph.box.y1 + pad * 2;
      const image = document.createElement('canvas');
      image.width = Math.max(1, Math.ceil(w * dpr));
      image.height = Math.max(1, Math.ceil(h * dpr));
      const c = image.getContext('2d');
      if (!c) return { image, left, top };
      c.setTransform(dpr, 0, 0, dpr, -left * dpr, -top * dpr);
      setFont(c, s, view.size);
      if (stroke) {
        c.lineJoin = 'round';
        c.lineWidth = s.strokeWidth * 2;
        c.lineCap = 'butt';
        c.strokeStyle = ink;
        if (s.lineStyle !== 'solid') c.setLineDash([Math.max(1, s.dashLength), Math.max(1, s.dashGap)]);
        c.strokeText(glyph.char, glyph.x, view.baseline);
        c.setLineDash([]);
        c.globalCompositeOperation = 'destination-out';
        c.fillStyle = '#000000';
        c.fillText(glyph.char, glyph.x, view.baseline);
        c.globalCompositeOperation = 'source-over';
      } else {
        c.fillStyle = ink;
        c.fillText(glyph.char, glyph.x, view.baseline);
      }
      return { image, left, top };
    };

    const ensureLayout = (s, ink) => {
      const key = [
        s.text,
        family(s),
        s.fontStyle,
        s.fontWeight,
        s.fontSize,
        s.letterSpacing,
        s.align,
        ink,
        s.dashLength,
        s.dashGap,
        s.strokeWidth,
        s.lineStyle,
        width,
        height,
        dpr
      ].join('|');
      if (key === layoutKey && word) return word;
      layoutKey = key;
      const wanted = fontFor(s, 54);
      if (document.fonts && wanted !== requestedFont) {
        requestedFont = wanted;
        document.fonts.load(wanted, s.text).then(refreshFonts, refreshFonts);
      }

      const probe = scratchCtx;
      setFont(probe, s, s.fontSize);
      let m = probe.measureText(s.text);
      const inkW = Math.max((m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width), m.width, 1);
      const inkH = Math.max((m.actualBoundingBoxAscent || s.fontSize * 0.8) + (m.actualBoundingBoxDescent || s.fontSize * 0.2), s.fontSize, 1);
      const fit = Math.min(
        1,
        (width * 0.98) / inkW,
        (height * 0.86) / inkH
      );
      const size = s.fontSize * fit;
      setFont(probe, s, size);
      m = probe.measureText(s.text);
      const inkWidth = Math.max((m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width), m.width);
      const inkHeight = Math.max((m.actualBoundingBoxAscent || size * 0.8) + (m.actualBoundingBoxDescent || size * 0.2), size);
      const margin = s.align === 'left' ? 2 : width * 0.05;
      const start = s.align === 'left' ? margin : s.align === 'right' ? width - margin - inkWidth : (width - inkWidth) / 2;
      const x = start + (m.actualBoundingBoxLeft || 0);
      const baseline = (height - inkHeight) / 2 + (m.actualBoundingBoxAscent || size * 0.78);
      const xAsc = probe.measureText('x').actualBoundingBoxAscent || size * 0.5;
      const hAsc = probe.measureText('H').actualBoundingBoxAscent || size * 0.72;
      const dAsc = probe.measureText('d').actualBoundingBoxAscent || size * 0.76;
      const pDesc = probe.measureText('p').actualBoundingBoxDescent || size * 0.22;
      const xHeight = baseline - xAsc;
      const capHeight = baseline - hAsc;
      const ascender = baseline - dAsc;
      const descender = baseline + pDesc;
      const top = baseline - (m.actualBoundingBoxAscent || size * 0.78);
      const bottom = baseline + (m.actualBoundingBoxDescent || size * 0.22);
      const inkTop = Math.min(top, capHeight) - 2;
      const inkBottom = Math.max(bottom, baseline) + 2;
      const next = {
        size,
        baseline,
        left: x - (m.actualBoundingBoxLeft || 0),
        right: x + (m.actualBoundingBoxRight || m.width),
        top,
        bottom,
        lines: [
          { y: baseline, label: 'baseline' },
          { y: xHeight, label: 'x-height' },
          { y: capHeight, label: 'cap height' },
          ...(capHeight - ascender > Math.max(10, size * 0.05) ? [{ y: ascender, label: 'ascender' }] : []),
          { y: descender, label: 'descender' }
        ],
        bands: [
          { y0: xHeight, y1: baseline, up: true, order: 0 },
          { y0: capHeight, y1: xHeight, up: true, order: 1 },
          { y0: inkTop, y1: capHeight, up: true, order: 2 },
          { y0: baseline, y1: inkBottom, up: false, order: 1 }
        ].filter(band => band.y1 - band.y0 > 0.5)
      };
      word = next;

      const chars = Array.from(s.text);
      const previous = glyphs;
      glyphs = [];
      let prefix = '';
      chars.forEach((char, i) => {
        prefix += char;
        const own = probe.measureText(char);
        const gx = x + probe.measureText(prefix).width - own.width;
        if (!char.trim()) return;
        const base = {
          char,
          x: gx,
          box: {
            x1: gx - (own.actualBoundingBoxLeft || 0),
            y1: baseline - (own.actualBoundingBoxAscent || size * 0.78),
            x2: gx + (own.actualBoundingBoxRight || own.width),
            y2: baseline + (own.actualBoundingBoxDescent || size * 0.22)
          }
        };
        const kept = previous[glyphs.length];
        const sameGlyph = kept?.char === char && kept.index === i;
        glyphs.push({
          ...base,
          offset: sameGlyph ? kept.offset : { x: 0, y: 0 },
          velocity: sameGlyph ? kept.velocity : { x: 0, y: 0 },
          outline: sameGlyph ? kept.outline : 0,
          shown: sameGlyph ? kept.shown : 1,
          index: i,
          fill: sprite(s, next, base, false, ink),
          dashes: sprite(s, next, base, true, ink)
        });
      });
      if (dragging >= 0 && glyphs[dragging]?.index !== previous[dragging]?.index) dragging = -1;
      if (frame.index >= 0 && glyphs[frame.index]?.char !== previous[frame.index]?.char) frame.index = -1;
      return next;
    };

    const glyphAt = (x, y) => {
      if (!word || y < word.top - 24 || y > word.bottom + 24) return -1;
      let best = -1;
      let bestDistance = Infinity;
      glyphs.forEach((glyph, i) => {
        const x1 = glyph.box.x1 + glyph.offset.x;
        const x2 = glyph.box.x2 + glyph.offset.x;
        const d = x < x1 ? x1 - x : x > x2 ? x - x2 : 0;
        if (d < bestDistance) {
          bestDistance = d;
          best = i;
        }
      });
      return bestDistance < 28 ? best : -1;
    };

    const falloff = (target, cx, cy, radius, strength, softness) => {
      const inner = Math.min(1, Math.max(0, 1 - softness));
      const gradient = target.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `rgba(0, 0, 0, ${strength})`);
      if (inner > 0.995) {
        gradient.addColorStop(0.995, `rgba(0, 0, 0, ${strength})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        return gradient;
      }
      for (let i = 0; i <= TECH_FALLOFF_STEPS; i++) {
        const t = i / TECH_FALLOFF_STEPS;
        const eased = t * t * (3 - 2 * t);
        gradient.addColorStop(inner + (1 - inner) * t, `rgba(0, 0, 0, ${strength * (1 - eased)})`);
      }
      return gradient;
    };

    const blit = (target, art, dx, dy, originX, originY) => {
      target.drawImage(
        art.image,
        Math.round((art.left + dx) * dpr - originX),
        Math.round((art.top + dy) * dpr - originY)
      );
    };

    const drawReveal = s => {
      const radius = s.reach * dpr;
      const cx = lens.x * dpr;
      const cy = lens.y * dpr;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = falloff(ctx, cx, cy, radius, presence, s.softness);
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.globalCompositeOperation = 'source-over';

      const x0 = Math.max(0, Math.floor(cx - radius));
      const y0 = Math.max(0, Math.floor(cy - radius));
      const x1 = Math.min(canvas.width, Math.ceil(cx + radius));
      const y1 = Math.min(canvas.height, Math.ceil(cy + radius));
      if (x1 <= x0 || y1 <= y0) return;
      const w = x1 - x0;
      const h = y1 - y0;
      if (scratch.width < w || scratch.height < h) {
        scratch.width = Math.max(scratch.width, w);
        scratch.height = Math.max(scratch.height, h);
      }
      scratchCtx.setTransform(1, 0, 0, 1, 0, 0);
      scratchCtx.globalCompositeOperation = 'source-over';
      scratchCtx.clearRect(0, 0, w, h);
      for (const glyph of glyphs) blit(scratchCtx, glyph.dashes, glyph.offset.x, glyph.offset.y, x0, y0);
      scratchCtx.globalCompositeOperation = 'destination-in';
      scratchCtx.fillStyle = falloff(scratchCtx, cx - x0, cy - y0, radius, 1, s.softness);
      scratchCtx.fillRect(0, 0, w, h);
      scratchCtx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = presence;
      ctx.drawImage(scratch, 0, 0, w, h, x0, y0, w, h);
      ctx.globalAlpha = 1;
    };

    const crisp = value => (Math.round(value * dpr) + 0.5) / dpr;

    const perimeterPoint = (distance, w, h) => {
      let d = ((distance % (2 * (w + h))) + 2 * (w + h)) % (2 * (w + h));
      if (d < w) return [frame.x1 + d, frame.y1, 0, -1];
      d -= w;
      if (d < h) return [frame.x2, frame.y1 + d, 1, 0];
      d -= h;
      if (d < w) return [frame.x2 - d, frame.y2, 0, 1];
      d -= w;
      return [frame.x1, frame.y2 - d, -1, 0];
    };

    const drawSpecks = (s, a, accent) => {
      const w = frame.x2 - frame.x1;
      const h = frame.y2 - frame.y1;
      if (w < 2 || h < 2) return;
      const perimeter = 2 * (w + h);
      const seed = frame.index + 1;
      const grid = 3;
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;

      for (let k = 0; k < s.specks; k++) {
        const period = 0.5 + techNoise(seed, k, 11) * 1.2;
        const t = pulse / period + techNoise(seed, k, 17);
        const cycle = Math.floor(t);
        const life = t - cycle;
        if (life > 0.7) continue;
        const [px, py, nx, ny] = perimeterPoint(techNoise(seed, k, cycle) * perimeter, w, h);
        const pick = techNoise(seed, k, cycle, 2);
        const size = pick < 0.46 ? 2 : pick < 0.7 ? 3 : pick < 0.84 ? 5 : pick < 0.94 ? 8 : 11;
        const large = size >= 8;
        const out = (large ? 9 : 4) + Math.floor(techNoise(seed, k, cycle, 1) * 5) * grid;
        const x = frame.x1 + Math.round((px + nx * out - frame.x1) / grid) * grid;
        const y = frame.y1 + Math.round((py + ny * out - frame.y1) / grid) * grid;
        const tone = techNoise(seed, k, cycle, 3);
        const blink = life < 0.06 || (life > 0.32 && life < 0.36) ? 0.35 : 1;
        const alpha = a * (large ? 0.3 + 0.4 * tone : 0.3 + 0.6 * tone) * blink;
        const left = Math.round(x - size / 2);
        const top = Math.round(y - size / 2);
        ctx.globalAlpha = alpha;
        if (tone < 0.26 || (large && tone < 0.78)) {
          ctx.strokeRect(left + 0.5, top + 0.5, size, size);
          if (large && tone > 0.5) ctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 2, 2);
        } else {
          ctx.fillRect(left, top, size, size);
        }
      }

      for (let j = 0; j < 2; j++) {
        const head = (pulse * 0.42 * s.speed + j * 0.5) * perimeter;
        for (let i = 0; i < 4; i++) {
          const [x, y] = perimeterPoint(head - i * 6, w, h);
          const size = i === 0 ? 3 : 2;
          ctx.globalAlpha = a * [0.95, 0.55, 0.32, 0.16][i];
          ctx.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawFrame = (s, accent) => {
      const glyph = glyphs[frame.index];
      if (!glyph || frame.alpha < 0.01) return;
      const a = frame.alpha;
      const x1 = crisp(frame.x1);
      const y1 = crisp(frame.y1);
      const x2 = crisp(frame.x2);
      const y2 = crisp(frame.y2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;

      const moved = Math.hypot(glyph.offset.x, glyph.offset.y);
      if (moved > 1) {
        const hx = (glyph.box.x1 + glyph.box.x2) / 2;
        const hy = (glyph.box.y1 + glyph.box.y2) / 2;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(hx + glyph.offset.x, hy + glyph.offset.y);
        ctx.setLineDash([3, 4]);
        ctx.globalAlpha = 0.45 * a;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.rect(Math.round(hx) - 2, Math.round(hy) - 2, 4, 4);
        ctx.globalAlpha = 0.7 * a;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.rect(x1, y1, x2 - x1, y2 - y1);
      ctx.globalAlpha = 0.5 * a;
      ctx.stroke();

      ctx.beginPath();
      for (const [cx, cy] of [
        [x1, y1], [x2, y1], [x1, y2], [x2, y2]
      ]) {
        ctx.moveTo(cx - 3, cy); ctx.lineTo(cx + 3, cy);
        ctx.moveTo(cx, cy - 3); ctx.lineTo(cx, cy + 3);
      }
      ctx.globalAlpha = 0.8 * a;
      ctx.stroke();

      if (s.specks > 0) drawSpecks(s, a, accent);

      if (!s.labels) return;
      ctx.font = TECH_LABEL_FONT;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.62 * a;
      const label =
        moved > 1
          ? `${techSigned(Math.round(glyph.offset.x))}, ${techSigned(Math.round(-glyph.offset.y))}`
          : `${glyph.char}  ${Math.round(glyph.box.x2 - glyph.box.x1)} × ${Math.round(glyph.box.y2 - glyph.box.y1)}`;
      ctx.fillText(label, Math.round(frame.x1), Math.round(frame.y1) - 6);
      ctx.globalAlpha = 1;
    };

    const drawLines = (s, view, accent, alpha, growth) => {
      const pad = Math.max(8, view.size * 0.08);
      const x1 = Math.round(view.left - pad);
      const x2 = Math.round(view.right + pad);
      const room = width - x2 > x1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;
      ctx.lineWidth = 1;
      ctx.font = TECH_LABEL_FONT;
      ctx.textBaseline = 'middle';
      ctx.textAlign = room ? 'left' : 'right';
      view.lines.forEach((line, k) => {
        const grow = growth(k);
        if (grow <= 0.001) return;
        const y = crisp(line.y);
        const end = x1 + (x2 - x1) * grow;
        ctx.globalAlpha = alpha * 0.4;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(end, y);
        ctx.stroke();
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillRect(x1 - 1, Math.round(line.y) - 1, 3, 3);
        ctx.fillRect(Math.round(end) - 1, Math.round(line.y) - 1, 3, 3);
        if (s.labels) {
          ctx.globalAlpha = alpha * 0.62 * techSmoothstep(0.7, 1, grow);
          ctx.fillText(line.label, room ? x2 + 8 : x1 - 8, Math.round(line.y));
        }
      });
      ctx.textAlign = 'left';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
    };

    const drawFilling = (glyph, lead, progress, view) => {
      const art = glyph.fill;
      const left = Math.floor(art.left * dpr);
      const top = Math.floor(art.top * dpr);
      const w = art.image.width + 2;
      const h = art.image.height + 2;
      const fill = techClamp01((progress - 0.24 - 0.28 * lead) / 0.48);
      const rects = [];
      for (const band of view.bands) {
        const amount = techSmoothstep(0.3 * band.order, 0.3 * band.order + 0.4, fill);
        if (amount <= 0) continue;
        const span = (band.y1 - band.y0) * amount;
        const y0 = Math.round((band.up ? band.y1 - span : band.y0) * dpr);
        const y1 = Math.round((band.up ? band.y1 : band.y0 + span) * dpr);
        if (y1 > y0) rects.push([y0, y1 - y0]);
      }
      const outline = techSmoothstep(0.08 + 0.2 * lead, 0.22 + 0.2 * lead, progress);
      if (outline > 0.001) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(left - 2, top - 2, w + 2, h + 2);
        for (const [y, span] of rects) ctx.rect(left - 2, y, w + 2, span);
        ctx.clip('evenodd');
        ctx.globalAlpha = outline;
        blit(ctx, glyph.dashes, 0, 0, 0, 0);
        ctx.restore();
      }
      if (rects.length) {
        ctx.save();
        ctx.beginPath();
        for (const [y, span] of rects) ctx.rect(left - 2, y, w + 2, span);
        ctx.clip();
        blit(ctx, glyph.fill, 0, 0, 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    const kick = index => {
      const strength = (word ? word.size : 54) * 9;
      kicks.push({ index, at: pulse, velocity: strength });
      for (let d = 1; d < glyphs.length; d++) {
        const velocity = strength * Math.pow(TECH_KICK_DECAY, d);
        if (velocity < 20) break;
        for (const j of [index - d, index + d]) {
          if (j >= 0 && j < glyphs.length) kicks.push({ index: j, at: pulse + d * 0.055, velocity });
        }
      }
      wakeRef.current();
    };

    const tick = now => {
      raf = 0;
      const s = settingsRef.current;
      if (!s) return;
      const dt = Math.min(0.06, (now - last) / 1000);
      last = now;
      pulse += dt;

      if (sizeDirty) {
        const rect = container.getBoundingClientRect();
        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        layoutKey = '';
        sizeDirty = false;
      }

      const { ink, accent } = palette(s);
      const view = ensureLayout(s, ink);

      while (kicks.length && pulse - kicks[0].at > 0.9) kicks.shift();
      kicks.forEach(k => {
        const age = pulse - k.at;
        if (age < 0 || age > 0.7) return;
        const g = glyphs[k.index];
        if (!g) return;
        const blast = Math.sin((age / 0.7) * Math.PI) * Math.exp(-age * 4.2);
        g.velocity.y += -k.velocity * blast * dt * 30;
      });

      const active = pointer.inside && !introducing;
      presence = techApproach(presence, s.reveal === 'area' && active && dragging < 0 ? 1 : 0, dt, 0.18);
      const targetLens = dragging >= 0 ? glyphs[dragging].offset : pointer;
      lens.x = techApproach(lens.x, targetLens.x, dt, 0.09);
      lens.y = techApproach(lens.y, targetLens.y, dt, 0.09);

      let moving = false;
      const damping = 2 * Math.sqrt(TECH_SPRING) * (1 - techClamp01(s.bounce) * 0.96);

      if (s.intro !== introKind) {
        introKind = s.intro;
        introClock = 0;
      }
      const introOn = introKind !== 'none' && !reducedMotion && glyphs.length > 0;
      if (introOn && fontsReady) introClock += dt;
      const progress = introOn ? techClamp01((introClock - TECH_INTRO_DELAY) / Math.max(0.3, s.introDuration)) : 1;
      introducing = introOn && progress < 1;

      glyphs.forEach((glyph, i) => {
        if (i === dragging) {
          glyph.offset.x = pointer.x - grab.x;
          glyph.offset.y = pointer.y - grab.y;
          glyph.velocity.x = 0;
          glyph.velocity.y = 0;
          moving = true;
          return;
        }
        const { offset, velocity } = glyph;
        if (Math.abs(offset.x) < 0.05 && Math.abs(offset.y) < 0.05 && Math.hypot(velocity.x, velocity.y) < 0.5) {
          offset.x = 0;
          offset.y = 0;
          velocity.x = 0;
          velocity.y = 0;
          return;
        }
        velocity.x += (-TECH_SPRING * offset.x - damping * velocity.x) * dt;
        velocity.y += (-TECH_SPRING * offset.y - damping * velocity.y) * dt;
        offset.x += velocity.x * dt;
        offset.y += velocity.y * dt;
        moving = true;
      });

      glyphs.forEach(glyph => { glyph.shown = 1; });

      const focus = introducing ? -1 : dragging >= 0 ? dragging : active ? glyphAt(lens.x, lens.y) : -1;
      if (focus >= 0 && s.selection) {
        const glyph = glyphs[focus];
        const bx1 = glyph.box.x1 + glyph.offset.x - 4;
        const by1 = glyph.box.y1 + glyph.offset.y - 4;
        const bx2 = glyph.box.x2 + glyph.offset.x + 4;
        const by2 = glyph.box.y2 + glyph.offset.y + 4;
        if (frame.index < 0 || frame.alpha < 0.02) {
          frame.x1 = bx1;
          frame.y1 = by1;
          frame.x2 = bx2;
          frame.y2 = by2;
        }
        const glide = focus === dragging ? 0.02 : 0.08;
        frame.x1 = techApproach(frame.x1, bx1, dt, glide);
        frame.y1 = techApproach(frame.y1, by1, dt, glide);
        frame.x2 = techApproach(frame.x2, bx2, dt, glide);
        frame.y2 = techApproach(frame.y2, by2, dt, glide);
        frame.index = focus;
      }
      frame.alpha = techApproach(frame.alpha, focus >= 0 && s.selection ? 1 : 0, dt, 0.1);

      glyphs.forEach((glyph, i) => {
        const target = s.reveal === 'letter' && i === focus && i !== dragging ? 1 : 0;
        glyph.outline = techApproach(glyph.outline, target, dt, 0.09);
        if (Math.abs(glyph.outline - target) > 0.002) moving = true;
        else glyph.outline = target;
      });

      guideAlpha = techApproach(guideAlpha, s.guides && !introducing && (focus >= 0 || presence > 0.4) ? 1 : 0, dt, 0.14);

      const hovering = !introducing && focus >= 0 && pointer.inside;
      const nextCursor = dragging >= 0 ? 'grabbing' : hovering && s.draggable ? 'grab' : hovering && s.clickKick ? 'pointer' : '';
      if (nextCursor !== cursor) {
        cursor = nextCursor;
        container.style.cursor = nextCursor;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const glyph of glyphs) {
        const moved = Math.hypot(glyph.offset.x, glyph.offset.y);
        if (moved > 1) {
          ctx.globalAlpha = Math.min(1, moved / 24) * 0.55;
          blit(ctx, glyph.dashes, 0, 0, 0, 0);
          ctx.globalAlpha = 1;
        }
      }
      if (introducing && introKind === 'metrics') {
        drawLines(s, view, accent, 1 - techSmoothstep(0.84, 1, progress), k =>
          techSmoothstep(0.02 + 0.04 * k, 0.2 + 0.04 * k, progress)
        );
      } else if (guideAlpha > 0.005) {
        drawLines(s, view, accent, guideAlpha * 0.6, () => 1);
      }
      glyphs.forEach((glyph, i) => {
        if (introducing && introKind === 'metrics') {
          const lead = glyphs.length > 1 ? i / (glyphs.length - 1) : 0;
          if (progress < 0.72 + 0.28 * lead) {
            drawFilling(glyph, lead, progress, view);
            return;
          }
        }
        if (glyph.shown < 0.001) return;
        if (glyph.outline < 0.999) {
          ctx.globalAlpha = (1 - glyph.outline) * glyph.shown;
          blit(ctx, glyph.fill, glyph.offset.x, glyph.offset.y, 0, 0);
        }
        if (glyph.outline > 0.001) {
          ctx.globalAlpha = glyph.outline * glyph.shown;
          blit(ctx, glyph.dashes, glyph.offset.x, glyph.offset.y, 0, 0);
        }
        ctx.globalAlpha = 1;
      });
      if (presence > 0.001) drawReveal(s);
      drawFrame(s, accent);

      const settling =
        moving ||
        introducing ||
        kicks.length > 0 ||
        (guideAlpha > 0.005 && guideAlpha < 0.995) ||
        Math.abs(presence - (s.reveal === 'area' && active && dragging < 0 ? 1 : 0)) > 0.002 ||
        (frame.alpha > 0.01 && frame.alpha < 0.99);
      if ((active || settling) && visible && alive) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !visible || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const resize = () => {
      sizeDirty = true;
      wake();
    };

    const locate = e => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onMove = e => {
      locate(e);
      pointer.inside = true;
      wake();
    };
    const onLeave = () => {
      if (dragging >= 0) return;
      pointer.inside = false;
      wake();
    };
    const onDown = e => {
      locate(e);
      pointer.inside = true;
      const s = settingsRef.current;
      const primary = e.pointerType !== 'mouse' || e.button === 0;
      const index = introducing || !primary ? -1 : glyphAt(pointer.x, pointer.y);
      press.x = pointer.x;
      press.y = pointer.y;
      press.time = performance.now();
      press.index = index;
      if (s?.draggable && index >= 0) {
        dragging = index;
        grab.x = pointer.x - glyphs[index].offset.x;
        grab.y = pointer.y - glyphs[index].offset.y;
        container.setPointerCapture?.(e.pointerId);
      }
      wake();
    };
    const onUp = e => {
      if (dragging >= 0) {
        dragging = -1;
        container.releasePointerCapture?.(e.pointerId);
        const rect = container.getBoundingClientRect();
        pointer.inside =
          e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      }
      if (
        e.type === 'pointerup' &&
        press.index >= 0 &&
        settingsRef.current?.clickKick &&
        !reducedMotion &&
        performance.now() - press.time < 450
      ) {
        const rect = container.getBoundingClientRect();
        if (Math.hypot(e.clientX - rect.left - press.x, e.clientY - rect.top - press.y) < 6) kick(press.index);
      }
      press.index = -1;
      wake();
    };

    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener('pointerenter', onMove, { passive: true });
    container.addEventListener('pointerdown', onDown, { passive: true });
    container.addEventListener('pointerup', onUp, { passive: true });
    container.addEventListener('pointercancel', onUp, { passive: true });
    container.addEventListener('pointerleave', onLeave, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener('resize', resize, { passive: true });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      wake();
    });
    intersectionObserver.observe(container);
    if (document.fonts) document.fonts.ready.then(fontsLoaded, fontsLoaded);

    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      wakeRef.current = () => { };
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      intersectionObserver.disconnect();
      container.style.cursor = '';
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerenter', onMove);
      container.removeEventListener('pointerdown', onDown);
      container.removeEventListener('pointerup', onUp);
      container.removeEventListener('pointercancel', onUp);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return h('div', {
    ref: containerRef,
    className: ('tech-text ' + (mounted ? 'has-canvas ' : '') + className).trim(),
    style: style,
    role: 'img',
    'aria-label': text
  },
    h('canvas', { ref: canvasRef, className: 'tech-text-canvas' }),
    h('span', { className: 'tech-text-static', 'aria-hidden': 'true' }, text)
  );
}

// Unified Split Heading with ReactBits TechText Animation
function TechSplitHeading({
  title,
  accent,
  theme = 'dark',
  className = '',
  as = 'h1'
}) {
  const isDark = theme === 'dark';
  const titleColor = isDark ? '#ffffff' : '#351624';
  const titleAccent = isDark ? '#edcb89' : '#8b3c57';
  const accentColor = isDark ? '#edcb89' : '#8b3c57';
  const accentHighlight = isDark ? '#ffffff' : '#351624';

  return h(as, { className: ('hero-split-heading tech-split-heading ' + className).trim() },
    h('span', { className: 'heading-line tech-heading-line' },
      h(TechText, {
        text: title,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 400,
        fontSize: 54,
        color: titleColor,
        accentColor: titleAccent,
        align: 'left',
        guides: true,
        selection: true,
        clickKick: true,
        intro: 'metrics',
        introDuration: 1.5,
        bounce: 0.42,
        speed: 1,
        reach: 160,
        softness: 0.75,
        specks: 10,
        lineStyle: 'dashed',
        dashLength: 4,
        dashGap: 2,
        strokeWidth: 1.3
      })
    ),
    h('span', { className: 'heading-line heading-line--accent tech-heading-line tech-heading-line--accent' },
      h(TechText, {
        text: accent,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 54,
        color: accentColor,
        accentColor: accentHighlight,
        align: 'left',
        guides: true,
        selection: true,
        clickKick: true,
        intro: 'metrics',
        introDuration: 1.7,
        bounce: 0.42,
        speed: 1,
        reach: 160,
        softness: 0.75,
        specks: 10,
        lineStyle: 'dashed',
        dashLength: 4,
        dashGap: 2,
        strokeWidth: 1.3
      })
    )
  );
}

const quickReplies = [
  ['Treatments', 'Explore brow, lip and skincare services, or use the Finish Finder to compare looks.', 'Explore treatments', url('treatments')],
  ['Appointments', 'Choose a treatment and share your preferred time. The studio will confirm availability.', 'Open enquiry form', booking],
  ['Contact the studio', 'Chat with Dermaphi on WhatsApp for help with your visit or questions about a service.', 'Open WhatsApp', chat]
];
function BrandLogo({ className }) {
  return h('a', { className: className + ' studio-wordmark', href: url('home'), 'aria-label': 'Dermaphi Aesthetics home' },
    h('img', { className: 'brand-logo', src: 'assets/dermaphi-burgundy-gold.png', width: 866, height: 288, alt: '' }));
}
function FooterSocialLinks() {
  const links = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/dermaphi_aesthetics/',
      svg: h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: 'none', stroke: '#140710', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
        h('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }),
        h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
        h('line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5' })
      )
    },
    {
      name: 'WhatsApp',
      href: chat,
      svg: h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: 'none', stroke: '#140710', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
        h('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' })
      )
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/dermaphi_aesthetics',
      svg: h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: '#140710', stroke: 'none', 'aria-hidden': 'true', focusable: 'false' },
        h('path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' })
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dermaphi-aesthetics/',
      svg: h('svg', { viewBox: '0 0 24 24', width: '22', height: '22', fill: 'none', stroke: '#140710', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
        h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
        h('rect', { x: '2', y: '9', width: '4', height: '12', fill: '#140710', stroke: 'none' }),
        h('circle', { cx: '4', cy: '4', r: '2', fill: '#140710', stroke: 'none' })
      )
    }
  ];

  return h('nav', { className: 'footer-social-nav', 'aria-label': 'Dermaphi on social media' },
    links.map(item =>
      h('a', {
        key: item.name,
        href: item.href,
        className: 'footer-social-btn',
        'aria-label': 'Dermaphi on ' + item.name,
        title: item.name,
        target: '_blank',
        rel: 'noopener noreferrer'
      }, item.svg)
    )
  );
}

function SiteFooter({ page }) {
  return h('footer', { className: 'site-footer modern-chennai-footer' },
    h('div', { className: 'wrap footer-wrap' },
      // Top Glassmorphic Invitation Card
      h('div', { className: 'footer-invite footer-invite-card', 'data-reveal': '' },
        h('div', { className: 'footer-invite-copy' },
          h('div', { className: 'footer-invite-pill' },
            h('span', { className: 'footer-invite-dot live-pulse', 'aria-hidden': 'true' }),
            'DERMAPHI AESTHETICS · CHROMPET, CHENNAI · BY APPOINTMENT'
          ),
          h('h2', { className: 'footer-invite-title' },
            'Crafting ',
            h('em', { className: 'footer-invite-accent' }, 'Quiet Luxury'),
            ' in Chennai.'
          ),
          h('p', { className: 'footer-invite-desc' },
            'Step into our private Chrompet studio for bespoke brow symmetry, watercolor lips, and clinical skincare designed for your natural character.'
          )
        ),
        h('div', { className: 'footer-invite-actions' },
          link('Book Studio Visit ↗', booking, 'footer-cta-btn footer-cta-btn--primary'),
          link('Chat on WhatsApp ↗', chat, 'footer-cta-btn footer-cta-btn--secondary')
        )
      ),

      // 4-Column Modern Architectural Grid
      h('div', { className: 'footer-grid modern-footer-grid' },
        // Col 1: Brand & Philosophy
        h('div', { className: 'footer-col footer-col--brand' },
          h(BrandLogo, { className: 'footer-wordmark' }),
          h('p', { className: 'footer-brand-desc' },
            'Permanent makeup artistry and clinical skincare with Preethi Sadha, certified PhiBrows master artist.'
          ),
          h('a', { href: chat, target: '_blank', rel: 'noopener noreferrer', className: 'footer-whatsapp-badge' },
            h('svg', { viewBox: '0 0 24 24', width: '16', height: '16', fill: 'currentColor', 'aria-hidden': 'true', focusable: 'false' },
              h('path', { d: 'M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.15c-.24.67-1.19 1.25-1.97 1.36-.53.07-1.22.12-3.55-.84-2.98-1.23-4.9-4.26-5.05-4.46-.15-.2-1.2-1.6-1.2-3.05s.76-2.17 1.03-2.46c.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.86 2.1.94 2.25.07.16.12.34.02.54-.1.2-.15.33-.3.51-.15.17-.32.39-.46.52-.15.15-.31.32-.13.63.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.37 2.46 1.52.3.15.48.13.66-.07.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.29.11 1.83.86 2.15 1.02.31.16.52.24.6.37.08.13.08.77-.16 1.44z' })
            ),
            h('span', null, 'Book via WhatsApp ↗')
          ),
          h('div', { className: 'footer-brand-badges' },
            h('span', { className: 'footer-badge' }, '✦ PhiAcademy European Standards'),
            h('span', { className: 'footer-badge' }, '★ 5.0 Google Rated · 50+ Client Reviews'),
            h('span', { className: 'footer-badge' }, '📍 Chrompet, Chennai Atelier')
          )
        ),

        // Col 2: Quick Links
        h('nav', { className: 'footer-col footer-col--links', 'aria-label': 'Explore atelier' },
          h('h3', null,
            h('span', null, 'Explore Atelier'),
            h('span', { className: 'col-header-dot', 'aria-hidden': 'true' }, '✦')
          ),
          navigation.map(([label, path]) =>
            h('a', { key: path, href: url(path), className: 'footer-nav-link' },
              h('span', null, label),
              h('span', { 'aria-hidden': 'true', className: 'nav-arrow' }, '→')
            )
          )
        ),

        // Col 3: Signature Treatments
        h('div', { className: 'footer-col footer-col--services' },
          h('h3', null,
            h('span', null, 'Signature Treatments'),
            h('span', { className: 'col-header-dot', 'aria-hidden': 'true' }, '✦')
          ),
          [
            ['PhiBrows Microblading', 'microblading'],
            ['Signature Lip Blush', 'lip-blush'],
            ['Dark Lip Neutralization', 'lip-neutralization'],
            ['Bespoke Beauty Spot', 'beauty-spot'],
            ['Ombré Powder Brows', 'ombre-brows'],
            ['Combination Brows', 'combination-brows'],
            ['Scalp Micropigmentation', 'scalp-enhancement'],
            ['BB Glow Radiance', 'bb-glow']
          ].map(([name, id]) =>
            h('a', { key: id, href: url('treatments') + '#' + id, className: 'footer-service-link' },
              h('span', null, name),
              h('span', { 'aria-hidden': 'true', className: 'nav-arrow' }, '→')
            )
          )
        ),

        // Col 4: Visit & Contact
        h('div', { className: 'footer-col footer-col--connect' },
          h('h3', null,
            h('span', null, 'Visit & Contact'),
            h('span', { className: 'col-header-dot', 'aria-hidden': 'true' }, '✦')
          ),
          h('address', { className: 'footer-address' },
            h('span', { className: 'address-icon', 'aria-hidden': 'true' }, '📍'),
            h('span', null, studioAddress)
          ),
          h('div', { className: 'footer-hours-card' },
            h('span', { className: 'hours-icon', 'aria-hidden': 'true' }, '🕒'),
            h('span', null, 'Mon – Sun: 10:00 AM – 7:30 PM (By Appointment)')
          ),
          h('div', { className: 'footer-contact-links' },
            h('a', { href: 'tel:+918098070829', className: 'footer-contact-item' },
              h('span', { className: 'contact-icon', 'aria-hidden': 'true' }, '📞'),
              h('span', null, '+91 80980 70829')
            ),
            h('a', { href: 'mailto:everything4aesthetic@gmail.com', className: 'footer-contact-item' },
              h('span', { className: 'contact-icon', 'aria-hidden': 'true' }, '✉️'),
              h('span', null, 'everything4aesthetic@gmail.com')
            ),
            link('Get directions to studio ↗', directions, 'footer-directions-btn')
          ),
          h('div', { className: 'footer-social-circles' },
            h(FooterSocialLinks)
          )
        )
      ),

      // Bottom Quiet Luxury Copyright Row
      h('div', { className: 'footer-base footer-copyright-row' },
        h('span', { className: 'footer-copy-text' },
          '© ' + new Date().getFullYear() + ' Dermaphi Aesthetics · Chrompet, Chennai. Handcrafted with European PhiAcademy Precision.'
        ),
        h('div', { className: 'footer-base-links' },
          link('Back to top ↑', url(page) + '#main', 'footer-top-link')
        )
      )
    )
  );
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

function App({ page }) {
  const [menu, setMenu] = useState(false);
  const headerRef = React.useRef(null);
  useEffect(() => {
    if (!menu) return;
    const desktop = matchMedia('(min-width: 801px)');
    function closeOutside(event) {
      if (!headerRef.current?.contains(event.target)) setMenu(false);
    }
    function closeOnDesktop(event) {
      if (event.matches) setMenu(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menu]);
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
  return h(React.Fragment, null,
    h('div', { className: 'ambient-site-glow', 'aria-hidden': 'true' }),
    link('Skip to content', url(page) + '#main', 'skip'),
    h('header', {
      className: 'site-header', ref: headerRef, onKeyDown: event => {
        if (event.key !== 'Escape' || !menu) return;
        setMenu(false);
        event.currentTarget.querySelector('.menu-toggle').focus();
      }
    },
      h('div', { className: 'nav wrap' },
        h(BrandLogo, { className: 'brand' }),
        h('div', { className: 'header-actions' },
          h('a', { href: booking, className: 'nav-cta', 'aria-label': 'Book a consultation', onClick: () => setMenu(false) },
            'Book a visit', h('span', { 'aria-hidden': 'true' }, '↗')),
          h('button', {
            className: 'menu-toggle', type: 'button', 'aria-expanded': menu,
            'aria-label': menu ? 'Close navigation' : 'Open navigation', 'aria-controls': 'navigation',
            onClick: () => setMenu(open => !open)
          },
            h('span', { className: 'menu-symbol', 'aria-hidden': 'true' }))),
        h('nav', { id: 'navigation', className: menu ? 'open' : '', 'aria-label': 'Main navigation' },
          navigation.map(([label, path]) => h('a', {
            href: url(path), key: path,
            'aria-current': page === path ? 'page' : undefined, onClick: () => setMenu(false)
          }, headerLabels[path] || label)),
          h('a', { className: 'mobile-booking', href: booking, onClick: () => setMenu(false) }, 'Book a visit ↗')))),
    h('main', { id: 'main' }, page === 'home' ? h(StudioHome) : h(InteriorPage, { page })),
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
  ['studio-7.jpg', 'From Preethi’s photo album', 'Another portrait from the event. Get in touch if you’d like to discuss a visit to the Chrompet studio.']
];

const clientPhotos = [
  ['client-2.jpg', 'Brow portfolio · defined arches', 'Look at how the shape and definition change across the two photos.'],
  ['client-3.jpg', 'Brow portfolio · fuller outline', 'Bring a reference if you want to discuss more definition through the brow.'],
  ['client-4.jpg', 'Brow portfolio · front view', 'Notice the shape from the front of the brow through the tail.'],
  ['client-5.jpg', 'Brow portfolio · close-up', 'Use the close-up to discuss how much detail you want in your own finish.'],
  ['client-6.jpg', 'Lip neutralization · Before & after', 'Compare the lip tone before and after treatment. The final colour becomes clearer as the lips heal.']
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

function useCarouselAutoplay(advance, selection, interval = 5500) {
  const region = React.useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (paused || !region.current || !('IntersectionObserver' in window)) return;
    const element = region.current;
    let visible = false;
    let timer;
    function schedule() {
      clearInterval(timer);
      if (visible && !document.hidden && !preference.matches && !element.matches(':hover, :focus-within')) {
        timer = setInterval(advance, interval);
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: .15 });
    observer.observe(element);
    const events = ['pointerenter', 'pointerleave', 'focusin', 'focusout'];
    const afterFocus = () => queueMicrotask(schedule);
    events.forEach(name => element.addEventListener(name, afterFocus));
    document.addEventListener('visibilitychange', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      events.forEach(name => element.removeEventListener(name, afterFocus));
      document.removeEventListener('visibilitychange', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, [paused, selection, interval]);
  return { region, paused, toggle: () => setPaused(value => !value) };
}
function AutoplayButton({ autoplay }) {
  return h('button', { type: 'button', className: 'autoplay-toggle', onClick: autoplay.toggle }, autoplay.paused ? 'Play slideshow' : 'Pause slideshow');
}

function StudioDepthGallery({ id, photos = studioPhotos, title = 'Inside the studio', intro = 'Browse photos of Preethi at work and moments from her training journey.', variant = 'ribbon' }) {
  const [selection, setSelection] = useState(0);
  const autoplay = useCarouselAutoplay(() => setSelection(current => current + 1), selection);
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

  return h('section', { id, className: 'studio-depth studio-depth--' + variant, ref: autoplay.region, 'aria-labelledby': id + '-title' },
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
          }, src === 'client-6.jpg' ? h(LipComparison) : h('img', { src: 'assets/' + src, alt: label, loading: 'lazy', draggable: false })))
          : h('div', { className: 'ribbon-film', key: selection }, [-1, 0, 1].map(step => {
            const [src, label] = photos[(active + step + count) % count];
            return h('figure', { key: src, 'data-step': step, 'aria-hidden': step !== 0 },
              h('img', { src: 'assets/' + src, alt: label, loading: 'lazy', draggable: false }));
          }))),
      h('div', { className: 'depth-caption', ref: caption, 'aria-live': autoplay.paused ? 'polite' : 'off' }, h('h3', null, photos[active][1]), h('p', null, photos[active][2])),
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
      h(AutoplayButton, { autoplay }), link('Ask about a consultation ↗', booking, 'button')));
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

const googleReviewsUrl = 'https://www.google.com/maps/search/?api=1&query='
  + encodeURIComponent('Dermaphi Aesthetics, ' + studioAddress);

const clientTestimonials = [
  {
    "id": "nandhini",
    "name": "Nandhini K",
    "role": "Customer",
    "service": "Customer",
    "quote": "Finally, brows that suit my face! I loved how Preethi customized the shape instead of following a standard brow design. The whole experience was professional, hygienic and very comfortable. Definitely worth it!"
  },
  {
    "id": "lavanya",
    "name": "Lavanya",
    "role": "Doctor",
    "service": "Doctor",
    "quote": "European PhiAcademy standards right in Chrompet. The strokes blend seamlessly with my natural brow hairs."
  },
  {
    "id": "ankush",
    "name": "Ankush",
    "role": "Anchor",
    "service": "Anchor",
    "quote": "Such a lovely experience! From the consultation to the treatment, everything was handled with so much care. Preethi is very detail-oriented and makes sure you feel heard and comfortable. Highly recommend Dermaphi!"
  },
  {
    "id": "vani",
    "name": "Vani",
    "role": "Customer",
    "service": "Customer",
    "quote": "I’ve always struggled with getting my brows to look even, especially filling in the sparse areas every single day. Getting my eyebrows done at Dermaphi was honestly one of the best decisions! They took the time to understand what I wanted, carefully mapped out a shape that suited my face and made sure I was comfortable with every step. The result is so beautifully natural, and I love waking up with my brows already looking perfect. The attention to detail and care throughout the process made all the difference. Couldn’t be happier 😍"
  }
];

function ThreeTestimonialsCanvas() {
  return null;
}

// Luminous Spotlight Testimonial Showcase with Interactive Client Tabs
// Unique Floating Speech-Bubble Testimonial Cloud (Inspired by Client Inspiration)
// Premium Luxury Testimonial Carousel with Reduced Punchy Quotes
// Reborn-Inspired Luxury Client Testimonials Multi-Card Carousel
function HomeTestimonials() {
  const [pageIndex, setPageIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    function updateCards() {
      const w = window.innerWidth;
      if (w <= 680) {
        setCardsPerPage(1);
      } else if (w <= 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    }
    updateCards();
    window.addEventListener('resize', updateCards);
    return () => window.removeEventListener('resize', updateCards);
  }, []);

  const totalCards = clientTestimonials.length;
  const totalPages = Math.max(1, Math.ceil(totalCards / cardsPerPage));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);

  function goToPage(p) {
    if (p === safePageIndex || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setPageIndex(p);
      setAnimating(false);
    }, 200);
  }

  function move(step) {
    goToPage((safePageIndex + step + totalPages) % totalPages);
  }

  useEffect(() => {
    if (isPaused || totalPages <= 1 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setPageIndex(curr => (curr + 1) % totalPages);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  const start = safePageIndex * cardsPerPage;
  const visibleCards = clientTestimonials.slice(start, start + cardsPerPage);

  return h('section', {
    className: 'home-testimonials modern-testimonials-section section',
    'aria-label': 'Client testimonials',
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false)
  },
    // Atmospheric animated ambient background
    h('div', { className: 'testimonials-bg-ambient', 'aria-hidden': 'true' },
      h('div', { className: 'ambient-orb ambient-orb--1' }),
      h('div', { className: 'ambient-orb ambient-orb--2' }),
      h('div', { className: 'ambient-orb ambient-orb--3' })
    ),
    h(GoldenCosmosCanvas, { className: 'testimonials-cosmos-canvas', count: 40, speed: 0.6, color: 'rose' }),
    h('div', { className: 'wrap testimonials-container' },
      // Header with Google Reviews Trust Pill
      h('div', { className: 'testimonials-header' },
        h('div', { className: 'testimonials-head-copy' },
          h('p', { className: 'eyebrow' }, 'CLIENT EXPERIENCES · CHROMPET ATELIER'),
          h('h2', { className: 'hero-split-heading' },
            h('span', { className: 'heading-line' }, 'Real Stories.'),
            h('span', { className: 'heading-line heading-line--accent' }, h('em', null, 'Lasting Confidence.'))
          ),
          h('p', { className: 'testimonials-subhead' },
            'Hear from our satisfied clients who have experienced bespoke PMU at Dermaphi Aesthetics.'
          )
        ),
        h('a', {
          href: googleReviewsUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'google-review-pill',
          'aria-label': 'Read Google Reviews'
        },
          h('span', null, 'More reviews on Google ↗')
        )
      ),

      // Reborn-Style Multi-Card Grid Carousel Stage
      h('div', { className: 'reborn-carousel-stage' },
        h('div', {
          className: 'reborn-cards-grid' + (animating ? ' is-animating' : ''),
          key: safePageIndex
        },
          visibleCards.map(item =>
            h('article', {
              key: item.id,
              className: 'reborn-review-card'
            },
              // Decorative Quote Watermark top-right
              h('svg', {
                className: 'reborn-quote-watermark',
                viewBox: '0 0 24 24',
                fill: 'currentColor',
                'aria-hidden': 'true',
                focusable: 'false'
              },
                h('path', { d: 'M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' })
              ),
              // Star Rating
              // Review Quote
              h('blockquote', { className: 'reborn-review-quote' }, item.quote),
              // Reviewer Footer Info
              h('div', { className: 'reborn-review-meta' },
                h('h4', { className: 'reborn-client-name' }, item.name),
                h('div', { className: 'reborn-service-pill' },
                  h('span', { className: 'pill-dot', 'aria-hidden': 'true' }, '✦'),
                  h('span', { className: 'pill-service' }, item.role)

                )
              )
            )
          )
        )
      ),

      // Reborn-Style Carousel Controls & Indicator Pills
      h('div', { className: 'reborn-carousel-controls' },
        h('button', {
          type: 'button',
          className: 'reborn-nav-btn reborn-prev-btn',
          'aria-label': 'Previous reviews',
          onClick: () => move(-1)
        },
          h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
            h('polyline', { points: '15 18 9 12 15 6' })
          )
        ),
        h('div', { className: 'reborn-pagination-track', role: 'tablist', 'aria-label': 'Reviews pagination' },
          Array.from({ length: totalPages }).map((_, pIdx) => {
            const isActive = pIdx === safePageIndex;
            return h('button', {
              key: pIdx,
              type: 'button',
              role: 'tab',
              'aria-selected': isActive,
              className: 'reborn-page-indicator' + (isActive ? ' is-active' : ''),
              'aria-label': 'Go to review slide ' + (pIdx + 1),
              onClick: () => goToPage(pIdx)
            },
              h('span', { className: 'indicator-bar' })
            );
          })
        ),
        h('button', {
          type: 'button',
          className: 'reborn-nav-btn reborn-next-btn',
          'aria-label': 'Next reviews',
          onClick: () => move(1)
        },
          h('svg', { viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
            h('polyline', { points: '9 18 15 12 9 6' })
          )
        ),
        h('button', {
          type: 'button',
          className: 'reborn-pause-btn',
          'aria-label': isPaused ? 'Resume autoplay' : 'Pause autoplay',
          onClick: () => setIsPaused(p => !p)
        }, isPaused ? '▶' : 'Ⅱ')
      )
    )
  );
}

// ReactBits Pro FAQ-9: FAQ Grid with Sticky Contact Panel
function HomeFAQ9() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItem, setOpenItem] = useState('q1');

  const categories = [
    ['all', 'All Questions (6)'],
    ['treatments', 'Treatments & Results (3)'],
    ['visit', 'Your Visit & Studio (3)']
  ];

  const faqItems = [
    {
      id: 'q1',
      category: 'treatments',
      question: 'Microblading, Ombré or Combination Brows?',
      answer: 'Microblading creates realistic individual hair-like strokes. Ombré shading delivers a soft gradient powder finish. Combination brows blend the two for textured definition with gentle depth.'
    },
    {
      id: 'q2',
      category: 'treatments',
      question: 'Can I see brow and lip results before booking?',
      answer: 'Browse Dermaphi’s client gallery for healed brow mapping, finished brows, and watercolor lip comparisons before your appointment.'
    },
    {
      id: 'q3',
      category: 'treatments',
      question: 'Lip Blush vs Lip Neutralization?',
      answer: 'Lip blush adds a sheer, youthful wash of rose or peach colour. Neutralization specifically balances uneven or cool undertones with corrective warm pigment.'
    },
    {
      id: 'q4',
      category: 'visit',
      question: 'What Should I Bring to My Consultation?',
      answer: 'Bring photos of brow shapes or lip shades you love, or arrive with your everyday brow makeup so Preethi can understand your personal style and aesthetic comfort level.'
    },
    {
      id: 'q5',
      category: 'visit',
      question: 'What Happens During the Consultation?',
      answer: 'Preethi measures your bone structure using golden ratio calipers, draws a precise pencil outline, and selects custom pigment shades for your approval before treatment begins.'
    },
    {
      id: 'q6',
      category: 'visit',
      question: 'How Do I Reserve an Appointment?',
      answer: 'Submit the enquiry form online or message the studio on WhatsApp. We will discuss your goals, answer any queries, and confirm an available date and time.'
    }
  ];

  const filtered = activeCategory === 'all'
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  return h('section', { className: 'home-faq-9-section section', 'aria-label': 'Studio Guide and FAQs' },
    h('div', { className: 'wrap faq-9-container' },
      // Header
      h('div', { className: 'faq-9-header' },
        h('p', { className: 'eyebrow' }, 'STUDIO GUIDE & FAQS'),
        h('h2', { className: 'hero-split-heading' },
          h('span', { className: 'heading-line' }, 'Everything You Need'),
          h('span', { className: 'heading-line heading-line--accent' }, h('em', null, 'to Know.'))
        ),
        h('p', { className: 'faq-9-subhead' },
          'Answers to common questions about permanent makeup, European PhiBrows standards, and your first visit with Preethi Sadha.'
        )
      ),

      // Category Filter Pills
      h('div', { className: 'faq-9-filter-bar', role: 'tablist', 'aria-label': 'Filter FAQ topics' },
        categories.map(([key, label]) => {
          const isSelected = activeCategory === key;
          return h('button', {
            key,
            type: 'button',
            role: 'tab',
            'aria-selected': isSelected,
            className: 'faq-filter-btn' + (isSelected ? ' is-active' : ''),
            onClick: () => setActiveCategory(key)
          }, label);
        })
      ),

      // 2-Column Grid: FAQ List (Left) + Sticky Contact Panel (Right)
      h('div', { className: 'faq-9-layout-grid' },
        // Left Column: FAQ Accordion Items
        h('div', { className: 'faq-9-accordion-list' },
          filtered.map(item => {
            const isOpen = openItem === item.id;
            return h('div', {
              key: item.id,
              className: 'faq-9-item' + (isOpen ? ' is-open' : '')
            },
              h('button', {
                type: 'button',
                className: 'faq-9-trigger',
                'aria-expanded': isOpen,
                onClick: () => setOpenItem(isOpen ? null : item.id)
              },
                h('span', { className: 'faq-9-q-text' }, item.question),
                h('span', { className: 'faq-9-indicator', 'aria-hidden': 'true' }, isOpen ? '−' : '+')
              ),
              isOpen && h('div', { className: 'faq-9-answer-box' },
                h('p', null, item.answer)
              )
            );
          })
        ),

        // Right Column: Sticky Contact Card (as in ReactBits Pro faq-9)
        h('aside', { className: 'faq-9-sticky-panel' },
          h('div', { className: 'faq-sticky-card' },
            h('div', { className: 'faq-card-icon-badge' },
              h('span', { 'aria-hidden': 'true' }, '✦')
            ),
            h('h3', { className: 'faq-card-title' }, 'Still Have Questions?'),
            h('p', { className: 'faq-card-desc' },
              'Can’t find what you’re looking for? Message Preethi directly on WhatsApp for one-on-one consultation advice or booking queries.'
            ),
            h('div', { className: 'faq-card-actions' },
              link('Chat on WhatsApp ↗', chat, 'faq-card-btn faq-card-btn--primary'),
              link('Get directions to studio ↗', directions, 'faq-card-btn faq-card-btn--outline')
            ),
            h('div', { className: 'faq-card-trust-meta' },
              h('div', { className: 'trust-meta-row' },
                h('span', { className: 'meta-label' }, 'Studio Atelier:'),
                h('span', { className: 'meta-value' }, 'Chrompet, Chennai')
              ),
              h('div', { className: 'trust-meta-row' },
                h('span', { className: 'meta-label' }, 'Session Type:'),
                h('span', { className: 'meta-value' }, '1-on-1 Private Session')
              ),
              h('div', { className: 'trust-meta-row' },
                h('span', { className: 'meta-label' }, 'Response Time:'),
                h('span', { className: 'meta-value' }, '< 30 mins')
              ),
              h('div', { className: 'trust-meta-row' },
                h('span', { className: 'meta-label' }, 'Standards:'),
                h('span', { className: 'meta-value' }, 'European PhiAcademy')
              )
            )
          )
        )
      )
    )
  );
}

function StudioCredentials() {
  const [paused, setPaused] = useState(false);
  const credentials = [
    ['✦', 'Certified PhiBrows Artist', 'PhiAcademy European Standards'],
    ['★', 'PMU Specialist & Trainer', 'Grand PMU India Participant'],
    ['⌖', 'Chrompet, Chennai', 'Private Aesthetic Studio']
  ];
  return h('div', { className: 'studio-trust-strip credential-swiper', 'data-paused': paused },
    h('div', { className: 'credential-swiper-window' },
      h('div', { className: 'credential-swiper-track' },
        [false, true].map(copy => h('div', { key: String(copy), className: 'credential-swiper-group', 'aria-hidden': copy || undefined },
          credentials.map(([icon, title, detail]) => h('div', { key: title, className: 'trust-item' },
            h('span', { className: 'trust-icon', 'aria-hidden': 'true' }, icon),
            h('strong', null, title),
            h('span', null, detail))))))),
    h('button', {
      type: 'button', className: 'credential-swiper-toggle',
      'aria-label': paused ? 'Play studio credentials' : 'Pause studio credentials',
      onClick: () => setPaused(value => !value)
    }, paused ? '▶' : 'Ⅱ'));
}

function LipComparison() {
  return h('div', { className: 'lip-comparison', role: 'group', 'aria-label': 'Lip treatment before and after' },
    [['client-6.jpg', 'Before'], ['client-7.jpg', 'After']].map(([src, label], index) =>
      h('div', { key: label, className: 'lip-comparison-panel' + (index === 0 ? ' lip-comparison-before' : '') },
        h('div', { className: 'lip-comparison-image' },
          h('img', { src: 'assets/' + src, alt: label + ' lip treatment', loading: 'lazy', draggable: false })),
        h('span', null, label))));
}

function HomePortfolio() {
  const [showLips, setShowLips] = useState(false);
  return h('section', { id: 'studio-work', className: 'studio-portfolio home-portfolio', 'aria-labelledby': 'home-portfolio-title' },
    h('div', { className: 'wrap studio-section home-portfolio-grid' },
      h('div', { className: 'home-portfolio-copy' },
        h('p', { className: 'eyebrow' }, 'BEFORE & AFTER'),
        h('h2', { id: 'home-portfolio-title' }, 'The detail makes the difference.'),
        h('div', { className: 'portfolio-switch', role: 'group', 'aria-label': 'Choose a treatment example' },
          h('button', { type: 'button', 'aria-pressed': !showLips, 'aria-controls': 'home-portfolio-example', onClick: () => setShowLips(false) }, 'Brow artistry'),
          h('button', { type: 'button', 'aria-pressed': showLips, 'aria-controls': 'home-portfolio-example', onClick: () => setShowLips(true) }, 'Lip blush')),
        h('p', { 'aria-live': 'polite' }, showLips
          ? 'Look how lip neutralization helps balance uneven or darker lip tones, creating a more even-looking, natural lip colour.'
          : 'Compare the brow mapping with the finished shape. Look for the softer front and the definition through the arch and tail.'),
        link('Explore the full gallery ↗', url('results') + '#client-portfolio', 'text-link')),
      h('figure', { id: 'home-portfolio-example', className: 'portfolio-feature' },
        showLips
          ? h(LipComparison)
          : h('div', { className: 'portfolio-brow-pair', key: 'brows' },
            ['Before · Brow mapping', 'After · Finished brows'].map((label, index) => h('div', { key: label },
              h('div', { className: 'portfolio-brow-crop' }, h('img', { src: 'assets/hero-brow-artistry.jpg', alt: index === 0 ? 'Brow shape outlined before treatment' : 'Finished brows with a defined arch', loading: 'lazy' })),
              h('span', null, label)))),
        h('figcaption', null, showLips ? 'Lip neutralization · Before & after' : 'Brow artistry · Client before and after'),
        showLips && h('p', { className: 'lip-healing-note' }, 'Swelling is normal and usually settles within 24–48 hours. Final results become clearer as the lips heal.'))));
}

function HomeFounder() {
  const photoCard = React.useRef(null);
  useEffect(() => {
    const card = photoCard.current;
    const motion = window.Motion;
    if (!card || !motion?.inView) return;
    const preference = matchMedia('(prefers-reduced-motion: no-preference)');
    let stopWatching;
    let animation;
    function stop() {
      stopWatching?.();
      animation?.cancel();
    }
    function update() {
      stop();
      if (!preference.matches) return;
      stopWatching = motion.inView(card, () => {
        animation = motion.animate(card, {
          opacity: [0.6, 1],
          transform: ['translateY(24px)', 'translateY(0px)']
        }, { duration: 0.85, ease: [0.22, 0.75, 0.25, 1] });
      }, { amount: 0.2 });
    }
    update();
    preference.addEventListener('change', update);
    return () => {
      stop();
      preference.removeEventListener('change', update);
    };
  }, []);

  return h('section', { className: 'founder-journal section', 'aria-labelledby': 'founder-journal-title' },
    h('div', { className: 'wrap founder-journal-grid' },
      h('div', { className: 'founder-journal-copy' },
        h('p', { className: 'eyebrow' }, 'DERMAPHI / THE FOUNDER'),
        h('h2', { id: 'founder-journal-title' }, 'Meet Preethi Sadha.'),
        h('p', { className: 'founder-journal-lede' }, 'A personal approach to permanent makeup.'),
        h('p', null, 'Preethi Sadha is the founder of Dermaphi Aesthetics and a certified PhiBrows artist in Chrompet, Chennai. Bring your everyday brow look or favourite lip shade to your consultation, and explore a finish that feels like you.'),
        h('div', { className: 'founder-accreditations-row' },
          h('div', { className: 'accreditation-pill' },
            h('span', { className: 'founder-credential-icon', 'aria-hidden': 'true' },
              h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', focusable: 'false' },
                h('ellipse', { cx: 12, cy: 12, rx: 7, ry: 5 }),
                h('path', { d: 'M12 3v18M9 3h6M9 21h6' }))),
            h('span', null, 'Certified PhiBrows Artist')
          ),
          h('div', { className: 'accreditation-pill' },
            h('span', { className: 'founder-credential-icon', 'aria-hidden': 'true' },
              h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'round', focusable: 'false' },
                h('path', { d: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z' }))),
            h('span', null, 'Grand PMU India Artist')
          )
        ),
        link('More about Preethi ↗', url('about'), 'text-link')
      ),
      h('figure', { className: 'founder-journal-showcase' },
        h('div', { className: 'founder-portrait-frame', ref: photoCard, ...heroPointer },
          h('img', {
            src: 'assets/preethi-founder-home.jpg',
            alt: 'Preethi Sadha, Founder and Master PMU Artist at Dermaphi Aesthetics in Chennai',
            width: 768,
            height: 1024,
            loading: 'lazy',
            decoding: 'async'
          }),
          h('div', { className: 'founder-portrait-badge' },
            h('span', { className: 'badge-role' }, 'Master PMU Artist'),
            h('span', { className: 'badge-location' }, 'Chrompet, Chennai')
          )
        ),
        h('figcaption', null,
          h('span', null, 'Preethi Sadha'),
          h('span', null, 'Founder · Dermaphi Aesthetics')
        )
      )
    )
  );
}

function ServiceGuide() {
  const [selection, setSelection] = useState(0);
  const options = [
    ['Brows', 'brows-and-lips', 'Choose fine hair strokes for sparse areas, powder shading for soft depth, or a combination of both.'],
    ['Lips', 'lip-enhancements', 'Reveal the beauty of naturally balanced lips. Lip neutralization gently corrects darker or uneven tones, helping achieve a softer, fresher and more even-looking lip colour.'],
    ['Scalp', 'scalp-enhancement', 'Explore scalp micropigmentation if you want to discuss how the appearance of thinning areas could be softened.'],
    ['Skincare', 'advanced-skincare', 'Tell us what you want to work on, such as texture or uneven tone, before choosing a service.']
  ];
  const [label, id, copy] = options[selection];
  return h('section', { className: 'wrap studio-section studio-services mobile-service-guide', 'aria-labelledby': 'studio-services-title' },
    h('div', { className: 'studio-section-head' },
      h('h2', { id: 'studio-services-title' }, 'Find your treatment'),
      link('All services ↗', url('treatments'), 'text-link')),
    h('div', { className: 'mobile-guide-options', role: 'group', 'aria-label': 'Treatment categories' },
      options.map(([name], index) => h('button', {
        key: name, type: 'button', 'aria-pressed': index === selection, onClick: () => setSelection(index)
      }, name))),
    h('div', { className: 'mobile-guide-answer', 'aria-live': 'polite' },
      h('p', { key: id }, copy),
      link('Explore ' + label.toLowerCase() + ' ↗', url('treatments') + '#' + id, 'text-link')));
}

function StudioHome() {
  const [slide, setSlide] = useState({ index: 0, previous: null, direction: 1, revision: 0 });
  const feature = slide.index;
  const features = [
    { label: 'Inside the studio', title: 'Artistry in', accent: 'every detail.', copy: 'At your consultation, tell Preethi how you wear your brows or lips day to day. Together you can talk through shape, colour and the finish you want.', image: 'dermaphi-studio-banner.png', alt: 'Precision microblading and cosmetic artistry at Dermaphi studio' },
    { label: 'Bespoke Results', title: 'Quiet Luxury', accent: 'for every feature.', copy: 'From natural hair-stroke microblading to velvety lip blushing, every treatment is calibrated to your unique facial geometry and skin tone.', image: 'dermaphi-contact-editorial.png', alt: 'Preethi Sadha against an ivory arch' }
  ];
  function browse(step) {
    setSlide(current => ({
      index: (current.index + step + features.length) % features.length,
      previous: current.index, direction: step, revision: current.revision + 1
    }));
  }
  const autoplay = useCarouselAutoplay(() => browse(1), slide.revision, 3500);
  const current = features[feature];
  const heroPhoto = React.useRef(null);
  const heroCopy = React.useRef(null);
  useEffect(() => {
    if (!slide.revision || !window.gsap || !heroPhoto.current || !heroCopy.current) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const direction = slide.direction;
      const timeline = gsap.timeline();
      timeline.fromTo(heroPhoto.current,
        { clipPath: direction > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: .78, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
      timeline.fromTo(heroPhoto.current.firstElementChild,
        { xPercent: direction * 4, scale: 1.08, transformPerspective: 1100, rotationY: direction * 9 },
        { xPercent: 0, scale: 1, rotationY: 0, duration: .9, ease: 'power3.out', clearProps: 'transform' }, 0);
      timeline.fromTo(heroCopy.current.children,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: .48, stagger: .08, ease: 'power2.out', clearProps: 'transform,opacity' }, .08);
    });
    return () => media.revert();
  }, [slide]);
  function banner(index, incoming) {
    const item = features[index];
    return h('div', {
      key: index, className: 'campaign-banner', 'data-banner': index,
      ref: incoming ? heroPhoto : null, 'aria-hidden': incoming ? undefined : true
    },
      h('img', { src: 'assets/' + item.image, alt: incoming ? item.alt : '', fetchPriority: incoming && !slide.revision ? 'high' : 'auto' }));
  }
  return h('div', { className: 'studio-home' },
    h('section', { className: 'home-banner-carousel', 'data-theme': feature === 1 ? 'ivory' : 'dark', 'aria-label': 'Dermaphi highlights', ref: autoplay.region },

      h('div', { className: 'home-banner-art' },
        slide.previous !== null && banner(slide.previous, false),
        banner(feature, true)),
      h('div', { className: 'wrap home-banner-content' },
        h('div', { className: 'studio-hero-copy' },
          h('div', { className: 'studio-feature-copy', ref: heroCopy, key: feature, 'aria-live': autoplay.paused ? 'polite' : 'off' },
            h(TechSplitHeading, {
              key: feature,
              title: current.title,
              accent: current.accent,
              theme: feature === 1 ? 'light' : 'dark',
              className: 'hero-banner-heading'
            }),
            h('p', null, current.copy)
          ),
          h('div', { className: 'actions' }, link('Book a consultation ↗', booking, 'button')),
          h('div', { className: 'hero-carousel-controls', role: 'group', 'aria-label': 'Homepage carousel controls' },
            h('button', { type: 'button', 'aria-label': 'Previous slide', onClick: () => browse(-1) }, '←'),
            h('span', { 'aria-label': current.label }, (feature + 1) + ' / ' + features.length),
            h('button', { type: 'button', 'aria-label': 'Next slide', onClick: () => browse(1) }, '→'),
            h('button', { type: 'button', 'aria-label': autoplay.paused ? 'Play slideshow' : 'Pause slideshow', onClick: autoplay.toggle }, autoplay.paused ? '▶' : 'Ⅱ'))))),
    h(StudioCredentials),
    h(ServiceGuide),
    h(HomePortfolio),
    h(HomeFounder),
    h(HomeTestimonials),
    h(HomeFAQ9))
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
  return h('section', { className: 'finish-finder-section', 'data-reveal': '', 'aria-labelledby': 'finish-title' },
    h('div', { className: 'wrap section finish-finder' },
      h('p', { className: 'eyebrow' }, 'THE FINISH FINDER'),
      h('h2', { id: 'finish-title' }, 'What would you like to see in the mirror?'),
      h('p', { className: 'finish-intro' }, 'Choose the look you’re drawn to. Use the suggestion as a starting point for your consultation.'),
      h('div', { className: 'finish-layout' },
        h('div', { className: 'finish-options', role: 'group', 'aria-label': 'Choose your preferred finish' },
          finishOptions.map(([id, label], index) => h('button', { key: id, type: 'button', 'aria-pressed': index === active, onClick: () => setActive(index) },
            h('span', { 'aria-hidden': 'true' }, '0' + (index + 1)), label, h('span', { 'aria-hidden': 'true' }, '↗')))),
        h('div', { className: 'finish-result' },
          h('div', { className: 'finish-art', key: slug }, h(LineArtwork, { drawing: treatmentArtwork[slug] })),
          h('div', { className: 'finish-copy', 'aria-live': 'polite' },
            h('p', { className: 'eyebrow' }, 'A TREATMENT TO EXPLORE'),
            h('h3', null, name), h('p', null, guidance)),
          link('Enquire about ' + name + ' ↗', 'contact/index.html?treatment=' + encodeURIComponent(slug) + '#appointment', 'button')))));
}

function FounderNote() {
  return h('section', { className: 'wrap section founder-note', id: 'founder-note', 'data-reveal': '' },
    h('div', null,
      h('p', { className: 'eyebrow' }, 'A NOTE FROM OUR FOUNDER'),
      h('h2', null, 'A vision rooted in artistry and natural beauty'),
      h('blockquote', null,
        h('p', null, 'At Dermaphi Aesthetics, my vision is to celebrate individuality through the art of enhancing natural beauty. As a certified PhiBrows Artist, Permanent Makeup Specialist and Trainer, I believe every face has its own character. Every enhancement should be thoughtfully designed to complement it.'),
        h('p', null, 'I bring precision, creativity and a commitment to continuous learning to each treatment. I’m equally passionate about sharing what I know and helping aspiring artists develop their skills through professional PMU training.'),
        h('p', null, 'Thank you for being part of the Dermaphi journey. I look forward to hearing what feels right for you.'),
        h('cite', null, 'Preethi Sadha · Founder and PMU Artist')
      )
    ),
    h('figure', { className: 'founder-award-photo' },
      h('img', {
        src: 'assets/preethi-grand-pmu-india-2024.jpg',
        alt: 'Grand PMU India 2024 conference and awards participant poster featuring Preethi Sadha Mohan',
        width: 1080, height: 1080, loading: 'lazy', decoding: 'async'
      }),
      h('figcaption', null, 'Preethi Sadha Mohan · Participant, Grand PMU India 2024, Chennai'))

  );
}
function TreatmentPrepAndFAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItem, setOpenItem] = useState('q1');

  const categories = [
    ['all', 'All Guides (8)'],
    ['techniques', 'Brows & Techniques (2)'],
    ['lips', 'Lips & Beauty Spot (2)'],
    ['prep', 'Preparation & Safety (2)'],
    ['healing', 'Healing & Touch-ups (2)']
  ];

  const faqItems = [
    {
      id: 'q1',
      category: 'techniques',
      tag: 'Brows & Symmetry',
      question: 'How do microblading, ombré shading, and combination brows differ?',
      answer: 'Microblading creates crisp, individual hair-like strokes using a fine manual blade—ideal for dry or normal skin seeking realistic fullness. Ombré shading delivers a soft, graduated powder finish using gentle machine micropigmentation—ideal for all skin types including oily or mature skin. Combination brows blend both, giving lifelike hair strokes at the bulb and soft velvety density through the arch and tail.'
    },
    {
      id: 'q2',
      category: 'techniques',
      tag: 'Previous Work',
      question: 'Can you correct or work over previous permanent makeup from another studio?',
      answer: 'Yes, provided the previous pigment is faded by at least 60–70%. We require a clear, makeup-free photo in natural daylight before reserving your visit. Preethi will personally evaluate whether warm color neutralization, laser-free lightening, or fresh PhiBrows golden ratio mapping is needed before new strokes are placed.'
    },
    {
      id: 'q7',
      category: 'lips',
      tag: 'Lips & Blushing',
      question: 'What is the difference between Lip Blushing and Lip Neutralization, and do I need both?',
      answer: 'Lip Blushing deposits sheer watercolor pigments to provide a natural flush, symmetry, and definition ("your-lips-but-better"). If your lips have cool, darker, or uneven hyperpigmentation (often from sun exposure, smoking, or natural melanin), Dark Lip Neutralization is performed first using warm corrective undertones (peach/warm terracotta) to create an even, neutral base before delicate blush tints are applied, preventing muddy or discolored healed results.'
    },
    {
      id: 'q8',
      category: 'lips',
      tag: 'Facial Accents',
      question: 'What is a Bespoke Beauty Spot, and how is it placed?',
      answer: 'A bespoke beauty spot is an artistic micro-tattoo that places a natural-looking mole mark on the cheekbone, near the lips, or beside the eye to balance facial features and impart timeless Hollywood elegance. During your appointment, Preethi marks prospective placements with pencil in the mirror with you and custom-blends pigment matching your skin\'s natural melanin tone so it looks completely authentic and never smudges.'
    },
    {
      id: 'q3',
      category: 'prep',
      tag: 'Pre-Care Guide',
      question: 'How should I prepare 7 days and 24 hours before my studio session?',
      answer: 'Discontinue retinol, AHA/BHA chemical exfoliants, and tanning on the face for at least 7 days prior. 24 hours before your visit, avoid caffeine, alcohol, aspirin, and blood-thinning supplements. If you are prone to cold sores, consult your doctor for preventive antiviral medication 3–5 days prior to any lip procedure. Arrive with your usual everyday makeup so Preethi understands your aesthetic preference.'
    },
    {
      id: 'q4',
      category: 'prep',
      tag: 'Client Comfort',
      question: 'Does the procedure hurt? What numbing protocol do you use?',
      answer: 'Client comfort is our highest priority. We apply a premium topical European numbing cream for 20–25 minutes prior to treatment, followed by secondary numbing throughout the session. Most clients describe the sensation as a light scratch or gentle vibration, and many fall asleep comfortably during their session.'
    },
    {
      id: 'q5',
      category: 'healing',
      tag: 'Timeline & Care',
      question: 'What is the day-by-day healing timeline and aftercare routine?',
      answer: 'Brows, lips, and beauty spots will look slightly bolder for the first 3–4 days, followed by mild microscopic flaking around days 5–7. Color will temporarily soften as new skin forms, fully blooming and stabilizing by week 4–6. A complimentary perfecting touch-up is included to calibrate density and seal your final result.'
    },
    {
      id: 'q6',
      category: 'healing',
      tag: 'Longevity',
      question: 'How long do results last and when should I schedule a color boost?',
      answer: 'Because we use medical-grade, heavy-metal-free European pigments that break down naturally over time, results typically last 1.5 to 2.5 years depending on skin type, sun exposure, and lifestyle. An annual color boost refreshes the warmth and crispness of your shape.'
    }
  ];

  const filtered = activeCategory === 'all'
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  return h('section', { className: 'treatment-prep-faq section', 'data-reveal': '', 'aria-labelledby': 'treatment-faq-title' },
    h('div', { className: 'wrap faq-9-container' },
      // Section Header
      h('div', { className: 'treatment-faq-head' },
        h('p', { className: 'eyebrow' }, 'ESSENTIAL INFORMATION'),
        h('h2', { className: 'hero-split-heading', id: 'treatment-faq-title' },
          h('span', { className: 'heading-line' }, 'Consultation &'),
          h('span', { className: 'heading-line heading-line--accent' }, h('em', null, 'Preparation Guide.'))
        ),
        h('p', null, 'Everything you need to know about technique suitability, appointment preparation, client comfort, and aftercare before visiting Dermaphi Atelier in Chrompet, Chennai.')
      ),

      // Topic Filter Pills
      h('div', { className: 'faq-filter-bar', role: 'tablist', 'aria-label': 'Filter consultation guide topics' },
        categories.map(([key, label]) => {
          const isSelected = activeCategory === key;
          return h('button', {
            key,
            type: 'button',
            role: 'tab',
            'aria-selected': isSelected,
            className: 'faq-filter-btn' + (isSelected ? ' is-active' : ''),
            onClick: () => setActiveCategory(key)
          }, label);
        })
      ),

      // 2-Column Grid: FAQ List (Left) + Sticky Consultation Guidance Card (Right)
      h('div', { className: 'faq-9-layout-grid' },
        // Left Column: Modern Accordion
        h('div', { className: 'faq-9-accordion-list' },
          filtered.map(item => {
            const isOpen = openItem === item.id;
            return h('div', {
              key: item.id,
              className: 'prep-faq-item' + (isOpen ? ' is-open' : '')
            },
              h('button', {
                type: 'button',
                className: 'prep-faq-trigger',
                'aria-expanded': isOpen,
                onClick: () => setOpenItem(isOpen ? null : item.id)
              },
                h('div', { className: 'prep-faq-q-wrap' },
                  h('span', { className: 'prep-faq-tag' }, item.tag),
                  h('span', { className: 'prep-faq-q-text' }, item.question)
                ),
                h('span', { className: 'prep-faq-indicator', 'aria-hidden': 'true' }, isOpen ? '−' : '+')
              ),
              isOpen && h('div', { className: 'prep-faq-answer-box' },
                h('p', null, item.answer)
              )
            );
          })
        ),

        // Right Column: Sticky Atelier Consultation Guidance Card
        h('aside', { className: 'faq-9-sticky-panel' },
          h('div', { className: 'prep-sticky-card' },
            h('span', { className: 'prep-sticky-badge' }, '✦ Pre-Visit Guidance'),
            h('h3', { className: 'prep-sticky-title' }, 'Personal Consultation with Preethi Sadha'),
            h('p', { className: 'prep-sticky-desc' },
              'Every face has a unique bone geometry. Before any pigment touches skin, Preethi measures your features with golden ratio calipers, draws a custom pencil outline, and matches shades to your undertones.'
            ),
            h('ul', { className: 'prep-checklist' },
              [
                'PhiAcademy European safety protocols',
                'Hypoallergenic, vegan-grade pigments',
                '100% single-use sterile micro-cartridges',
                'Complimentary touch-up session included'
              ].map(point =>
                h('li', { key: point },
                  h('span', { className: 'prep-check-dot', 'aria-hidden': 'true' }, '✓'),
                  h('span', null, point)
                )
              )
            ),
            h('div', { className: 'prep-sticky-actions' },
              link('Book Studio Consultation ↗', url('contact') + '#appointment', 'prep-sticky-btn prep-sticky-btn--primary'),
              link('Ask Preethi on WhatsApp ↗', chat, 'prep-sticky-btn prep-sticky-btn--outline')
            )
          )
        )
      )
    ),
    h('div', { className: 'faq-footer-cta' },
      h('p', null, 'Still have questions about which treatment suits your skin and routine?'),
      link('Ask Preethi on WhatsApp ↗', chat, 'button')
    )
  );
}

const treatmentArtwork = {
  microblading: 'M25 67Q51 29 108 46 M34 63l15-16 M46 57l15-14 M59 53l15-11 M73 51l15-7 M86 51l13-4',
  'combination-brows': 'M20 65Q56 26 110 47Q82 39 33 66Z M36 60l14-12 M49 55l15-10 M64 50l15-6',
  'ombre-brows': 'M20 67Q58 28 110 47 M24 71Q60 36 109 48 M34 72Q68 44 105 49 M48 70Q77 49 98 51',
  'lip-blush': 'M22 58Q40 53 52 42Q59 38 65 44Q71 38 78 42Q90 53 108 58Q65 91 22 58Z M22 58Q49 60 65 55Q81 60 108 58',
  'lip-neutralization': 'M22 58Q40 53 52 42Q59 38 65 44Q71 38 78 42Q90 53 108 58Q65 91 22 58Z M35 62Q65 72 95 62',
  'beauty-spot': 'M35 60Q50 35 70 42Q90 50 95 70 M58 48A3.5 3.5 0 1 1 58 47.9Z',
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
  ['Lip & Facial Accents', 'lip-enhancements', [3, 5, 11, 6]],
  ['Scalp Enhancement', 'scalp-enhancement', [7]],
  ['Skin Treatments', 'advanced-skincare', [8, 9, 10]]
];
function TreatmentsPage() {
  return h('section', { className: 'treatments-menu-section', 'aria-label': 'Studio Treatment Menu' },
    h('div', { className: 'wrap section treatments-menu-wrap' },
      h('div', { className: 'services-intro-banner' },
        h('p', { className: 'eyebrow' }, 'STUDIO TREATMENT MENU'),
        h('h2', null, 'Bespoke Enhancements for Every Feature'),
        h('p', { className: 'services-intro' }, 'Thoughtfully designed beauty enhancements to complement your natural features. At Dermaphi Aesthetics, we bring together artistry, precision and individual care.')
      ),
      treatmentGroups.map(([category, id, indices]) => h('section', { className: 'treatment-group', id, key: category, 'data-reveal': '' },
        h('div', { className: 'treatment-group-header' },
          h('h2', null, category),
          h('span', { className: 'group-badge' }, indices.length + (indices.length === 1 ? ' treatment' : ' treatments'))
        ),
        h('div', { className: id === 'scalp-enhancement' ? 'service-grid scalp-featured-grid' : 'service-grid' },
          indices.map(index => treatments[index]).map(([slug, name, description, consultation]) =>
            h('article', {
              className: (id === 'scalp-enhancement' ? 'service illustrated-service scalp-featured-card motion-surface' : 'service illustrated-service motion-surface'),
              id: slug, key: slug, ...highlightEvents
            },
              h('div', { className: 'treatment-art' },
                h(LineArtwork, { drawing: treatmentArtwork[slug] || treatmentArtwork[slug.includes('lip') ? 'lip-blush' : slug.includes('brow') ? 'microblading' : 'microneedling'] })
              ),
              h('h3', null, name),
              h('p', null, description),
              h('p', { className: 'consultation-note' }, consultation),
              link('Enquire about ' + name + ' ↗', 'contact/index.html?treatment=' + encodeURIComponent(slug) + '#appointment', 'button button--subtle')
            )
          )
        )
      ))
    )
  );
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
        data: { ...payload, emailSent: receipt.emailSent === true }
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
      link('Get directions ↗', directions, 'text-link'),
      mapOpen ? h('iframe', { title: 'Google Maps search for Dermaphi Aesthetics, Chennai', src: 'https://maps.google.com/maps?q=' + mapQuery + '&output=embed', loading: 'lazy' })
        : h('button', { type: 'button', className: 'button', onClick: () => setMapOpen(true) }, 'Load Google Map')));
}

function TreatmentsHero() {
  const [activeTab, setActiveTab] = useState('microblading');
  const spotlightData = {
    microblading: {
      name: 'Microblading Artistry',
      category: 'Eyebrow Enhancement',
      tagline: 'Hyper-realistic, feather-light strokes that follow your natural brow growth.',
      metrics: [
        ['Technique', 'Manual Hair Strokes'],
        ['Longevity', '12–18 Months'],
        ['Healing', '7–10 Days']
      ],
      slug: 'microblading'
    },
    'lip-blush': {
      name: 'Signature Lip Blush',
      category: 'Lip Enhancement',
      tagline: 'Soft, sheer watercolor tint that restores natural contour and youthfulness.',
      metrics: [
        ['Technique', 'Micropigment Veil'],
        ['Longevity', '2–3 Years'],
        ['Healing', '4–5 Days']
      ],
      slug: 'lip-blush'
    },
    'bb-glow': {
      name: 'BB Glow & Serum Radiance',
      category: 'Advanced Skincare',
      tagline: 'Semi-permanent tinted peptide serum infusion for an even, glowing complexion.',
      metrics: [
        ['Technique', 'Nano-Needle Infusion'],
        ['Longevity', '4–6 Months'],
        ['Downtime', 'Zero Downtime']
      ],
      slug: 'bb-glow'
    }
  };
  const activeSpotlight = spotlightData[activeTab];

  return h('section', { className: 'inner-hero modern-hero modern-hero--treatments' },
    h(GoldenCosmosCanvas, { count: 85, speed: 0.85, color: 'gold' }),
    h('div', { className: 'wrap modern-hero-grid' },
      h('div', { className: 'modern-hero-copy' },
        h(TechSplitHeading, {
          title: 'Architectural Precision.',
          accent: 'Natural Elegance.',
          theme: 'dark'
        }),
        h('p', { className: 'modern-hero-desc' }, 'Explore brow, lip, scalp and skincare treatments, then talk through the right option for you with Preethi.'),
        h('div', { className: 'hero-category-nav', 'aria-label': 'Quick category jump' },
          [
            ['Brows', 'brows-and-lips', '4 services'],
            ['Lips', 'lip-enhancements', '3 services'],
            ['Scalp SMP', 'scalp-enhancement', '1 service'],
            ['Skincare', 'advanced-skincare', '3 services']
          ].map(([label, id, count]) =>
            h('a', { key: id, href: url('treatments') + '#' + id, className: 'hero-cat-chip' },
              h('span', { className: 'chip-name' }, label),
              h('span', { className: 'chip-count' }, count))
          )
        ),
        h('div', { className: 'actions modern-hero-actions' },
          link('Book a Consultation ↗', booking, 'button'),
          link('Chat with Preethi ↗', chat, 'text-link')
        )
      ),
      h('div', { className: 'modern-hero-spotlight' },
        h(SpotlightCard, { className: 'spotlight-card motion-surface', ...highlightEvents },
          h('div', { className: 'spotlight-header' },
            h('span', { className: 'spotlight-eyebrow' }, h(DecryptedText, { text: 'FEATURED TREATMENT SPOTLIGHT' })),
            h('div', { className: 'spotlight-switcher', role: 'tablist', 'aria-label': 'Featured Treatments' },
              [['microblading', 'Brows'], ['lip-blush', 'Lips'], ['bb-glow', 'Skin']].map(([key, label]) =>
                h('button', {
                  key, type: 'button', role: 'tab',
                  'aria-selected': activeTab === key,
                  className: activeTab === key ? 'active' : '',
                  onClick: () => setActiveTab(key)
                }, label)
              )
            )
          ),
          h('div', { className: 'spotlight-body', key: activeTab },
            h('div', { className: 'spotlight-art-wrap' },
              h(LineArtwork, { drawing: treatmentArtwork[activeSpotlight.slug] || treatmentArtwork.microblading })
            ),
            h('div', { className: 'spotlight-details' },
              h('span', { className: 'spotlight-cat' }, activeSpotlight.category),
              h('h3', null, activeSpotlight.name),
              h('p', null, activeSpotlight.tagline),
              h('div', { className: 'spotlight-metrics' },
                activeSpotlight.metrics.map(([label, val]) =>
                  h('div', { key: label, className: 'spotlight-metric-item' },
                    h('span', { className: 'metric-lbl' }, label),
                    h('strong', { className: 'metric-val' }, val)
                  )
                )
              ),
              link('Enquire About ' + activeSpotlight.name + ' ↗', 'contact/index.html?treatment=' + encodeURIComponent(activeSpotlight.slug) + '#appointment', 'button button--subtle')
            )
          ),
          h('div', { className: 'spotlight-badges' },
            h('span', { className: 'spotlight-tag' }, '✓ Custom Golden Ratio Mapping'),
            h('span', { className: 'spotlight-tag' }, '✓ Premium Sterile Pigments')
          )
        )
      )
    )
  );
}

function ResultsHero() {
  const [lens, setLens] = useState('brows');
  const lenses = {
    brows: {
      image: 'client-2.jpg',
      title: 'Microblading & Shading Transformation',
      desc: 'Precision golden ratio hair strokes mapped to natural facial bone structure.'
    },
    lips: {
      image: 'client-6.jpg',
      title: 'Watercolor Lip Blush Tint',
      desc: 'Sheer rosy pigment that defines perimeter and restores youthful contour.'
    },
    closeups: {
      image: 'client-5.jpg',
      title: 'Healed Pigment Integration',
      desc: 'Micro-detail inspection under direct natural daylight showing zero blurring.'
    }
  };
  const activeData = lenses[lens];

  return h('section', { className: 'inner-hero modern-hero modern-hero--results' },
    h(GoldenCosmosCanvas, { count: 85, speed: 0.9, color: 'rose' }),
    h('div', { className: 'wrap modern-hero-grid' },
      h('div', { className: 'modern-hero-copy' },
        h(TechSplitHeading, {
          title: 'Artistry Verified.',
          accent: 'Confidence Restored.',
          theme: 'dark'
        }),
        h('p', { className: 'modern-hero-desc' }, 'Explore brow mapping, finished shapes and lip colour from Dermaphi’s client portfolio.'),
        h('div', { className: 'actions modern-hero-actions' },
          link('Browse Portfolio Below ↓', url('results') + '#client-portfolio', 'button'),
          link('Book a Consultation ↗', booking, 'text-link')
        )
      ),
      h('div', { className: 'modern-hero-spotlight' },
        h(SpotlightCard, { className: 'results-lens-card motion-surface', ...highlightEvents },
          h('div', { className: 'lens-toolbar' },
            h('div', { className: 'lens-pills', role: 'tablist', 'aria-label': 'Gallery lens' },
              [['brows', 'Brows'], ['lips', 'Lips'], ['closeups', 'Detail']].map(([key, label]) =>
                h('button', {
                  key, type: 'button', role: 'tab',
                  'aria-selected': lens === key,
                  className: lens === key ? 'active' : '',
                  onClick: () => setLens(key)
                }, label)
              )
            ),
            h('span', { className: 'lens-badge' }, h(DecryptedText, { text: 'STUDIO LENS' }))
          ),
          h('div', { className: 'lens-viewport', key: lens },
            activeData.image === 'client-6.jpg' ? h(LipComparison) : h('img', { src: 'assets/' + activeData.image, alt: activeData.title, loading: 'lazy' }),
            h('div', { className: 'lens-overlay' },
              h('h3', null, activeData.title),
              h('p', null, activeData.desc)
            )
          ),
          h('div', { className: 'lens-footer' },
            h('span', null, 'Unretouched photography · Natural daylight'),
            link('View Full Gallery ↓', url('results') + '#client-portfolio', 'text-link')
          )
        )
      )
    )
  );
}

function AboutHero() {
  return h('section', { className: 'inner-hero modern-hero modern-hero--about' },
    h(GoldenCosmosCanvas, { count: 70, speed: 0.75, color: 'gold' }),
    h('div', { className: 'wrap modern-hero-grid' },
      h('div', { className: 'modern-hero-copy' },
        h(TechSplitHeading, {
          title: 'Meet Preethi Sadha.',
          accent: 'Crafting Quiet Luxury.',
          theme: 'dark'
        }),
        h('p', { className: 'modern-hero-desc' }, 'Preethi founded Dermaphi Aesthetics in Chrompet, Chennai, where she offers permanent makeup and trains artists.'),
        h('div', { className: 'actions modern-hero-actions' },
          link('Preethi’s Studio Story ↓', url('about') + '#founder-note', 'button'),
          link('Book a Consultation ↗', booking, 'text-link')
        )
      ),
      h('div', { className: 'modern-hero-spotlight' },
        h(SpotlightCard, { className: 'about-portrait-card motion-surface', ...highlightEvents },
          h('div', { className: 'portrait-frame' },
            h('img', { src: 'assets/preethi-founder-about.jpg', alt: 'Preethi Sadha, Founder and Master PMU Artist at Dermaphi Aesthetics', loading: 'eager' }),
            h('span', { className: 'portrait-gold-seal', 'aria-hidden': 'true' }, 'Φ')
          ),
          h('div', { className: 'portrait-meta' },
            h('strong', null, h(DecryptedText, { text: 'Preethi Sadha' })),
            h('span', null, 'Founder & Master PMU Artist'),
            h('div', { className: 'portrait-tags' },
              h('span', null, 'PhiAcademy Certified'),
              h('span', null, 'Grand PMU India 2024'),
              h('span', null, 'Chrompet, Chennai')
            )
          )
        )
      )
    )
  );
}

function ContactHero() {
  return h('section', { className: 'inner-hero modern-hero modern-hero--contact' },
    h(GoldenCosmosCanvas, { count: 65, speed: 0.7, color: 'gold' }),
    h('div', { className: 'wrap' },
      h(TechSplitHeading, {
        title: 'Plan Your Visit to',
        accent: 'Dermaphi Atelier.',
        theme: 'light'
      }),
      h('p', { className: 'contact-hero-intro' }, 'Tell us what you’d like to discuss and when you’d like to visit the studio.'),
      h('div', { className: 'contact-action-cards' },
        h('a', { href: booking, className: 'contact-card contact-card--highlight' },
          h('span', { className: 'contact-card-icon', 'aria-hidden': 'true' }, '📅'),
          h('h3', null, 'Appointment Enquiry'),
          h('p', null, 'Fill our studio enquiry form to request your preferred date and time.'),
          h('span', { className: 'contact-card-link' }, 'Reserve Time ↗')
        ),
        h('a', { href: chat, className: 'contact-card', target: '_blank', rel: 'noopener' },
          h('span', { className: 'contact-card-icon', 'aria-hidden': 'true' }, '💬'),
          h('h3', null, 'WhatsApp Consultation'),
          h('p', null, 'Send photos or ask Preethi direct questions about suitability and healing.'),
          h('span', { className: 'contact-card-link' }, 'Message Studio ↗')
        ),
        h('a', { href: directions, className: 'contact-card', target: '_blank', rel: 'noopener' },
          h('span', { className: 'contact-card-icon', 'aria-hidden': 'true' }, '📍'),
          h('h3', null, 'Chrompet Studio'),
          h('p', null, '1st Floor, NSR Road, Hasthinapuram, Chrompet, Chennai.'),
          h('span', { className: 'contact-card-link' }, 'Get Directions ↗')
        )
      )
    )
  );
}

// Atelier Pillar Luxury Vector Icons
function CaliperIcon() {
  return h('svg', { viewBox: '0 0 40 40', width: '30', height: '30', fill: 'none', stroke: '#edcb89', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
    h('circle', { cx: '20', cy: '8', r: '3.5', fill: 'rgba(237, 203, 137, 0.25)', stroke: '#edcb89', strokeWidth: '1.6' }),
    h('circle', { cx: '20', cy: '8', r: '1.2', fill: '#edcb89' }),
    h('path', { d: 'M17.5 10.5 L10 26 Q8 31 6 36', stroke: '#edcb89' }),
    h('path', { d: 'M22.5 10.5 L30 26 Q32 31 34 36', stroke: '#edcb89' }),
    h('line', { x1: '20', y1: '11.5', x2: '20', y2: '36', stroke: '#ffffff', strokeWidth: '1.4' }),
    h('path', { d: 'M13 22 Q20 25 27 22', stroke: 'rgba(237, 203, 137, 0.65)', strokeDasharray: '2 2' }),
    h('circle', { cx: '20', cy: '23.8', r: '1', fill: '#edcb89' })
  );
}

function PigmentIcon() {
  return h('svg', { viewBox: '0 0 40 40', width: '30', height: '30', fill: 'none', stroke: '#edcb89', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
    h('path', { d: 'M16 6 C16 4.5 17.8 3 20 3 C22.2 3 24 4.5 24 6 L24 9 L16 9 Z', fill: 'rgba(237, 203, 137, 0.2)', stroke: '#edcb89' }),
    h('path', { d: 'M17 9 L17 18 L19 23 L19 25 L21 25 L21 23 L23 18 L23 9', stroke: '#edcb89' }),
    h('path', { d: 'M20 28 C18 31 16.5 33 16.5 35 C16.5 36.9 18.1 38.5 20 38.5 C21.9 38.5 23.5 36.9 23.5 35 C23.5 33 22 31 20 28 Z', fill: 'rgba(237, 203, 137, 0.35)', stroke: '#edcb89' }),
    h('circle', { cx: '19.5', cy: '34.5', r: '1', fill: '#ffffff' }),
    h('path', { d: 'M30 11 L31.2 14 L34 15.2 L31.2 16.4 L30 19 L28.8 16.4 L26 15.2 L28.8 14 Z', fill: '#edcb89', stroke: 'none' }),
    h('path', { d: 'M10 18 L10.8 20 L13 20.8 L10.8 21.6 L10 23.5 L9.2 21.6 L7 20.8 L9.2 20 Z', fill: 'rgba(237, 203, 137, 0.8)', stroke: 'none' })
  );
}

function SterilizationIcon() {
  return h('svg', { viewBox: '0 0 40 40', width: '30', height: '30', fill: 'none', stroke: '#edcb89', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
    h('path', { d: 'M20 4 L33 9 C33 21 27.5 29.5 20 36 C12.5 29.5 7 21 7 9 Z', fill: 'rgba(237, 203, 137, 0.12)', stroke: '#edcb89' }),
    h('path', { d: 'M20 8 L29.5 12 C29.5 21 25.5 27.5 20 32 C14.5 27.5 10.5 21 10.5 12 Z', stroke: 'rgba(237, 203, 137, 0.45)', strokeDasharray: '2 2' }),
    h('line', { x1: '20', y1: '15', x2: '20', y2: '25', stroke: '#ffffff', strokeWidth: '2.2' }),
    h('line', { x1: '15', y1: '20', x2: '25', y2: '20', stroke: '#ffffff', strokeWidth: '2.2' }),
    h('circle', { cx: '20', cy: '20', r: '1.5', fill: '#edcb89' })
  );
}

function PostCareIcon() {
  return h('svg', { viewBox: '0 0 40 40', width: '30', height: '30', fill: 'none', stroke: '#edcb89', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
    h('path', { d: 'M8 26 C8 32 14 36 20 36 C26 36 32 32 32 26 C30 25 27 26 25 27 C23 28 21 27 20 26 C19 27 17 28 15 27 C13 26 10 25 8 26 Z', fill: 'rgba(237, 203, 137, 0.15)', stroke: '#edcb89' }),
    h('path', { d: 'M20 12 C18 9 14 9 12 11.5 C9.5 14.5 10 19 14.5 23 L20 28 L25.5 23 C30 19 30.5 14.5 28 11.5 C26 9 22 9 20 12 Z', fill: 'rgba(237, 203, 137, 0.28)', stroke: '#edcb89' }),
    h('path', { d: 'M20 5 L20.8 7.2 L23 8 L20.8 8.8 L20 11 L19.2 8.8 L17 8 L19.2 7.2 Z', fill: '#ffffff', stroke: 'none' })
  );
}

function ArtistryStandards() {
  const pillars = [
    {
      num: '01',
      icon: CaliperIcon,
      title: 'Golden Ratio Caliper Mapping',
      desc: 'Every brow and lip outline is mapped using facial symmetry and golden ratio (Φ 1.618) calipers before treatment.'
    },
    {
      num: '02',
      icon: PigmentIcon,
      title: 'International standard pigments',
      desc: '100% hypoallergenic, heavy-metal-free pigments formulated to heal true-to-tone and never discolor into blue or red.'
    },
    {
      num: '03',
      icon: SterilizationIcon,
      title: 'Single-Use Medical Sterilization',
      desc: 'Strict hospital-grade hygiene protocols with 100% single-use disposable micro-blades, cartridges, and sterile draping.'
    },
    {
      num: '04',
      icon: PostCareIcon,
      title: 'Comprehensive Post-Care & Touch-Up',
      desc: 'Detailed healing instructions, medical-grade aftercare balm, and a complimentary perfecting touch-up session included.'
    }
  ];

  return h('section', { className: 'artistry-standards-section', 'data-reveal': '', 'aria-label': 'The Dermaphi Standard of Care' },
    h('div', { className: 'wrap section artistry-standards-wrap' },
      h('div', { className: 'standards-head' },
        h('p', { className: 'eyebrow' }, 'OUR ATELIER PILLARS'),
        h('h2', null, 'The Dermaphi Standard of Care'),
        h('p', null, 'Every client experience at our Chrompet studio is anchored in clinical safety, aesthetic harmony, and personalized care.')
      ),
      h('div', { className: 'artistry-standards-grid' },
        pillars.map(({ num, icon, title, desc }) =>
          h('div', { key: title, className: 'standard-pillar-card motion-surface' },
            h('div', { className: 'pillar-card-top' },
              h('div', { className: 'pillar-icon-badge', 'aria-hidden': 'true' }, h(icon)),
              h('span', { className: 'pillar-card-num' }, num)
            ),
            h('h3', null, title),
            h('p', null, desc)
          )
        )
      )
    )
  );
}

function ResultsGuide() {
  const steps = [
    ['01 · Immediate Finish', 'Fresh pigment appears 20–30% darker and crisper right after your appointment with slight rosy warmth.'],
    ['02 · Gentle Healing', 'Around days 4–7, light micro-flaking occurs as the skin heals naturally. Color softens into a soft, sheer tone.'],
    ['03 · Healed Radiance', 'By week 4, the true stabilized pigment emerges. A complimentary touch-up perfects any fine hair strokes or color depth.']
  ];
  return h('section', { className: 'wrap section results-guide-section', 'data-reveal': '' },
    h('div', { className: 'results-guide-head' },
      h('p', { className: 'eyebrow' }, 'WHAT TO EXPECT'),
      h('h2', null, 'The Healing Transformation'),
      h('p', null, 'Permanent makeup heals in stages. Understanding the natural skin cycle helps you appreciate every phase of your new look.')
    ),
    h('div', { className: 'results-guide-grid' },
      steps.map(([title, desc]) =>
        h('div', { key: title, className: 'results-guide-card' },
          h('h3', null, title),
          h('p', null, desc)
        )
      )
    ),
    h('div', { className: 'gallery-consultation-banner' },
      h('div', null,
        h('h3', null, 'Ready to discuss your custom brow or lip design?'),
        h('p', null, 'Consultations with Preethi are private, relaxed, and focused on finding the exact shape and shade you feel confident in.')
      ),
      link('Book Your Consultation ↗', booking, 'button')
    )
  );
}

function ContactEssentials() {
  const items = [
    ['Private Studio Sessions', 'Dermaphi operates by advance appointment to guarantee total privacy, undivided attention, and unhurried consultation time.'],
    ['Convenient Chrompet Location', 'Located on NSR Road, Hasthinapuram, easily accessible from Chrompet Railway Station and GST Road, Chennai.'],
    ['Complimentary Skin Evaluation', 'Before any procedure begins, we evaluate your undertones, previous cosmetic tattooing (if any), and facial architecture.']
  ];
  return h('section', { className: 'wrap section contact-essentials-section', 'data-reveal': '' },
    h('div', { className: 'essentials-head' },
      h('p', { className: 'eyebrow' }, 'STUDIO INFORMATION'),
      h('h2', null, 'Visiting Dermaphi Aesthetics'),
      h('p', null, 'Essential information to help plan your appointment with Preethi Sadha.')
    ),
    h('div', { className: 'essentials-grid' },
      items.map(([title, desc]) =>
        h('div', { key: title, className: 'essential-card' },
          h('h3', null, title),
          h('p', null, desc)
        )
      )
    )
  );
}

function InteriorPage({ page }) {
  const content = {
    treatments: h(React.Fragment, null,
      h(TreatmentsPage),
      h(FinishFinder),
      h(TreatmentPrepAndFAQ)
    ),
    contact: h(React.Fragment, null,
      h(ContactPage),
      h(ContactEssentials)
    ),
    about: h(React.Fragment, null,
      h(FounderNote),
      h(ArtistryStandards),
      h(StudioDepthGallery, { id: 'preethi-photo-story', variant: 'depth-ribbon', title: 'Behind the artistry', intro: 'See Preethi at work and explore photos from her permanent makeup training journey.' })
    ),
    results: h(React.Fragment, null,
      h(StudioDepthGallery, { id: 'client-portfolio', variant: 'orbit', photos: clientPhotos.filter(([src]) => src !== 'client-4.jpg'), title: 'Brow and lip portfolio', intro: 'Explore Dermaphi’s latest brow comparisons and lip close-ups.' }),
      h(HomeTestimonials),
      h(ResultsGuide)
    )
  };
  return h(React.Fragment, null,
    h({ about: AboutHero, contact: ContactHero, results: ResultsHero, treatments: TreatmentsHero }[page]),
    content[page]);
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  ReactDOM.hydrateRoot(root, h(App, { page: root.dataset.page }));
}

