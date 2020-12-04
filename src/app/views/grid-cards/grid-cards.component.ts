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

  isLoad: boolean = true;
  
  constructor(private cardService: CardService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.cardService.getCards().subscribe((card: any)=>{
        for(let i = 0; i < card.length; i++){
          // console.log(card[i].id)
          
          this.cardService.getImagesByCardId(card[i].id).subscribe((image: any)=>{
  
            this.cards.push({
              title: card[i].titulo,
              description: card[i].descricao,
              date: card[i].data,
              images: image
            })
  
          },(err)=>{
            console.log(err);
          });
        } 
        // console.log(this.cards)
      },(err)=>{
        console.log(err);
      });

      this.isLoad = false;

    }, 2000);
    
  }

}
