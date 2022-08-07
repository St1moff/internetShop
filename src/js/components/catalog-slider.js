import vars from '../_vars'
const catalogSlider = new Swiper('.hero-catalog__slider', {
  spaceBetween: 100,
  loop: true,
  slidesPerView: 1,
  initialSlide: 1,
  navigation: {
    nextEl: '.hero-next-btn',
    prevEl: '.hero-prev-btn',
  },
  pagination: {
    el: '.hero--pag',
    type: 'bullets',
    clickable: true
  },
});

const relatedSlider = new Swiper(vars.$cardRelatedSlider, {
  loop: true,
  slidesPerView: 2,
  slidesPerGroup: 3,
  spaceBetween: 30,
  pagination: {
    el: '.related-pag',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    650: {
      slidesPerView: 4
    }
  }
});