import vars from '../_vars';

if(vars.$mobileFilters) {
  let openFilters = false
  vars.$mobileFilters.addEventListener('click', (e) => {
    if (!openFilters) {
      document.querySelector('.catalog-mobile-filters__text').textContent = 'CLOSE'
      vars.$catalogFilters.classList.add('catalog-filters--open')
      openFilters = true
    } else {
      document.querySelector('.catalog-mobile-filters__text').textContent = 'FILTERS'
      vars.$catalogFilters.classList.remove('catalog-filters--open')
      openFilters = false
    }
  })
}