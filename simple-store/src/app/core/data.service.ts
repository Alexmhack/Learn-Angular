import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/Operators';

import { ICustomer, IOrder } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  baseUrl: string = 'assets/';

  constructor() { }

  private handleError(error: any) {
  	console.error('Server error: ', error);
	if (error.error instanceof Error) {
		const errorMessage = error.error.message;
		return Observable.throw(errorMessage)
	}

	return Observable.throw(error) || 'Node.js Server Error';
  }
}
