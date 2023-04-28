import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourFeedComponent } from './components/your-feed/your-feed.component';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FeedTogglerModule } from '../shared/modules/feedToggler/feed-toggler.module';
import { PopularTagsModule } from '../shared/modules/popularTags/popular-tags.module';
import { RouterModule } from '@angular/router';

const routes = [
  {path:'feed', component:YourFeedComponent}
]

@NgModule({
  declarations: [
    YourFeedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule
  ]
})
export class YourFeedModule { }
