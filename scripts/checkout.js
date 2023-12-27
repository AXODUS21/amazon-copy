let orderHTML = '';
updateItems();
cart.forEach((item) => {
    orderHTML += `
              <div class="cart-item-container" >
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${item.productImg}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${item.productName}
                </div>
                <div class="product-price">
                  $${((item.productPrice / 100) * `${item.quantity}`).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <input type="text" class="quantity-label quantity-label-${item.productId}" data-quantity-label-id="${item.productId}" value="${item.quantity}" disabled></input>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;

    document.querySelector('.order-summary')
    .innerHTML = orderHTML;

    let cartQuantityUpdator = false;

    // I need to get the specific value or class of the Quantity Label
    // Mark it so that It can be later used for the button
    // also figure out why the eventListener is only working once
    document.querySelectorAll(".update-quantity-link")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const quantityId = document.querySelector(".quantity-label").dataset.quantityLabelId;
        
        let quantityLabel = document.querySelector(`.quantity-label`)
        if (cartQuantityUpdator === false) {
          quantityLabel.value = item.quantity;
          quantityLabel.setAttribute("type", "number");
          quantityLabel.removeAttribute("disabled");
          document.querySelector(".update-quantity-link").innerText = "Save";
          cartQuantityUpdator = true;
        } else if (cartQuantityUpdator === true) {
          quantityLabel.setAttribute("type", "text");
          quantityLabel.setAttribute("disabled", "");
          document.querySelector(".update-quantity-link").innerText = "Update";
        }
        console.log(quantityLabel);
        console.log(button)
      });
    });

});

  function updateItems() {
    document.querySelector(".return-to-home-link")
    .innerText = `${cartQuantity} items`;
  }


      
