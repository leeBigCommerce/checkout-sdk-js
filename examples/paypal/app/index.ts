import { createCheckoutService } from '@bigcommerce/checkout-sdk';

(async () => {

    // Dom ready
    await new Promise(resolve => {
        if (document.readyState !== 'loading'){
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    });

    // Step 0: add paypal button
    document.body.innerHTML = `
        <button data-paypal-button>
            Pay
        </button>
    `;

    // Step 1: initialize an instance of the checkout service
    const service = createCheckoutService();

    // Step 1.1: 'load' the checkout??
    await service.loadCheckout();

    // Step 2: find out what payment methods this store has setup
    await service.loadPaymentMethods();

    // Step 3: tell the service that we want to be able to pay with paypal express
    await service.initializePayment({ methodId: 'paypalexpress' });

    // // Step 4: submit order
    // await service.submitOrder({
    //     payment: {}
    // });
})();
