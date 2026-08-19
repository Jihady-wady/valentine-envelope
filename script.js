document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const muteBtn = document.getElementById('muteBtn');
  const music = document.getElementById('bgMusic');

  if (!wrapper || !openBtn || !closeBtn) return;

  const FADE_STEP = 0.05;
  const FADE_INTERVAL = 80; // ms
  let fadeTimer = null;
  let isMuted = false;

  function fadeAudio(target, onComplete) {
    if (!music) return;
    clearInterval(fadeTimer);
    fadeTimer = setInterval(() => {
      const diff = target - music.volume;
      if (Math.abs(diff) < FADE_STEP) {
        music.volume = target;
        clearInterval(fadeTimer);
        if (target === 0 && !isMuted) music.pause();
        if (onComplete) onComplete();
        return;
      }
      music.volume += diff > 0 ? FADE_STEP : -FADE_STEP;
    }, FADE_INTERVAL);
  }

  openBtn.addEventListener('click', () => {
    wrapper.classList.add('open');
    openBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';

    if (music && !isMuted) {
      music.volume = 0;
      music.play().catch(() => {
        // Autoplay might be blocked until user interacts; this click counts as interaction, so it should work.
      });
      fadeAudio(0.6);
      muteBtn.style.display = 'inline-block';
    }
  });

  closeBtn.addEventListener('click', () => {
    wrapper.classList.remove('open');
    closeBtn.style.display = 'none';
    openBtn.style.display = 'inline-block';

    if (music) {
      fadeAudio(0);
      muteBtn.style.display = 'none';
    }
  });

  if (muteBtn && music) {
    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        music.pause();
        muteBtn.textContent = '🔇';
      } else {
        music.play().catch(() => {});
        muteBtn.textContent = '🔊';
      }
    });
  }
});
