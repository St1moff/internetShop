// import {asd} from './func'; Пример импорта фунции из другого js файл

import './components/main-slider.js';
import './components/marketing.js';
import './components/catalog-slider.js';
import './components/catalog-filter-toggle.js';
import './components/catalog-props.js';
import './components/card-select.js';
import './components/stepper.js';
import './components/card-slider.js';
import './components/card-bottom-tabs.js';
import './components/products.js';
import './components/burger.js'
import './components/mobile-filters.js'
import SimpleBar from 'simplebar';
import vars from './_vars'

if(document.querySelector('[data-bar]')) {
  new SimpleBar(document.querySelector('.card-description__navigation'))
}

const scrollTo = (el) => {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: el.offsetTop
  })
}

if(document.querySelector('.to-top')) {
  document.querySelector('.to-top').addEventListener('click', (e) => {
    e.preventDefault()
    scrollTo(document.querySelector('.header'))
  })
};



  













