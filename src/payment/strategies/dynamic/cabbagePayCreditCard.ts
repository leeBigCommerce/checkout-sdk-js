import { DynamicPaymentMethod } from './dynamicPaymentMethod';

// Should billing address be handled here?!? - Arguably it is part of the Payment's domain
// and some provider's methods do mess with it

// Plus, it's not really right to be part of a Draft Order, which exists pre-payment

export const cabbagePayCreditCard: DynamicPaymentMethod = ({
    // draftOrderID,
    container,
}) => {
    // console.log('cabbagePayCreditCard mounting');

    const userInput = document.createElement('input');
    userInput.placeholder = 'Enter 4321 here';

    const pay = (): Promise<void> => {
        // console.log('cabbagePayCreditCard paying', draftOrderID, container);

        return new Promise((resolve, reject) => {
            if (userInput.value === '4321') {
                resolve();
            } else {
                reject();
            }
        });
    };

    container.appendChild(userInput);

    // console.log('cabbagePayCreditCard mounted');

    return Promise.resolve({ pay });
};
