import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../services/consulta-cep.service';
import { ICep } from '../services/ICep';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
  }

  consultaCep(e: FocusEvent, f: NgForm) {
    const cep = (e.target as HTMLInputElement).value;

    if(cep !== '') {
      this.consultaCepService.getConsultaCep(cep).subscribe(res => {
        this.populaEndereco(res, f);
      });
    }
  }

  populaEndereco(dados: ICep, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  cadastrar(form: NgForm){
      if(form.valid) {
        this.router.navigate(['/sucesso']);
      } else {
        alert('Formulário inválido');
      }
  }
}
