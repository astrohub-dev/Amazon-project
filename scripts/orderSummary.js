import {cart} from '../data/cart.js';
import { products } from '../data/products.js';


export function updateItems() {
    const items = document.getElementById('myItems');
    let cartQuantity = 0;
   cart.forEach((item) => {
      cartQuantity += item.quantity;
     });
items.innerHTML  = `Items (${cartQuantity}):`;
    }
    
    updateItems();

export function displayCash() {
   let itemsPrice = 0;
   cart.forEach((item) => {
    const productId = item.productId;
    const quantity = Number(item.quantity);

    products.forEach((product) => {
        if(productId === product.id) {
            itemsPrice += ((product.priceCents * quantity) / 100);
        }
    })
   })

document.getElementById('myItemsCash').innerHTML = `$${(itemsPrice).toFixed(2)}`;
}

displayCash();