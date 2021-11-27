import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ContatosService } from '../services/contatos.service';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-contatos-consulta',
  templateUrl: './contatos-consulta.component.html',
  styleUrls: ['./contatos-consulta.component.css']
})
export class ContatosConsultaComponent implements OnInit {
  //é um json array
  contatos: any[]= [];

  pagina = 1;
  filtro = "";

  constructor(
    private tokenService: TokenService,
    private contatosService: ContatosService
  ) { }

  //função executada sempre que o componente é carregado
  ngOnInit(): void {
    
    this.tokenService.verifyIsNotAuthenticated();

    this.contatosService.getAll()
      .subscribe(
        //puxa os contatos da api
        //na sintaxe do angular, esse data não pode retornar jason dentro, então
        //precisa colocar dentro da função o any[]
        (data) => {
          this.contatos = data as any[];
        },
        (e: any) => {
          console.log(e);
        }

      )

  }

  //função pra excluir contato

  excluir(idContato: string):void {
    //alert(idContato);

    if (window.confirm('Deseja realmente excluir este contato?')) {
 
      this.contatosService.delete(idContato)
        .subscribe(
          (data: any) => {
 
            //recarregar a consulta
            this.ngOnInit();
 
            window.alert(data.message);          
           
          },
          (e: any) => {
            console.log(e);
          }
        )
    }
  }


  //função pra fazer a paginação do componente
  handlePageChange(event:any):void {
    this.pagina = event;
  }

}
