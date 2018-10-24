import { OrdersRoutingModule } from './orders-routing.module';

describe('OrdersRoutingModule', () => {
  let ordersRoutingModule: OrdersRoutingModule;

  beforeEach(() => {
    ordersRoutingModule = new OrdersRoutingModule();
  });

  it('should create an instance', () => {
    expect(ordersRoutingModule).toBeTruthy();
  });
});
