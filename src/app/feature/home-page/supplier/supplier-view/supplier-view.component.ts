import {Component, inject} from '@angular/core';
import {AppTable} from "../../../../util/AppTable";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-supplier-view',
  standalone: true,
  imports: [],
  templateUrl: './supplier-view.component.html'
})
export class SupplierViewComponent extends AppTable<any>{
  protected route = inject(ActivatedRoute)
  id: number;
  private supplierService: any;
  protected supplier: any;

  supplierView(){
    this.supplierService.getSupplierId(this.id).subscribe(
      data => {
        this.supplier = data;
      },
      error => {
        console.error('Error fetching Supplier details', error)
      }
    );
  }

    fetchData(): void {

    }

}
