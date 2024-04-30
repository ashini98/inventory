import {Component, EventEmitter, inject, Output} from '@angular/core';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule, TuiRootModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {AsyncPipe, NgForOf} from "@angular/common";
import {categories, Category} from "../../../../util/Data";
import {AppForm} from "../../../../util/AppForm";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    TuiInputModule, ReactiveFormsModule, TuiHintModule, TuiTextfieldControllerModule,
    TuiErrorModule, TuiFieldErrorPipeModule, AsyncPipe, TuiDataListWrapperModule,
    TuiButtonModule, TuiScrollbarModule, TuiRootModule, TuiSelectModule, NgForOf,
    TuiInputPasswordModule
  ],
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent extends AppForm<any>{

  id:number;
activeRoute = inject(ActivatedRoute);

  stringifyCategory(category: Category) {
    return category.name;
  };
  private createItem: string;
  private itemService: any;
  private newItem: string;

  initForm(): void {
    this.form = this.fb.group({
    id: ['', this.inputValue ? [Validators.required] : [], []],
      name: ['', [Validators.required], []],
      description: ['', this.inputValue ? [Validators.required] : [], []],
      category: ['', [Validators.required], []],
      price: ['', this.inputValue ? [Validators.required] : []],
      qty: ['', [Validators.required]]
      });
  }
  onCreate(formValues: any): void {
    this.itemService.createItem(this.newItem).subscribe(
      data => {
        console.log('Item created Successfully...', data);
        this.onFormSubmit.emit(data);
      },
      error => {
        console.error('Error creating item...', error);
      }
    );
  }
  onUpdate(formValues: any): void {
  }

  category = [
    'Electronics',
    'Apparel',
    'Books',
    'Tools',
    'Health & Beauty',
    'Groceries'
  ];
  itemCategories: readonly [] | null;

  private passwordMatchValidator(form : FormGroup): {[ key: string]: boolean} | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? {'mismatch' : true} : null;

  }
}
