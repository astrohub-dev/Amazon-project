import {cart, removefromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { updateItems, displayCash } from './orderSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
//study dayjs documentation
//also research javascript external libraries
function displayDate(addDay) {
  const date = dayjs();
  const increaseDate = date.add(addDay, 'day');
  const deliveryDate = increaseDate.format('dddd, MMMM D, YYYY');
  
  return deliveryDate;
}

let checkoutHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });


    const deliveryOptionsId = cartItem.deliveryOptionsId

    let option;
    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOptionsId === deliveryOption.id) {
        option = deliveryOption;
      }
    });

    const dateString = displayDate(option.deliveryDays); 

    checkoutHTML += `
 <div class="cart-item-container" id="container-${matchingProduct.id}">
            <div class="delivery-date" id="theDate">
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
                    Quantity: <span class="quantity-label theQuantity" id="theQuantity-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary theButton" id="myLink1" data-product-id="${matchingProduct.id}">
                    <button>Update Quantity</button>
                  </span>
                    <select class="displayQ myUpdate" data-product-id="${matchingProduct.id}" id="select-${matchingProduct.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                    <span class="displayQ saveQ link-primary" data-product-id="${matchingProduct.id}"><button>Save</button></span>
                  <span class="delete-quantity-link link-primary" id="myLink" data-product-id="${matchingProduct.id}">
                    <button>Delete</button>
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>
`;
});
document.getElementById('mycontainer2').innerHTML = checkoutHTML;

function deliveryOptionsHTML(matchingProduct) {
  let HTML = '';
  
  deliveryOptions.forEach((deliveryOption) => {

    const dateString = displayDate(deliveryOption.deliveryDays);

    const priceString = deliveryOption.priceCents === 0
    ?'FREE'
    :`$${deliveryOption.priceCents / 100}`;

    const isChecked = deliveryOption.priceCents === 0;

    HTML +=
    `
       <div class="delivery-option">
                  <input ${isChecked ?'checked' :''} type="radio" 
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date option" id="option3">${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
    `
  })
  return HTML;
}

document.querySelectorAll('#myLink').forEach((link) => {
  link.onclick = function () {
    const {productId} = link.dataset;
    removefromCart(productId);
    updateCartQuantity();
    updateItems();
    displayCash();

    const container = document.getElementById(`container-${productId}`);
    container.remove();
  }
})

const text = document.getElementById('myCheck');
function updateCartQuantity() {
    let cartQuantity = 0;
   cart.forEach((item) => {
      cartQuantity += item.quantity;
     });
text.innerHTML  = `${cartQuantity} items`;
    }

    updateCartQuantity();

    document.querySelectorAll('#myLink1').forEach((link) => {
      link.onclick = function () {
        const {productId} = link.dataset;
        document.getElementById(`container-${productId}`).classList.add('is-editing-quantity');
      }
    })

    document.querySelectorAll('.saveQ').forEach((button) => {
      button.onclick = function () {
        const {productId} = button.dataset;
        document.getElementById(`container-${productId}`).classList.remove('is-editing-quantity');

        const selected = document.getElementById(`select-${productId}`);
        const newQuantity = Number(selected.value);
        updateQuantity(productId, newQuantity);
        
        document.getElementById(`theQuantity-${productId}`).innerHTML = newQuantity;

        updateCartQuantity();
        updateItems();
        displayCash();
      }
    });