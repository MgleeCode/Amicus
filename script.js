// Load cart data from local storage on page load
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(itemId) {
  const item = {
    id: itemId,
    name: document.querySelector(`[data-item-id="${itemId}"] h3`).textContent,
    price: parseFloat(
      document
        .querySelector(`[data-item-id="${itemId}"] p`)
        .textContent.split("$")[1]
    ),
    quantity: 1,
  };

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(item);
  }

  // Save updated cart to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalCostElement = document.getElementById("total-cost");

  // Clear existing cart items
  cartItemsElement.innerHTML = "";

  let totalCost = 0;

  // Loop through the cart and update the display
  cart.forEach((item) => {
    const listItem = document.createElement("li");

    // Create elements for quantity controls
    const quantityControls = document.createElement("div");
    quantityControls.innerHTML = `
      <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
      <span>${item.quantity}</span>
      <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
      <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
    `;

    listItem.innerHTML = `
      <span>${item.name}</span>
      ${quantityControls.outerHTML}
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;

    cartItemsElement.appendChild(listItem);

    totalCost += item.price * item.quantity;
  });

  // Update the total cost display
  totalCostElement.textContent = totalCost.toFixed(2);
}

function changeQuantity(itemId, change) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    // Ensure quantity is not less than 1
    if (cart[itemIndex].quantity < 1) {
      cart[itemIndex].quantity = 1;
    }

    // Save updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartDisplay();
  }
}

function removeItem(itemId) {
  cart = cart.filter((item) => item.id !== itemId);

  // Save updated cart to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
}

// Call updateCartDisplay on page load to display any existing items in the cart
document.addEventListener("DOMContentLoaded", updateCartDisplay);
