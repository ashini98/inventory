import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AppTable} from "../../../util/AppTable";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [],
  templateUrl: './supplier.component.html'
})
export class SupplierComponent extends AppTable<any>{
  length = 64;
  index = 10;
  id: number;

  activeRoute = inject(ActivatedRoute)
  private supplierService: any;

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.fetchData();
    console.log(this.id);
  }

  constructor(private router : Router) {
    super();
  }

  goToPage(index : number){
    this.index = index;
    console.info('New page:', index);
  }

  fetchData(): void {
    this.paginateParams.filter = this.searchString ? `name ~~ '${this.searchString}'` : null ;
    this.supplierService.paginateItem(this.paginateParams).subscribe({
      next: (data) => {
        this.onPaginationResult(data);
      },
      error: (error) => console.error('There was an error!!!', error)
    });
    }

  @Output() onEdit = new EventEmitter<any>();

  navigateToFormPage() {
    this.router.navigate(['/home/add-supplier/', this.id]);
  }

  onView(supplier) {
    this.router.navigate(['/home/supplier-view/', supplier.id]);
  }

}
