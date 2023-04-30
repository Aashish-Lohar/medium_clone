import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backend-error-messages.module';

const routes = [
  {path:'settings', component:SettingsComponent}
]

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers),
    ReactiveFormsModule,
    BackendErrorMessagesModule,
  ],
  exports:[SettingsComponent]
})
export class SettingsModule { }
