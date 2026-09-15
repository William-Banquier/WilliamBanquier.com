document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-item');
  const previewImage = document.getElementById('preview-image');
  const root = document.documentElement;

  const DEFAULT_BG = '#FFFFFF';
  const DEFAULT_FOOTER = '#111111';

  // 1. Preload hover assets
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
      } else {
        previewImage.classList.remove('visible');
      }
    });

    link.addEventListener('mouseleave', () => {
      root.style.setProperty('--bg-color', DEFAULT_BG);
      root.style.setProperty('--footer-color', DEFAULT_FOOTER);
      previewImage.classList.remove('visible');
    });
  });

  // 3. Multi-Page Detail Overlay System
  const overlays = {
    experience: document.getElementById('experience-detail'),
    rover: document.getElementById('rover-detail'),
    competitions: document.getElementById('competitions-detail'),
    projects: document.getElementById('projects-detail'),
    contact: document.getElementById('contact-detail')
  };

  const allOverlaysList = Object.values(overlays);

  function openView(view) {
    if (!view) return;
    closeAllViews();
    view.classList.add('active');
    view.setAttribute('aria-hidden', 'false');
    view.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeAllViews() {
    allOverlaysList.forEach(view => {
      if (view) {
        view.classList.remove('active');
        view.setAttribute('aria-hidden', 'true');
      }
    });
    document.body.style.overflow = '';
  }

  // Top Nav Link bindings
  document.getElementById('experience-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openView(overlays.experience);
  });

  document.getElementById('rover-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openView(overlays.rover);
  });

  document.getElementById('competitions-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openView(overlays.competitions);
  });

  document.getElementById('projects-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openView(overlays.projects);
  });

  document.getElementById('contact-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    openView(overlays.contact);
  });

  // Close buttons (Headers, "Back" buttons, and williambanquier.com link)
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
      openView(overlays.contact);
    });
  });
});