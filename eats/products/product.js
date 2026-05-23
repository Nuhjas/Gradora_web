/* ══════════════════════════════════════════════════════════════
   MASTER PRODUCT DATA (Images + Nutrition)
   ══════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 'cashew', cat: 'nuts', badge: { text: 'Best Seller', cls: 'hot' },
    name: 'W240 Cashew', catLabel: 'Premium Nuts',
    desc: 'Large-grade W240 cashews — buttery, rich and sealed fresh. No oil, no salt.',
    protein: '18.2g', fiber: '3.3g',
    nutrition: { serving: '30g', cal: 163, fat: 13, satFat: 2.2, carbs: 9.3, sugar: 1.7, fiber: '3.3g', protein: '5.5g', sodium: '5mg', highlights: ['Rich in magnesium', 'Zero cholesterol', 'Copper & iron source', 'W240 Large Grade'] },
    variants: [
      { label: '200g', price: 350, Image: '../images/products/cashew-m.png', imgA: '#1A1410', imgB: '#301E12', amazon: 'https://amzn.in/d/07cVEZkl', flipkart: 'https://www.flipkart.com/search?q=gradora+cashew+200g' },
      { label: '350g', price: 519, Image: '../images/products/cashew.png', imgA: '#120E08', imgB: '#1E140C', amazon: 'https://amzn.in/d/04goq5TT', flipkart: 'https://www.flipkart.com/search?q=gradora+cashew+350g' }
    ]
  },
  {
    id: 'almond', cat: 'nuts', badge: null,
    name: 'Almond', catLabel: 'Premium Nuts',
    desc: 'Crisp, nutrient-dense almonds with no oil or salt added. High protein, high fibre.',
    protein: '21.1g', fiber: '12.5g',
    nutrition: { serving: '30g', cal: 174, fat: 15, satFat: 1.1, carbs: 6.1, sugar: 1.2, fiber: '12.5g', protein: '21.1g', sodium: '0mg', highlights: ['Highest plant protein', 'Vitamin E champion', 'Skin & hair health', 'Heart protective'] },
    variants: [
      { label: '250g', price: 405, Image: '../images/products/almond-m.png', imgA: '#3D2010', imgB: '#522A14', amazon: 'https://amzn.in/d/05ImkphJ', flipkart: 'https://www.flipkart.com/search?q=gradora+almond+250g' },
      { label: '400g', price: 575, Image: '../images/products/almond.png', imgA: '#3D2010', imgB: '#5C3A20', amazon: 'https://amzn.in/d/0hkpGSAM', flipkart: 'https://www.flipkart.com/search?q=gradora+almond+400g' }
    ]
  },
  {
    id: 'pistachio', cat: 'nuts', badge: { text: 'USA Grade', cls: 'new' },
    name: 'Pistachio', catLabel: 'Premium USA Nuts',
    desc: 'Premium USA pistachios — naturally roasted and packed fresh for max crunch.',
    protein: '20.1g', fiber: '10.3g',
    nutrition: { serving: '30g', cal: 160, fat: 13, satFat: 1.5, carbs: 7.7, sugar: 2.2, fiber: '10.3g', protein: '20.1g', sodium: '0mg', highlights: ['USA certified origin', 'Complete amino profile', 'Antioxidant rich', 'Gut microbiome support'] },
    variants: [
      { label: '150g', price: 365, Image: '../images/products/pistachio-m.png', imgA: '#2A3A18', imgB: '#3C5220', amazon: 'https://amzn.in/d/0c9E3wQm', flipkart: 'https://www.flipkart.com/search?q=gradora+pistachio+250g' },
      { label: '300g', price: 599, Image: '../images/products/pistachio.png', imgA: '#2A3A18', imgB: '#405A28', amazon: 'https://amzn.in/d/0fBUYpgF', flipkart: 'https://www.flipkart.com/search?q=gradora+pistachio+400g' }
    ]
  },
  {
    id: 'pumpkinseed', cat: 'seeds', badge: null,
    name: 'Pumpkin Seed', catLabel: 'Premium Seeds',
    desc: 'High-protein pumpkin seeds rich in zinc and essential minerals. The powerhouse seed.',
    protein: '30.2g', fiber: '—',
    nutrition: { serving: '30g', cal: 163, fat: 13.8, satFat: 2.5, carbs: 3.4, sugar: 0.4, fiber: '6.0g', protein: '30.2g', sodium: '5mg', highlights: ['Highest protein seed', 'Zinc powerhouse', 'Magnesium dense', 'Prostate health support'] },
    variants: [
      { label: '150g', price: 206, Image: '../images/products/pumpkin-s.png', imgA: '#142A12', imgB: '#1E3A1A', amazon: 'https://amzn.in/d/0ijvShZP', flipkart: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+100g' },
      { label: '200g', price: 245, Image: '../images/products/pumpkin-m.png', imgA: '#183018', imgB: '#224A22', amazon: 'https://amzn.in/d/00z7YZHo', flipkart: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+250g' },
      { label: '400g', price: 359, Image: '../images/products/pumpkin.png', imgA: '#1C3A1A', imgB: '#2C5A28', amazon: 'https://amzn.in/d/0hQzFAr7', flipkart: 'https://www.flipkart.com/search?q=gradora+pumpkin+seed+400g' }
    ]
  },
  {
    id: 'flaxseed', cat: 'seeds', badge: null,
    name: 'Flax Seed', catLabel: 'Premium Seeds',
    desc: 'Omega-3 rich roasted flaxseed — highest fibre seed in our range. Earthy and nutty.',
    protein: '18.2g', fiber: '27.3g',
    nutrition: { serving: '15g', cal: 80, fat: 5.9, satFat: 0.5, carbs: 4.4, sugar: 0.2, fiber: '27.3g', protein: '18.2g', sodium: '6mg', highlights: ['#1 fiber in range', 'Omega-3 ALA source', 'Lignans & antioxidants', 'Hormone balance'] },
    variants: [
      { label: '150g', price: 149, Image: '../images/products/flax_seed-s.png', imgA: '#2E1808', imgB: '#3E220E', amazon: 'https://amzn.in/d/02o5nC4h', flipkart: 'https://www.flipkart.com/search?q=gradora+flax+seed+100g' },
      { label: '250g', price: 174, Image: '../images/products/flax_seed-m.png', imgA: '#341A0A', imgB: '#482410', amazon: 'https://amzn.in/d/01LLMEWN', flipkart: 'https://www.flipkart.com/search?q=gradora+flax+seed+250g' },
      { label: '400g', price: 203, Image: '../images/products/flax_seed.png', imgA: '#3A2010', imgB: '#5C3C20', amazon: 'https://amzn.in/d/0b8AP021', flipkart: 'https://www.flipkart.com/search?q=gradora+flax+seed+400g' }
    ]
  },
  {
    id: 'sunflower', cat: 'seeds', badge: null,
    name: 'Sunflower Seed', catLabel: 'Premium Seeds',
    desc: 'Vitamin E-rich sunflower seeds — crunchy, nutty, packed with healthy fats.',
    protein: '20.7g', fiber: '10.5g',
    nutrition: { serving: '30g', cal: 174, fat: 14.8, satFat: 1.5, carbs: 6.7, sugar: 0.9, fiber: '10.5g', protein: '20.7g', sodium: '3mg', highlights: ['Vitamin E champion', 'Selenium source', 'Folate & B vitamins', 'Immune support'] },
    variants: [
      { label: '100g', price: 149, Image: '../images/products/sunflower-s.png', imgA: '#162430', imgB: '#1E303E', amazon: 'https://amzn.in/d/0en8i1sc', flipkart: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+100g' },
      { label: '200g', price: 185, Image: '../images/products/sunflower-m.png', imgA: '#182830', imgB: '#223A48', amazon: 'https://amzn.in/d/0hZUxde7', flipkart: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+250g' },
      { label: '400g', price: 235, Image: '../images/products/sunflower.png', imgA: '#1A2C38', imgB: '#2A4858', amazon: 'https://amzn.in/d/02f2FklQ', flipkart: 'https://www.flipkart.com/search?q=gradora+sunflower+seed+400g' }
    ]
  },
  {
    id: 'raisin', cat: 'nuts', badge: null,
    name: 'Black Raisin', catLabel: 'Premium Dried Fruit',
    desc: 'Naturally sweet iron-rich black raisins. No sugar coating — just pure dried fruit.',
    protein: '3.0g', fiber: '3.7g',
    nutrition: { serving: '40g', cal: 120, fat: 0.2, satFat: 0, carbs: 31.2, sugar: 24, fiber: '3.7g', protein: '3.0g', sodium: '11mg', highlights: ['Natural iron source', 'Instant energy', 'Bone calcium support', 'No added sugar'] },
    variants: [
      { label: '150g', price: 199, Image: '../images/products/black_raisin-s.png', imgA: '#220818', imgB: '#2E0E22', amazon: 'https://amzn.in/d/040GsZWs', flipkart: 'https://www.flipkart.com/search?q=gradora+black+raisin+100g' },
      { label: '250g', price: 259, Image: '../images/products/black_raisin-m.png', imgA: '#260A1C', imgB: '#38102A', amazon: 'https://amzn.in/d/06AuMtm3', flipkart: 'https://www.flipkart.com/search?q=gradora+black+raisin+250g' },
      { label: '400g', price: 339, Image: '../images/products/black_raisin.png', imgA: '#2A0A20', imgB: '#4A1538', amazon: 'https://amzn.in/d/00JocTOz', flipkart: 'https://www.flipkart.com/search?q=gradora+black+raisin+400g' }
    ]
  },
  {
    id: 'seedmix', cat: 'mixes', badge: { text: 'Top Pick', cls: 'sig' },
    name: 'Seed Mix', catLabel: 'Premium Seed Mix',
    desc: 'Pumpkin 40% · Sunflower 35% · Flaxseed 25% — ultimate daily seed blend.',
    protein: '30g', fiber: '14g',
    nutrition: { serving: '30g', cal: 158, fat: 12.5, satFat: 2.0, carbs: 5.8, sugar: 0.5, fiber: '14g', protein: '30g', sodium: '4mg', highlights: ['Triple seed synergy', 'Complete mineral blend', 'Omega 3/6/9 balance', 'Daily wellness in one jar'] },
    variants: [
      { label: '150g', price: 175, Image: '../images/products/seed_mix-s.png', imgA: '#0A2018', imgB: '#103020', amazon: 'https://amzn.in/d/02IBaxWG', flipkart: 'https://www.flipkart.com/search?q=gradora+seed+mix+100g' },
      { label: '250g', price: 220, Image: '../images/products/seed_mix-m.png', imgA: '#0E2A20', imgB: '#163A2A', amazon: 'https://amzn.in/d/0imJ9Jnc', flipkart: 'https://www.flipkart.com/search?q=gradora+seed+mix+250g' },
      { label: '400g', price: 279, Image: '../images/products/seed_mix.png', imgA: '#0E2A20', imgB: '#1A4A38', amazon: 'https://amzn.in/d/02aoIrDU', flipkart: 'https://www.flipkart.com/search?q=gradora+seed+mix+400g' }
    ]
  },
  {
    id: '7blend', cat: 'mixes', badge: { text: 'Signature', cls: 'hot' },
    name: '7-Blend Mix', catLabel: 'Signature Blend',
    desc: 'Seven superfoods: Cashew · Almond · Pistachio · Raisin · Pumpkin · Sunflower · Flaxseed.',
    protein: '16.1g', fiber: '5.8g',
    nutrition: { serving: '40g', cal: 180, fat: 13.2, satFat: 1.8, carbs: 10.4, sugar: 3.1, fiber: '5.8g', protein: '16.1g', sodium: '8mg', highlights: ['7 superfoods synergy', 'Full spectrum nutrients', 'Balanced macros', 'Antioxidant powerhouse'] },
    variants: [
      { label: '250g', price: 345, Image: '../images/products/7-blendM-m.png', imgA: '#1A2A10', imgB: '#2A3C18', amazon: 'https://amzn.in/d/03PGBwNN', flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+250g' },
      { label: '400g', price: 475, Image: '../images/products/7-blendM.png', imgA: '#1A2A10', imgB: '#2E4A20', amazon: 'https://amzn.in/d/00WJtqm5', flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+400g' }
    ]
  },
  {
    id: 'nutmix', cat: 'mixes', badge: { text: 'Bestseller', cls: 'hot' },
    name: 'Nut Mix', catLabel: 'Nutmix Blend',
    desc: '4 superfoods: Cashew · Almond · Pistachio · Black Raisin.',
    protein: '13.8g', fiber: '5.1g',
    nutrition: { serving: '40g', cal: 192, fat: 14.5, satFat: 1.9, carbs: 12.6, sugar: 4.2, fiber: '5.1g', protein: '13.8g', sodium: '6mg', highlights: ['Premium quad blend', 'Natural energy mix', 'Iron & calcium rich', 'Office & travel snack'] },
    variants: [
      { label: '200g', price: 340, Image: '../images/products/nut_mix-m.png', imgA: '#1A2A10', imgB: '#2A3C18', amazon: 'https://amzn.in/d/07rv0kqs', flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+250g' },
      { label: '350g', price: 499, Image: '../images/products/nut_mix.png', imgA: '#1A2A10', imgB: '#2E4A20', amazon: 'https://amzn.in/d/0f9b2wx4', flipkart: 'https://www.flipkart.com/search?q=gradora+nut+mix+400g' }
    ]
  }
];
// (PASTE PRODUCTS ARRAY HERE)

let cart = JSON.parse(localStorage.getItem('g_cart') || '[]');
let currentProd = null;
let currentVarIdx = 0;

/* ══ INITIALIZE PAGE ══ */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pid = urlParams.get('id');

    currentProd = PRODUCTS.find(p => p.id === pid);

    if (!currentProd) {
        window.location.href = '../eats.html'; 
        return;
    }

    currentVarIdx = currentProd.variants.length > 1 ? 1 : 0;

    renderProduct();
    refreshCart();
    initAnimations();
    initBackgroundStars();
});

