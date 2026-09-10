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

  // 3. UBC Rover In-Page Detail View
  const roverLink = document.getElementById('rover-link');
  const roverDetail = document.getElementById('rover-detail');
  const closeRoverBtn = document.getElementById('close-rover');
  const roverToContact = document.getElementById('rover-to-contact');

  function openRoverPage(e) {
    if (e) e.preventDefault();
    roverDetail.classList.add('active');
    roverDetail.setAttribute('aria-hidden', 'false');
    roverDetail.scrollTop = 0;
    document.body.style.overflow = 'hidden'; // Locks landing page scroll
  }

  function closeRoverPage() {
    roverDetail.classList.remove('active');
    roverDetail.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  roverLink.addEventListener('click', openRoverPage);
  closeRoverBtn.addEventListener('click', closeRoverPage);

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && roverDetail.classList.contains('active')) {
      closeRoverPage();
    }
  });

  // "Contact William" button action
  roverToContact.addEventListener('click', (e) => {
    e.preventDefault();
    closeRoverPage();

    const contactLink = document.getElementById('contact-link');
    if (contactLink) {
      contactLink.scrollIntoView({ behavior: 'smooth' });
      contactLink.focus();
    }
  });
});