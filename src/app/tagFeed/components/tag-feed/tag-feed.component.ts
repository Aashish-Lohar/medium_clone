import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss']
})
export class TagFeedComponent implements OnInit{
  apiUrl!:string 
  tagName!:string|null

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      // console.log('params',params);
      this.tagName = params['slug']
      this.apiUrl = `/articles?tag=${this.tagName}`
      
    })
    
    // console.log('tagname',this.tagName);
    
  }
}
