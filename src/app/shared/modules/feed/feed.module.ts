import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { FeedService } from './services/feed.service';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/getFeed.reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from '../errorMessage/error-message.module';
import { LoadingModule } from '../loading/loading.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TagListModule } from '../tagList/tag-list.module';
import { AddToFavoritesModule } from '../addToFavorites/add-to-favorites.module';



@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed',reducers),
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule
  ],
  exports:[FeedComponent],
  providers:[FeedService]
})
export class FeedModule { }
