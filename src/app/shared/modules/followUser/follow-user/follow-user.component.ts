import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { followUserAction } from '../store/followUser.action';

@Component({
  selector: 'app-follow-user',
  templateUrl: './follow-user.component.html',
  styleUrls: ['./follow-user.component.scss']
})
export class FollowUserComponent implements OnInit{
  @Input() followingInput!:boolean
  @Input() apiUrlInput!:string
  @Input() userNameInput!:string
  followed!:boolean

  constructor(private store:Store){}

  ngOnInit(): void {
    this.followed = this.followingInput
    // console.log('slug',this.apiUrlInput);
    
  }

  handleFollow(){
    
    this.store.dispatch(followUserAction({
      followed:this.followed,
      slug:this.apiUrlInput
    }))

    this.followed = !this.followed
  }
}
