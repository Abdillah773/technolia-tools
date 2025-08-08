// add-to-cart.js
function addToCart(productName, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ productName, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("✅ Imeongezwa kwenye kikapu!");
}
