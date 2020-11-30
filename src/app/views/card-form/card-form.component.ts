import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray  } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    $(document).ready(function(){
      $('.datepicker').datepicker();
    });
  }

  formCard = this.fb.group({
    title: ['', [Validators.required]],
    images: this.fb.array([]),
    description: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  images = this.formCard.get('images') as FormArray;

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


    console.log(this.formCard.value)
  }

  checkPicker(){
    if($('.datepicker').val() != undefined){
      this.formCard.value.date = $('.datepicker').val();
    }
    
    // console.log(console.log($('.datepicker').val()));
  }
}