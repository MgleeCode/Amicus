console.log("Script is running!");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("slide");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000);
}

function changeSlide(n) {
  slideIndex += n;
  const slides = document.getElementsByClassName("slide");

  if (slideIndex > slides.length) {
    slideIndex = 1;
  } else if (slideIndex < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", showSlides);
function proceedToComplete() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items before proceeding.");
  } else {
    localStorage.removeItem("cart");
    window.location.href = "complete.html";
  }
}

function addToCart(itemId) {
  const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);
  const item = {
    id: itemId,
    name: itemElement.dataset.itemName,
    price: parseFloat(itemElement.dataset.itemPrice),
    quantity: 1,
  };

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalCostElement = document.getElementById("total-cost");

  cartItemsElement.innerHTML = "";

  let totalCost = 0;
  cart.forEach((item) => {
    const listItem = document.createElement("li");

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
  totalCostElement.textContent = totalCost.toFixed(2);
}

function changeQuantity(itemId, change) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity < 1) {
      cart[itemIndex].quantity = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartDisplay();
  }
}

function removeItem(itemId) {
  cart = cart.filter((item) => item.id !== itemId);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
}

document.addEventListener("DOMContentLoaded", updateCartDisplay);
