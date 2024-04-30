import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {debounceTime, Subject} from "rxjs";

@Directive({
  selector: '[appDebounce]',
  standalone: true
})
export class DebounceDirective {

  @Input() debounceTimeMs = 300;
  @Output() debouncedValue = new EventEmitter<string>();

  private subject = new Subject<string>();

  constructor() {
    this.subject.pipe(debounceTime(this.debounceTimeMs))
      .subscribe((value: string) => {
        this.debouncedValue.emit(value);
      });
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.subject.next(value);
  }
}
