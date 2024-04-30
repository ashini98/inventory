import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AppTable} from "../../../util/AppTable";
import {ActivatedRoute, Router} from "@angular/router";
import {TuiInputModule} from "@taiga-ui/kit";
import {DebounceDirective} from "../../../util/debounce.directive";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    TuiInputModule,
    DebounceDirective,
    FormsModule
  ],
  templateUrl: './item.component.html'
})
export class ItemComponent extends AppTable<any>{
  length = 64;
  index = 10;
  id: number;

  activeRoute = inject(ActivatedRoute);
  private itemService: any;

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
    this.itemService.paginateItem(this.paginateParams).subscribe({
      next: (data) => {
        this.onPaginationResult(data);
      },
      error: (error) => console.error('There was an error!!!', error)
    });
  }
  @Output() onEdit = new EventEmitter<any>();

  navigateToFormPage() {
    this.router.navigate(['/home/add-item/', this.id]);
  }

  onView(item) {
    this.router.navigate(['/home/item-view/', item.id]);
  }

}
