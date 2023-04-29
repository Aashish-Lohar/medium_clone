import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit, OnDestroy{
  @Input() backendErrorsInput!:BackendErrorsInterface | null;
  @Input() backendErrorsInputObs!:Observable<BackendErrorsInterface|null>

  errorMessages:string[]=[];
  errorMessages2:string[]=[];

  errorMessageSubscription!:Subscription

  ngOnInit(): void {
    if(this.backendErrorsInput){
    this.errorMessages = Object.keys(this.backendErrorsInput).map(
      (name:string)=>{
        const messages = this.backendErrorsInput?this.backendErrorsInput[name].join(' '):''; 
        return `${name} ${messages}`
      }
    )
  }


  // myyidea
  if(this.backendErrorsInputObs){
    this.errorMessageSubscription = this.backendErrorsInputObs.subscribe((response)=>{
      console.log('myidea',response);
      if(response){
      this.errorMessages2 = Object.keys(response).map(
        (name:string)=>{
          const messages = response?response[name].join(' '):''
          return `${name} ${messages}`
        }
      )
      }
    })
  }
    
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe()
  }
}
