import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getArticleAction } from '../../store/getArticle.action';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { Observable, Subscription, combineLatest, map } from 'rxjs';
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from '../../store/getArticle.selectors';
import { isCurrentUserSelector } from 'src/app/auth/store/selector';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { deleteArticleAction } from '../../store/deleteArticle.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug!: string;
  article!: ArticleInterface;
  articleSubscription!: Subscription;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;
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
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(isCurrentUserSelector)),
    ]).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        }
      )
    );
  }
  initializeListeners() {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        if (article) this.article = article;
      });
  }

  deleteArticle(){
    this.store.dispatch(deleteArticleAction({slug:this.slug}))
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
