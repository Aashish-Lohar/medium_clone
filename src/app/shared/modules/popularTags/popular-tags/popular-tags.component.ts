import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { getPopularTagsAction } from '../store/getPopularTags.action';
import { errorSelector, isLoadingSelector, popularTagsSelector } from '../store/getPopularTags.selector';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit{
  popularTags$!:Observable<PopularTagType[]|null>
  isLoading$!:Observable<boolean>
  error$!:Observable<string|null>
  constructor(private store:Store){}

  ngOnInit(): void {
    this.fetchData()
    this.initializeValues()
  }
  initializeValues(){
    this.popularTags$ = this.store.pipe(select(popularTagsSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
  }
  fetchData(){
    this.store.dispatch(getPopularTagsAction())
  }

}
