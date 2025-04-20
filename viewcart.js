document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart-button");
    const cartCount = document.getElementById("cart-count"); // In case you show count in header
  
    function updateCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartItemsContainer.innerHTML = "";
      let total = 0;
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      }
  
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
  
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
          <div class="cart-info">
            <h4>${item.name}</h4>
            <p>${item.price}</p>
            <button class="remove-button" data-index="${index}">Remove</button>
          </div>
        `;
  
        cartItemsContainer.appendChild(itemDiv);
        total += parseFloat(item.price.replace("$", ""));
      });
  
      totalPriceEl.innerText = `$${total.toFixed(2)}`;
      if (cartCount) cartCount.innerText = cart.length;
  
      document.querySelectorAll(".remove-button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = parseInt(e.target.dataset.index);
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart(); // refresh UI
        });
      });
    }
  
    if (clearCartButton) {
      clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        updateCart();
      });
    }
  
    updateCart(); // Initial render
  });
  