import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl
  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage())
      return this.getErrorMessage()
    else
      return null
  }

  private mustShowErrorMessage() : boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  private getErrorMessage() : string {
    if(this.formControl.errors.required)
      return 'dado obrigatório'

    if(this.formControl.errors.email)
      return 'formato de email inválido'

    if(this.formControl.errors.minLength) {
      const requiredLength = this.formControl.errors.minLength.requiredLength
      return `deve ter no minímo ${requiredLength} caracteres`
    }

    if(this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength
      return `deve ter no máximo ${requiredLength} caracteres`
    }

    return null
  }
}
