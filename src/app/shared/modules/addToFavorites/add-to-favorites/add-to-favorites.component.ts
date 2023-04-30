import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from '../store/addToFavorites.action';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit{
  @Input()isFavoritedInput!:boolean
  @Input()favoritesCountInput!:number
  @Input()articleSlugInput!:string

  favoritesCount!:number
  isFavorited!:boolean

  constructor(private store:Store){}

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountInput
    this.isFavorited = this.isFavoritedInput
  }

  handleLike(){
    this.store.dispatch(addToFavoritesAction({
      isFavorited:this.isFavorited,
      slug:this.articleSlugInput
    }))
    if(this.isFavorited){
      console.log('this.favoritesCount',this.favoritesCount);
      
      this.favoritesCount = this.favoritesCount-1
    }
    else{
      console.log('this.favoritesCount',this.favoritesCount);
      this.favoritesCount =this.favoritesCount+1
    }

    this.isFavorited = !this.isFavorited
  }
}
