const cardsResaurants = document.querySelector('.cards-restaurants');

const BASE_URL = 'https://delivery-9561e-default-rtdb.firebaseio.com/db/';

const renderItems = (data) => {
  data.forEach(item => {

    const { name, time_of_delivery, stars, price, kitchen, image, products } = item;

    const link = document.createElement('a');
    link.setAttribute('href', 'restaurant.html');
    link.classList.add('card');
    link.classList.add('card-restaurant');
    link.dataset.products = products;

    link.innerHTML = `
    <img src="${image}" alt="${name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${name}</h3>
					<span class="card-tag tag">${time_of_delivery} мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						${stars}
					</div>
					<div class="price">От ${price} ₽</div>
					<div class="category">${kitchen}</div>
				</div>
			</div>
    `

    console.log(window);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (!localStorage.getItem('user')) {
        modalAuth.style.display = 'flex';
        return;
      }

      localStorage.setItem('restaurant', JSON.stringify(item));

      window.location.pathname = '/restaurant.html';
    });

    cardsResaurants.append(link);
  })
}

fetch(`${BASE_URL}partners.json`)
  .then(res => res.json())
  .then(data => renderItems(data))
  .catch(error => {
    console.log(error.message);
  });