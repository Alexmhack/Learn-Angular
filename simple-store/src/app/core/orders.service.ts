import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/Operators';

import { IOrderItem } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl: string = 'assets/';

  constructor(private http: HttpClient) { }

}
