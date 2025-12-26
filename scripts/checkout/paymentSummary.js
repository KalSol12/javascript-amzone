import { cart } from '../../data/cart.js'
import { getProduct } from '../../data/products.js';
import {  getDeliveryOption} from "../../data/deliveryOption.js";
import { formatCurrency } from '../utils.js';
//  import { getProduct } from "../data/products.js";


export function rederpaymentSummary() {
    let productCentPrice=0;
    let ShippingProductCent=0;
   cart.forEach((cartItem) => {

        const product=getProduct(cartItem.productId);
        productCentPrice+=product.priceCents*cartItem.quantity;

         const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);

      ShippingProductCent+=deliveryOption.priceCent;
         

    
   });
   const totalBeforeTaxCent=productCentPrice+ShippingProductCent;
   const taxcent=totalBeforeTaxCent*0.1;
   const totalCent=totalBeforeTaxCent+taxcent;


    const paymentSummaryHtml=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${formatCurrency(productCentPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(ShippingProductCent)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(totalBeforeTaxCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxcent)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${totalCent}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHtml;

    
   

    
}
rederpaymentSummary();