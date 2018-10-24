import { Component, OnInit } from '@angular/core';

import { ICustomer } from '../../shared/interfaces';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
})
export class CustomersListComponent implements OnInit {

  filteredCustomers: ICustomer[] = [];
  customersOrderTotal: number;
  currencyCode: string = 'USD';

  constructor() { }

  ngOnInit() {

  }

  // calculates the order total of filtered customers
  calculateOrders() {
  	this.customersOrderTotal = 0;
  	this.filteredCustomers.forEach((cust: ICustomer) => {
  		this.customersOrderTotal += cust.orderTotal;
  	})
  }

  sort(prop: string) {
    // a sorting service will handle customer sorting
  }

}
