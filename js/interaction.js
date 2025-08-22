AFRAME.registerComponent('tap-actions', {
  init: function () {
    const el = this.el;
    let rotated = false;
    el.sceneEl.addEventListener('click', () => {
      rotated = !rotated;
      el.setAttribute('animation', {
        property: 'rotation',
        to: rotated ? '0 360 0' : '0 0 0',
        loop: false,
        dur: 1200,
        easing: 'easeInOutQuad'
      });
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');
  const sceneEl = document.querySelector('a-scene');

  sceneEl.addEventListener('arReady', () => status.textContent = 'Aponte ao marcador');
  sceneEl.addEventListener('arError', (e) => status.textContent = 'AR erro: ' + (e.detail?.message || e.detail || 'desconhecido'));

  sceneEl.addEventListener('camera-init', () => status.textContent = 'Câmara pronta — aponte ao marcador');
  sceneEl.addEventListener('camera-error', (e) => status.textContent = 'Câmara erro: ' + (e.detail?.message || e.detail || 'desconhecido'));

  const objA = document.getElementById('objA');
  if (objA) objA.setAttribute('tap-actions', '');

  ['alvoA'].forEach(id => {
    const t = document.getElementById(id);
    if (!t) return;
    t.addEventListener('targetFound', () => status.textContent = id + ': marcador detetado!');
    t.addEventListener('targetLost', () => status.textContent = id + ': perdeu o marcador');
  });

  resetBtn.onclick = () => window.location.reload();
});
