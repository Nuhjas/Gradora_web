/* ══════════════════════════════════════════════════════════════
   MASTER PRODUCT DATA (Images + Nutrition)
   ══════════════════════════════════════════════════════════════ */
let PRODUCTS = [];

async function loadProducts() {

    const { data, error } = await supabaseClient
        .from("products")
        .select(`
            *,
            product_variants (
                *,
                variant_images (*)
            ),
            product_nutrition (*)
        `)
        .eq("active", true);

    if (error) {
        console.error(error);
        return;
    }

    PRODUCTS = data.map(p => {

        const n = p.product_nutrition?.[0] || {};

        return {

            ...p,

            name: p.name,
            desc: p.description,
            catLabel: p.category,

            protein: `${n.protein || 0}`,
            fiber: `${n.fiber || 0}`,

            nutrition: {
                cal: n.calories || 0,
                fat: n.total_fat || 0,
                carbs: n.total_carbs || 0,
                sugar: n.sugars || 0,
                sodium: n.sodium || 0,
                serving: "100g",
                satFat: "-",
                calcium: n.calcium,
                magnesium: n.magnesium,
                potassium: n.potassium,
                phosphorus: n.phosphorus,
                iron: n.iron,
                zinc: n.zinc,
                vitamin_e: n.vitamin_e,
                vitamin_b6: n.vitamin_b6,
                omega_3: n.omega_3,
                highlights: n.highlights || []
            },

            variants: p.product_variants.map(v => ({

                label: `${v.weight}g`,
                price: v.price,
                amazon: v.amazon_url,

                Image:
                    v.variant_images?.find(x => x.image_type === "front")
                        ?.image_url ||

                    v.variant_images?.[0]?.image_url ||

                    "",

                imgA: "#2A1A08",
                imgB: "#3E2810"
            }))
        };
    });
}

let cart = JSON.parse(localStorage.getItem('g_cart') || '[]');
let currentProd = null;
let currentVarIdx = 0;

