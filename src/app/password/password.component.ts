import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';

//já tem o mapeamento do injectable
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = "";
  mensagem_erro: string = "";
  isLoading: boolean = false;

  constructor(
    private tokenService: TokenService, 
    //inicia por injeção de dependência 
    private accountService: AccountService,
  ) { }

  formPassword= new FormGroup({
    //campo email
    email:new FormControl('', [
      Validators.required,
      Validators.email
    ])
  })

  //função que captura o valor- retorna todos os controles do formulário
  get form(): any {
    return this.formPassword.controls;
  }

  ngOnInit(): void {
    this.tokenService.verifyIsAuthenticated();
  }


  onSubmit():void{
    //limpar as mensagens
    this.mensagem_sucesso="";
    this.mensagem_erro="";

    //modificando a flag de carregamento pra true
    this.isLoading = true;

    //executar a chamada pra api de recuperaçãod e senha
    this.accountService.passwordRecover(this.formPassword.value)
    //this.formPassword pega o conteúdo do seu formulário pra resetar a senha.

    .subscribe(
      (data:any) => {// resposta de sucesso da API

        this.mensagem_sucesso = data.message;
        //o message é a mensagem da API
        this.formPassword.reset();
        this.isLoading =false;
      },

      (e:any)=> {
        //verificando o tipo de erro retornado pela API
         switch(e.status){
           case 422:
             this.mensagem_erro = e.error;
             //o break é pra parar o switch, senão ele vai verificando os outros erros
             break;

             default:
               this.mensagem_erro = "Não foi possível realizar a operação";
              break;

         }

      this.isLoading = false;


      },
    )


  }

}
