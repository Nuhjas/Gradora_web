// custom cursor

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
})
function animRing() {
  rx += (mx - rx) * .12; ry += (my - ry) * .12;
  ring.style.left = (rx - 18) + 'px'; ring.style.top = (ry - 18) + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,[data-cat]').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; ring.style.opacity = '.4'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '1'; });
});

// Filter pills
// const pills = document.querySelectorAll('.eats-pill');
// const cards = document.querySelectorAll('.eats-card');
// const categoryMap = {
//   'All Products': null,
//   'Nuts': ['W240 Cashew', 'Almond', 'Pistachio', 'Black Raisin'],
//   'Seeds': ['Pumpkin Seed', 'Flax Seed', 'Sunflower Seed'],
//   'Mixes': ['7-Blend Mix', 'Seed Mix', 'Nut Mix']
// };
// pills.forEach(pill => {
//   pill.addEventListener('click', () => {
//     pills.forEach(p => p.classList.remove('active'));
//     pill.classList.add('active');
//     const cat = pill.textContent.trim();
//     const allowed = categoryMap[cat];
//     cards.forEach(card => {
//       const name = card.querySelector('.eats-name').textContent;
//       card.style.display = (!allowed || allowed.includes(name)) ? '' : 'none';
//     });
//   });
// });

// Sticky nav shadow on scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 80);
});

// Hero reveal on load
setTimeout(() => {
  document.querySelectorAll('.h-reveal').forEach(el => el.classList.add('visible'));
}, 100);

// Scroll reveal with IntersectionObserver
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('up');
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el));




// PRODUCT DATA — variants per product
// ------------------------------

