// import {asd} from './func'; Пример импорта фунции из другого js файл
import './components/main-slider.js'
import './components/marketing.js'
import './components/catalog-slider.js'
import './components/catalog-filter-toggle.js'
import './components/catalog-props.js'


const closeMarketing = () => {
  document.querySelector('.marketing').classList.remove('marketing--visible');
}

document.querySelector('.marketing').addEventListener('click', (e) => {
  if (e.target.classList.contains('marketing__close')) {
    closeMarketing();
  }
});













