let orders = JSON.parse(localStorage.getItem('orders')) || [];
let orderNumber = orders.length + 1;

function addToOrder() {
  const name = document.getElementById('studentName').value.trim();
  const item = document.getElementById('item').value;
  const amount = document.getElementById('paymentAmount').value;

  if (!name || !item || !amount) {
    alert('Please complete all fields.');
    return;
  }

  const order = {
    orderNumber: orderNumber++,
    name,
    item,
    amount: parseFloat(amount).toFixed(2)
  };

  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  alert(`Order #${order.orderNumber} added!`);
  clearInputs();
}

function clearInputs() {
  document.getElementById('studentName').value = '';
  document.getElementById('item').value = '';
  document.getElementById('paymentAmount').value = '';
}

function showOrders() {
  const emailInput = document.querySelector('.admin-section input[type="email"]');
  const passwordInput = document.querySelector('.admin-section input[type="password"]');
  const orderList = document.getElementById('orderList');

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email !== 'admin' || password !== 'password123') {
    alert('Incorrect admin credentials.');
    orderList.innerHTML = '';
    return;
  }

  if (orders.length === 0) {
    orderList.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  let output = '<h3>Order List</h3><ul>';
  orders.forEach(order => {
    output += `<li>#${order.orderNumber}: ${order.name} ordered ${order.item} (R${order.amount})</li>`;
  });
  output += '</ul>';
  orderList.innerHTML = output;
}