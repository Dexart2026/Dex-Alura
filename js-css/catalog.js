const params = new URLSearchParams(window.location.search);
const profile = params.get('perfil');

const profileData = {
  Dexart: {
    name: 'Dexart',
    image: './arquivos-uteis/unnamed.dex.jpg'
  },
  Loid: {
    name: 'Loid',
    image: './arquivos-uteis/Loyd.jpg'
  },
  Zoro: {
    name: 'Zoro',
    image: './arquivos-uteis/perdidão.png'
  },
  Kids: {
    name: 'Kids',
    image: './arquivos-uteis/anya.jpg'
  }
};

const selectedProfile = profileData[profile] || {
  name: 'Visitante',
  image: './arquivos-uteis/unnamed.dex.jpg'
};

document.getElementById('profile-name').textContent = selectedProfile.name;
document.getElementById('profile-name-row-1').textContent = selectedProfile.name;
document.getElementById('profile-name-footer').textContent = selectedProfile.name;

const avatar = document.getElementById('profile-avatar');
avatar.src = selectedProfile.image;
avatar.alt = `Foto do perfil ${selectedProfile.name}`;

/* MODAL */
const modal = document.getElementById('movie-modal');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalType = document.getElementById('modal-type');
const modalMeta = document.getElementById('modal-meta');
const modalDescription = document.getElementById('modal-description');

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const title = card.dataset.title || 'Título indisponível';
    const type = card.dataset.type || 'Conteúdo';
    const meta = card.dataset.meta || '';
    const description = card.dataset.description || 'Sem descrição disponível.';
    const image = card.dataset.modalImage || card.dataset.image || '';

    modalTitle.textContent = title;
    modalType.textContent = type;
    modalMeta.textContent = meta;
    modalDescription.textContent = description;
    modalImage.src = image;
    modalImage.alt = title;

    modal.classList.add('active');
    document.body.classList.add('modal-open');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
});

/* HERO SLIDER */
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');

let currentHero = 0;
let heroInterval;

function applyHeroBackgrounds() {
  heroSlides.forEach((slide) => {
    const image = slide.dataset.image;
    slide.style.backgroundImage = `url('${image}')`;
  });
}

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentHero = index;
}

function nextHeroSlide() {
  const next = (currentHero + 1) % heroSlides.length;
  showHeroSlide(next);
}

function prevHeroSlide() {
  const prev = (currentHero - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(prev);
}

function startHeroAutoPlay() {
  heroInterval = setInterval(nextHeroSlide, 5000);
}

function resetHeroAutoPlay() {
  clearInterval(heroInterval);
  startHeroAutoPlay();
}

applyHeroBackgrounds();
showHeroSlide(0);
startHeroAutoPlay();

nextBtn?.addEventListener('click', () => {
  nextHeroSlide();
  resetHeroAutoPlay();
});

prevBtn?.addEventListener('click', () => {
  prevHeroSlide();
  resetHeroAutoPlay();
});

heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showHeroSlide(index);
    resetHeroAutoPlay();
  });
});