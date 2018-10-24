import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/Operators';

import { ICustomer, IOrder } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  baseUrl: string = 'assets/';

  constructor(private http: HttpClient) { }
  
  getCustomers() : Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
      .pipe(
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomer(id: number) : Observable<ICustomer> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
      .pipe(
        map(customers => {
          let customer = customers.filter((cust: ICustomer) => cust.id === id);
          return (customer && customer.length) ? customer[0] : null;
        }),

        catchError(this.handleError<ICustomer>('getCustomer id=${id}'))
      );
  }

  getOrders(id: number) : Observable<IOrder[]> {
      return this.http.get<IOrder[]>(this.baseUrl + 'orders.json')
        .pipe(
          map(orders => {
            let custOrders = orders.filter((order: IOrder) => order.customerId === id);
            return custOrders;
          }) // ,
          // catchError(this.orderError)
        );
    }

  private orderError(error: any) {
  	console.error('Server error: ', error);
  	if (error.error instanceof Error) {
  		const errorMessage = error.error.message;
  		return Observable.throw(errorMessage)
  	}

  	return Observable.throw(error) || 'Node.js Server Error';
  }

  private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    } 
}
