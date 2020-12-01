import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray  } from '@angular/forms';
import { Card } from 'src/app/common/model/card';
import { CardService } from 'src/app/common/service/card.service';
declare var $: any;

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private cardService: CardService) { }

  formCard = this.fb.group({
    title: ['', [Validators.required]],
    images: this.fb.array([]),
    description: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  images = this.formCard.get('images') as FormArray;

  ngOnInit(): void {
    $(document).ready(function(){
      $('.datepicker').datepicker();
    });

    this.getCard();
  }

  getCard(){
    this.cardService.getCards().subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
  }

  addImages(){
    this.images.push(
      this.fb.group({url: ['', [Validators.required]]})
    );
  }

  clearImages(){
    this.images.removeAt(this.images.length-1)
  }

  onSubmitCard(){
    this.checkPicker();

    if(this.formCard.value.images.length >= 1){
      for(let i = 0; i< this.formCard.value.images.length; i++){
        if(this.formCard.value.images[i].url == ""){
          
          this.formCard.value.images.splice(i,this.formCard.value.images.length)
        }
        
      }
    }

    let newCard: Card;

    newCard = {
      tittle: this.formCard.value.title,
      description: this.formCard.value.description,
      images: this.formCard.value.images,
      date: this.formCard.value.date
    };

    console.log(newCard);

    // console.log(this.formCard.value)
  }

  checkPicker(){
    if($('.datepicker').val() != undefined){
      this.formCard.value.date = $('.datepicker').val();
    }
    
    // console.log(console.log($('.datepicker').val()));
  }
}