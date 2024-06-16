export const cart = [];

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
}