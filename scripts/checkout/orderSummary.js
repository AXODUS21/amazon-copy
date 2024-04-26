import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // EMS version of a library (so you don't have to use a script tag)
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


let dayToday = dayjs();

const deliveryDate = dayToday.add(7, "days"); // first paramiter is the ammount the second one is the label ("can be years, hours, days, etc")
console.log(deliveryDate.format("dddd, MMMM D")); // tells dayjs what kind of format we want the date to be in :)

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productID = cartItem.productId;

    const matchingProduct = getProduct(productID)

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId)
  

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
          <div class="cart-item-container
          js-cart-item-container-${matchingProduct.id}" >
              <div class="delivery-date">   
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${(matchingProduct.priceCents / 100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartItem.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productID = link.dataset.productId;
      removeFromCart(productID);
      const container = document.querySelector(
        `.js-cart-item-container-${productID}`
      );

      container.remove();

      renderPaymentSummary();
    });
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((option) => {
      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays, "days");

      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        option.priceCents === 0
          ? "FREE"
          : `$${(option.priceCents / 100).toFixed(2)} - `;

      const isChecked = option.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${option.id}"
          >
          <input type="radio" 
          ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
  `;
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

