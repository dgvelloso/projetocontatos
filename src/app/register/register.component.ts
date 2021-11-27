import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
//tá como injectable 
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mensagem_sucesso: string = "";
  mensagem_erro: string = "";
 
  //criando uma flag 
  isLoading: boolean = false;

  //método construtor - usado pra injeção de dependência  
  constructor(
    private tokenService: TokenService, 
    private accountService: AccountService // injetando a classe / iniciando o objeto
  ) { }

  //criando o formulário
  formRegister= new FormGroup({

    //campo  'nome'
    nome: new FormControl ('', [
      Validators. required,
      Validators.minLength(10), //mínimo de caracteres
      Validators.maxLength(150)
    ]),

    //email
    email: new FormControl ('', [
      Validators. required,
      Validators.email //formato de email
    ]),

    //campo 'senha'
    senha: new FormControl('', [
      Validators.required, //obrigatório
    ]),
 
    //campo 'senhaConfirmacao'
    senhaConfirmacao: new FormControl('', [
      Validators.required, //obrigatório
    ]),


  });

  //função pra retornar os campos do formulário pro html acessar as mensagens de validação - formcontrol
  get form(): any {
    return this.formRegister.controls;
  }


  //evento executado quando o componente é carregado
  ngOnInit(): void {
    this.tokenService.verifyIsAuthenticated();
  }

  //função pra capturar o evento submit do formulário
  onSubmit():void{

    //limpar as mensagens
    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    //modificando o flag de carregamento pra true
    this.isLoading = true;


    //fazendo uma requisição pra API - cadastro de usuário
    this.accountService.register(this.formRegister.value)

    .subscribe ( //captura o promisse da API 
      (data:any) => { //recebe o retorno de sucesso da API
        console.log(data);

        //armazenando a mensagem de sucesso obtida da API
        this.mensagem_sucesso = data.message;

        //limpar os campos do formulário
        this.formRegister.reset();

        //modificando o flag de carregamento pra false
        this.isLoading = false;
      },
      (e:any) =>{// retorno de erro da API
        console.log(e);

        switch(e.status){

          //erro de validação
          case 400:
            if (e.error.errors.Senha)
            this.mensagem_erro = e.error.errors.Senha[0];

            else if (e.error.errors.senhaConfirmacao)
            this.mensagem_erro = e.error.errors.senhaConfirmacao[0];
            break;

          //erro de e mail já cadastrado
          case 422:
            this.mensagem_erro = e.error;
          break;
        }

      }
    ) 

  }

}
