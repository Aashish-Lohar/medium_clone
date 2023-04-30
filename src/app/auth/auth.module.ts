import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { AuthService } from './services/auth.service';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backend-error-messages.module';
import { PersistenceService } from '../shared/services/persistence.service';
import { LoginEffect } from './store/effects/login.effect';
import { LoginComponent } from './components/login/login.component';
import { getCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { GlobalFeedModule } from '../globalFeed/global-feed.module';
import { UpdateCurrentUserEffect } from './store/effects/updateCurrentUser.effect';
import { LogoutEffect } from './store/effects/logout.effect';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      getCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect
    ]),
    BackendErrorMessagesModule,
  ],
  providers: [AuthService, PersistenceService],
  exports: [RouterModule],
})
export class AuthModule {}
