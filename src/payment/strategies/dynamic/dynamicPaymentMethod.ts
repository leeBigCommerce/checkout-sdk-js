interface PaymentMethodProps {
    draftOrderID: string;
    container: HTMLElement;
    enableSubmission(): void;
    disableSubmission(): void;
}

interface PaymentMethodPayload {
    pay(): Promise<void>;
    unmount?(): Promise<void>;
}

export type DynamicPaymentMethod = (props: PaymentMethodProps) => Promise<PaymentMethodPayload>;
