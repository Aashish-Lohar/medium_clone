import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/login.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  isSubmitting$!:Observable<boolean>
  backendErrors$!:Observable<BackendErrorsInterface|null>


  constructor(private fb:FormBuilder, private store:Store){}

  ngOnInit(){
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(){
    this.isSubmitting$ = this.store.select(isSubmittingSelector);
    this.backendErrors$ = this.store.select(validationErrorsSelector);

  }
  initializeForm(){
    this.form = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    const request:LoginRequestInterface = {
      user:this.form.value
    }
    this.store.dispatch(loginAction({request}))
    // this.authService.register(this.form.value)
  }
}