export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 0
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 0
}];

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
            quantity: Number(selected)
            });
        }
        document.querySelector(`.select-${productId}`).value = '1';
}