const PRODUCTS = [
  {
    id: 'cashew', cat: 'nuts', badge: { text: 'Best Seller', cls: 'hot' },
    name: 'W240 Cashew', catLabel: 'Premium Nuts',
    desc: 'Large-grade W240 cashews — buttery, rich and sealed fresh. No oil, no salt.',
    protein: '18.22g', fiber: '3.3g',
    variants: [
      {
        label: '200g', price: 350, Image: 'images/products/cashew-m.png', imgA: '#1A1410', imgB: '#301E12',
        amazon: 'https://amzn.in/d/07cVEZkl',
        flipkart: 'https://www.flipkart.com/search?q=gradora+cashew+200g'
      },
      {
        label: '350g', price: 519, Image: 'images/products/cashew.png', imgA: '#120E08', imgB: '#1E140C',
        amazon: 'https://amzn.in/d/04goq5TT',
        flipkart: 'https://www.flipkart.com/search?q=gradora+cashew+350g'
      },
    ]
  },
  {
    id: 'almond', cat: 'nuts', badge: null,
    name: 'Almond', catLabel: 'Premium Nuts',
    desc: 'Crisp, nutrient-dense almonds with no oil or salt added. High protein, high fibre.',
    protein: '21.15g', fiber: '12.5g',
    variants: [
      {
        label: '250g', price: 405, Image: 'images/products/almond-m.png', imgA: '#3D2010', imgB: '#522A14',
        amazon: 'https://amzn.in/d/05ImkphJ',
        flipkart: 'https://www.flipkart.com/search?q=gradora+almond+250g'
      },
      {
        label: '400g', price: 575, Image: 'images/products/almond.png', imgA: '#3D2010', imgB: '#5C3A20',
        amazon: 'https://amzn.in/d/0hkpGSAM',
        flipkart: 'https://www.flipkart.com/search?q=gradora+almond+400g'
      },
    ]
  },
  {
    id: 'pistachio', cat: 'nuts', badge: { text: 'USA Grade', cls: 'new' },
    name: 'Pistachio', catLabel: 'Premium USA Nuts',
    desc: 'Premium USA pistachios — naturally roasted and packed fresh for max crunch.',
    protein: '20.16g', fiber: '10.3g',
    variants: [
      {
        label: '150g', price: 365, Image: 'images/products/pistachio-m.png', imgA: '#2A3A18', imgB: '#3C5220',
        amazon: 'https://amzn.in/d/0c9E3wQm',
        flipkart: 'https://www.flipkart.com/search?q=gradora+pistachio+250g'
      },
      {
        label: '300g', price: '599', Image: 'images/products/pistachio.png', imgA: '#2A3A18', imgB: '#405A28',
        amazon: 'https://amzn.in/d/0fBUYpgF',
        flipkart: 'https://www.flipkart.com/search?q=gradora+pistachio+400g'
      },
    ]
  },
  {
    id: 'pumpkinseed', cat: 'seeds', badge: null,
    name: 'Pumpkin Seed', catLabel: 'Premium Seeds',
    desc: 'High-protein pumpkin seeds rich in zinc and essential minerals. The powerhouse seed.',
    protein: '30.23g', fiber: '—',
    variants: [
      {
        label: '150g', price: 206, Image: 'images/products/pumpkin-s.png', imgA: '#142A12', imgB: '#1E3A1A',
        amazon: 'https://amzn.in/d/0ijvShZP',
        flipkart: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+100g'
      },
      {
        label: '200g', price: 245, Image: 'images/products/pumpkin-m.png', imgA: '#183018', imgB: '#224A22',
        amazon: 'https://amzn.in/d/00z7YZHo',
        flipkart: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+250g'
      },
      {
        label: '400g', price: 359, Image: 'images/products/pumpkin.png', imgA: '#1C3A1A', imgB: '#2C5A28',
        amazon: 'https://amzn.in/d/0hQzFAr7',
        flipkart: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+400g'
      },
    ]
  },
  {
    id: 'flaxseed', cat: 'seeds', badge: null,
    name: 'Flax Seed', catLabel: 'Premium Seeds',
    desc: 'Omega-3 rich roasted flaxseed — highest fibre seed in our range. Earthy and nutty.',
    protein: '18.29g', fiber: '27.3g',
    variants: [
      {
        label: '150g', price: 149, Image: 'images/products/flax_seed-s.png', imgA: '#2E1808', imgB: '#3E220E',
        amazon: 'https://amzn.in/d/02o5nC4h',
        flipkart: 'https://www.flipkart.com/search?q=gradora+flax+seed+100g'
      },
      {
        label: '250g', price: 174, Image: 'images/products/flax_seed-m.png', imgA: '#341A0A', imgB: '#482410',
        amazon: 'https://amzn.in/d/01LLMEWN',
        flipkart: 'https://www.flipkart.com/search?q=gradora+flax+seed+250g'
      },
      {
        label: '400g', price: 203, Image: 'images/products/flax_seed.png', imgA: '#3A2010', imgB: '#5C3C20',
        amazon: 'https://amzn.in/d/0b8AP021',
        flipkart: 'https://www.flipkart.com/search?q=gradora+flax+seed+400g'
      },
    ]
  },
  {
    id: 'sunflower', cat: 'seeds', badge: null,
    name: 'Sunflower Seed', catLabel: 'Premium Seeds',
    desc: 'Vitamin E-rich sunflower seeds — crunchy, nutty, packed with healthy fats.',
    protein: '20.78g', fiber: '10.5g',
    variants: [
      {
        label: '100g', price: 149, Image: 'images/products/sunflower-s.png', imgA: '#162430', imgB: '#1E303E',
        amazon: 'https://amzn.in/d/0en8i1sc',
        flipkart: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+100g'
      },
      {
        label: '200g', price: 185, Image: 'images/products/sunflower-m.png', imgA: '#182830', imgB: '#223A48',
        amazon: 'https://amzn.in/d/0hZUxde7',
        flipkart: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+250g'
      },
      {
        label: '400g', price: 235, Image: 'images/products/sunflower.png', imgA: '#1A2C38', imgB: '#2A4858',
        amazon: 'https://amzn.in/d/02f2FklQ',
        flipkart: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+400g'
      },
    ]
  },
  {
    id: 'raisin', cat: 'nuts', badge: null,
    name: 'Black Raisin', catLabel: 'Premium Dried Fruit',
    desc: 'Naturally sweet iron-rich black raisins. No sugar coating — just pure dried fruit.',
    protein: '3.07g', fiber: '3.7g',
    variants: [
      {
        label: '150g', price: 199, Image: 'images/products/black_raisin-s.png', imgA: '#220818', imgB: '#2E0E22',
        amazon: 'https://amzn.in/d/040GsZWs',
        flipkart: 'https://www.flipkart.com/search?q=gradora+black+raisin+100g'
      },
      {
        label: '250g', price: 259, Image: 'images/products/black_raisin-m.png', imgA: '#260A1C', imgB: '#38102A',
        amazon: 'https://amzn.in/d/06AuMtm3',
        flipkart: 'https://www.flipkart.com/search?q=gradora+black+raisin+250g'
      },
      {
        label: '400g', price: 339, Image: 'images/products/black_raisin.png', imgA: '#2A0A20', imgB: '#4A1538',
        amazon: 'https://amzn.in/d/00JocTOz',
        flipkart: 'https://www.flipkart.com/search?q=gradora+black+raisin+400g'
      },
    ]
  },
  {
    id: 'seedmix', cat: 'mixes', badge: { text: 'Top Pick', cls: 'sig' },
    name: 'Seed Mix', catLabel: 'Premium Seed Mix',
    desc: 'Pumpkin 40% · Sunflower 35% · Flaxseed 25% — ultimate daily seed blend.',
    protein: '30g', fiber: '14g',
    variants: [
      {
        label: '150g', price: 175, Image: 'images/products/seed_mix-s.png', imgA: '#0A2018', imgB: '#103020',
        amazon: 'https://amzn.in/d/02IBaxWG',
        flipkart: 'https://www.flipkart.com/search?q=gradora+seed+mix+100g'
      },
      {
        label: '250g', price: 220, Image: 'images/products/seed_mix-m.png', imgA: '#0E2A20', imgB: '#163A2A',
        amazon: 'https://amzn.in/d/0imJ9Jnc',
        flipkart: 'https://www.flipkart.com/search?q=gradora+seed+mix+250g'
      },
      {
        label: '400g', price: 279, Image: 'images/products/seed_mix.png', imgA: '#0E2A20', imgB: '#1A4A38',
        amazon: 'https://amzn.in/d/02aoIrDU',
        flipkart: 'https://www.flipkart.com/search?q=gradora+seed+mix+400g'
      },
    ]
  },
  {
    id: '7blend', cat: 'mixes', badge: { text: 'Signature', cls: 'hot' },
    name: '7-Blend Mix', catLabel: 'Signature Blend',
    desc: 'Seven superfoods: Cashew · Almond · Pistachio · Raisin · Pumpkin · Sunflower · Flaxseed.',
    protein: '16.1g', fiber: '5.8g',
    variants: [
      {
        label: '250g', price: 345, Image: 'images/products/7-blendM-m.png', imgA: '#1A2A10', imgB: '#2A3C18',
        amazon: 'https://amzn.in/d/03PGBwNN',
        flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+250g'
      },
      {
        label: '400g', price: 475, Image: 'images/products/7-blendM.png', imgA: '#1A2A10', imgB: '#2E4A20',
        amazon: 'https://amzn.in/d/00WJtqm5',
        flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+400g'
      },
    ]
  },
  {
    id: 'nutmix', cat: 'mixes', badge: { text: 'Bestseller', cls: 'hot' },
    name: 'Nut Mix', catLabel: 'Nutmix Blend',
    desc: '4 superfoods: Cashew · Almond · Pistachio · Black Raisin.',
    protein: '13.8g', fiber: '5.1g',
    variants: [
      {
        label: '200g', price: 340, Image: 'images/products/nut_mix-m.png', imgA: '#1A2A10', imgB: '#2A3C18',
        amazon: 'https://amzn.in/d/07rv0kqs',
        flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+250g'
      },
      {
        label: '350g', price: 499, Image: 'images/products/nut_mix.png', imgA: '#1A2A10', imgB: '#2E4A20',
        amazon: 'https://amzn.in/d/0f9b2wx4',
        flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+400g'
      },
    ]
  },

];
// Track selected variant index per product
const selectedVariant = {};
PRODUCTS.forEach(p => { selectedVariant[p.id] = p.variants.length > 1 ? 1 : 0; }); // default middle

