import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from '../store/getFeed.action';
import { Observable, Subscription } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../store/getFeed.selectors';
import { ApiUrls } from 'src/app/shared/apiUrls';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  stringify,
  parseUrl,
} from '../../../../../../node_modules/query-string/base';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input() apiUrlInput!: string;

  feed$!: Observable<GetFeedResponseInterface | null>;
  error$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;
  limit: number = ApiUrls.limit;
  baseUrl!: string;
  queryParamsSubscription!: Subscription;
  currentPage!: number;

  constructor(
    private store: Store,
    private router: Router,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValue();
    this.initializeListeners();
    // console.log('apiUrlInput', this.apiUrlInput);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    const isApiUrlChanged = !changes['apiUrlInput'].firstChange &&
    changes['apiUrlInput'].currentValue !== changes['apiUrlInput'].previousValue
    if (isApiUrlChanged) {
      console.log('REFETCH');
      this.fetchFeed()
    }
  }

  initializeValue() {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }
  initializeListeners() {
    this.queryParamsSubscription = this.routes.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      }
    );
  }
  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;

    const parsedUrl = parseUrl(this.apiUrlInput);
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });

    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    // console.log('apiUrlWithParams', apiUrlWithParams);
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
