import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './add-to-favorites/add-to-favorites.component';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesEffect } from './store/addToFavorites.effect';



@NgModule({
  declarations: [
    AddToFavoritesComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AddToFavoritesEffect])
  ],
  exports:[AddToFavoritesComponent]
})
export class AddToFavoritesModule { }
