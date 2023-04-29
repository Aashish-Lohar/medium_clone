import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit{
  @Input() initialValues!:ArticleInputInterface
  @Input() isSubmittingInput!:boolean|null
  // @Input() errorsInput!:BackendErrorsInterface|null
  @Input() errorsInput!:Observable<BackendErrorsInterface|null>

  @Output() articleSubmitEvent = new EventEmitter<ArticleInputInterface>()
  form!:FormGroup

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    this.form = this.fb.group({
      title:this.initialValues.title,
      description:this.initialValues.description,
      body:this.initialValues.body,
      tagList:this.initialValues.tagList.join(' ')
    })
  }

  onSubmit(){
    console.log('erro',this.errorsInput);
    
    this.form.value.tagList = this.form.value.tagList.split(' ')
    this.articleSubmitEvent.emit(this.form.value)
  }
}
