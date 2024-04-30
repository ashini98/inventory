import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AppTable} from "../../../util/AppTable";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html'
})
export class OrderComponent extends AppTable<any>{
  length = 64;
  index = 10;
  id: number;

  activeRoute = inject(ActivatedRoute)
  private orderService: any;

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
      this.orderService.paginateItem(this.paginateParams).subscribe({
        next: (data) => {
          this.onPaginationResult(data);
        },
        error: (error) => console.error('There was an error!!!', error)
      });
    }

  @Output() onEdit = new EventEmitter<any>();

  navigateToFormPage() {
    this.router.navigate(['/home/add-order/', this.id]);
  }

  onView(order) {
    this.router.navigate(['/home/order-view/', order.id]);
  }

}
