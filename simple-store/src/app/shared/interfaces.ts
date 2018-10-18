export class ICustomer {
	id: number;
	name: string;
	city: string;
	customerSince: any;
}

export class IOrder {
	customerId: number;
	orderItems: IOrderItem[];
}

export class IOrderItem {
	id: number;
	productive: string;
	itemCost: number;
}
