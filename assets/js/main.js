/* Caíque Dedetizadora — interações */
(function () {
  var WA = '5521971311551';
  var waLink = function (m) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(m); };

  var burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
  if (burger && menu) {
    burger.addEventListener('click', function () { var o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.classList.remove('open'); }); });
  }

  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .1 });
    els.forEach(function (e) { io.observe(e); });
  } else { els.forEach(function (e) { e.classList.add('in'); }); }

  var last = null;
  function open(id) { var m = document.getElementById(id); if (!m) return; last = document.activeElement; m.classList.add('open'); document.body.style.overflow = 'hidden'; var f = m.querySelector('input,select,textarea,button'); if (f) setTimeout(function () { f.focus(); }, 60); }
  function close(m) { m.classList.remove('open'); document.body.style.overflow = ''; if (last) last.focus(); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-open]');
    if (b) {
      e.preventDefault();
      var s = b.getAttribute('data-service');
      if (s) { var sel = document.querySelector('#orcamento select[name=servico]'); if (sel) sel.value = s; }
      open(b.getAttribute('data-open'));
      return;
    }
    var p = e.target.closest('[data-pest]');
    if (p) {
      e.preventDefault();
      var m = document.getElementById('praga');
      m.querySelector('.pic').innerHTML = p.querySelector('.pic').innerHTML;
      m.querySelector('.name').textContent = p.getAttribute('data-pest');
      m.querySelector('.svcname').textContent = p.getAttribute('data-svc');
      m.querySelector('.risk').textContent = p.getAttribute('data-risk');
      m.querySelector('.signs').textContent = p.getAttribute('data-signs');
      m.querySelector('.how').textContent = p.getAttribute('data-how');
      m.querySelector('.go').href = waLink('Olá! Vim pelo site da Caíque Dedetizadora. Estou com problema de ' + p.getAttribute('data-pest').toLowerCase() + ' e gostaria de um orçamento.');
      open('praga');
    }
  });
  document.querySelectorAll('.modal').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('.modal-close') || e.target.closest('.js-close')) close(m); });
  });
  document.addEventListener('keydown', function (e) { var m = document.querySelector('.modal.open'); if (m && e.key === 'Escape') close(m); });

  document.querySelectorAll('form[data-wa]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f), l = ['Olá! Vim pelo site da Caíque Dedetizadora e gostaria de um orçamento.'];
      if (d.get('nome')) l.push('*Nome:* ' + d.get('nome'));
      if (d.get('servico')) l.push('*Serviço:* ' + d.get('servico'));
      var pr = d.getAll('pragas'); if (pr.length) l.push('*Pragas:* ' + pr.join(', '));
      if (d.get('imovel')) l.push('*Imóvel:* ' + d.get('imovel'));
      if (d.get('bairro')) l.push('*Bairro/cidade:* ' + d.get('bairro'));
      if (d.get('detalhes')) l.push('*Detalhes:* ' + d.get('detalhes'));
      window.open(waLink(l.join('\n')), '_blank', 'noopener');
    });
  });

  var bub = document.querySelector('.bubble');
  if (bub) { setTimeout(function () { bub.classList.add('show'); }, 4000); setTimeout(function () { bub.classList.remove('show'); }, 12000); }
  var y = document.getElementById('ano'); if (y) y.textContent = new Date().getFullYear();
})();
