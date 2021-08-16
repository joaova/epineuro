import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaginationDirective {

  pageNo = 1;
  totalPages = 1;
  pageSize = 5;

  constructor() { }

  public setPage(val: number) {
    this.pageNo = val;
  }

  public setPageSize(val: number) {
    this.pageSize = val;
  }

  public setTotalPages(val: number) {
    this.totalPages = val;
  }

  isNextAv(): boolean {
    return this.pageNo < this.totalPages;
  }

  isPrevAv(): boolean {
    return this.pageNo > 1;
  }

  prev() {
    this.setPage(Math.max(1, this.pageNo - 1));
  }

  next() {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }

}
