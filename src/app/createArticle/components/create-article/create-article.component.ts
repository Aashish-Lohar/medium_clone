import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/createArticle.selector';
import { createArticleAction } from '../../store/createArticle.action';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit{
  initialValues:ArticleInputInterface = {
    title:'',
    description:'',
    body:'',
    tagList:['']
  }
  isSubmitting$!:Observable<boolean>
  backendErrors$!:Observable<BackendErrorsInterface|null>

  constructor(private store:Store){}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }
  
  onSubmit(articleInput:ArticleInputInterface){
    // console.log('eeeerroro');
    
    this.store.dispatch(createArticleAction({articleInput}))
  }

}
