/* ═══════════════════════════════════════════════════════════════
   GRADORA.EATS — MAIN PAGE SCRIPT
   ═══════════════════════════════════════════════════════════════
   Execution order matters — sections are intentionally sequenced:
     A. Plugin registration
     B. Initial gsap.set (before any timeline touches the DOM)
     C. Scroll trigger + timeline
     D. Idle levitation
     E. Stars, transitions, shop, cursor, observers, nav
   ═══════════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);


/* ═══════════════════════════════════════════════════════════
   A. INITIAL STATES — set before any animation runs
   ═══════════════════════════════════════════════════════════ */
gsap.set(['#mw6','#mw5','#mw4','#mw3','#mw2','#mw1','#mw0'], { opacity: 0, y: 20 });
gsap.set('#jarWrap',  { opacity: 0, y: 180, scale: 0.75, rotation: -40, force3D: true });
gsap.set('#heroTxt',  { opacity: 0, y: 30 });
gsap.set('#stars-c',  { opacity: 0 });


/* ═══════════════════════════════════════════════════════════
   B. SCROLL PARALLAX — Hero & Mountains
   ═══════════════════════════════════════════════════════════
   FIX: trigger was referenced before being defined (crash).
   Now defined first, then used in scrollTl.
   ═══════════════════════════════════════════════════════════ */
const trigger = {
    trigger: '#heroWrap',
    start:   'top top',
    end:     'bottom top',
    scrub:   1.2
};

// Mountain depth layers — each moves at a different rate for true parallax
gsap.to('#mw6', { y: '-10%', x: '-3%', scale: 1.05, ease: 'none', scrollTrigger: trigger });
gsap.to('#mw5', { y: '-12%', x:  '4%', scale: 1.05, ease: 'none', scrollTrigger: trigger });
gsap.to('#mw4', { y: '-16%', x: '-5%', scale: 1.08, ease: 'none', scrollTrigger: trigger });
gsap.to('#mw3', { y: '-22%', x:  '6%', scale: 1.08, ease: 'none', scrollTrigger: trigger });
gsap.to('#mw2', { y: '-30%', x: '-4%', scale: 1.10, ease: 'none', scrollTrigger: trigger });
gsap.to('#mw1', { y: '-40%',           scale: 1.15, ease: 'none', scrollTrigger: trigger });
gsap.to('#mw0', { y: '-60%',           scale: 1.20, ease: 'none', scrollTrigger: trigger });

// Hero text fades as user scrolls away.
// fromTo is required — gsap.to captures the gsap.set() opacity:0 as the
// "from" state, so scrubbing back to top would restore to invisible.
// Explicit from values guarantee it always returns to fully visible.
gsap.fromTo('#heroTxt',
    { opacity: 1, y: 0 },
    { opacity: 0, y: -60, ease: 'none',
      scrollTrigger: { trigger: '#heroWrap', start: 'top top', end: '80% top', scrub: true }
    }
);

// Jar scroll pop-out with parallax depth on children
const scrollTl = gsap.timeline({ scrollTrigger: trigger });
scrollTl
    .to('#jarWrap', {
        y: '-25%', scale: 1.1, rotation: 6,
        ease: 'power2.inOut',
    }, 0)
    .to('#jarWrap > *', {
        rotation: -3,   // counter-rotate inner = parallax depth illusion
        ease: 'power2.inOut',
    }, 0);


