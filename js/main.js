(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function(){
        links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', links.classList.contains('open'));
      });
    }
    document.querySelectorAll('.brand-pill').forEach(function(pill){
      pill.addEventListener('click', function(){
        var brand = pill.textContent.trim();
        document.querySelectorAll('.brand-pill').forEach(function(p){ p.classList.remove('active'); });
        pill.classList.add('active');
        var preview = document.getElementById('brand-preview');
        if (!preview) return;
        preview.classList.add('show');
        var name = document.getElementById('bp-name');
        var msg = document.getElementById('bp-msg');
        if (name) name.textContent = brand;
        if (msg) msg.textContent = 'We service and repair ' + brand + ' vehicles with expert care in Ballston Spa, NY.';
        preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
})();
