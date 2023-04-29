import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { TopbarModule } from './shared/modules/topbar/topbar.module';
import { PersistenceService } from './shared/services/persistence.service';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { GlobalFeedModule } from './globalFeed/global-feed.module';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { YourFeedModule } from './yourFeed/your-feed.module';
import { TagFeedModule } from './tagFeed/tag-feed.module';
import { ArticleModule } from './article/article.module';
import { CreateArticleModule } from './createArticle/create-article.module';
import { EditArticleModule } from './editArticle/edit-article.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    TopbarModule,
    AppRoutingModule,
    StoreModule.forRoot({router:routerReducer}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    EffectsModule.forRoot([]),
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule
  ],
  providers: [
    PersistenceService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
