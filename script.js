// Load cart items from Local Storage on page load
window.onload = function () {
  loadCart();
};

function addToCart(itemId) {
  var selectedItem = document.querySelector(`[data-item-id="${itemId}"]`);
  var cartItem = createCartItem(selectedItem);
  console.log("cart-items", document.getElementById("cart-items"));
  document.getElementById("cart-items").appendChild(cartItem);
  saveCart();
}

function removeCartItem(itemId) {
  var cartItem = document.querySelector(
    `#cart-items [data-item-id="${itemId}"]`
  );

  if (cartItem) {
    cartItem.remove();
    saveCart();
  } else {
    console.log(`Cart item with itemId ${itemId} not found.`);
  }
}

function createCartItem(selectedItem) {
  var cartItem = document.createElement("li");
  cartItem.textContent = selectedItem.querySelector("h3").textContent;

  var removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.onclick = function () {
    removeCartItem(cartItem);
  };

  cartItem.appendChild(removeButton);
  return cartItem;
}

function saveCart() {
  var cartItems = document.getElementById("cart-items").innerHTML;
  localStorage.setItem("cartItems", cartItems);
}

function loadCart() {
  var cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    document.getElementById("cart-items").innerHTML = cartItems;
  }
}
/*----------------------------------------------------------------*/
let slideIndex = 0;

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  console.log("slideIndex", slideIndex);
  console.log("slides", slides[0]);
  slides[slideIndex - 1].style.display = "block";
  console.log("dots", dots[0]);
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 2000); // Change slide every 2 seconds
}

document.addEventListener("DOMContentLoaded", function () {
  showSlides();
});
