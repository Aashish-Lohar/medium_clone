import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './article-form/article-form.component';
import { BackendErrorMessagesModule } from '../backendErrorMessages/backend-error-messages.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArticleFormComponent
  ],
  imports: [
    CommonModule,
    BackendErrorMessagesModule,
    ReactiveFormsModule
  ],
  exports:[ArticleFormComponent]
})
export class ArticleFormModule { }
