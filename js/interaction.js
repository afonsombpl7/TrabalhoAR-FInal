AFRAME.registerComponent('tap-actions', {
  init: function () {
    const el = this.el; // <a-gltf-model>
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
  sceneEl.addEventListener('arError', (e) => status.textContent = 'Erro AR: ' + e.detail);

  const objA = document.getElementById('objA');
  if (objA) objA.setAttribute('tap-actions', '');


  ['alvoA'/*,'alvoB'*/].forEach(id => {
    const target = document.getElementById(id);
    if (!target) return;
    target.addEventListener('targetFound', () => status.textContent = id + ': marcador detetado!');
    target.addEventListener('targetLost',  () => status.textContent = id + ': perdeu o marcador');
  });

  resetBtn.onclick = () => window.location.reload();
});
