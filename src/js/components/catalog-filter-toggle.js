import vars from '../_vars';


vars.$catalogFilters.forEach(el => {
  console.log(el)
  el.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('catalog-filter--open')
  })
})