/* ═══════════════════════════════════════════════════════════
   C. PAGE LOAD ENTRY — Elastic jar bounce + micro-settle
   ═══════════════════════════════════════════════════════════ */
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl
    .to('#stars-c', { opacity: 1, duration: 2.5, ease: 'power2.out' }, 0)

    // Background mountains stagger in (array = clean, no repeated lines)
    .to(['#mw6','#mw5','#mw4','#mw3','#mw2'], {
        opacity: 1, y: 0, duration: 1.8, stagger: 0.12,
    }, 0.1)

    // Jar bounces in with elastic energy
    .to('#jarWrap', {
        opacity: 1, y: 0, scale: 1,
        rotation: -14,                          // elastic overshoots around this
        duration: 2.4, ease: 'elastic.out(1.1, 0.45)',
    }, 0.5)

    // Micro-correct: resolves the elastic wiggle into a deliberate lean
    .to('#jarWrap', {
        rotation: -8, duration: 0.9, ease: 'power2.inOut',
    }, 2.3)

    .to(['#mw1','#mw0'], {
        opacity: 1, y: 0, duration: 1.3, stagger: 0.1,
    }, 0.9)

    .to('#heroTxt', { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 1.3);


/* ═══════════════════════════════════════════════════════════
   D. IDLE LEVITATION — 4 de-synced loops = organic float
   ═══════════════════════════════════════════════════════════
   Durations (2.8 / 3.9 / 3.3 / 4.2s) are incommensurable —
   they never re-sync, so motion never feels mechanical.
   FIX: Use gsap.fromTo instead of to() with relative values
   so the resting state is always predictable regardless of
   when the idle kicks in relative to the entry animation.
   ═══════════════════════════════════════════════════════════ */
const IDLE_DELAY = 3.2; // after entry animation fully settles

// Primary Y breath
gsap.fromTo('#jarWrap',
    { y: 0 },
    { y: -18, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: IDLE_DELAY }
);

// Slow X drift — barely perceptible, adds life
gsap.fromTo('#jarWrap',
    { x: 0 },
    { x: 7, duration: 3.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: IDLE_DELAY }
);

// Rotation sway — fromTo makes resting angle explicit (-8° from entry)
gsap.fromTo('#jarWrap',
    { rotation: -8 },
    { rotation: -13, duration: 3.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: IDLE_DELAY }
);

// Scale breathe — like lungs
gsap.fromTo('#jarWrap',
    { scale: 1 },
    { scale: 1.028, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: IDLE_DELAY }
);


/* ═══════════════════════════════════════════════════════════
   E. HERO IMAGE AUTO-CYCLE
   ═══════════════════════════════════════════════════════════
   Strategy: animate the IMAGE ELEMENT (scaleX flip) not
   #jarWrap itself — idle physics on the wrapper run
   completely uninterrupted. Zero conflicts, no pausing.

   Timing is synced to the Y-float period (2.8s).
   Swaps fire every 11.2s = 4 full float cycles, so each
   swap always lands near the same float phase — feels like
   the jar is naturally turning at a breath pause.
   ═══════════════════════════════════════════════════════════ */

// Use the largest/feature image per product for the hero showcase
const HERO_CYCLE = [
    { img: 'cashew.png',       name: 'W240 Cashew'   },
    { img: 'almond.png',       name: 'Almond'         },
    { img: 'pistachio.png',    name: 'USA Pistachio'  },
    { img: '7-blendM.png',     name: '7-Blend Mix'    },
    { img: 'seed_mix.png',     name: 'Seed Mix'       },
    { img: 'nut_mix.png',      name: 'Nut Mix'        },
    { img: 'pumpkin.png',      name: 'Pumpkin Seed'   },
    { img: 'sunflower.png',    name: 'Sunflower Seed' },
    { img: 'black_raisin.png', name: 'Black Raisin'   },
    { img: 'flax_seed.png',    name: 'Flax Seed'      },
];

let heroIdx = 0;

// Inject a product name label below the jar — appears on each swap
// (function injectHeroLabel() {
//     const wrap = document.getElementById('jarWrap');
//     if (!wrap || document.getElementById('hero-prod-label')) return;
//     const label = document.createElement('div');
//     label.id = 'hero-prod-label';
//     Object.assign(label.style, {
//         position:      'absolute',
//         bottom:        '-2.4rem',
//         left:          '50%',
//         transform:     'translateX(-50%)',
//         opacity:       '0',
//         whiteSpace:    'nowrap',
//         fontSize:      '0.78rem',
//         letterSpacing: '0.18em',
//         textTransform: 'uppercase',
//         color:         '#F2EBD9',
//         pointerEvents: 'none',
//         fontFamily:    "'MuseoModerno', sans-serif",
//         zIndex:        '10',
//     });
//     if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
//     wrap.appendChild(label);
// })();

function cycleHeroImage() {
    heroIdx = (heroIdx + 1) % HERO_CYCLE.length;
    const next  = HERO_CYCLE[heroIdx];
    const img   = document.querySelector('#jarWrap img');
    const label = document.getElementById('hero-prod-label');
    if (!img) return;

    gsap.timeline()
        // Shrink + tilt away — same motion as selVar swap
        .to(img, {
            scale:    0.72,
            rotation: -10,
            opacity:  0.3,
            duration: 0.18,
            ease:     'power2.in',
            onComplete() { img.src = `../images/products/${next.img}`; }
        })
        // Elastic spring back with new image
        .to(img, {
            scale:    1.08,
            rotation:  2,
            opacity:  1,
            duration: 0.45,
            ease:     'elastic.out(1, 0.55)',
        })
        // Micro-settle to rest
        .to(img, {
            scale:    1,
            rotation: 0,
            duration: 0.2,
            ease:     'power2.out',
        })
        // Phase 4: show product name label, hold, fade out
        .call(() => {
            if (!label) return;
            label.textContent = next.name;
            gsap.timeline()
                .to(label, { opacity: 1, y: -4, duration: 0.35, ease: 'power2.out' })
                .to(label, { opacity: 0, y: -8, duration: 0.40, ease: 'power2.in', delay: 1.8 });
        });

    // Schedule the next swap — recursive delayedCall keeps GSAP in control
    // 11.2s = exactly 4 × Y-float period (2.8s) = swaps stay phase-locked
    gsap.delayedCall(11.2, cycleHeroImage);
}

// First swap fires after: entry settles (3.2s) + 1 full float (2.8s) + buffer (1.0s)
gsap.delayedCall(IDLE_DELAY + 2.8 + 1.0, cycleHeroImage);


/* ═══════════════════════════════════════════════════════════
   F. BACKGROUND STARS
   ═══════════════════════════════════════════════════════════ */
const sc = document.getElementById('stars-c');
if (sc) {
    const sctx = sc.getContext('2d');

    function srz() { sc.width = window.innerWidth; sc.height = window.innerHeight; }
    srz();
    window.addEventListener('resize', srz);

    const STARS = Array.from({ length: 220 }, () => ({
        x: Math.random(), y: Math.random() * 0.7,
        r: Math.random() * 1.3 + 0.2,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.0025 + 0.0008
    }));

    // FIX: guard flag so the RAF loop can be stopped if needed
    let starsRunning = true;
    function dStars(t) {
        if (!starsRunning) return;
        sctx.clearRect(0, 0, sc.width, sc.height);
        STARS.forEach(s => {
            const a = 0.25 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
            sctx.beginPath();
            sctx.arc(s.x * sc.width, s.y * sc.height, s.r, 0, Math.PI * 2);
            sctx.fillStyle = `rgba(255,252,230,${a * 0.8})`;
            sctx.fill();
        });
        requestAnimationFrame(dStars);
    }
    requestAnimationFrame(dStars);
}


/* ═══════════════════════════════════════════════════════════
   F. PAGE TRANSITIONS
   ═══════════════════════════════════════════════════════════
   Two systems existed in parallel (cinematicTransition for
   product links, ptTop/ptBottom for all others). Now unified:
   — product links still use the cinematic overlay
   — internal links use the liquid wipe (ptTop/ptBottom)
   — external links (http, #) are excluded from both
   ═══════════════════════════════════════════════════════════ */

// Cinematic overlay — used for product detail navigation
function cinematicTransition(action) {
    const ov  = document.createElement('div');
    const top = document.createElement('div');
    const bot = document.createElement('div');
    const logo = document.createElement('div');

    Object.assign(ov.style, {
        position: 'fixed', inset: '0', zIndex: '99999',
        display: 'grid', gridTemplateRows: '1fr 1fr', pointerEvents: 'all'
    });
    [top, bot].forEach((el, i) => {
        Object.assign(el.style, {
            background: i === 0
                ? 'linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 100%)'
                : 'linear-gradient(135deg,#071209 0%,#102814 100%)',
            transform: i === 0 ? 'translateY(-100%)' : 'translateY(100%)',
            display: 'flex',
            alignItems:      i === 0 ? 'flex-end'   : 'flex-start',
            justifyContent: 'center',
            padding: '1.5rem 0'
        });
    });

    logo.innerHTML = 'Gradora<em style="font-style:italic;color:#E07240;">.eats</em>';
    Object.assign(logo.style, {
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%) scale(.7)',
        opacity: '0', fontSize: '2rem',
        fontFamily: "'MuseoModerno',sans-serif",
        color: '#F2EBD9', letterSpacing: '.04em',
        zIndex: '100000', pointerEvents: 'none', whiteSpace: 'nowrap'
    });

    ov.appendChild(top);
    ov.appendChild(bot);
    document.body.appendChild(ov);
    document.body.appendChild(logo);

    gsap.timeline()
        .to([top, bot], { y: '0%', duration: .45, ease: 'power4.inOut' })
        .to(logo, { opacity: 1, scale: 1, duration: .25, ease: 'back.out(1.7)' }, '-=.1')
        .call(() => { if (action) action(); })
        .to(logo, { opacity: 0, scale: 1.1, duration: .2 }, '+=.15')
        .to(top,  { y: '-100%', duration: .5, ease: 'power4.inOut' })
        .to(bot,  { y:  '100%', duration: .5, ease: 'power4.inOut' }, '<')
        .call(() => { ov.remove(); logo.remove(); });
}

