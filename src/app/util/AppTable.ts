import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {TuiTablePagination} from "@taiga-ui/addon-table";

@Component({
  template: ''
})

export abstract class AppTable<T> implements OnInit {

  @Output() onEdit = new EventEmitter<T>();

  total = 0;
  sizeOptions = [10, 50, 100, this.total];
  currentPage = 0;
  size = this.sizeOptions[0];

  tableData: T[] = []
  searchString: string;

  //filter = null;
  paginateParams = {
    page: this.currentPage,
    filter: null,
    size: this.size,
    sort: null
  }

  abstract fetchData(): void;

  onPaginationResult(res: any) {
    this.total = res.totalElements;
    this.sizeOptions.pop();
    this.sizeOptions.push(res.totalElements)
    this.tableData = res.content;
  }

  onPaginationChange($event: TuiTablePagination) {
    this.currentPage = $event.page;
    this.size = $event.size;
    this.fetchData();
  }

  onSearch($event: any) {
    this.searchString = $event
    this.fetchData();
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
