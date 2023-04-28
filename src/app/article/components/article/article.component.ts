import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getArticleAction } from '../../store/getArticle.action';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { Observable, Subscription } from 'rxjs';
import { articleSelector, errorSelector, isLoadingSelector } from '../../store/getArticle.selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug!: string;
  article!: ArticleInterface;
  articleSubscription!: Subscription;
  isLoading$!:Observable<boolean>;
  error$!:Observable<string|null>;
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  initializeValues() {
    const query = this.route.snapshot.paramMap.get('slug');
    this.slug = query ? query : '';
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
  initializeListeners() {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        if(article)
          this.article = article
      });
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
  }
}
