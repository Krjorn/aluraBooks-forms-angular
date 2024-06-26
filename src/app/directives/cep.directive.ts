import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ConsultaCepService } from '../services/consulta-cep.service';
import { ICep } from '../services/ICep';

@Directive({
  selector: '[cepValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: CepDirective,
    multi: true
  }]
})
export class CepDirective implements AsyncValidator {

  constructor(private consultaCepService: ConsultaCepService) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      const cep = control.value;

      return this.consultaCepService.getConsultaCep(cep).pipe(map(
        res => res.erro ? { cepValidator: true } : null
      ))
  }
}
