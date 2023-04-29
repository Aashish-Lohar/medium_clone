import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, filter, map } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/editArticle.selector';
import { getArticleAction } from '../../store/getArticle.action';
import { ActivatedRoute } from '@angular/router';
import { updateArticleAction } from '../../store/upateArticle.action';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit, OnDestroy{
  // initialValues$!: Observable<ArticleInputInterface>;
  initialValues!:ArticleInputInterface
  isLoading$!: Observable<boolean>;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  slug!: string;
  initialValuesSubscription!:Subscription

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.initialValuesSubscription.unsubscribe()
  }

  initializeValues() {
    const articleParams = this.route.snapshot.paramMap.get('slug');
    this.slug = articleParams ? articleParams : '';
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    // this.initialValues$ = this.store.pipe(
    //   select(articleSelector),
    //   filter(Boolean),
    //   map((article:ArticleInterface)=>{
    //     return {
    //       title:article.title,
    //       description:article.description,
    //       body:article.body,
    //       tagList:article.tagList
    //     }
    //   })
    // );

    this.initialValuesSubscription = this.store.pipe(select(articleSelector)).subscribe(
      (response)=>{
        if(response)
        this.initialValues = response
      }
    )
  }
  fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    console.log('eeeerroro');
    this.store.dispatch(updateArticleAction({slug:this.slug, articleInput }));
  }
}
