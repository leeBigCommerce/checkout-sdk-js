import { CheckoutStore, InternalCheckoutSelectors } from '../../../checkout';
import { OrderActionCreator, OrderRequestBody } from '../../../order';
import { PaymentRequestOptions } from '../../payment-request-options';
import PaymentStrategy from '../payment-strategy';

import { cabbagePayCreditCard } from './cabbagePayCreditCard';

// DynamicPaymentStrategy crudely acts as a boundary between checkout
// and ANY possible payment method

// e.g. cabbagePayCreditCard should be directly substitutable with any other
// and checkout-js/sdk would neither know nor care

export default class DynamicPaymentStrategy implements PaymentStrategy {
    // In reality, taken from a dynamic import e.g
    // As a result of the user's selection of Cabbage Pay's Credit Card method
    // we know to load the `cabbagePayCreditCard.js`
    // and that its signature conforms to the type within `dynamicPaymentMethod.ts`
    // just as any other payment provider's method would
    _setupPaymentMethod = cabbagePayCreditCard;

    constructor(
        protected _store: CheckoutStore,
        protected _orderActionCreator: OrderActionCreator
    ) { }

    // will be overwritten by the return of _setupPaymentMethod()
    _deinitialize = () => {
        // console.log('Optional unmount not set');

        return Promise.resolve();
    };

    // will be overwritten by the return of _setupPaymentMethod()
    _pay = (): Promise<void> => {
        // console.log('Mandatory pay not set');

        return Promise.reject();
    };

    execute(payload: OrderRequestBody, options?: PaymentRequestOptions): Promise<InternalCheckoutSelectors> {
        // console.log('Dynamic strategy executed!');
        const { payment, ...order } = payload;

        return this._pay().then(() => this._store.dispatch(this._orderActionCreator.submitOrder(order, options)));
    }

    finalize() {
        // console.log('Dynamic strategy finalized!');

        return Promise.resolve(this._store.getState());
    }

    initialize(options: any) {
        const { container } = options;
        const methodProps = {
            draftOrderID: 'ID of the draft order from somewhere',
            container,
        };

        return this._setupPaymentMethod(methodProps).then(
            ({ pay, unmount }) => {
                this._pay = pay;

                if (unmount) {
                    this._deinitialize = unmount;
                }

                return Promise.resolve(this._store.getState());
            }
        );
    }

    deinitialize() {
        return this._deinitialize().then(
            () => Promise.resolve(this._store.getState())
        );
    }
}
