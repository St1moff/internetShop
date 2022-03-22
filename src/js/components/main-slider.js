// import Swiper from 'swiper';

const bannerSlider = new Swiper('.banner-slider', {
  spaceBetween: 100,
  loop: true,
  initialSlide: 1,
  slidesPerView: 1,
  pagination: {
    el: '.banner-pag',
    type: 'bullets',
    clickable: true
  },
});

