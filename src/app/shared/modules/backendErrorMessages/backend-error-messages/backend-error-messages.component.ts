import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit{
  @Input() backendErrorsInput!:BackendErrorsInterface | null;

  errorMessages:string[]=[];

  ngOnInit(): void {
    if(this.backendErrorsInput){
    this.errorMessages = Object.keys(this.backendErrorsInput).map(
      (name:string)=>{
        const messages = this.backendErrorsInput?this.backendErrorsInput[name].join(' '):''; 
        return `${name} ${messages}`
      }
    )
  }
    console.log('backendErrorsInput',this.backendErrorsInput);
    
  }
}