/* ══ INITIALIZE PAGE ══ */
document.addEventListener('DOMContentLoaded', async () => {

    await loadProducts();

    const urlParams = new URLSearchParams(window.location.search);
    const pid = urlParams.get('id');

    currentProd = PRODUCTS.find(p => p.id === pid);

    if (!currentProd) {
        window.location.href = '../index.html#products';
        return;
    }

    currentVarIdx = currentProd.variants.length > 1 ? 1 : 0;

    renderProduct();
    refreshCart();
    initAnimations();
    initBackgroundStars();

    // Theme toggle initialization and listener
    const themeSwitches = document.querySelectorAll('.theme-switch');
    const activeTheme = localStorage.getItem('g_theme') || 'dark';
    if (activeTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    themeSwitches.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('g_theme', currentTheme);
        });
    });

    // Mobile Menu handler
    const menuBtn = document.getElementById('menuBtn');
    const fsMenu  = document.getElementById('fsMenu');
    const fsMenuClose = document.getElementById('fsMenuClose');

    if (menuBtn && fsMenu) {
        function openMenu() {
            menuBtn.classList.add('active');
            fsMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            menuBtn.classList.remove('active');
            fsMenu.classList.remove('open');
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', () => {
            if (fsMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (fsMenuClose) {
            fsMenuClose.addEventListener('click', closeMenu);
        }

        // Close menu when clicking links
        fsMenu.querySelectorAll('.fs-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }
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
                    <img src="${defaultVarImg}" class="sp-rec-image" alt="${item.name}">
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
            <a href="../index.html#products" class="sp-back">← Back to Shop</a>
            <img src="${v.Image}" class="sp-product-image" id="spEm" alt="${p.name}">
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
    gsap.to(em, {
        scale: 0.8, rotation: -10, duration: 0.2, onComplete: () => {
            em.src = `${v.Image}`;
            gsap.to(em, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.5)" });
        }
    });
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
            <div class="ci-em"><img src="${i.img}" style="width: 80%; height: 80%; object-fit: contain;"></div>
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
function openCart() { const d = document.getElementById('cDrawer'), o = document.getElementById('cOverlay'); if (d) d.classList.add('open'); if (o) o.classList.add('open'); }
function closeCart() { const d = document.getElementById('cDrawer'), o = document.getElementById('cOverlay'); if (d) d.classList.remove('open'); if (o) o.classList.remove('open'); }
const cartBtn = document.getElementById('cartBtn'); if (cartBtn) cartBtn.addEventListener('click', openCart);
const cClose = document.getElementById('cClose'); if (cClose) cClose.addEventListener('click', closeCart);
const cOverlay = document.getElementById('cOverlay'); if (cOverlay) cOverlay.addEventListener('click', closeCart);

/* ── ANIMATIONS ── */
function initAnimations() {
    gsap.from('.sp-details > *:not(.sp-cross-sell)', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2, clearProps: 'opacity,transform' });
    gsap.from('.sp-cross-sell', { y: 40, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.8, clearProps: 'opacity,transform' });
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
        const extraNutrition = [
            { label: "Sugar", value: n.sugar, unit: "g" },
            { label: "Sodium", value: n.sodium, unit: "mg" },
            { label: "Calcium", value: n.calcium, unit: "mg" },
            { label: "Magnesium", value: n.magnesium, unit: "mg" },
            { label: "Potassium", value: n.potassium, unit: "mg" },
            { label: "Phosphorus", value: n.phosphorus, unit: "mg" },
            { label: "Iron", value: n.iron, unit: "mg" },
            { label: "Zinc", value: n.zinc, unit: "mg" },
            { label: "Vitamin E", value: n.vitamin_e, unit: "mg" },
            { label: "Vitamin B6", value: n.vitamin_b6, unit: "mg" },
            { label: "Omega-3", value: n.omega_3, unit: "g" }
        ];

        const nutritionHTML = extraNutrition
            .filter(x =>
                x.value !== null &&
                x.value !== undefined &&
                x.value !== 0 &&
                x.value !== ""
            )
            .map(x => `
    <div class="nf-row">
        <span>${x.label}</span>
        <span>${x.value}${x.unit}</span>
    </div>
    `)
            .join('');

        document.getElementById('nfInner').innerHTML = `
            <div class="nf-header"><img src="${p.variants[0].Image}" style="width:50px;height:50px;object-fit:contain;"><div><div class="nf-prod-cat">${p.catLabel}</div><div class="nf-prod-nm">${p.name}</div></div></div>
            <div class="nf-label-strip"><span class="nfs-title">Nutrition Facts</span><span class="nfs-serving">per 100g serving</span></div>
            <div class="nf-cal-row"><span class="nf-cal-lbl">Calories</span><span class="nf-cal-val">${n.cal}</span><span class="nf-cal-unit">kcal</span></div>
            <div class="nf-divider thick"></div>
            <div class="nf-macros">
                ${macros.map(m => `<div class="nf-macro-row"><div class="nf-macro-head"><span class="nf-macro-name">${m.label}</span><span class="nf-macro-val">${m.val}${m.unit}</span></div><div class="nf-bar-bg"><div class="nf-bar-fill" style="--bar-color:${m.color};--bar-w:${Math.min(100, Math.round((m.val / m.max) * 100))}%;width:0"></div></div></div>`).join('')}
            </div>
            <div class="nf-divider"></div>
            <div class="nf-details">
            ${nutritionHTML}
            </div>
            <div class="nf-divider"></div>
            <div class="nf-highlights"><div class="nf-hl-title">Key Benefits</div><div class="nf-hl-grid">${n.highlights.map(h => `<div class="nf-hl-tag">✦ ${h}</div>`).join('')}</div></div>
            <div class="nf-footer"><span>100% Natural · Zero Additives · FSSAI Licensed</span></div>`;

        overlay.classList.add('open'); sidebar.classList.add('open');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                sidebar.querySelectorAll('.nf-bar-fill').forEach((bar, i) => {
                    setTimeout(() => { bar.style.transition = 'width .6s cubic-bezier(.16,1,.3,1)'; bar.style.width = bar.style.getPropertyValue('--bar-w') || '0'; }, i * 80);
                });
            });
        });
        attachCursor(sidebar);
    };
})();

// Header scroll stuck state
window.addEventListener('scroll', () => {
    document.getElementById('mainNav')?.classList.toggle('stuck', window.scrollY > 80);
}, { passive: true });