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

  fileName: string;
  currentDate = new Date();
  datePrefixFile: string;


  ngOnInit(): void {
    $(document).ready(function(){
      $('.datepicker').datepicker();
    });
  }


  uploadFile(event){
    this.datePrefixFile = this.currentDate.getFullYear()+ ""+this.currentDate.getMonth()+""+this.currentDate.getHours()+""+this.currentDate.getMinutes()+""+this.currentDate.getSeconds()+""+this.currentDate.getMilliseconds();
    let elem = event.target;
    
    if(elem.files.length > 0){
      let formData = new FormData();

      formData.append('file', elem.files[0], this.datePrefixFile+"_"+elem.files[0].name);
      
      this.cardService.postImage(formData).subscribe((res)=>{
        // console.log("Got some data from backend ", res);
      },(err)=>{
        // console.log("Error: ", err);
      })
    }
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

        }else{
          this.images.value[i].url = this.formCard.value.images[i].url.replace("C:\\fakepath\\", "http://localhost/interface-instagram/updload_file/files/"+this.datePrefixFile+"_")
        }
        
      }
    }

    let newCard: Card;

    newCard = {
      title: this.formCard.value.title,
      description: this.formCard.value.description,
      images: this.formCard.value.images,
      date: this.formCard.value.date
    };
    
    this.cardService.postCard(newCard).subscribe(()=>{
      location.reload();
    },(err)=>{
      location.reload();
    })
  }

  checkPicker(){
    if($('.datepicker').val() != undefined){
      this.formCard.value.date = $('.datepicker').val();
    }
    
    // console.log(console.log($('.datepicker').val()));
  }
}