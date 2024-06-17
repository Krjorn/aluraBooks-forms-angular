import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(!control.value) return null;
    const dataNascimento = new Date(control.value);
    const anoNascimento = dataNascimento.getFullYear();
    const nascMais18 = anoNascimento + 18;
    const anoAtual = new Date().getFullYear();

    const ehMaiorIdade = nascMais18 <= anoAtual;

    return ehMaiorIdade ? null : { 'maiorIdadeValidator': true };
  }
}
