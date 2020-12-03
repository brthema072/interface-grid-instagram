import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/common/model/card';
import { Image } from 'src/app/common/model/image';
import { CardService } from 'src/app/common/service/card.service';

@Component({
  selector: 'app-grid-cards',
  templateUrl: './grid-cards.component.html',
  styleUrls: ['./grid-cards.component.css']
})
export class GridCardsComponent implements OnInit {

  listCards: Array<any> =[
    {title: "Card Title", images: ["assets/sample-1.jpg"], description: "😚 I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."},
    {title: "Card Title", images: ["assets/sample-2.jpg", "assets/sample-1.jpg"], description: "😚 I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."},
    {title: "Card Title", images: ["assets/sample-1.jpg", "assets/sample-1.jpg"], description: "😚 I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."},
    {title: "Card Title", images: ["assets/sample-2.jpg", "assets/sample-1.jpg"], description: "😚 I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."},
    {title: "Card Title", images: ["assets/sample-1.jpg", "assets/sample-1.jpg"], description: "😚 I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively."},
  ]

  cards = [];
  images = [];
  
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCards().subscribe((res: any)=>{
      for(let i = 0; i < res.length; i++){
        // for(let j = 0; j < this.images.length; j++){
        //   console.log(this.images[j].cardId)
        // }
        this.cards.push({
          title: res[i].titulo,
          description: res[i].descricao,
          date: res[i].data,
          images: this.images
        })
      }
      

    },(err)=>{
      console.log(err);
    });

    this.cardService.getImages().subscribe((res: any)=>{
      for(let i = 0; i < res.length; i++){
        this.images.push({url: res[i].url, cardId: res[i].card_id})
      }
    },(err)=>{
      console.log(err);
    });
  }

}
