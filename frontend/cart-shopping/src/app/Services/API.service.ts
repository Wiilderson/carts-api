import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { CartDTO } from '../DTO/cart-history.dto';

@Injectable({
  providedIn: 'root',
})
export class APIservice {
  private API = environment.domain.api;
  private endPoint = `${this.API}/cart-history`;

  constructor(private http: HttpClient) {}

  getAllCarts(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}`);
  }
  getCartById(id: number): Observable<any> {
    return this.http.get<CartDTO[]>(`${this.endPoint}/${id}`);
  }
}
