document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');

  if (!wrapper || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    wrapper.classList.add('open');
    openBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';
  });

  closeBtn.addEventListener('click', () => {
    wrapper.classList.remove('open');
    closeBtn.style.display = 'none';
    openBtn.style.display = 'inline-block';
  });
});
