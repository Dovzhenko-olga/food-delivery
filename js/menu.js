const cardsMenu = document.querySelector('.cards-menu');

const BASE_URL = 'https://delivery-9561e-default-rtdb.firebaseio.com/db/';

const changeTitle = (restaurant) => {
  const restaurantTitle = document.querySelector('.restaurant-title');
  const rating = document.querySelector('.rating');
  const price = document.querySelector('.price');
  const category = document.querySelector('.category');
  restaurantTitle.textContent = restaurant.name;
  rating.textContent = restaurant.stars;
  price.textContent = `От ${restaurant.price} ₽`;
  category.textContent = restaurant.kitchen;
};

const renderItems = (data) => {
  data.forEach(({ description, image, name, price }) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <img src="${image}" alt="${name}" class="card-image" />
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">${name}</h3>
				</div>
				<div class="card-info">
					<div class="ingredients">
          ${description}
					</div>
				</div>
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">${price} ₽</strong>
				</div>
			</div>
    `
    cardsMenu.append(card);
  })
}

const storage = localStorage.getItem('restaurant');

if (storage) {
  const restaurant = JSON.parse(storage);

  changeTitle(restaurant);
  fetch(`${BASE_URL}${restaurant.products}`)
    .then(res => res.json())
    .then(data => renderItems(data))
    .catch(error => {
      console.log(error.message);
    });
} else {
  window.location.href = '/';
};