function buildCard(p) {
  const vi = selectedVariant[p.id];
  const v = p.variants[vi];
  const badgeHTML = p.badge
    ? `<span class="eats-badge ${p.badge.cls}">${p.badge.text}</span>` : '';

  const varBtns = p.variants.map((vr, i) => `
    <button
      class="var-btn ${i === vi ? 'on' : ''}"
      data-pid="${p.id}" data-vi="${i}"
      aria-label="${vr.label}"
    >${vr.label}</button>
  `).join('');

  return `
  <div class="eats-card" data-cat="${p.cat}" id="card-${p.id}">
    <div class="eats-card-img" id="img-${p.id}"
         style="--img-a:${v.imgA};--img-b:${v.imgB};">
      ${badgeHTML}
      <div class="eats-card-img-inner" id="emoji-${p.id}"><img src="${v.Image}" alt="${p.name}"></div>
    </div>
    <div class="eats-card-body">
      <div class="eats-cat">${p.catLabel}</div>
      <div class="eats-name">${p.name}</div>
      <div class="eats-desc">${p.desc}</div>
      <div class="eats-meta">
        <span>Protein ${p.protein}</span>
        <span>Fiber ${p.fiber}</span>
      </div>

      <!-- VARIANT SELECTOR -->
      <div class="var-row">${varBtns}</div>

      <div class="eats-card-footer">
        <div class="eats-price" id="price-${p.id}">
          ₹<span class="price-num">${v.price}</span>
          <small>/ ${v.label} jar</small>
        </div>
        <div class="eats-btns">
          <a class="eats-shopbtn-sm amz" id="amz-${p.id}"
             href="${v.amazon}" target="_blank">Amazon</a>
          <a class="eats-shopbtn-sm flp" id="flp-${p.id}"
             href="${v.flipkart}" target="_blank">Flipkart</a>
        </div>
      </div>
    </div>
  </div>`;
}

