export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('myCart'));

    if(!cart) {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 0,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 0,
            deliveryOptionId: '2'
        }];
    }
} 

export function saveToStorage() {
localStorage.setItem('myCart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const selected = document.querySelector(`.select-${productId}`).value;

    let matchingItem;
    cart.forEach((item) => {
        if(productId === item.productId) {
            matchingItem = item;
        }
    });

        if(matchingItem) {
            matchingItem.quantity += Number(selected);
        }

        else {
            cart.push({
            productId: productId,
            quantity: Number(selected),
            deliveryOptionId: '1'
            });
        }
        
        saveToStorage();
        document.querySelector(`.select-${productId}`).value = '1';
}

export function removefromCart(productId) {
    let newCart = [];
    cart.forEach((item) => {
        if(productId !== item.productId) {
            newCart.push(item);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    saveToStorage();
};

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        fun()
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}

async function loadCartFetch() {
    try{
        const response = await fetch('https://supersimplebackend.dev/cart');
        const text = await response.text();
        console.log(text);
        return text;
    } catch(error) {
        console.log('Unexpected error occured')
    }
}

loadCartFetch();