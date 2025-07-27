import { orders } from "../data/orders";
import { loadProductsFetch, products } from "../data/products";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


async function loadPage() {
    await loadProductsFetch();

    let ordersHTML = '';
    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');
        
        ordersHTML += `
            <div class="order-container">
                
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderTimeString}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${order.totalCostCent}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${productsListHTML(order)}
                </div>
            </div>
        `
    });

    function productsListHTML(order) {
        let productsListHTML ='';

        order.products.forEach((productsDetails) = {
            const product = getProduct(productsDetails.productId)
        })
    }
}
