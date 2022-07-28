if (document.querySelector('.products-grid')) {
  const productsGrid = document.querySelector('.products-grid');
  const loadMore = document.querySelector('.main-products__more');
  let quantityProducts = 5
  let dataLength = '';

  const fetchProducts = (quantity = 5) => {
    fetch('../resources/products.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dataLength = data.length;
        productsGrid.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
          if (i < quantity) {
            productsGrid.innerHTML += `

            <li class = "products-grid__item"> 
              <article class = "product"> 
                <div class = "product__image"> 
                  <img src = "${data[i].image}" alt = "${data[i].title}"> 
                </div>
                <h3 class="product__title"> 
                  <a href="#">
                    ${data[i].title}
                  </a> 
                </h3>
                <div class = "product-custom"> 
                  <div class = "product-custom__price"> 
                    <span class = "product__price"> ${data[i].price} </span>
                  </div> 
                  <div class="product-custom__cart"> 
                    <span class="to-cart"> Add to cart </span>
                    <div class = "product-custom__links"> 
                      <img src = "./img/search.png" alt = "Search"> 
                      <img src="./img/like.png" alt = "Like"> 
                    </div>
                  </div>
                </div>
              </article>
            </li>
          `
          }
        }
      })
  }

  fetchProducts()

  loadMore.addEventListener('click', () => {
    quantityProducts += 5;
    fetchProducts(quantityProducts);

    if (quantityProducts === dataLength) {
      loadMore.style.display = 'none';
    } else {
      loadMore.style.display = 'inline-flex';
    }

  })
}

