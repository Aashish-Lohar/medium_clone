import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/getPopularTags.reducers';
import { EffectsModule } from '@ngrx/effects';
import { GetPopularTagsEffect } from './store/getPopularTags.effect';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../errorMessage/error-message.module';
import { PopularTagsService } from './services/popular-tags.service';



@NgModule({
  declarations: [
    PopularTagsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule,
    LoadingModule,
    ErrorMessageModule
  ],
  exports:[PopularTagsComponent],
  providers:[PopularTagsService]
})
export class PopularTagsModule { }