function renderGrid(cat = 'all') {
  const grid = document.getElementById('eats-grid');
  grid.innerHTML = PRODUCTS
    .filter(p => cat === 'all' || p.cat === cat)
    .map(buildCard).join('');
  attachVariantListeners();
  // re-observe reveals
  grid.querySelectorAll('.eats-card').forEach(el => io.observe(el));
  // re-attach cursor hover
  grid.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; ring.style.opacity = '.4'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.opacity = '1'; });
  });
}

function attachVariantListeners() {
  document.querySelectorAll('.var-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const pid = btn.dataset.pid;
      const vi = parseInt(btn.dataset.vi);
      selectedVariant[pid] = vi;

      const p = PRODUCTS.find(x => x.id === pid);
      const v = p.variants[vi];

      // update image bg gradient
      const imgEl = document.getElementById('img-' + pid);
      imgEl.style.setProperty('--img-a', v.imgA);
      imgEl.style.setProperty('--img-b', v.imgB);

      // flip emoji with a quick pop animation
      const emojiEl = document.getElementById('emoji-' + pid);
      emojiEl.classList.add('pop');
      setTimeout(() => { emojiEl.querySelector('img').src = v.Image; emojiEl.classList.remove('pop'); }, 140);

      // animate price change
      const priceNum = document.querySelector(`#price-${pid} .price-num`);
      const priceEl = document.getElementById('price-' + pid);
      priceEl.classList.add('price-flash');
      setTimeout(() => { priceNum.textContent = v.price; priceEl.classList.remove('price-flash'); }, 180);

      // update size label
      document.querySelector(`#price-${pid} small`).textContent = `/ ${v.label} jar`;

      // update shop links
      document.getElementById('amz-' + pid).href = v.amazon;
      document.getElementById('flp-' + pid).href = v.flipkart;

      // update active pill
      document.querySelectorAll(`.var-btn[data-pid="${pid}"]`).forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    });
  });
}

// Category filter
document.querySelectorAll('.eats-pill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.eats-pill-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    renderGrid(btn.dataset.cat);
  });
});

// Initial render
renderGrid('all');

// Counter animation
function animCount(el, target, suffix = '') {
  let n = 0; const step = Math.ceil(target / 40);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n + suffix;
    if (n >= target) clearInterval(t);
  }, 35);
}

const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.mstat-val').forEach(el => {
        const raw = el.textContent;
        if (raw.includes('★')) animCount(el, 4.8, '★');
        else if (raw.includes('%')) animCount(el, 100, '%');
        else if (raw.includes('+')) animCount(el, parseInt(raw), '+');
      });
      countIO.unobserve(e.target);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('.mission-stats').forEach(el => countIO.observe(el));

// Social float entrance after 1s
setTimeout(() => {
  document.getElementById('social-float').classList.add('visible');
}, 900);

// Dynamic label on hover
document.querySelectorAll('.sf-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    document.querySelectorAll('.sf-link').forEach(l => l.classList.remove('hovered'));
    link.classList.add('hovered');
  });
  link.addEventListener('mouseleave', () => link.classList.remove('hovered'));
});

// const lenis = new Lenis({
//   smoothWheel:true
// });

// function raf(time){
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);


// /* NEW PART-BASED SCROLL-LINKED WALK CYCLE */
// const characterWrapper = document.getElementById('character-wrapper');
// const characterBody = document.getElementById('character-body');
// const characterLegL = document.getElementById('character-leg-l');
// const characterLegR = document.getElementById('character-leg-r');

// lenis.on('scroll', (e) => {
//   const scrollPos = e.scroll;

//   // fine-tune speed and amplitude
//   const walkingSpeed = 0.02; // Slower than the previous waddle for proper steps
//   const legAmplitude = 30; // Maximum leg swing angle
//   const bounceAmplitude = 5; // Vertical bounce amplitude
//   const bodyAmplitude = 2; // Minimal body rotation for balance

//   // Leg rotation: two sine waves, offset by Math.PI (180 degrees) for proper step phasing
//   const legRotationL = Math.sin(scrollPos * walkingSpeed) * legAmplitude;
//   const legRotationR = Math.sin(scrollPos * walkingSpeed + Math.PI) * legAmplitude;

//   // Body bounce: sine wave which peaks (Math.abs(cosine)) when one leg is at mid-swing for support.
//   const bounce = Math.abs(Math.cos(scrollPos * walkingSpeed)) * bounceAmplitude;

//   // Minimal body rotation for balance, not a waddle
//   const bodyRotation = Math.cos(scrollPos * walkingSpeed) * bodyAmplitude;

//   // Apply the transformations to individual parts
//   characterLegL.style.transform = `rotate(${legRotationL}deg)`;
//   characterLegR.style.transform = `rotate(${legRotationR}deg)`;
//   characterBody.style.transform = `rotate(${bodyRotation}deg)`;
//   // Apply bounce to the entire assembled character wrapper
//   characterWrapper.style.transform = `translateY(-${bounce}px)`;
// });