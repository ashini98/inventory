import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export abstract class AppForm<T> implements OnInit, OnChanges {
  @Input() inputValue: T;
  @Output() onFormSubmit = new EventEmitter<T>();
  fb = inject(FormBuilder);
  alert = inject(TuiAlertService);
  form: FormGroup;
  loading: boolean = true;
  isSubmitting: boolean = false;

  abstract initForm(): void;

  abstract onCreate(formValues: any): void;

  abstract onUpdate(formValues: any): void;

  updateInputValue(value: T) {
    this.inputValue = value;
    this.fetchData()
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputValue) {
      this.initForm();
    }
  }

  fetchData() {
    this.loading = false;
  }

  validateForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

  resetForm() {
    this.form.reset();
    for (const i in this.form.controls) {
      this.form.controls[i].markAsUntouched();
    }
  }

  onCancel() {
    this.inputValue = null;
    this.resetForm();
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  onInvalidFormSubmit() {
    this.isSubmitting = false;
    this.alert.open('Please fill all required fields', {
      label: 'Close'
    });

  }

  onSubmit() {
    this.validateForm();
    if (!this.form.invalid) {
      const data = this.form.value;
      localStorage.setItem('registerData', JSON.stringify(data));
      this.inputValue ? this.onUpdate(data) : this.onCreate(data);
    } else {
      this.onInvalidFormSubmit()
    }
  }
}
