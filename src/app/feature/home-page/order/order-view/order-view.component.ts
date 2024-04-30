import { Component } from '@angular/core';
import {AppTable} from "../../../../util/AppTable";

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [],
  templateUrl: './order-view.component.html'
})
export class OrderViewComponent extends AppTable<any>{
  id: number;
  order: any;
  private orderService: any;

  orderView(){
    this.orderService.getOrderId(this.id).subscribe(
      data => {
        this.order = data;
      },
      error => {
        console.error('Error fetching Order details', error)
      }
    );
  }

    fetchData(): void {

    }

}