/* ══ RENDER HTML ══ */
function renderProduct() {
    const container = document.getElementById('sp-container');
    const p = currentProd;
    const v = p.variants[currentVarIdx];

    const variantBtns = p.variants.map((vr, i) =>
        `<button class="vb ${i === currentVarIdx ? 'on' : ''}" onclick="changeVariant(${i})">${vr.label}</button>`
    ).join('');

    const suggestions = PRODUCTS.filter(item => item.id !== p.id).sort(() => 0.5 - Math.random()).slice(0, 3);

    const crossSellHtml = suggestions.map(item => {
        const defaultVarImg = item.variants[item.variants.length > 1 ? 1 : 0].Image;
        return `
            <div class="sp-rec-card" onclick="navigateToProduct('${item.id}')">
                <div class="sp-rec-img">
                    <img src="../${defaultVarImg}" class="sp-rec-image" alt="${item.name}">
                </div>
                <div class="sp-rec-info">
                    <span class="sp-rec-cat">${item.catLabel}</span>
                    <h4 class="sp-rec-title">${item.name}</h4>
                    <span class="sp-rec-price">From ₹${item.variants[0].price}</span>
                </div>
            </div>
        `;
    }).join('');

    // Renders the Product
    container.innerHTML = `
        <div class="sp-visual" style="background: linear-gradient(135deg, ${v.imgA}, ${v.imgB});">
            <a href="../eats.html#products" class="sp-back">← Back to Shop</a>
            <img src="../${v.Image}" class="sp-product-image" id="spEm" alt="${p.name}">
        </div>
        
        <div class="sp-details">
            <div class="sp-cat">${p.catLabel}</div>
            <h1 class="sp-title">${p.name}</h1>
            <p class="sp-desc">${p.desc}</p>
            
            <div class="sp-macros">
                <div class="sp-macro"><span class="sp-m-val">${p.protein}</span><span class="sp-m-lbl">Protein</span></div>
                <div class="sp-macro"><span class="sp-m-val">${p.fiber}</span><span class="sp-m-lbl">Fiber</span></div>
                <div class="sp-macro"><span class="sp-m-val">${p.nutrition.cal}</span><span class="sp-m-lbl">Kcal</span></div>
            </div>

            <button class="sp-nutri-btn" onclick="openNutrition('${p.id}')">
                <span class="sp-n-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </span>
                Full Nutrition Facts
                <span class="sp-n-arrow">→</span>
            </button>
            
            <div class="sp-variants" id="spVars">${variantBtns}</div>
            
            <div class="sp-price-row">
                <div class="sp-price">₹<span id="spPrice">${v.price}</span><small id="spSize"> /${v.label}</small></div>
                <div class="c-cks">
                    <a href="${v.amazon}" target="_blank" class="c-amz" id="amz-${p.id}">Buy on Amazon ↗</a>
                </div>
            </div>
            
            <div class="sp-cross-sell">
                <h3 class="sp-xs-heading">You Might Also Like</h3>
                <div class="sp-xs-grid">${crossSellHtml}</div>
            </div>
        </div>
    `;
    attachCursor(document);
}

