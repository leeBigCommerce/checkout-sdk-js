import { DynamicPaymentMethod } from './dynamicPaymentMethod';

export const cabbagePayCreditCard: DynamicPaymentMethod = ({
        // draftOrderID,
        container,
        disableSubmission,
        enableSubmission,
    }) => {
        // console.log('cabbagePayCreditCard mounting');

        const userInput = document.createElement('input');
        const pay = (): Promise<void> => {
            // console.log('cabbagePayCreditCard paying', draftOrderID, container);

            return new Promise((resolve, reject) => {
                if (userInput.value === '1234') {
                    resolve();
                } else {
                    reject();
                }
            });
        };

        userInput.placeholder = 'Enter 1234 here';
        userInput.addEventListener('change', () => {
            if (userInput.value) {
                enableSubmission();
            } else {
                disableSubmission();
            }
        });

        container.appendChild(userInput);

        // console.log('cabbagePayCreditCard mounted');

        return Promise.resolve({ pay });
    };
