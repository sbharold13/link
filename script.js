const phrases = ["Welcome", "> disponible pour projets"];
const el = document.getElementById('typewriter');
let pi = 0, ci = 0, deleting = false;

function tick(){
  const current = phrases[pi];
  el.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);

  if (!deleting && ci === current.length + 1) {
    deleting = true;
    setTimeout(tick, 1400);
    return;
  }
  if (deleting && ci < 0) {
    deleting = false;
    ci = 0;
    pi = (pi + 1) % phrases.length;
  }
  setTimeout(tick, deleting ? 35 : 65);
}
tick();

/* --- Effet 3D sur la photo (tilt qui suit la souris) --- */
const tiltHeader = document.getElementById('tiltHeader');
const tiltImg = tiltHeader ? tiltHeader.querySelector('.header-img') : null;
const canHover = window.matchMedia('(hover: hover)').matches;

if (tiltHeader && tiltImg && canHover) {
  const maxTilt = 10; // degrés

  tiltHeader.addEventListener('mousemove', (e) => {
    const rect = tiltHeader.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 -> 1
    const y = (e.clientY - rect.top) / rect.height;  // 0 -> 1

    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt;

    tiltImg.style.transform =
      `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltHeader.addEventListener('mouseleave', () => {
    tiltImg.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
  });
}