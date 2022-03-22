import vars from '../_vars';


let counter = 0;
let delay = 4000;


/// Change Data Marketing
const marketingData = [
  {
    title: 'Very good nice T-shirt for men',
    where: 'Moscow, Russia'
  },
  {
    title: 'Very good nice Jeans for women',
    where: 'Kiev, Ukraine'
  },
  {
    title: 'Super Omega good sweater unisex',
    where: 'London, Britan'
  }
]

const changeMarketingData = () => {
  vars.$marketing.classList.remove('marketing--visible');

  setTimeout(() => {
    vars.$marketing.classList.add('marketing--visible');
  }, delay - 2000);

  const stringTitle = `${marketingData[counter].title}`;
  const stringWhere = `15 minutes ago ${marketingData[counter].where}`;

  vars.$marketing.querySelector('.marketing__title').textContent = stringTitle
  vars.$marketing.querySelector('.marketing__when-from').textContent = stringWhere

  counter++;

  if (counter === marketingData.length) {
    counter = 0;
  };

};



setInterval(changeMarketingData, delay);


/// Close Marketing







