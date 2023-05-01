import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowUserComponent } from './follow-user/follow-user.component';
import { EffectsModule } from '@ngrx/effects';
import { FollowUserEffect } from './store/followUser.effect';



@NgModule({
  declarations: [
    FollowUserComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([FollowUserEffect])
  ],
  exports:[FollowUserComponent]
})
export class FollowUserModule { }
