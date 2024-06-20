export let cart = JSON.parse(localStorage.getItem('myCart'));

/*if(!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 0
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 0
    }];
} */

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