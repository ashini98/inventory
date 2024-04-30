import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiHintModule,
    TuiScrollbarModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule, TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputModule, TuiInputNumberModule, TuiInputPhoneModule, TuiSelectModule
} from "@taiga-ui/kit";
import {AppForm} from "../../../../util/AppForm";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiHintModule,
    TuiInputDateRangeModule,
    TuiInputModule,
    TuiScrollbarModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiInputNumberModule,
    TuiInputDateModule,
    TuiInputPhoneModule
  ],
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent extends AppForm<any>{
  id: number;
  activeRoute = inject(ActivatedRoute)
  private orderService: any;
  private newOrder: any;

    initForm(): void {
      this.form = this.fb.group({
        id: ['', this.inputValue ? [Validators.required] : [], []],
        name: ['', [Validators.required], []],
        qty: ['', this.inputValue ? [Validators.required] : [], []],
        price: ['', [Validators.required], []],
        status: ['', this.inputValue ? [Validators.required] : []],
        date: ['', this.inputValue ? [Validators.required] : []],
        customerName: ['', [Validators.required]],
        phone: ['', [Validators.required], []],
        address: ['', [Validators.required], []],
        amount: ['', [Validators.required], []],
      });

    }
    onCreate(formValues: any): void {
      this.orderService.createOrder(this.newOrder).subscribe(
        data => {
          console.log('Order created Successfully...', data);
          this.onFormSubmit.emit(data);
        },
        error => {
          console.error('Error creating Order...', error);
        }
      );
    }
    onUpdate(formValues: any): void {

    }

}
