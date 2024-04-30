import { Component } from '@angular/core';
import {AppTable} from "../../../../util/AppTable";
import {TuiRatingModule} from "@taiga-ui/kit";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-item-view',
  standalone: true,
  imports: [
    TuiRatingModule,
    FormsModule
  ],
  templateUrl: './item-view.component.html'
})
export class ItemViewComponent extends AppTable<any>{
  id:number;
  item: any;
  private itemService: any;
  value: any;

  itemView(){
    this.itemService.getItemId(this.id).subscribe(
      data => {
        this.item = data;
      },
      error => {
        console.error('Error fetching item details', error)
      }
    );
  }

    fetchData(): void {

    }

}