window.openProductDetail = function (pid) {
    cinematicTransition(() => { window.location.href = `products/product.html?id=${pid}`; });
};

// Liquid wipe — used for all other internal navigation
const ptTop    = document.querySelector('.pt-top');
const ptBottom = document.querySelector('.pt-bottom');
const ptLogo   = document.querySelector('.pt-logo');

if (ptTop && ptBottom && ptLogo) {
    // Page reveal on load/refresh
    window.addEventListener('pageshow', () => {
        gsap.timeline()
            .set([ptTop, ptBottom], { y: '0%' })  // start covering the screen
            .set(ptLogo, { opacity: 1, scale: 1 })
            .to(ptTop,  { y: '-100%', duration: 1.0, ease: 'power4.out' })
            .to(ptBottom, { y: '100%', duration: 1.0, ease: 'power4.out' }, '<')
            .to(ptLogo, { opacity: 0, duration: 0.5 }, '-=0.5');
    });

    function pageTransition(url) {
        gsap.timeline()
            .to([ptTop, ptBottom], { y: '0%', duration: 0.75, ease: 'power4.inOut' })
            .to(ptLogo, { opacity: 1, scale: 1, duration: 0.35 }, '-=0.35')
            .call(() => { window.location.href = url; });
    }

    // Bind to all internal, non-product, non-hash links
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href
            || href.startsWith('#')
            || href.startsWith('http')
            || href.includes('javascript')
            || href.includes('product.html') // handled by cinematicTransition
        ) return;
        link.addEventListener('click', e => { e.preventDefault(); pageTransition(href); });
    });
}


/* ═══════════════════════════════════════════════════════════
   G. PRODUCT DATA
   ═══════════════════════════════════════════════════════════ */
