import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44326/api/"

  constructor(private httpClient: HttpClient) { }

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel> {
    let newPath = this.apiUrl + "/payments/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}
