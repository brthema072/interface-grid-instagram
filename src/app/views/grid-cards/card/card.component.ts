import { Component, Input, OnInit, AfterViewInit, OnDestroy  } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit, OnDestroy  {

  @Input() card: any;

  isHideDescription: boolean = true;

  deviceXs: boolean;
  deviceSm: boolean;
  deviceMd: boolean;
  mediaSub: Subscription;
  
  hrefCarousel = ["#one!", "#two!", "#three!", "#four!", "#five!"]
  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {

    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
      this.deviceSm = result.mqAlias === 'sm' ? true : false;
      this.deviceMd = result.mqAlias === 'md' ? true : false;
    });
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

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
}
