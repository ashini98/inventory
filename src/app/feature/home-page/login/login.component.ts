import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {TuiScrollbarModule, TuiHintModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import {ReactiveFormsModule, FormGroup, Validators} from "@angular/forms";
import {AppForm} from "../../../util/AppForm";
import {ActivatedRoute, Router} from "@angular/router";
import { LoginService } from '../../../services/loginService';
import {AlertService} from "../../../services/alertService";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TuiScrollbarModule, TuiHintModule, TuiTextfieldControllerModule, TuiInputModule,
    TuiInputPasswordModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends AppForm<any>{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f(){
    return this.form.controls;
  }

  initForm(): void {

  }
  onCreate(formValues: any): void {

  }
  onUpdate(formValues: any): void {

  }

  @Input() link: string;

  onSubmit(){
      this.isSubmitting = true;
      this.alertService.clear();
      if (this.form.invalid){
        return;
      }

      this.loading = true;
      this.loginService.login(this.f.email.value, this.f.password.value).subscribe({
        next: () => {
          const  returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alertService.error(error);
          this.loading =false;
        }
      });
  }

}

