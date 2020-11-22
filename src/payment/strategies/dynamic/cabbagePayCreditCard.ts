import { DynamicPaymentMethod } from './dynamicPaymentMethod';

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
