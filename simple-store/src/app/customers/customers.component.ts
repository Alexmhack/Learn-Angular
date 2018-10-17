import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  title: string;
  people: any[];

  constructor() { }

  ngOnInit() {
  	this.title = "Customers";

  	// customers data
  	this.people = [
  	  { id: 1, name: 'john Doe', city: 'Phoenix', orderTotal: 9.99, customerSince: new Date(2014, 7, 10) },
  	  { id: 2, name: 'Alex Hopper', city: 'Chandler', orderTotal: 19.99, customerSince: new Date(2017, 2, 22) },
  	  { id: 3, name: 'Michelle Thomas', city: 'Seattle', orderTotal: 99.49, customerSince: new Date(2016, 12, 31) },
  	  { id: 4, name: 'Ethan Hunt', city: 'Arizona', orderTotal: 119.99, customerSince: new Date(2011, 10, 15) },
  	  { id: 5, name: 'Chris Beckard', city: 'Las Vegas', orderTotal: 50, customerSince: new Date(2018, 9, 10) },
  	  { id: 6, name: 'Tony Stark', city: 'New Jersey', orderTotal: 67.33, customerSince: new Date(2015, 2, 3) },
  	  { id: 7, name: 'Steve Dunkirk', city: 'New York', orderTotal: 45.50, customerSince: new Date(2008, 7, 24) },
  	  { id: 8, name: 'Mark Gabriela', city: 'Sahara', orderTotal: 12.99, customerSince: new Date(2013, 4, 15) },
  	]
  }

}
