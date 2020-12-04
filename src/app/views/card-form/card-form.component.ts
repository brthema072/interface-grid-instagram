import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray  } from '@angular/forms';
// import { format } from 'path';
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

  formClient = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    logo: ['', [Validators.required]],
  });

  images = this.formCard.get('images') as FormArray;

  fileName: string;
  currentDate = new Date();
  datePrefixFile: string;


  ngOnInit(): void {

    $(document).ready(function(){
      $('.modal').modal();
    });


    let year = this.currentDate.getFullYear();
    let month = this.currentDate.getMonth();
    let day = this.currentDate.getDate();
    $(document).ready(function(){
      $('.datepicker').datepicker({
        format: 'd/mm/yyyy',
        setDefaultDate: true,
        defaultDate: new Date(year, month, day),
        i18n:{
          months: ['Janeiro','Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthsShort: ['jan', 'fev', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
          weekdays: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
          weekdaysShort: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
        }
      });
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
  uploadFileImage(event){
    
  }

  uploadFileLogo(event){
    
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

  onSubmitClient(){
    console.log(this.formClient.value)
  }

  checkPicker(){
    if($('.datepicker').val() != undefined){
      this.formCard.value.date = $('.datepicker').val();
      let fullDate = this.formCard.value.date.split("/", 3);
      let year = fullDate[2];
      let month = fullDate[1];
      let day = fullDate[0];
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();

      let newDate: any = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds; 
      
      newDate = new Date(newDate);

      this.formCard.value.date = newDate;
    }
    
    // console.log(console.log($('.datepicker').val()));
  }
}