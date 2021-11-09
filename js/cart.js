const btnCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('.modal-cart');
const close = modalCart.querySelector('.close');
const modalBody = modalCart.querySelector('.modal-body');
const btnSend = modalCart.querySelector('.button-primary');
const cancel = modalCart.querySelector('.clear-cart');
const modalPrice = modalCart.querySelector('.modal-pricetag');

const resetCart = () => {
  modalBody.innerHTML = '';
  localStorage.removeItem('cart');
  modalCart.classList.remove('is-open');
  modalPrice.textContent = '0 ₽';
}

const incrementCount = (id) => {
  const cartArray = JSON.parse(localStorage.getItem('cart'));

  cartArray.map(item => {
    if (item.id === id) {
      item.count++;
    }
    return item;
  })

  localStorage.setItem('cart', JSON.stringify(cartArray));
  renderCartItems(cartArray);
};

const decrementCount = (id) => {
  const cartArray = JSON.parse(localStorage.getItem('cart'));

  cartArray.map(item => {
    if (item.id === id) {
      if (!item.count > 0) {
        return;
      }
      item.count--;
    }
    return item;
  })

  localStorage.setItem('cart', JSON.stringify(cartArray));
  renderCartItems(cartArray);
};

const renderCartItems = (data) => {
  modalBody.innerHTML = '';

  let priceTag = 0;

  data.forEach(({ name, price, id, count }) => {

    const newItem = document.createElement('div');

    newItem.classList.add('food-row');

    newItem.innerHTML = `
    <span class="food-name">${name}</span>
    <strong class="food-price">${price} ₽</strong>
    <div class="food-counter">
    	<button class="counter-button btn-dec" data-index="${id}">-</button>
    	<span class="counter">${count}</span>
    	<button class="counter-button btn-inc" data-index="${id}">+</button>
    </div>
    `
    priceTag = data.reduce((acc, current) => acc + current.price * current.count, 0);

    modalBody.append(newItem);
  })

  modalPrice.textContent = `${priceTag} ₽`;
}

modalBody.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('btn-inc')) {
    incrementCount(e.target.dataset.index);
  } else if (e.target.classList.contains('btn-dec')) {
    decrementCount(e.target.dataset.index);
  }
})

btnSend.addEventListener('click', () => {
  const cartArray = localStorage.getItem('cart');

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: cartArray,
  })
    .then(res => {
      if (res.ok) {
        resetCart();
      }
    })
    .catch(error => {
      console.log(error.message);
    });
})

cancel.addEventListener('click', resetCart);

btnCart.addEventListener('click', () => {

  if (localStorage.getItem('cart')) {
    renderCartItems(JSON.parse(localStorage.getItem('cart')))
  };

  modalCart.classList.add('is-open');
});

close.addEventListener('click', () => {
  modalCart.classList.remove('is-open');
});