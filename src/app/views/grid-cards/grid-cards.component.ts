import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
