import merge from 'lodash.merge';
import { getPaypalExpress } from '../../../src/payment/payment-methods.mock';
import { getConfig } from '../../../src/config/configs.mock';
import { getCheckout } from '../../../src/checkout/checkouts.mock';

describe('Title of general use case here', () => {
    it('exposes createCheckoutService against the window', () => {

        // TODO: find better home
        // TODO: wouldn't this be nice if it were a real store?
        cy.server();
        cy.route({
            method: 'GET',
            url: '/api/storefront/payments',
            response: [merge(getPaypalExpress(), { config: { testMode: true } })]
        });
        cy.route({
            method: 'GET',
            url: '/api/storefront/checkout-settings',
            response: getConfig()
        });

        cy.route({
            method: 'GET',
            url: new RegExp('/api/storefront/checkout/6a6071cc-82ba-45aa-adb0-ebec42d6ff6f'),
            response: getCheckout()
        });
       

        // TODO: get url from webpack config?
        cy.visit('https://localhost:9000/');
        
        cy.window().then(() => {
            // Dummy assertion
            expect(false).to.not.equal(false);
        });
    });
});
