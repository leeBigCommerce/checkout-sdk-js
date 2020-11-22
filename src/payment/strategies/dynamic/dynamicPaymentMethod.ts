interface Props {
    draftOrderID: string;
    container: HTMLElement;
}

interface Payload {
    pay(): Promise<void>;
    unmount?(): Promise<void>;
}

export type DynamicPaymentMethod = (props: Props) => Promise<Payload>;
