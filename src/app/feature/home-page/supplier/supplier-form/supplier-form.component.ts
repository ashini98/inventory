import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiHintModule,
    TuiPrimitiveTextfieldModule,
    TuiScrollbarModule, TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneInternationalModule, TuiInputPhoneModule,
  TuiSelectModule, TuiSortCountriesPipeModule, TuiToggleModule
} from "@taiga-ui/kit";
import {TuiCountryIsoCode} from "@taiga-ui/i18n";
import {AppForm} from "../../../../util/AppForm";

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiHintModule,
    TuiInputModule,
    TuiPrimitiveTextfieldModule,
    TuiScrollbarModule,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    TuiInputPhoneInternationalModule,
    TuiSortCountriesPipeModule,
    TuiToggleModule,
    TuiInputPhoneModule
  ],
  templateUrl: './supplier-form.component.html'
})
export class SupplierFormComponent extends AppForm<any>{
  initForm(): void {
    this.form = this.fb.group({
      id: [this.inputValue?.id ?? null, this.inputValue ? [Validators.required] : []],
      name: [this.inputValue?.name ?? null, [Validators.required]],
      phone:  [this.inputValue?.phone ?? null, [Validators.required]],
      email:  [this.inputValue?.email ?? null, [Validators.required]],
      company:  [this.inputValue?.company ?? null, [Validators.required]],
      address: this.fb.group({
        street: [this.inputValue?.address ?? null, [Validators.required]],
        lane2: [this.inputValue?.address ?? null, []],
        city: [this.inputValue?.address ?? null, [Validators.required]],
        postcode: [this.inputValue?.address ?? null, [Validators.required]],
        country: [this.inputValue?.address ?? null, [Validators.required]],
      }),
      status: [this.inputValue?.status ?? null, this.inputValue ? [Validators.required] : []]
    })
  }
  onCreate(formValues: any): void {
  }
  onUpdate(formValues: any): void {
      throw new Error('Method not implemented.');
  }

  // readonly form = new FormGroup({
  //   phone: new FormControl('', Validators.minLength(12)),
  // });
  readonly countries = Object.values(TuiCountryIsoCode);
  countryIsoCode = TuiCountryIsoCode.SL;

}
