// shopping-cart.js

// Ongeza tool kwenye kikapu (cart)
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  alert(`${name} imeongezwa kwenye kikapu`);
  renderCart();
}

// Ondoa tool kutoka kikapu
function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  renderCart();
}

// Onyesha vitu vilivyoko kwenye kikapu
function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;
  
  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="text-center p-4">Kikapu kipo tupu.</p>';
    updateTotal(0);
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'flex justify-between items-center p-2 border-b';

    row.innerHTML = `
      <div>
        <strong>${item.name}</strong> (x${item.qty})
      </div>
      <div>
