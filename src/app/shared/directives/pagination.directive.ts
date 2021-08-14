import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appPagination]'
})
export class PaginationDirective {

  @Input() pageNo = 1;
  @Input() totalPages = 1;
  @Input() totalPatients = 0;
  @Input() pageSize = 5;
  @Input() patientsInPage = 0;

  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  private setValue(val: number) {
    this.
  }


  prev() {
    this.setPage()
  }

  next() {
    this.
  }

}
