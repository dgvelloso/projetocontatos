import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordComponent } from './password/password.component';
import { UserDataComponent } from './user-data/user-data.component';
 
//importando o arquivo de modulo de configuração
import { AppRoutingModule } from './app.routing';
 
//importando o módulo de formularios reativos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
//importando o módulo de cliente http (integração com APIs)
import { HttpClientModule } from '@angular/common/http';

//importanto biblioteca de paginação
import { NgxPaginationModule } from 'ngx-pagination';

//filtro de campo
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//importando a biblioteca de mascara de campos
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig | null> | (() => Partial<IConfig>) = null;
 
//importando o interceptador
import { TokenInterceptor } from './interceptors/token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContatosCadastroComponent } from './contatos-cadastro/contatos-cadastro.component';
import { ContatosConsultaComponent } from './contatos-consulta/contatos-consulta.component';
import { ContatosEdicaoComponent } from './contatos-edicao/contatos-edicao.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordComponent,
    UserDataComponent,
    ContatosCadastroComponent,
    ContatosConsultaComponent,
    ContatosEdicaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
