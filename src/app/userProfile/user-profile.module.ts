import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { GetUserProfileEffect } from './store/getUserProfile.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FollowUserModule } from '../shared/modules/followUser/follow-user.module';

const routes = [
  {
    path:'profiles/:slug', component:UserProfileComponent
  },
  {
    path:'profiles/:slug/favorites', component:UserProfileComponent
  },
  {
    path:'profiles/:slug/follow', component:UserProfileComponent
  },
]


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile',reducers),
    FeedModule,
    FollowUserModule
  ]
})
export class UserProfileModule { }
