import vars from '../_vars'
if (vars.$colorSelect) {
  vars.$colorSelect.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-select__btn')) {

      document.querySelectorAll('.color-select__btn').forEach(el => el.classList.remove('color-select__btn--active'));

      let color = e.target.dataset.color;

      e.currentTarget.querySelector('.color-select__selected span').textContent = color

      e.target.classList.add('color-select__btn--active')
    }
  })
}

if (vars.$sizeSelect) {
  let size = ''

  vars.$sizeSelect.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-select__btn')) {

      e.currentTarget.querySelector('.size-select__clear').style.display = "inline-flex"

      e.target.classList.toggle('size-select__btn--active')

      if (e.target.classList.contains('size-select__btn--active')) {
        let currentSize = e.target.textContent
        size += currentSize + ', '
      } else {
        let currentSize = e.target.textContent + ', '
        size = size.replace(currentSize, '')
      }

      e.currentTarget.querySelector('.size-select__selected span').textContent = size
      if (!size) {
        e.currentTarget.querySelector('.size-select__selected span').textContent = 'Select a size';
      };
    };
    document.querySelector('.size-select__clear').addEventListener('click', (e) => {
      document.querySelector('.size-select__selected span').textContent = 'Select a size';
      document.querySelectorAll('.size-select__btn').forEach(el => el.classList.remove('size-select__btn--active'))
      document.querySelector('.size-select__clear').style.display = "none"
      size = ''
    })
  });
}

if(vars.$sizeSelect) {
  document.querySelectorAll('.catalog-header .nav__link').forEach(e => {
    e.classList.remove('nav__link--current')
    if(e.textContent === 'Elements'){
      e.classList.add('nav__link--current')
    }
  })
}




