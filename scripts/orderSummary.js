import {cart} from '../data/cart.js';
import { products } from '../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js';
import {renderOrderSummary} from './checkout.js';
import { addOrder } from '../data/orders.js';

export function displayCash() {

    let cartQuantity = 0;
    cart.forEach((item) => {
       cartQuantity += item.quantity;
      });
      
   let itemsPrice = 0;
   let shippingPrice = 0;

   cart.forEach((item) => {
    const productId = item.productId;
    const quantity = Number(item.quantity);

    products.forEach((product) => {
        if(productId === product.id) {
            itemsPrice += ((product.priceCents * quantity) / 100);
        }
    })

    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPrice += (deliveryOption.priceCents / 100);
    });

    const totalBeforeTax = itemsPrice + shippingPrice;

    const estimatedTax = totalBeforeTax * 0.1;

    const orderTotal = totalBeforeTax + estimatedTax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${(itemsPrice).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPrice).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTax).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(estimatedTax).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(orderTotal).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
       try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    cart: cart
                })
            })

            const order = await response.json();
            addOrder(order);
       
       } catch (error) {
        console.log('unexpected error. Please try again later.');
      }
       
      window.location.href = 'orders.html'

    });
}

displayCash();
