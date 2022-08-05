import vars from '../_vars';

vars.$burger.addEventListener('click', () => {
  vars.$nav.classList.add('nav--visible')
})
vars.$navClose.addEventListener('click', () => {
  vars.$nav.classList.remove('nav--visible')
})

