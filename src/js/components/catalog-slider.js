const catalogSlider = new Swiper('.hero-catalog__slider', {
  spaceBetween: 100,
  loop: true,
  slidesPerView: 1,
  initialSlide: 1,
  navigation: {
    nextEl: '.hero-next-btn',
    prevEl: '.hero-prev-btn',
  },
});

