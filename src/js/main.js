// import {asd} from './func'; Пример импорта фунции из другого js файл
import './components/main-slider.js'
import './components/marketing.js'
import './components/catalog-slider.js'
import './components/catalog-filter-toggle.js'
import './components/catalog-props.js'
import vars from './_vars'




vars.$freeDeliveryBtn.addEventListener('click', (e) => {

  e.currentTarget.closest('.free-delivery').style.visibility = "hidden";
})













