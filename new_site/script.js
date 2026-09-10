document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-item');
  const previewImage = document.getElementById('preview-image');
  const root = document.documentElement;

  const DEFAULT_BG = '#FFFFFF';
  const DEFAULT_FOOTER = '#111111';

  // 1. Preload hover assets into memory
  links.forEach(link => {
    const imgSrc = link.dataset.img;
    if (imgSrc) {
      const img = new Image();
      img.src = imgSrc;
    }
  });

  // 2. Main Page Hover Interactions
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      root.style.setProperty('--bg-color', link.dataset.bg || DEFAULT_BG);
      root.style.setProperty('--active-link-color', link.dataset.text || '#FFFFFF');
      root.style.setProperty('--footer-color', link.dataset.footer || DEFAULT_FOOTER);

      if (link.dataset.img) {
        previewImage.src = link.dataset.img;
        previewImage.classList.add('visible');
      }
    });

    link.addEventListener('mouseleave', () => {
      root.style.setProperty('--bg-color', DEFAULT_BG);
      root.style.setProperty('--footer-color', DEFAULT_FOOTER);
      previewImage.classList.remove('visible');
    });
  });

  // 3. Multi-Page Detail Overlay System
  const experienceLink = document.getElementById('experience-link');
  const experienceDetail = document.getElementById('experience-detail');

  const roverLink = document.getElementById('rover-link');
  const roverDetail = document.getElementById('rover-detail');

  const allOverlays = [experienceDetail, roverDetail];

  function openView(view) {
    if (!view) return;
    view.classList.add('active');
    view.setAttribute('aria-hidden', 'false');
    view.scrollTop = 0;
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeAllViews() {
    allOverlays.forEach(view => {
      if (view) {
        view.classList.remove('active');
        view.setAttribute('aria-hidden', 'true');
      }
    });
    document.body.style.overflow = '';
  }

  // Open triggers
  experienceLink.addEventListener('click', (e) => {
    e.preventDefault();
    openView(experienceDetail);
  });

  roverLink.addEventListener('click', (e) => {
    e.preventDefault();
    openView(roverDetail);
  });

  // Close triggers (top buttons & bottom Back buttons)
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllViews();
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllViews();
    }
  });

  // "Contact William" button action inside any detail overlay
  document.querySelectorAll('.to-contact-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllViews();

      const contactLink = document.getElementById('contact-link');
      if (contactLink) {
        contactLink.scrollIntoView({ behavior: 'smooth' });
        contactLink.focus();
      }
    });
  });
});