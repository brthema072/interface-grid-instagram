import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: any;

  isHideDescription: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  hideDescription(): void{
    this.isHideDescription = !this.isHideDescription;
  }
}