window.changeVariant = function (idx) {
    currentVarIdx = idx;
    const p = currentProd;
    const v = p.variants[idx];

    document.getElementById('spPrice').textContent = v.price;
    document.getElementById('spSize').textContent = ` /${v.label}`;
    document.getElementById(`amz-${p.id}`).href = v.amazon;
    document.querySelector('.sp-visual').style.background = `linear-gradient(135deg, ${v.imgA}, ${v.imgB})`;

    const btns = document.querySelectorAll('#spVars .vb');
    btns.forEach((btn, i) => btn.classList.toggle('on', i === idx));

    const em = document.getElementById('spEm');
    gsap.to(em, { scale: 0.8, rotation: -10, duration: 0.2, onComplete: () => {
        em.src = `../${v.Image}`;
        gsap.to(em, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.5)" });
    }});
};

window.navigateToProduct = function (pid) { window.location.href = `product.html?id=${pid}`; };

/* ── CART LOGIC ── */
const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);
const cartSum = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

function refreshCart() {
    const badge = document.getElementById('cartBadge');
    const total = document.getElementById('cTotal');
    const list = document.getElementById('cList');

    if (badge) { badge.textContent = cartQty(); badge.classList.add('pop'); setTimeout(() => badge.classList.remove('pop'), 250); }
    if (total) total.textContent = '₹' + cartSum().toLocaleString('en-IN');
    if (!list) return;

    if (!cart.length) {
        list.innerHTML = '<div class="c-empty">Your cart is empty.</div>';
        return;
    }

    list.innerHTML = cart.map(i =>
        `<div class="c-item">
            <div class="ci-em"><img src="../${i.img}" style="width: 80%; height: 80%; object-fit: contain;"></div>
            <div class="ci-inf">
                <div class="ci-nm">${i.nm}</div>
                <div class="ci-sz">${i.l} jar · <span class="ci-pr">₹${i.price}</span></div>
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
    localStorage.setItem('g_cart', JSON.stringify(cart));
    refreshCart();
}
function openCart() { const d = document.getElementById('cDrawer'), o = document.getElementById('cOverlay'); if(d) d.classList.add('open'); if(o) o.classList.add('open'); }
function closeCart() { const d = document.getElementById('cDrawer'), o = document.getElementById('cOverlay'); if(d) d.classList.remove('open'); if(o) o.classList.remove('open'); }
const cartBtn = document.getElementById('cartBtn'); if (cartBtn) cartBtn.addEventListener('click', openCart);
const cClose = document.getElementById('cClose'); if (cClose) cClose.addEventListener('click', closeCart);
const cOverlay = document.getElementById('cOverlay'); if (cOverlay) cOverlay.addEventListener('click', closeCart);

/* ── ANIMATIONS ── */
function initAnimations() {
    gsap.from('.sp-details > *:not(.sp-cross-sell)', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
    gsap.from('.sp-cross-sell', { y: 40, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.8 });
    gsap.fromTo('#spEm', { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' });
    gsap.to('#spEm', { y: -20, rotation: 3, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
}

/* ── CURSOR & STARS ── */
const cur = document.getElementById('cursor') || document.getElementById('cur');
const curR = document.getElementById('cursor-ring') || document.getElementById('cur-r');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; } });
(function loop() { rx += (mx - rx) * .1; ry += (my - ry) * .1; if (curR) { curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; } requestAnimationFrame(loop); })();

function attachCursor(s) {
    if (!s) return;
    s.querySelectorAll('a, button, .vb, .sp-rec-card, .sp-nutri-btn, .c-amz, .qb').forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "true";
        el.addEventListener('mouseenter', () => { if (cur) cur.style.transform = 'translate(-50%,-50%) scale(2.5)'; if (curR) curR.style.opacity = '.25'; });
        el.addEventListener('mouseleave', () => { if (cur) cur.style.transform = 'translate(-50%,-50%) scale(1)'; if (curR) curR.style.opacity = '1'; });
    });
}
document.addEventListener('DOMContentLoaded', () => { attachCursor(document); });

function initBackgroundStars() {
    const sc = document.getElementById('stars-c');
    if (!sc) return;
    const sctx = sc.getContext('2d');
    function srz() { sc.width = window.innerWidth; sc.height = window.innerHeight; } srz(); window.addEventListener('resize', srz);
    const STARS = Array.from({ length: 220 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + .2, ph: Math.random() * Math.PI * 2, sp: Math.random() * .0025 + .0008 }));
    function dStars(t) {
        sctx.clearRect(0, 0, sc.width, sc.height);
        STARS.forEach(s => {
            const a = .25 + .65 * (.5 + .5 * Math.sin(t * s.sp + s.ph));
            sctx.beginPath(); sctx.arc(s.x * sc.width, s.y * sc.height, s.r, 0, Math.PI * 2);
            sctx.fillStyle = `rgba(255,252,230,${a * .8})`; sctx.fill();
        });
        requestAnimationFrame(dStars);
    }
    requestAnimationFrame(dStars);
}

/* ── NUTRITION SIDEBAR ── */
(function buildNutritionSidebar() {
    const overlay = document.createElement('div'); overlay.id = 'nf-overlay';
    const sidebar = document.createElement('div'); sidebar.id = 'nf-sidebar';
    sidebar.innerHTML = `<div class="nf-close" id="nfClose"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 1l16 16M17 1L1 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div><div class="nf-inner" id="nfInner"></div>`;
    document.body.appendChild(overlay); document.body.appendChild(sidebar);

    function closeNF() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
    overlay.addEventListener('click', closeNF);
    document.getElementById('nfClose').addEventListener('click', closeNF);

    window.openNutrition = function (pid) {
        const p = PRODUCTS.find(x => x.id === pid);
        if (!p || !p.nutrition) return;
        const n = p.nutrition;
        const macros = [
            { label: 'Fat', val: n.fat, max: 20, unit: 'g', color: '#E07240' },
            { label: 'Carbs', val: n.carbs, max: 30, unit: 'g', color: '#D4A853' },
            { label: 'Protein', val: parseFloat(p.protein), max: 30, unit: 'g', color: '#5FAD6B' },
            { label: 'Fiber', val: parseFloat(p.fiber), max: 30, unit: 'g', color: '#7CB8A8' },
        ];

        document.getElementById('nfInner').innerHTML = `
            <div class="nf-header"><img src="../${p.variants[0].Image}" style="width:50px;height:50px;object-fit:contain;"><div><div class="nf-prod-cat">${p.catLabel}</div><div class="nf-prod-nm">${p.name}</div></div></div>
            <div class="nf-label-strip"><span class="nfs-title">Nutrition Facts</span><span class="nfs-serving">per ${n.serving} serving</span></div>
            <div class="nf-cal-row"><span class="nf-cal-lbl">Calories</span><span class="nf-cal-val">${n.cal}</span><span class="nf-cal-unit">kcal</span></div>
            <div class="nf-divider thick"></div>
            <div class="nf-macros">
                ${macros.map(m => `<div class="nf-macro-row"><div class="nf-macro-head"><span class="nf-macro-name">${m.label}</span><span class="nf-macro-val">${m.val}${m.unit}</span></div><div class="nf-bar-bg"><div class="nf-bar-fill" style="--bar-color:${m.color};--bar-w:${Math.min(100, Math.round((m.val / m.max) * 100))}%;width:0"></div></div></div>`).join('')}
            </div>
            <div class="nf-divider"></div>
            <div class="nf-details"><div class="nf-row"><span>Saturated Fat</span><span>${n.satFat}g</span></div><div class="nf-row"><span>Sugar</span><span>${n.sugar}g</span></div><div class="nf-row"><span>Sodium</span><span>${n.sodium}</span></div></div>
            <div class="nf-divider"></div>
            <div class="nf-highlights"><div class="nf-hl-title">Key Benefits</div><div class="nf-hl-grid">${n.highlights.map(h => `<div class="nf-hl-tag">✦ ${h}</div>`).join('')}</div></div>
            <div class="nf-footer"><span>100% Natural · Zero Additives · FSSAI Licensed</span></div>`;

        overlay.classList.add('open'); sidebar.classList.add('open');
        requestAnimationFrame(() => { requestAnimationFrame(() => {
            sidebar.querySelectorAll('.nf-bar-fill').forEach((bar, i) => {
                setTimeout(() => { bar.style.transition = 'width .6s cubic-bezier(.16,1,.3,1)'; bar.style.width = bar.style.getPropertyValue('--bar-w') || '0'; }, i * 80);
            });
        });});
        attachCursor(sidebar);
    };
})();