import vars from '../_vars';


vars.$catalogFiltersTop.forEach(el => {
  el.addEventListener('click', (e) => {
    e.currentTarget.closest('.catalog-filter').classList.toggle('catalog-filter--open')
  });
});

vars.$hideFilters.addEventListener('click', (e) => {
  vars.$catalogFiltersTop.forEach(el => {
    el.closest('.catalog-filter').classList.remove('catalog-filter--open')
  });
});




vars.$catalogFilterItems.forEach(el => {
  el.querySelector('input').addEventListener('change', (e) => {
    let checked = el.querySelector('input').checked;
    if (checked) {
      el.querySelector('.custom-checkbox').classList.add('custom-checkbox--active');
      let text = el.querySelector('.custom-checkbox__text').textContent;

      vars.$catalogChoice.insertAdjacentHTML('afterbegin', 
        `
        <button class = "btn-reset catalog-choice__item" >
          ${text}
          <svg>
            <use xlink:href="img/sprite.svg#close"></use>
          </svg>  
        </button>
        `
      )

    } else {
      el.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active');
      document.querySelectorAll('.catalog-choice__item').forEach(e => {
        if (e.textContent.trimLeft().trimRight() === el.querySelector('.custom-checkbox').dataset.text) {
          e.remove()
        }

        
      })
    }

    let activeCheckboxes = document.querySelectorAll('.custom-checkbox--active')

    if (activeCheckboxes.length > 0) {
      vars.$catalogChoice.style.display = "block";
    } else {
      vars.$catalogChoice.style.display = "none";
    }
  });
});

vars.$catalogChoice.addEventListener('click', (e) => {
  if (e.target.classList.contains('catalog-choice__item')){
    e.target.remove();

    let text = e.target.textContent.trimLeft().trimRight();

    document.querySelector(`[data-text="${text}"]`).querySelector('input').checked = false;
    document.querySelector(`[data-text="${text}"]`).classList.remove('custom-checkbox--active');
  }

  if (e.target.classList.contains('catalog-choice__clear')) {
    Array.from(e.currentTarget.children).forEach(el => {
      if (!el.classList.contains('catalog-choice__clear')) {
        el.remove();
      }
      vars.$catalogFilterItems.forEach(elem => {
        elem.querySelector('input').checked = false;
        elem.querySelector('.custom-checkbox').classList.remove('custom-checkbox--active');
      })
    });
      e.currentTarget.style.display = 'none';
    }


  if (e.currentTarget.children.length === 1) {
    e.currentTarget.style.display = 'none';
  }

}) 


