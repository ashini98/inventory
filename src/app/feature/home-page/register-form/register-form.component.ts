import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiComboBoxModule, TuiFieldErrorPipeModule, TuiInputModule,
  TuiInputPhoneInternationalModule, TuiInputPhoneModule, TuiSelectModule,
  TuiSortCountriesPipeModule
} from "@taiga-ui/kit";
import {TuiErrorModule, TuiHintModule, TuiScrollbarModule, TuiTextfieldControllerModule}
  from "@taiga-ui/core";
import {AsyncPipe} from "@angular/common";
import {AppForm} from "../../../util/AppForm";
import {LoginComponent} from "../login/login.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RegisterService} from "../../../services/RegisterService";
import {AlertService} from "../../../services/alertService";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, TuiComboBoxModule, TuiHintModule, TuiInputModule,
    TuiScrollbarModule, TuiTextfieldControllerModule, TuiErrorModule, TuiFieldErrorPipeModule,
    AsyncPipe, TuiInputPhoneModule, TuiInputPhoneInternationalModule, TuiSortCountriesPipeModule,
    TuiSelectModule, LoginComponent, RouterLink
  ],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent extends AppForm<any>{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private alertService: AlertService
  ) {
    super();
  }

  initForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
              street: ['', [Validators.required]],
              lane2: ['', []],
              city: ['', [Validators.required]],
              postcode: ['', [Validators.required]],
              country: [''?? null, [Validators.required]],
      })

    }, {validators: this.passwordMatchValidator})
  }

  get f(){
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitting = true;
    this.alertService.clear();

    if (this.form.invalid){
      return;
    }

    this.loading = true;
    this.registerService.register(this.f.email.value, this.f.password.value).subscribe({
      next: () => {
        this.alertService.success('Account Created Successfully...');
        this.router.navigate(['../login'], {relativeTo: this.route});
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    })
  }

  onCreate(formValues: any): void {
  }
  onUpdate(formValues: any): void {
  }

  private passwordMatchValidator(form : FormGroup): {[ key: string]: boolean} | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? {'mismatch' : true} : null;

  }

}
