import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = "http://localhost/interface-instagram/";

  headers = { headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json' 
  })}

  constructor(private httpClient: HttpClient) { }

  postCard(card: Card): Observable<Card>{
    return this.httpClient.post<Card>(this.apiUrl, JSON.stringify(card), this.headers);
  }

  getCards(): Observable<Card[]>{
    return this.httpClient.get<Card[]>(this.apiUrl, this.headers);
  }

}
