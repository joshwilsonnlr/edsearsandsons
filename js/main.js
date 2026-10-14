/* ===== Ed Sears & Son - Premium Automotive Website ===== */
(function () {
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reviews = [
    { name: 'Fran L.', vehicle: '2017 Nissan', date: '10/13/2026', text: 'Superior Service, friendly nature, an excellent Customer Service. They went out of their way to find the best tires for me at an excellent price. Oil change was done timely. Satisfied customer.' },
    { name: 'John O.', vehicle: '2010 Ford', date: '10/9/2026', text: 'Could not have gone better. Everyone was very professional.' },
    { name: 'Verified Customer', vehicle: '2022 Kia', date: '10/4/2026', text: 'We brought both our cars to Ed, they were both involved in accidents within a week of each other. Their work was spectacular on both cars and they were great to work with.' },
    { name: 'Isabel Wysockey-Johnson', vehicle: '', date: '8/28/2026', text: 'We saw Chris for a pre-purchase inspection. He was incredibly thorough and gave a fair assessment of the vehicle.' },
    { name: 'David W.', vehicle: '2018 Honda', date: '8/26/2026', text: 'The car runs great! The dash was flashing all warning lights which is a common issue for newer Honda Accords. Thank you for fixing it!' },
    { name: 'Cathy O.', vehicle: '2020 Nissan', date: '6/5/2026', text: 'Excellent service!! Fair pricing. Above average customer service. Highly recommend.' },
    { name: 'James S.', vehicle: '2019 Ram', date: '5/30/2026', text: 'I had my Ram serviced for Front Rotors, Brake Pads and a new Starter. Service was great. Fair quote and fast efficient turnover.' }
  ];

  const recentVehicles = [
    { year: '2010', name: 'Ford Pickup', mileage: '174,404', date: '10/8/2026', service: 'Exhaust manifold R&R, bolt extraction', rating: 'John O. – 5 stars' },
    { year: '2022', name: 'Kia Niro EV', mileage: '93,973', date: '9/29/2026', service: 'Front bumper cover, paint match, tire rotation', rating: 'Mark M. – 5 stars' },
    { year: '2018', name: 'Honda Accord', mileage: '101,759', date: '8/26/2026', service: 'Fuel injectors, spark plugs, rear rotors, oil change', rating: 'David W. – 5 stars' },
    { year: '2017', name: 'Nissan Rogue', mileage: '121,029', date: '8/18/2026', service: 'Rear disc rotors & pads', rating: 'Fran L. – 5 stars' },
    { year: '2016', name: 'Chevrolet Trax', mileage: '97,027', date: '8/8/2026', service: 'Oil change, brake noise diagnosis', rating: 'Jonny P. – 5 stars' },
    { year: '2007', name: 'Toyota RAV4', mileage: '160,417', date: '7/27/2026', service: 'Spark plugs, diagnostics', rating: 'Katrina V. – 5 stars' },
    { year: '2017', name: 'Ford F-150', mileage: '146,892', date: '7/27/2026', service: 'Oil change, tire rotation, check engine light', rating: 'Nadine E. – 5 stars' },
    { year: '2015', name: 'Jeep Wrangler', mileage: '115,120', date: '2/27/2026', service: 'Oil and filter change', rating: 'Dana P. – 5 stars' }
  ];

  const expContent = {
    diagnostics: { title: 'Diagnostics', desc: 'Advanced computer diagnostics and drivability analysis to pinpoint issues accurately before any work begins.' },
    engine: { title: 'Engine Service', desc: 'Engine repair, replacement, performance checks, belts, hoses, cooling system, radiator, water pump, fuel injection and ignition system service.' },
    brakes: { title: 'Brakes', desc: 'Complete brake service including rotors, pads, calipers, and fluid.' },
    electrical: { title: 'Electrical', desc: 'Battery, alternator, starter, power accessories, lighting, and full electrical system diagnostics and repair.' },
    exhaust: { title: 'Exhaust', desc: 'Exhaust repair and replacement, mufflers, tailpipes, and emissions-related service.' },
    hvac: { title: 'Heating & AC', desc: 'Heating and air conditioning diagnostics, compressor service, belts, and climate system repairs.' },
    maintenance: { title: 'Maintenance', desc: 'Factory scheduled maintenance, oil changes, filters, tune-ups, fluid services, and inspections.' },
    general: { title: 'General Repair', desc: 'Alignment, transmission, suspension, shocks & struts, chassis, steering, and comprehensive general repair.' }
  };

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    setupNav(); setupHeroCanvas(); setupParticles(); populateReviews(); populateRecent();
    setupCarousels(); setupExperience(); setupBrandTabs(); setupMagneticButtons();
    if (!prefersReduced && typeof gsap !== 'undefined') { gsap.registerPlugin(ScrollTrigger); runAnimations(); }
    else { document.querySelectorAll('.hero-eyebrow, .hero-title .line, .hero-desc, .hero-ctas, .hero-stats').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; }); }
  }

  function setupNav() {
    const header = document.getElementById('site-header');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      menu.classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); document.body.style.overflow = '';
    }));
  }

  function setupHeroCanvas() {
    const container = document.getElementById('hero-canvas-container');
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined' || prefersReduced) {
      if (container) container.style.background = 'radial-gradient(ellipse at 60% 40%, #1a1520 0%, #0a0a0c 70%)';
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    scene.add(new THREE.AmbientLight(0x404050, 0.6));
    const dir = new THREE.DirectionalLight(0xe8a838, 0.8); dir.position.set(3, 4, 2); scene.add(dir);
    const group = new THREE.Group();
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x2a2a32, metalness: 0.85, roughness: 0.25 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.6, 1.4), metalMat); body.position.y = -0.2; group.add(body);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 1.2), metalMat); cabin.position.set(-0.3, 0.35, 0); group.add(cabin);
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111114, metalness: 0.5, roughness: 0.4 });
    [[-1.1,-0.55,0.75],[1.1,-0.55,0.75],[-1.1,-0.55,-0.75],[1.1,-0.55,-0.75]].forEach(([x,y,z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat); w.rotation.z = Math.PI/2; w.position.set(x,y,z); group.add(w);
    });
    const accent = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 0.08), new THREE.MeshBasicMaterial({ color: 0xe8a838 }));
    accent.position.set(0, -0.05, 0.72); group.add(accent);
    group.position.set(1.5, 0, 0); group.rotation.y = -0.4; scene.add(group);
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', e => { mouseX = (e.clientX/window.innerWidth-0.5)*0.3; mouseY = (e.clientY/window.innerHeight-0.5)*0.2; }, { passive: true });
    function animate() {
      requestAnimationFrame(animate);
      const t = Date.now()*0.001;
      group.rotation.y = -0.4 + mouseX*0.5 + Math.sin(t*0.3)*0.05;
      group.rotation.x = mouseY*0.3;
      group.position.y = Math.sin(t*0.5)*0.08;
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); }, { passive: true });
  }

  function setupParticles() {
    const container = document.getElementById('particles');
    if (!container || prefersReduced) return;
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = 'position:absolute;width:3px;height:3px;background:rgba(232,168,56,0.4);border-radius:50%;left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation:floatParticle 12s linear infinite;animation-delay:-'+Math.random()*10+'s';
      container.appendChild(dot);
    }
    if (!document.getElementById('particle-style')) {
      const style = document.createElement('style');
      style.id = 'particle-style';
      style.textContent = '@keyframes floatParticle{0%{transform:translateY(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh);opacity:0}}';
      document.head.appendChild(style);
    }
  }

  function populateReviews() {
    const track = document.getElementById('reviews-carousel');
    if (!track) return;
    reviews.forEach(r => {
      const card = document.createElement('article');
      card.className = 'review-card';
      card.innerHTML = '<div class="stars" aria-label="5 star rating">★★★★★</div><p class="review-text">“'+r.text+'”</p><div class="review-meta"><span class="review-name">'+r.name+'</span><span class="review-vehicle">'+(r.vehicle?r.vehicle+' • ':'')+r.date+'</span></div>';
      track.appendChild(card);
    });
  }

  function carSVG(color) {
    const c = color || '#e8a838';
    return '<svg viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M30 58h180c4 0 8-3 9-7l8-28c1-4-1-8-5-9l-22-6c-3-1-6-4-7-7l-6-12c-2-4-6-6-10-6H85c-4 0-8 2-10 6l-8 14c-1 2-3 4-6 5L35 18c-4 1-7 5-7 9v24c0 4 3 7 7 7z" fill="#1a1a20" stroke="'+c+'" stroke-width="2"/><circle cx="62" cy="62" r="16" fill="#111" stroke="'+c+'" stroke-width="2"/><circle cx="62" cy="62" r="7" fill="#333"/><circle cx="178" cy="62" r="16" fill="#111" stroke="'+c+'" stroke-width="2"/><circle cx="178" cy="62" r="7" fill="#333"/><path d="M88 28h55c3 0 5 2 6 5l4 12H82l4-12c1-3 3-5 6-5z" fill="#252530" stroke="'+c+'" stroke-width="1.5"/><rect x="40" y="42" width="14" height="6" rx="1" fill="'+c+'" opacity="0.7"/></svg>';
  }

  function populateRecent() {
    const track = document.getElementById('recent-carousel');
    if (!track) return;
    recentVehicles.forEach(function(v, i) {
      const card = document.createElement('article');
      card.className = 'vehicle-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML = '<div class="car-sil">'+carSVG('#e8a838')+'</div><div class="vehicle-year">'+v.year+'</div><h3 class="vehicle-name">'+v.name+'</h3><div class="vehicle-details">Mileage: '+v.mileage+' • Serviced '+v.date+'</div><div class="vehicle-service">'+v.service+'</div><div class="vehicle-rating">'+v.rating+'</div>';
      card.addEventListener('click', function() { showServicedVehicle(i); });
      card.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showServicedVehicle(i); } });
      track.appendChild(card);
    });
  }

  function showServicedVehicle(index) {
    const v = recentVehicles[index];
    if (!v) return;
    document.querySelectorAll('.vehicle-card').forEach(function(c, i) { c.classList.toggle('active', i === index); });
    var panel = document.getElementById('vehicle-detail-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'vehicle-detail-panel';
      panel.className = 'vehicle-detail-panel';
      var wrap = document.querySelector('.recent .container');
      if (wrap) wrap.appendChild(panel);
    }
    panel.innerHTML = '<div class="detail-car">'+carSVG('#e8a838')+'</div><div><h3>'+v.year+' '+v.name+'</h3><p><strong>Mileage:</strong> '+v.mileage+'</p><p><strong>Service date:</strong> '+v.date+'</p><p class="detail-service"><strong>Services performed:</strong> '+v.service+'</p><p style="margin-top:12px;color:var(--accent)">'+v.rating+'</p><a href="https://edsearsandsons.com/appointments/" class="btn btn-primary magnetic" style="margin-top:16px" target="_blank" rel="noopener">Schedule Similar Service</a></div>';
    panel.classList.add('open');
    panel.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'nearest' });
  }

  function setupCarousels() {
    setupCarousel('reviews-carousel', 'rev-prev', 'rev-next', 404);
    setupCarousel('recent-carousel', 'rec-prev', 'rec-next', 344);
  }

  function setupCarousel(trackId, prevId, nextId, step) {
    var track = document.getElementById(trackId);
    var prev = document.getElementById(prevId);
    var next = document.getElementById(nextId);
    if (!track || !prev || !next) return;
    var index = 0;
    function maxIndex() { return Math.max(0, track.children.length - (window.innerWidth > 900 ? 2 : 1)); }
    function update() {
      var s = window.innerWidth < 500 ? Math.min(step, window.innerWidth * 0.88) : step;
      track.style.transform = 'translateX(-' + (index * s) + 'px)';
    }
    prev.addEventListener('click', function() { index = Math.max(0, index - 1); update(); });
    next.addEventListener('click', function() { index = Math.min(maxIndex(), index + 1); update(); });
    window.addEventListener('resize', function() { index = Math.min(index, maxIndex()); update(); }, { passive: true });
  }

  function setupExperience() {
    var items = document.querySelectorAll('.exp-item');
    var title = document.getElementById('exp-title');
    var desc = document.getElementById('exp-desc');
    items.forEach(function(item) {
      item.addEventListener('click', function() {
        items.forEach(function(i) { i.classList.remove('active'); });
        item.classList.add('active');
        var data = expContent[item.dataset.exp];
        if (data) { title.textContent = data.title; desc.textContent = data.desc; }
      });
    });
  }

  function setupBrandTabs() {
    document.querySelectorAll('.brand-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.brand-tab').forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('.brands-panel').forEach(function(p) { p.classList.remove('active'); });
        var panel = document.getElementById('panel-' + tab.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });
    document.querySelectorAll('.brand-pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        var brand = pill.textContent.trim();
        document.querySelectorAll('.brand-pill').forEach(function(p) { p.classList.remove('active'); });
        pill.classList.add('active');
        showBrandCar(brand);
      });
    });
  }

  function showBrandCar(brand) {
    var preview = document.getElementById('brand-preview');
    var visual = document.getElementById('brand-preview-visual');
    var nameEl = document.getElementById('brand-preview-name');
    var msgEl = document.getElementById('brand-preview-msg');
    var servicedEl = document.getElementById('brand-preview-serviced');
    if (!preview || !visual) return;
    preview.hidden = false;
    visual.innerHTML = carSVG('#e8a838');
    nameEl.textContent = brand;
    msgEl.textContent = 'We service and repair ' + brand + ' vehicles with expert diagnostics, quality parts, and certified technicians in Ballston Spa, NY.';
    var matches = recentVehicles.filter(function(v) {
      var b = brand.toLowerCase().split(' ')[0];
      return v.name.toLowerCase().indexOf(b) !== -1 || brand.toLowerCase().indexOf(v.name.split(' ')[0].toLowerCase()) !== -1;
    });
    servicedEl.textContent = matches.length
      ? 'Recently serviced: ' + matches.map(function(m) { return m.year + ' ' + m.name; }).join(' · ')
      : 'We work on ' + brand + ' cars and trucks regularly — schedule your service below.';
    preview.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'nearest' });
  }

  function setupMagneticButtons() {
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.magnetic').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((e.clientX-rect.left-rect.width/2)*0.15) + 'px, ' + ((e.clientY-rect.top-rect.height/2)*0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function() { btn.style.transform = ''; });
    });
  }

  function runAnimations() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to('.hero-title .line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.5')
      .to('.hero-desc', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
    gsap.to('.stat-num[data-count]', { innerText: 216, duration: 2, delay: 1.2, snap: { innerText: 1 }, ease: 'power2.out' });
  }
})();
