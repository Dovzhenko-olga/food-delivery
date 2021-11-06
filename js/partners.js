const renderItems = (data) => {
  data.forEach(item => {
    console.log(item.name);
  })
}

fetch('https://delivery-9561e-default-rtdb.firebaseio.com/db/partners.json')
  .then(res => res.json())
  .then(data => renderItems(data))
  .catch(error => {
    console.log(error.message);
  });