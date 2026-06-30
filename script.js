/* ============================================
   SSM INNOVATIONS — script.js
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ======== BOTÃO VOLTAR AO TOPO ======== */
  var btnTopo = document.getElementById('btnTopo');
  if (btnTopo) {
    window.addEventListener('scroll', function () {
      btnTopo.classList.toggle('visible', window.scrollY > 300);
    });
    btnTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ======== CARROSSEL ======== */
  var wrapper = document.getElementById('carrossel');
  var track   = document.getElementById('carrosselTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dots    = document.querySelectorAll('#carrosselDots .dot');

  if (wrapper && track) {

    var slides  = track.querySelectorAll('.slide');
    var TOTAL   = slides.length;
    var current = 0;
    var timer   = null;
    var busy    = false;

    function render(animate) {
      track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
      track.style.transform  = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d) { d.classList.remove('active'); });
      if (dots[current]) dots[current].classList.add('active');
    }

    function next() {
      if (busy) return;
      busy = true;
      current = (current + 1) % TOTAL;
      render(true);
      setTimeout(function () { busy = false; }, 520);
    }

    function prev() {
      if (busy) return;
      busy = true;
      current = (current - 1 + TOTAL) % TOTAL;
      render(true);
      setTimeout(function () { busy = false; }, 520);
    }

    function goTo(idx) {
      if (busy) return;
      busy = true;
      current = idx;
      render(true);
      setTimeout(function () { busy = false; }, 520);
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(next, 3500);
    }
    function stopAuto() { clearInterval(timer); }

    // Inicializa
    render(false);
    startAuto();

    if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); next(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); prev(); startAuto(); });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopAuto();
        goTo(parseInt(this.dataset.index));
        startAuto();
      });
    });

    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);

    // Swipe mobile
    var tx = 0, ty = 0;
    track.addEventListener('touchstart', function (e) {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
      stopAuto();
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var dx = tx - e.changedTouches[0].clientX;
      var dy = ty - e.changedTouches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        dx > 0 ? next() : prev();
      }
      startAuto();
    }, { passive: true });
  }


  /* ======== ÁUDIO ======== */
  /* Player agora fica sempre visível - sem necessidade de JS para revelar */


  /* ======== FORMULÁRIO ======== */
  var formContato = document.getElementById('formContato');
  if (formContato) {
    formContato.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome     = (document.getElementById('nome')     || { value: '' }).value.trim();
      var telefone = (document.getElementById('telefone') || { value: '' }).value.trim();
      var emailVal = (document.getElementById('email')    || { value: '' }).value.trim();
      var mensagem = (document.getElementById('ajuda')    || { value: '' }).value.trim();

      if (!nome || !emailVal || !mensagem) {
        alert('Por favor, preencha Nome, E-mail e Mensagem.');
        return;
      }

      var texto = 'Olá Sérgio! Sou ' + nome
        + '. Tel: ' + (telefone || 'não informado')
        + '. Email: ' + emailVal
        + '. Mensagem: ' + mensagem;

      window.open('https://wa.me/5531986299617?text=' + encodeURIComponent(texto), '_blank');
    });
  }


  /* ======== SMOOTH SCROLL NAV ======== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id     = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});