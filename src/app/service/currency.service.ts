import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyResponse, CurrencyDto } from '../model/currencyModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencyList(): Observable<String[]> {
    return this.http.get<String[]>(environment.apiUrl + "/getCurrencyList");
  }
  calculateExchange(currencyDto: CurrencyDto): Observable<CurrencyResponse> {
    return this.http.post<CurrencyResponse>(environment.apiUrl + "/getExchangeCurrency", currencyDto);
  }
}
