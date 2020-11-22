import { CheckoutStore, InternalCheckoutSelectors } from '../../../checkout';
import { OrderActionCreator, OrderRequestBody } from '../../../order';
import { PaymentRequestOptions } from '../../payment-request-options';
import PaymentStrategy from '../payment-strategy';

import { cabbagePayCreditCard } from './cabbagePayCreditCard';

export default class DynamicPaymentStrategy implements PaymentStrategy {
    // In reality, taken from a dynamic import
    _setupPaymentMethod = cabbagePayCreditCard;

    constructor(
        protected _store: CheckoutStore,
        protected _orderActionCreator: OrderActionCreator
    ) {
        // In reality, taken from a dynamic import
        this._setupPaymentMethod = cabbagePayCreditCard;
    }

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
        const { container, enableSubmission, disableSubmission } = options;
        const methodProps = {
            draftOrderID: 'ID of the draft order from somewhere',
            container,
            enableSubmission,
            disableSubmission,
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
