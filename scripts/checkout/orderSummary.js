import { cart, removeFromCart, updateCartQuatity, updateQuantity, updateDeliveryoption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";

import { formatCurrency } from "../utils.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; console.log(dayjs().format());
import { deliveryOptions,getDeliveryOption} from "../../data/deliveryOption.js";



export function renderOrderSummery(){
const orderSummery=document.querySelector('.js-order-summery');
let orderSummeryHTML = '';
 document.querySelector('.js-return-to-home-link').innerHTML=updateCartQuatity();

   
    // Recursive function to build order summary HTML
    function buildOrderSummary(cart, index) {
      if (index >= cart.length) {
        return '';
      }

      const cartItem = cart[index];
     
      const productId = cartItem.productId;
       const matchingItem=getProduct(productId);


      // Find matching product (keeping simple for now, could be recursive)
    

      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption=getDeliveryOption(deliveryOptionId);

      

      let today = dayjs();
      const deliveryDay = today.add(deliveryOption.deliveryDay, 'day');
      const datString = deliveryDay.format('dddd MMMM D');

      const itemHTML = `
        <div class="cart-item-container js-item-container${matchingItem.id}" data-product-id="${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: ${datString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name">
               ${matchingItem.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingItem.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingItem.id}">
                  Update
                </span>

                <input class="quantity-input js-quantity-input" type="number">
                <span class="save-quantity-link link-primary js-save-link">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>

              ${deliveryOptionFun(matchingItem, cartItem)}

            </div>
          </div>
        </div>
      `;

      // Recurse for the next item
      return itemHTML + buildOrderSummary(cart, index + 1);
    }

    // Build the HTML using recursion
    orderSummeryHTML = buildOrderSummary(cart, 0);




function deliveryOptionFun(matchingItem, cartItem) {
  // Recursive function to build delivery options HTML
  function buildDeliveryOptions(options, index) {
    if (index >= options.length) {
      return '';
    }

    const deliveryOption = options[index];
    const isChecked = cartItem.deliveryOptionId == deliveryOption.id;

    const today = dayjs();
    const deliveryDay = today.add(deliveryOption.deliveryDay, 'day');
    const datString = deliveryDay.format('dddd MMMM D');
    const priceString = deliveryOption.priceCent === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCent)} - `;

    const optionHTML = `
      <div class="delivery-option js-delivery-option"
        data-product-id='${matchingItem.id}'
        data-option-id='${deliveryOption.id}'>
        <input type="radio"
          class="delivery-option-input"
          value="${deliveryOption.id}"
          ${isChecked ? 'checked' : ''}
          name="delivery-option-${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
           ${datString}
          </div>
          <div class="delivery-option-price">
           ${priceString} Shipping
          </div>
        </div>
      </div>
    `;

    // Recurse for the next option
    return optionHTML + buildDeliveryOptions(options, index + 1);
  }

  return buildDeliveryOptions(deliveryOptions, 0);
}

orderSummery.innerHTML = orderSummeryHTML;

  

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeFromCart(productId)


    let container=document.querySelector(`.js-item-container${productId}`);
    container.remove();
    document.querySelector('.js-return-to-home-link').innerHTML=updateCartQuatity();
  })


});
 

document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const cartItemContainer =
      link.closest('.cart-item-container');

    cartItemContainer.classList.add('is-editing-quantity');

    const quantityLabel = cartItemContainer.querySelector('.quantity-label');
    const input = cartItemContainer.querySelector('.js-quantity-input');
    input.value = quantityLabel.innerHTML;

  })


});





document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const cartItemContainer =
      link.closest('.cart-item-container');

    const input =
      cartItemContainer.querySelector('.js-quantity-input');

    const newQuantity = Number(input.value);

    if (newQuantity < 0 || newQuantity >= 1000) return;

    const productId =
      cartItemContainer.dataset.productId;

    updateQuantity(productId, newQuantity);

    const quantityLabel = cartItemContainer.querySelector('.quantity-label');
    quantityLabel.innerHTML = newQuantity;

    document.querySelector('.js-return-to-home-link').innerHTML = updateCartQuatity();

    cartItemContainer.classList.remove('is-editing-quantity');
  });
});

document.querySelectorAll('.js-quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const cartItemContainer = input.closest('.cart-item-container');
      const saveLink = cartItemContainer.querySelector('.js-save-link');
      saveLink.click();
    }
  });
});


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId, optionId} = element.dataset;
    updateDeliveryoption(productId, optionId);
    renderOrderSummery();

    // Update the delivery date in the UI
    // const cartItemContainer = element.closest('.cart-item-container');
    // const deliveryDateElement = cartItemContainer.querySelector('.delivery-date');

    // let deliveryOption;
    // deliveryOptions.forEach((option)=>{
    //   if (option.id === optionId) {
    //     deliveryOption = option;
    //   }
    // });

    // const today = dayjs();
    // const deliveryDay = today.add(deliveryOption.deliveryDay, 'day');
    // const dateString = deliveryDay.format('dddd MMMM D');
    // deliveryDateElement.innerHTML = `Delivery date: ${dateString}`;
  });
});

}