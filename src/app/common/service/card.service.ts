import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = "http://localhost/interface-instagram/";
  // apiUrl = "http://localhost:8080/";

  // headers = { headers: new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json' 
  // })}

  headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}

  constructor(private httpClient: HttpClient) { }

  postCard(card: Card){
    console.log(card)
    return this.httpClient.post(`${this.apiUrl}`, card, this.headers);
  }

  getCards(): Observable<Card[]>{
    return this.httpClient.get<Card[]>(`${this.apiUrl}`);
  }

}
