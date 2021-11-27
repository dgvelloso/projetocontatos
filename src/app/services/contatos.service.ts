import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(

    //inicializando por meio de injeção de dependência
    private httpClient: HttpClient
  ) { }

  //o data é pq precisa passar um json da api
  post (data:any){
    //executando o servico de post da api
    return this.httpClient.post(environment.apiContatos + "/Contatos", data);
  }

  put (data:any){
    //executando o servico de put da api
    return this.httpClient.put(environment.apiContatos + "/Contatos", data);
  }

  delete(id: string) {
    return this.httpClient.delete(environment.apiContatos + "/Contatos/" + id)
  }


  //retorna pra api os contatos registrados
  getAll (){
    return this.httpClient.get(environment.apiContatos + "/Contatos" );
    
  }

  getById (id: string){
    return this.httpClient.get(environment.apiContatos + "/Contatos/" +id);
    
  }
}
