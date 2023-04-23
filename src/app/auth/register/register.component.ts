import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../store/actions/register.action';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../store/selector';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!:FormGroup;
  isSubmitting$!:Observable<boolean>
  constructor(private fb:FormBuilder, private store:Store, private authService:AuthService){}

  ngOnInit(){
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues(){
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }
  initializeForm(){
    this.form = this.fb.group({
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.form.value);
    this.store.dispatch(registerAction(this.form.value))
    this.authService.register(this.form.value)
  }
}
