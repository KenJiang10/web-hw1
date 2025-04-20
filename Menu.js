document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".order-button");
    const cartCount = document.getElementById("cart-count");
  
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartCount) cartCount.innerText = cart.length;
    }
  
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".menu-card");
  
        const item = {
          name: card.querySelector("h3").innerText,
          price: card.querySelector(".price").innerText,
          image: card.querySelector("img").src
        };
  
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      });
    });
  
    updateCartCount(); // Run on page load
  });