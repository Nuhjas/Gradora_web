// Filter pills
const pills = document.querySelectorAll('.filter-pill');
const cards = document.querySelectorAll('.product-card');
const categoryMap = {
  'All Products': null,
  'Nuts': ['W240 Cashew','Almond','Pistachio'],
  'Seeds': ['Pumpkin Seed','Flax Seed','Sunflower Seed'],
  'Mixes': ['7-Blend Mix','Seed Mix','Black Raisin']
};
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.textContent.trim();
    const allowed = categoryMap[cat];
    cards.forEach(card => {
      const name = card.querySelector('.product-name').textContent;
      card.style.display = (!allowed || allowed.includes(name)) ? '' : 'none';
    });
  });
});

// Sticky nav shadow on scroll
window.addEventListener('scroll',()=>{
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 50 ? '0 4px 24px rgba(61,43,26,0.08)' : 'none';
});