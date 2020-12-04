import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../model/card';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = "http://localhost/interface-instagram/";
  // apiUrl = "http://localhost:8080/";

  headersApi = { headers: new HttpHeaders(
    { 'Content-Type': 'application/json',
      'Accept': 'application/json' 
    }),
    'response': 'json'
  };

  constructor(private httpClient: HttpClient) { }

  postCard(card: Card){
    return this.httpClient.post(`${this.apiUrl}`, card, this.headersApi);
  }

  postImage(formData: any){
    return this.httpClient.post(`${this.apiUrl}updload_file/`, formData);    
  }

  getCards(): Observable<Card[]>{
    return this.httpClient.get<Card[]>(`${this.apiUrl}/getCards.php`);
  }

  getImagesByCardId(cardId: any): Observable<Image[]>{
    return this.httpClient.get<Image[]>(`${this.apiUrl}/getImages.php?cardId=${cardId}`);
  }

}
