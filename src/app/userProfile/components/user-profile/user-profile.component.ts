import { Component, OnInit } from '@angular/core';
import { UserProfileInterface } from '../../types/userProfile.interface';
import { Observable, Subscription, combineLatest, filter, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getUserProfileAction } from '../../store/getUserProfile.action';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../../store/getUserProfile.selector';
import { isCurrentUserSelector } from 'src/app/auth/store/selector';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile!: UserProfileInterface;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  userProfileSubscription!: Subscription;
  slug!: string;
  isCurrentUserProfile$!: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intializeValues();
    this.intializeListeners()
  }

  intializeValues() {
    const userProfileParams = this.route.snapshot.paramMap.get('slug');
    this.slug = userProfileParams ? userProfileParams : '';
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(isCurrentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean)),
    ]).pipe(map(([currentUser, userProfile]:[CurrentUserInterface, UserProfileInterface])=>{
      return currentUser.username === userProfile.username
    }));
  }

  getApiUrl():string{
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  intializeListeners() {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile) => {
        if (userProfile) {
          this.userProfile = userProfile;
        }
      });

      this.route.params.subscribe((params:Params)=>{
        this.slug = params['slug']
        this.fetchUserProfile()
      })
  }

  fetchUserProfile() {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }
}
