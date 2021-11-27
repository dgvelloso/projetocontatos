//importanto a biblioteca do angular pra criação de módulos
import { NgModule} from "@angular/core";

//importanto o módulo de mapeamento de rotas
import { Routes, RouterModule } from '@angular/router';

//importar os componentes que serão mapeados com rotas
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PasswordComponent } from "./password/password.component";
//cada componente é uma classe e embaixo é o mapeamento das rotas
import { UserDataComponent } from "./user-data/user-data.component";
import { ContatosCadastroComponent } from "./contatos-cadastro/contatos-cadastro.component";
import { ContatosConsultaComponent } from "./contatos-consulta/contatos-consulta.component";
import { ContatosEdicaoComponent } from "./contatos-edicao/contatos-edicao.component";
//mapeamento dos componentes: são padrões que devem sempre ser assim

const routes: Routes = [
    { path: '', component: LoginComponent }, //raiz do projeto
    { path: 'register', component: RegisterComponent },
    { path: 'password', component: PasswordComponent },
    { path: 'user-data', component: UserDataComponent},
    { path: 'contatos-cadastro', component: ContatosCadastroComponent},
    { path: 'contatos-consulta', component: ContatosConsultaComponent},
    { path: 'contatos-edicao', component: ContatosEdicaoComponent},



]


//registrando e exportanto a configuraçãod e rotas

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
 
//declaração do nome da classe de configuração
export class AppRoutingModule { }
