import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICep } from './ICep';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  private endpoint = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  getConsultaCep(cep: string): Observable<ICep> {
    return this.http.get<ICep>(`${this.endpoint}${cep}/json`);
  }
}
