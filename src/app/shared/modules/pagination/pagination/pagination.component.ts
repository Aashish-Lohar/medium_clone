import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
  @Input() totalPagesInput!:any
  @Input() limit!:number
  @Input() currentPage!:number
  @Input() url!:string
  pageCount!:number
  pages!:number[]

  constructor(private utilsService:UtilsService){}

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.totalPagesInput/this.limit)
    this.pages = this.utilsService.range(1, this.pageCount)
  }
}