const PRODS = [
    {
        id: 'cashew', cat: 'nuts', nm: 'W240 Cashew', cat2: 'Premium Nuts',
        bdg: { t: 'Best Seller', c: 'bh' },
        desc: 'Large-grade W240 cashews — buttery, rich and sealed fresh. No oil, no salt. Pure as nature intended.',
        pro: '18.2g', fib: '3.3g', ca: '#2A1A08', cb: '#3E2810',
        vars: [
            { l: '200g', p: 350, img: 'cashew-m.png',  a: 'https://amzn.in/d/07cVEZkl', f: 'https://www.flipkart.com/search?q=gradora+cashew+200g' },
            { l: '350g', p: 519, img: 'cashew.png',    a: 'https://amzn.in/d/04goq5TT', f: 'https://www.flipkart.com/search?q=gradora+cashew+350g' }
        ]
    },
    {
        id: 'almond', cat: 'nuts', nm: 'Almond', cat2: 'Premium Nuts', bdg: null,
        desc: 'Crisp, nutrient-dense almonds. No oil or salt added. High protein, high fiber. A daily health ritual.',
        pro: '21.1g', fib: '12.5g', ca: '#3D2010', cb: '#522A14',
        vars: [
            { l: '250g', p: 405, img: 'almond-m.png',  a: 'https://amzn.in/d/05ImkphJ', f: 'https://www.flipkart.com/search?q=gradora+almond+250g' },
            { l: '400g', p: 575, img: 'almond.png',    a: 'https://amzn.in/d/0hkpGSAM', f: 'https://www.flipkart.com/search?q=gradora+almond+400g' }
        ]
    },
    {
        id: 'pistachio', cat: 'nuts', nm: 'USA Pistachio', cat2: 'Premium USA Nuts',
        bdg: { t: 'USA Grade', c: 'bn' },
        desc: "Premium USA pistachios — naturally roasted, maximum crunch, zero additives. The world's finest grade.",
        pro: '20.1g', fib: '10.3g', ca: '#243A14', cb: '#344E1E',
        vars: [
            { l: '150g', p: 365, img: 'pistachio-m.png', a: 'https://amzn.in/d/0c9E3wQm', f: 'https://www.flipkart.com/search?q=gradora+pistachio+150g' },
            { l: '300g', p: 599, img: 'pistachio.png',   a: 'https://amzn.in/d/0fBUYpgF', f: 'https://www.flipkart.com/search?q=gradora+pistachio+300g' }
        ]
    },
    {
        id: 'pumpkin', cat: 'seeds', nm: 'Pumpkin Seed', cat2: 'Premium Seeds', bdg: null,
        desc: 'High-protein pumpkin seeds packed with zinc and essential minerals. The powerhouse seed for daily wellness.',
        pro: '30.2g', fib: '—', ca: '#142A12', cb: '#1E3A1A',
        vars: [
            { l: '150g', p: 206, img: 'pumpkin-s.png', a: 'https://amzn.in/d/0ijvShZP', f: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+150g' },
            { l: '200g', p: 245, img: 'pumpkin-m.png', a: 'https://amzn.in/d/00z7YZHo', f: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+200g' },
            { l: '400g', p: 359, img: 'pumpkin.png',   a: 'https://amzn.in/d/0hQzFAr7', f: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+400g' }
        ]
    },
    {
        id: 'flax', cat: 'seeds', nm: 'Flax Seed', cat2: 'Premium Seeds', bdg: null,
        desc: 'Omega-3 rich roasted flaxseed — highest fiber in our range. Earthy, nutty and deeply nourishing.',
        pro: '18.2g', fib: '27.3g', ca: '#2E1808', cb: '#3E220E',
        vars: [
            { l: '150g', p: 149, img: 'flax_seed-s.png', a: 'https://amzn.in/d/02o5nC4h', f: 'https://www.flipkart.com/search?q=gradora+flax+seed+150g' },
            { l: '250g', p: 174, img: 'flax_seed-m.png', a: 'https://amzn.in/d/01LLMEWN', f: 'https://www.flipkart.com/search?q=gradora+flax+seed+250g' },
            { l: '400g', p: 203, img: 'flax_seed.png',   a: 'https://amzn.in/d/0b8AP021', f: 'https://www.flipkart.com/search?q=gradora+flax+seed+400g' }
        ]
    },
    {
        id: 'sunflower', cat: 'seeds', nm: 'Sunflower Seed', cat2: 'Premium Seeds', bdg: null,
        desc: 'Vitamin E-rich sunflower seeds — crunchy, nutty and loaded with healthy fats. Snack or sprinkle.',
        pro: '20.7g', fib: '10.5g', ca: '#162430', cb: '#1E303E',
        vars: [
            { l: '100g', p: 149, img: 'sunflower-s.png', a: 'https://amzn.in/d/0en8i1sc', f: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+100g' },
            { l: '200g', p: 185, img: 'sunflower-m.png', a: 'https://amzn.in/d/0hZUxde7', f: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+200g' },
            { l: '400g', p: 235, img: 'sunflower.png',   a: 'https://amzn.in/d/02f2FklQ', f: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+400g' }
        ]
    },
    {
        id: 'raisin', cat: 'nuts', nm: 'Black Raisin', cat2: 'Premium Dried Fruit', bdg: null,
        desc: 'Naturally sweet iron-rich black raisins. No sugar coating — pure dried fruit, nothing more.',
        pro: '3.0g', fib: '3.7g', ca: '#220818', cb: '#2E0E22',
        vars: [
            { l: '150g', p: 199, img: 'black_raisin-s.png', a: 'https://amzn.in/d/040GsZWs', f: 'https://www.flipkart.com/search?q=gradora+black+raisin+150g' },
            { l: '250g', p: 259, img: 'black_raisin-m.png', a: 'https://amzn.in/d/06AuMtm3', f: 'https://www.flipkart.com/search?q=gradora+black+raisin+250g' },
            { l: '400g', p: 339, img: 'black_raisin.png',   a: 'https://amzn.in/d/00JocTOz', f: 'https://www.flipkart.com/search?q=gradora+black+raisin+400g' }
        ]
    },
    {
        id: 'seedmix', cat: 'mixes', nm: 'Seed Mix', cat2: 'Premium Seed Mix',
        bdg: { t: 'Top Pick', c: 'bs' },
        desc: 'Pumpkin 40% · Sunflower 35% · Flaxseed 25% — the ultimate daily seed blend in one jar.',
        pro: '30g', fib: '14g', ca: '#0A2018', cb: '#103020',
        vars: [
            { l: '150g', p: 175, img: 'seed_mix-s.png', a: 'https://amzn.in/d/02IBaxWG', f: 'https://www.flipkart.com/search?q=gradora+seed+mix+150g' },
            { l: '250g', p: 220, img: 'seed_mix-m.png', a: 'https://amzn.in/d/0imJ9Jnc', f: 'https://www.flipkart.com/search?q=gradora+seed+mix+250g' },
            { l: '400g', p: 279, img: 'seed_mix.png',   a: 'https://amzn.in/d/02aoIrDU', f: 'https://www.flipkart.com/search?q=gradora+seed+mix+400g' }
        ]
    },
    {
        id: 'blend7', cat: 'mixes', nm: '7-Blend Mix', cat2: 'Signature Blend',
        bdg: { t: 'Signature', c: 'bh' },
        desc: 'Seven superfoods: Cashew · Almond · Pistachio · Raisin · Pumpkin · Sunflower · Flaxseed. One legendary jar.',
        pro: '16.1g', fib: '5.8g', ca: '#1A2A10', cb: '#2A3C18',
        vars: [
            { l: '250g', p: 345, img: '7-blendM-m.png', a: 'https://amzn.in/d/03PGBwNN', f: 'https://www.flipkart.com/search?q=gradora+7+blend+250g' },
            { l: '400g', p: 475, img: '7-blendM.png',   a: 'https://amzn.in/d/00WJtqm5', f: 'https://www.flipkart.com/search?q=gradora+7+blend+400g' }
        ]
    },
    {
        id: 'nutmix', cat: 'mixes', nm: 'Nut Mix', cat2: 'Nut Blend',
        bdg: { t: 'Bestseller', c: 'bh' },
        desc: '4 superfoods: Cashew · Almond · Pistachio · Black Raisin. The premium everyday nut blend, perfected.',
        pro: '13.8g', fib: '5.1g', ca: '#1E180A', cb: '#2E240E',
        vars: [
            { l: '200g', p: 340, img: 'nut_mix-m.png', a: 'https://amzn.in/d/07rv0kqs', f: 'https://www.flipkart.com/search?q=gradora+nut+mix+200g' },
            { l: '350g', p: 499, img: 'nut_mix.png',   a: 'https://amzn.in/d/0f9b2wx4', f: 'https://www.flipkart.com/search?q=gradora+nut+mix+350g' }
        ]
    }
];

let cart = JSON.parse(localStorage.getItem('g_cart') || '[]');
const selV = {};
PRODS.forEach(p => { selV[p.id] = p.vars.length > 1 ? 1 : 0; });

const save    = () => localStorage.setItem('g_cart', JSON.stringify(cart));
const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);
const cartSum = () => cart.reduce((s, i) => s + i.p * i.qty, 0);


/* ═══════════════════════════════════════════════════════════
   H. RENDER MAIN PRODUCT GRID
   ═══════════════════════════════════════════════════════════ */
function render(cat = 'all') {
    const grid = document.getElementById('pgrid');
    if (!grid) return;

    const list = cat === 'all' ? PRODS : PRODS.filter(p => p.cat === cat);

    grid.innerHTML = list.map((p, idx) => {
        const vi  = selV[p.id];
        const v   = p.vars[vi];
        const bdg = p.bdg ? `<span class="pc-bdg ${p.bdg.c}">${p.bdg.t}</span>` : '';
        const vb  = p.vars.map((vr, i) =>
            `<button class="vb ${i === vi ? 'on' : ''}" onclick="selVar('${p.id}',${i})">${vr.l}</button>`
        ).join('');

        return `
        <div class="pc rv" id="pc-${p.id}" style="--ca:${p.ca};--cb:${p.cb};--delay:${idx * 60}ms">
            <div class="pc-img-eats" onclick="openProductDetail('${p.id}')" style="cursor:none;display:flex;align-items:center;justify-content:center;height:220px;position:relative;">
                ${bdg}
                <div class="pc-glow"></div>
                <img src="../images/products/${v.img}" class="pc-product-image" id="em-${p.id}" alt="${p.nm}">
            </div>
            <div class="pc-body">
                <div class="pc-top-row">
                    <div class="pc-cat">${p.cat2}</div>
                </div>
                <div class="pc-nm" onclick="openProductDetail('${p.id}')" style="cursor:none;">${p.nm}</div>
                <div class="pc-desc">${p.desc}</div>
                <div class="pc-nuts">
                    <span class="pc-n pn-pro">Protein ${p.pro}</span>
                    <span class="pc-n pn-fib">Fiber ${p.fib}</span>
                </div>
                <div class="vrow" id="vrow-${p.id}">${vb}</div>
                <div class="pc-ft">
                    <div class="pc-pr">₹<span id="pr-${p.id}">${v.p}</span><small> /${v.l}</small></div>
                    <a href="${v.a}" target="_blank" class="amz-btn" id="amz-${p.id}">Buy on Amazon ↗</a>
                </div>
            </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.rv').forEach(el => rvObs.observe(el));
    attachCursor(grid);

    // Recalculate ScrollTrigger after DOM changes
    ScrollTrigger.refresh();
}


/* ═══════════════════════════════════════════════════════════
   I. VARIANT SWAPPER
   ═══════════════════════════════════════════════════════════
   FIX: replaced raw setTimeout style manipulation with GSAP
   for a consistent, interruptible image swap animation.
   ═══════════════════════════════════════════════════════════ */
window.selVar = function (pid, vi) {
    selV[pid] = vi;
    const p = PRODS.find(x => x.id === pid);
    const v = p.vars[vi];

    // Update text / links
    document.getElementById('pr-' + pid).textContent = v.p;
    document.querySelector(`#pc-${pid} .pc-pr small`).textContent = ' /' + v.l;
    document.querySelectorAll(`#vrow-${pid} .vb`).forEach((b, i) => b.classList.toggle('on', i === vi));
    document.getElementById('amz-' + pid).href = v.a;

    // GSAP image swap — shrink out, swap src, scale in
    const em = document.getElementById('em-' + pid);
    gsap.timeline()
        .to(em, { scale: 0.7, rotation: -8, opacity: 0.4, duration: 0.14, ease: 'power2.in',
            onComplete() { em.src = `../images/products/${v.img}`; }
        })
        .to(em, { scale: 1.08, rotation: 2, opacity: 1, duration: 0.22, ease: 'back.out(1.4)' })
        .to(em, { scale: 1, rotation: 0, duration: 0.15, ease: 'power2.out' });
};


/* ═══════════════════════════════════════════════════════════
   J. CATEGORY FILTERS
   ═══════════════════════════════════════════════════════════
   FIX: replaced raw style manipulation with GSAP for a
   consistent, interruptible grid transition.
   ═══════════════════════════════════════════════════════════ */
const filterRow = document.getElementById('filterRow');
if (filterRow) {
    filterRow.addEventListener('click', e => {
        const b = e.target.closest('.fb');
        if (!b) return;

        document.querySelectorAll('.fb').forEach(x => x.classList.remove('on'));
        b.classList.add('on');

        const grid = document.getElementById('pgrid');
        gsap.to(grid, {
            opacity: 0, y: 16, duration: 0.2, ease: 'power2.in',
            onComplete() {
                render(b.dataset.cat);
                gsap.fromTo(grid,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
                );
            }
        });
    });
}


/* ═══════════════════════════════════════════════════════════
   K. CART DRAWER
   ═══════════════════════════════════════════════════════════ */
function refreshCart() {
    const badge = document.getElementById('cartBadge');
    const total = document.getElementById('cTotal');
    const list  = document.getElementById('cList');

    if (badge) {
        badge.textContent = cartQty();
        badge.classList.add('pop');
        setTimeout(() => badge.classList.remove('pop'), 250);
    }
    if (total) total.textContent = '₹' + cartSum().toLocaleString('en-IN');
    if (!list) return;

    if (!cart.length) {
        list.innerHTML = '<div class="c-empty">Your cart is empty.<br><em style="font-size:.9rem;">Add some goodness above ↑</em></div>';
        return;
    }

    list.innerHTML = cart.map(i => `
        <div class="c-item">
            <div class="ci-em">
                <img src="../images/products/${i.img}" style="width:80%;height:80%;object-fit:contain;filter:drop-shadow(0 5px 10px rgba(0,0,0,0.3));">
            </div>
            <div class="ci-inf">
                <div class="ci-nm">${i.nm}</div>
                <div class="ci-sz">${i.l} jar · <span class="ci-pr">₹${i.p}</span></div>
                <div class="ci-qty">
                    <button class="qb" onclick="chgQ('${i.id}','${i.l}',-1)">−</button>
                    <span class="qn">${i.qty}</span>
                    <button class="qb" onclick="chgQ('${i.id}','${i.l}',1)">+</button>
                </div>
            </div>
        </div>`).join('');

    attachCursor(list);
}

window.chgQ = function (id, l, d) {
    const idx = cart.findIndex(i => i.id === id && i.l === l);
    if (idx < 0) return;
    cart[idx].qty += d;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    save();
    refreshCart();
};

function openCart()  {
    document.getElementById('cDrawer').classList.add('open');
    document.getElementById('cOverlay').classList.add('open');
    refreshCart();
}
function closeCart() {
    document.getElementById('cDrawer').classList.remove('open');
    document.getElementById('cOverlay').classList.remove('open');
}

document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('cClose')?.addEventListener('click', closeCart);
document.getElementById('cOverlay')?.addEventListener('click', closeCart);


/* ═══════════════════════════════════════════════════════════
   L. CUSTOM CURSOR
   ═══════════════════════════════════════════════════════════ */
const cur  = document.getElementById('cur');
const curR = document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
});

(function loop() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    if (curR) { curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; }
    requestAnimationFrame(loop);
})();

function attachCursor(scope) {
    if (!scope) return;
    scope.querySelectorAll('a,button,.vb,.fb,.sp-rec-card,.sp-nutri-btn,.amz-btn,.pc-img-eats').forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = 'true';
        el.addEventListener('mouseenter', () => {
            if (cur)  cur.style.transform  = 'translate(-50%,-50%) scale(2.5)';
            if (curR) curR.style.opacity   = '.25';
        });
        el.addEventListener('mouseleave', () => {
            if (cur)  cur.style.transform  = 'translate(-50%,-50%) scale(1)';
            if (curR) curR.style.opacity   = '1';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => attachCursor(document));


/* ═══════════════════════════════════════════════════════════
   M. SCROLL REVEAL OBSERVERS
   ═══════════════════════════════════════════════════════════
   FIX: stObs counter uses GSAP ticker instead of setInterval
   for smooth, frame-accurate number counting.
   ═══════════════════════════════════════════════════════════ */
const stObs = new IntersectionObserver(entries => {
    entries.forEach(x => {
        if (!x.isIntersecting) return;
        const el  = x.target;
        const tgt = parseInt(el.dataset.target);
        const suf = el.dataset.suffix || '';
        if (!tgt) return;

        // GSAP-driven counter — smooth and frame-accurate
        gsap.to({ val: 0 }, {
            val: tgt, duration: 1.6, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.targets()[0].val) + suf; }
        });
        stObs.unobserve(el);
    });
}, { threshold: .6 });

document.querySelectorAll('[data-target]').forEach(el => stObs.observe(el));

const rvObs = new IntersectionObserver(entries => {
    entries.forEach(x => {
        if (x.isIntersecting) { x.target.classList.add('up'); rvObs.unobserve(x.target); }
    });
}, { threshold: .1 });

document.querySelectorAll('.rv,.rl').forEach(el => rvObs.observe(el));


/* ═══════════════════════════════════════════════════════════
   N. SIDE NAV MARKERS
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.markers-block');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = document.querySelector(item.getAttribute('data-scrollto'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        item.addEventListener('mouseenter', () => {
            if (cur)  cur.style.transform = 'translate(-50%,-50%) scale(2.5)';
            if (curR) curR.style.opacity  = '.25';
        });
        item.addEventListener('mouseleave', () => {
            if (cur)  cur.style.transform = 'translate(-50%,-50%) scale(1)';
            if (curR) curR.style.opacity  = '1';
        });
    });

    const sections = Array.from(navItems)
        .map(i => document.querySelector(i.getAttribute('data-scrollto')))
        .filter(Boolean);

    const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            navItems.forEach(n => n.classList.remove('is--active'));
            document.querySelector(`.markers-block[data-scrollto="${id}"]`)?.classList.add('is--active');
        });
    }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: 0 });

    sections.forEach(s => sectionObs.observe(s));
});


/* ═══════════════════════════════════════════════════════════
   O. NAV BAR SCROLL STUCK STATE
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
    document.getElementById('mainNav')?.classList.toggle('stuck', window.scrollY > 80);
}, { passive: true }); // FIX: passive listener = no jank on scroll


/* ═══════════════════════════════════════════════════════════
   P. HEALTH GOALS SECTION
   ═══════════════════════════════════════════════════════════ */
const GOALS_DATA = {
    skin: {
        icon: '✨', title: 'Glowing Skin', sub: 'Antioxidants · Vitamin E · Zinc',
        badge: 'Skin & Beauty', serving: '25g', nutrient: 'Vit E', score: 78,
        products: ['Almonds — 1 small handful daily','Sunflower Seeds — 2 tsp sprinkled on meals','7-Blend Mix — daily all-rounder jar'],
        why: [
            { icon: '🌿', name: 'Vitamin E',    desc: 'Fights free radicals, protects skin cells from damage' },
            { icon: '💧', name: 'Zinc',         desc: 'Regulates oil production, accelerates skin healing' },
            { icon: '🔬', name: 'Antioxidants', desc: 'Reduces oxidative stress and visible signs of aging' },
            { icon: '✦',  name: 'Selenium',     desc: 'Boosts collagen synthesis and skin elasticity' }
        ],
        note: '100% natural · Zero additives · FSSAI licensed'
    },
    heart: {
        icon: '🫀', title: 'Healthier Heart', sub: 'Omega-3 · Magnesium · Healthy Fats',
        badge: 'Cardiovascular', serving: '30g', nutrient: 'Omega-3', score: 85,
        products: ['Flax Seeds — 1 tsp ground into food daily','Seed Mix — 30g per day, full omega blend','Nut Mix — heart-supporting quartet'],
        why: [
            { icon: '🫀', name: 'Omega-3 ALA', desc: 'Lowers LDL cholesterol, reduces inflammation' },
            { icon: '⚡', name: 'Magnesium',   desc: 'Naturally regulates blood pressure levels' },
            { icon: '🌱', name: 'Fiber',       desc: 'Reduces cholesterol absorption in the gut' },
            { icon: '✦',  name: 'Vitamin E',   desc: 'Prevents arterial plaque buildup over time' }
        ],
        note: 'Flax Seeds: highest Omega-3 in our range'
    },
    energy: {
        icon: '⚡', title: 'Boost Energy', sub: 'Complex Fats · Natural Sugars · Protein',
        badge: 'Natural Fuel', serving: '40g', nutrient: 'Protein', score: 88,
        products: ['7-Blend Mix — perfect pre-workout handful','Black Raisins — instant natural energy shot','W240 Cashews — slow-burn sustained fuel'],
        why: [
            { icon: '⚡', name: 'Slow-burn fats',  desc: 'No energy spike and no afternoon crash' },
            { icon: '🍇', name: 'Natural sugars',   desc: 'Raisins for instant glycogen replenishment' },
            { icon: '💪', name: 'High protein',     desc: 'Sustains muscle energy reserves all day' },
            { icon: '🌾', name: 'B Vitamins',       desc: 'Converts food into usable cellular energy' }
        ],
        note: 'Perfect pre-workout or 3pm snack replacement'
    },
    brain: {
        icon: '🧠', title: 'Brain Focus', sub: 'Omega-3 · Polyphenols · Vitamin B6',
        badge: 'Cognitive Health', serving: '28g', nutrient: 'Omega-3', score: 80,
        products: ['Nut Mix — daily cognitive fuel blend','Flax Seeds — Omega-3 ALA precursor','USA Pistachios — polyphenol powerhouse'],
        why: [
            { icon: '🧠', name: 'DHA precursor', desc: 'ALA converts to brain-essential DHA' },
            { icon: '🔬', name: 'Polyphenols',   desc: 'Pistachios actively protect neural pathways' },
            { icon: '✦',  name: 'Vitamin B6',    desc: 'Supports neurotransmitter synthesis daily' },
            { icon: '💧', name: 'Antioxidants',  desc: 'Reduces long-term cognitive decline risk' }
        ],
        note: 'Best consumed in morning for all-day focus'
    },
    gut: {
        icon: '🌾', title: 'Gut Health', sub: 'Fiber · Prebiotics · Lignans',
        badge: 'Digestive Wellness', serving: '15g', nutrient: 'Fiber', score: 92,
        products: ['Flax Seeds — 27g fiber per 100g (top of range)','Seed Mix — triple-seed fiber synergy','Black Raisins — natural prebiotic sugars'],
        why: [
            { icon: '🌿', name: 'Insoluble fiber', desc: 'Speeds digestion, prevents constipation' },
            { icon: '🔬', name: 'Prebiotics',      desc: 'Feeds and multiplies beneficial gut bacteria' },
            { icon: '💧', name: 'Lignans',         desc: 'Anti-inflammatory lining support for the gut' },
            { icon: '✦',  name: 'Mucilage',        desc: 'Flax soothes the gut wall layer naturally' }
        ],
        note: 'Flax Seeds: #1 fiber source — 27g per 100g'
    },
    immunity: {
        icon: '🛡️', title: 'Immunity', sub: 'Zinc · Selenium · Antioxidants',
        badge: 'Immune Support', serving: '30g', nutrient: 'Zinc', score: 83,
        products: ['Pumpkin Seeds — zinc powerhouse seed','Sunflower Seeds — selenium + Vitamin E','7-Blend Mix — full immune spectrum'],
        why: [
            { icon: '🛡️', name: 'Zinc',      desc: 'Directly activates immune T-cell response' },
            { icon: '🔬', name: 'Selenium',  desc: 'Essential for antioxidant enzyme production' },
            { icon: '✦',  name: 'Vitamin E', desc: 'Enhances antibody production capacity' },
            { icon: '💪', name: 'Protein',   desc: 'Builds and repairs immune cell components' }
        ],
        note: 'Pumpkin Seeds: top zinc source in our range'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const tabsEl = document.getElementById('goalTabs');
    const panel  = document.getElementById('goalPanel');
    if (!tabsEl || !panel) return;

    function setGoal(key) {
        const g = GOALS_DATA[key];
        if (!g) return;

        panel.classList.add('gpanel-changing');

        setTimeout(() => {
            document.getElementById('gpIcon').textContent    = g.icon;
            document.getElementById('gpTitle').textContent   = g.title;
            document.getElementById('gpSub').textContent     = g.sub;
            document.getElementById('gpBadge').textContent   = g.badge;
            document.getElementById('gpServing').textContent = g.serving;
            document.getElementById('gpNutrient').textContent= g.nutrient;
            document.getElementById('gpScore').textContent   = g.score + '%';
            document.getElementById('gpNote').textContent    = g.note;

            // Animated progress bar
            const fill = document.getElementById('gpProgFill');
            if (fill) {
                gsap.fromTo(fill,
                    { width: '0%' },
                    { width: g.score + '%', duration: 0.55, ease: 'expo.out', delay: 0.05 }
                );
            }

            const prodList = document.getElementById('gpProdList');
            if (prodList) {
                prodList.innerHTML = g.products
                    .map(p => `<li><span class="gp-dot"></span>${p}</li>`)
                    .join('');
            }

            const whyGrid = document.getElementById('gpWhyGrid');
            if (whyGrid) {
                whyGrid.innerHTML = g.why.map(w => `
                    <div class="gp-why-item">
                        <span class="gp-why-icon">${w.icon}</span>
                        <div class="gp-why-nm">${w.name}</div>
                        <div class="gp-why-desc">${w.desc}</div>
                    </div>`).join('');
            }

            panel.classList.remove('gpanel-changing');
            attachCursor(panel);
        }, 200);
    }

    tabsEl.addEventListener('click', e => {
        const btn = e.target.closest('.gtb');
        if (!btn) return;
        tabsEl.querySelectorAll('.gtb').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        setGoal(btn.dataset.goal);
    });

    attachCursor(tabsEl);
    attachCursor(panel);

    // Scroll reveal within goals section
    const goalsRvObs = new IntersectionObserver(entries => {
        entries.forEach(x => {
            if (x.isIntersecting) { x.target.classList.add('up'); goalsRvObs.unobserve(x.target); }
        });
    }, { threshold: .1 });
    document.querySelectorAll('.goals-sec .rv').forEach(el => goalsRvObs.observe(el));
});


/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
render();
refreshCart();