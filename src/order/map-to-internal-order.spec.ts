import { getCompleteOrder as getInternalOrder } from './internal-orders.mock';
import mapToInternalOrder from './map-to-internal-order';
import { getOrder } from './orders.mock';

describe('mapToInternalOrder()', () => {
    it('maps to internal line items', () => {
        expect(mapToInternalOrder(getOrder(), getInternalOrder()))
            .toEqual(getInternalOrder());
    });
});
