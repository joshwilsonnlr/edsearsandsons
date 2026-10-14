/* ===== Ed Sears & Son - Premium Automotive Website ===== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reviews = [
    { name: 'Fran L.', vehicle: '2017 Nissan', date: '10/13/2026', text: 'Superior Service, friendly nature, an excellent Customer Service. They went out of their way to find the best tires for me at an excellent price. Oil change was done timely. Satisfied customer.' },
    { name: 'John O.', vehicle: '2010 Ford', date: '10/9/2026', text: 'Could not have gone better. Everyone was very professional.' },
    { name: 'Verified Customer', vehicle: '2022 Kia', date: '10/4/2026', text: 'We brought both our cars to Ed, they were both involved in accidents within a week of each other. Their work was spectacular on both cars and they were great to work with as we were balancing others insurance companies and juggling our own transportation headaches.' },
    { name: 'Isabel Wysockey-Johnson', vehicle: '', date: '8/28/2026', text: 'We saw Chris for a pre-purchase inspection. He was incredibly thorough and gave a fair assessment of the vehicle for both the buyer and the seller that helped us to eventually make a deal and purchase the car.' },
    { name: 'David W.', vehicle: '2018 Honda', date: '8/26/2026', text: 'The car runs great! The dash was flashing all warning lights which is a common issue for newer Honda Accords. Thank you for fixing it! Wish I brought it in sooner.' },
    { name: 'Cathy O.', vehicle: '2020 Nissan', date: '6/5/2026', text: 'Excellent service!! Awesome service as usual. Fair pricing. Above average customer service. Highly recommend.' },
    { name: 'James S.', vehicle: '2019 Ram', date: '5/30/2026', text: 'I had my Ram serviced for Front Rotors, Brake Pads and a new Starter. Service was great. Supplied me with a very fair quote and they explained what was necessary to repair and get my truck back up to operating safely. Turn over was fast and efficient.' }
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
    diagnostics: { title: 'Diagnostics', desc: 'Advanced computer diagnostics and drivability analysis to pinpoint issues accurately before any work begins. We use the latest equipment for precise results.' },
    engine: { title: 'Engine Service', desc: 'Engine repair, replacement, performance checks, belts, hoses, cooling system, radiator, water pump, fuel injection and ignition system service.' },
    brakes: { title: 'Brakes', desc: 'Complete brake service including rotors, pads, calipers, and fluid. We restore stopping power and safety with quality parts and expert workmanship.' },
    electrical: { title: 'Electrical', desc: 'Battery, alternator, starter, power accessories, lighting, and full electrical system diagnostics and repair with state-of-the-art tools.' },
    exhaust: { title: 'Exhaust', desc: 'Exhaust repair and replacement, mufflers, tailpipes, and emissions-related service to keep your vehicle quiet, efficient, and compliant.' },
    hvac: { title: 'Heating & AC', desc: 'Heating and air conditioning diagnostics, compressor service, belts, and climate system repairs so you stay comfortable year-round.' },
    maintenance: { title: 'Maintenance', desc: 'Factory scheduled maintenance, oil changes, filters, tune-ups, fluid services, inspections, and 30k/60k/90k/120k mile services.' },
    general: { title: 'General Repair', desc: 'Alignment, transmission, suspension, shocks & struts, chassis, steering, and comprehensive general repair for nearly every make and model.' }
  };

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    setupNav();
    setupHeroCanvas();
    setupParticles();
    populateReviews();
    populateRecent();
    setupCarousels();
    setupExperience();
    setupBrandTabs();
    setupMagneticButtons();
    if (!prefersReduced && typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      runAnimations();
    } else {
      document.querySelectorAll('.hero-eyebrow, .hero-title .line, .hero-desc, .hero-ctas, .hero-stats').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
    }
  }

  function setupNav() {
    const header = document.getElementById('site-header');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      menu.classList.toggle('open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function setupHeroCanvas() {
    const container = document.getElementById('hero-canvas-container');
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined' || prefersReduced) {
      container.style.background = 'radial-gradient(ellipse at 60% 40%, #1a1520 0%, #0a0a0c 70%)';
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
    const dir = new THREE.DirectionalLight(0xe8a838, 0.8);
    dir.position.set(3, 4, 2);
    scene.add(dir);
    const group = new THREE.Group();
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x2a2a32, metalness: 0.85, roughness: 0.25 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.6, 1.4), metalMat);
    body.position.y = -0.2;
    group.add(body);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 1.2), metalMat);
    cabin.position.set(-0.3, 0.35, 0);
    group.add(cabin);
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111114, metalness: 0.5, roughness: 0.4 });
    [[-1.1, -0.55, 0.75], [1.1, -0.55, 0.75], [-1.1, -0.55, -0.75], [1.1, -0.55, -0.75]].forEach(([x, y, z]) => {
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(x, y, z);
      group.add(w);
    });
    const accent = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 0.08), new THREE.MeshBasicMaterial({ color: 0xe8a838 }));
    accent.position.set(0, -0.05, 0.72);
    group.add(accent);
    group.position.set(1.5, 0, 0);
    group.rotation.y = -0.4;
    scene.add(group);
    const particleGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xe8a838, transparent: true, opacity: 0.6 });
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      p.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4 - 1);
      p.userData = { offset: Math.random() * Math.PI * 2 };
      scene.add(p);
      particles.push(p);
    }
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
    }, { passive: true });
    function animate() {
      requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      group.rotation.y = -0.4 + mouseX * 0.5 + Math.sin(t * 0.3) * 0.05;
      group.rotation.x = mouseY * 0.3;
      group.position.y = Math.sin(t * 0.5) * 0.08;
      particles.forEach(p => {
        p.position.y += Math.sin(t + p.userData.offset) * 0.001;
        p.position.x += Math.cos(t * 0.5 + p.userData.offset) * 0.0008;
      });
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });
  }

  function setupParticles() {
    const container = document.getElementById('particles');
    if (!container || prefersReduced) return;
    for (let i = 0; i < 25; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `position:absolute;width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px;background:rgba(232,168,56,${0.2 + Math.random() * 0.4});border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation: floatParticle ${8 + Math.random() * 12}s linear infinite;animation-delay:-${Math.random() * 10}s;`;
      container.appendChild(dot);
    }
    if (!document.getElementById('particle-style')) {
      const style = document.createElement('style');
      style.id = 'particle-style';
      style.textContent = '@keyframes floatParticle { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100vh) translateX(30px); opacity: 0; } }';
      document.head.appendChild(style);
    }
  }

  function populateReviews() {
    const track = document.getElementById('reviews-carousel');
    if (!track) return;
    reviews.forEach(r => {
      const card = document.createElement('article');
      card.className = 'review-card';
      card.innerHTML = `<div class="stars" aria-label="5 star rating">★★★★★</div><p class="review-text">“${r.text}”</p><div class="review-meta"><span class="review-name">${r.name}</span><span class="review-vehicle">${r.vehicle ? r.vehicle + ' • ' : ''}${r.date}</span></div>`;
      track.appendChild(card);
    });
  }

  function populateRecent() {
    const track = document.getElementById('recent-carousel');
    if (!track) return;
    recentVehicles.forEach(v => {
      const card = document.createElement('article');
      card.className = 'vehicle-card';
      card.innerHTML = `<div class="vehicle-year">${v.year}</div><h3 class="vehicle-name">${v.name}</h3><div class="vehicle-details">Mileage: ${v.mileage} • Serviced ${v.date}</div><div class="vehicle-service">${v.service}</div><div class="vehicle-rating">${v.rating}</div>`;
      track.appendChild(card);
    });
  }

  function setupCarousels() {
    setupCarousel('reviews-carousel', 'rev-prev', 'rev-next', 404);
    setupCarousel('recent-carousel', 'rec-prev', 'rec-next', 344);
  }

  function setupCarousel(trackId, prevId, nextId, step) {
    const track = document.getElementById(trackId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);
    if (!track || !prev || !next) return;
    let index = 0;
    const cards = () => track.children.length;
    const maxIndex = () => Math.max(0, cards() - (window.innerWidth > 900 ? 2 : 1));
    function update() {
      const s = window.innerWidth < 500 ? Math.min(step, window.innerWidth * 0.88) : step;
      track.style.transform = `translateX(-${index * s}px)`;
    }
    prev.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
    next.addEventListener('click', () => { index = Math.min(maxIndex(), index + 1); update(); });
    window.addEventListener('resize', () => { index = Math.min(index, maxIndex()); update(); }, { passive: true });
  }

  function setupExperience() {
    const items = document.querySelectorAll('.exp-item');
    const title = document.getElementById('exp-title');
    const desc = document.getElementById('exp-desc');
    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const data = expContent[item.dataset.exp];
        if (data) {
          title.textContent = data.title;
          desc.textContent = data.desc;
          if (!prefersReduced && typeof gsap !== 'undefined') {
            gsap.fromTo('#exp-detail', { opacity: 0.5, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        }
      });
    });
  }

  function setupBrandTabs() {
    document.querySelectorAll('.brand-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.brand-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.brands-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById('panel-' + tab.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function setupMagneticButtons() {
    if (prefersReduced || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  function runAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to('.hero-title .line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.5')
      .to('.hero-desc', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
    gsap.to('.stat-num[data-count]', { innerText: 216, duration: 2, delay: 1.2, snap: { innerText: 1 }, ease: 'power2.out' });
    gsap.utils.toArray('.service-card, .why-card, .review-card, .vehicle-card, .exp-item').forEach(el => {
      gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }, opacity: 0, y: 40, duration: 0.7, ease: 'power2.out' });
    });
    gsap.from('.section-header', { scrollTrigger: { trigger: '.section-header', start: 'top 85%' }, opacity: 0, y: 30, duration: 0.8 });
    gsap.from('.about-content', { scrollTrigger: { trigger: '.about', start: 'top 70%' }, opacity: 0, x: 40, duration: 0.9 });
    gsap.from('.about-visual', { scrollTrigger: { trigger: '.about', start: 'top 70%' }, opacity: 0, x: -40, duration: 0.9 });
    gsap.from('.cta-box', { scrollTrigger: { trigger: '.cta-appointment', start: 'top 80%' }, opacity: 0, scale: 0.95, duration: 0.8 });
    gsap.to('.about-image', { scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1 }, y: 40 });
  }
})();
