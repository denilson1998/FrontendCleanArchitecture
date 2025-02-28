import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { TypeofPipe } from '../../helpers/pipes/typeof.pipe';
import { CurrencyBolivianPipe } from '../../helpers/pipes/currency-bolivian.pipe';


@Component({
  selector: 'jichi-table',
  standalone: true,
  imports: [CommonModule, TypeofPipe, FormsModule, CurrencyBolivianPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class JichiTableComponent implements OnInit{

 @Input() head!: TableHeadEntity[]
 @Input() data: any[] =  [];
 @Input() currentPage: number = 1;
 @Input() limit: number = 10;
 @Input() totalPages: number = 0;
 @ContentChild('actionsTemplate') actionsTemplate: TemplateRef<any> | undefined;

 @Output() changePage = new EventEmitter<number>();
 @Output() toggleChange = new EventEmitter<boolean>();
 Object = Object;
 visibleRangeLength = 4;

 pages: number[] = [];

 ngOnInit(): void {
  this.updateVisiblePages()

}

  toggle(value: any){
    this.toggleChange.emit(value);
  }


  changePageEmitter(page: number){
    this.currentPage = page
    this.updateVisiblePages();
    this.changePage.emit(page)
  }

  updateVisiblePages(){
    const length = Math.min(this.totalPages, this.visibleRangeLength);
    const startIndex = Math.max(
      Math.min(this.currentPage - Math.ceil(length / 2),
      this.totalPages - length), 0
    );
    this.pages = Array.from(
      new Array(length).keys(), (item) => item + startIndex + 1
    )
  }




}
