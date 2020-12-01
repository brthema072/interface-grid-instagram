import { Component, Input, OnInit, AfterViewInit  } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit  {

  @Input() card: any;

  isHideDescription: boolean = true;

  hrefCarousel = ["#one!", "#two!", "#three!", "#four!", "#five!"]
  constructor() { }

  ngOnInit(): void {
    console.log(this.card.images)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });
    }, 100);
  }


  hideDescription(): void{
    this.isHideDescription = !this.isHideDescription;
  }
}
