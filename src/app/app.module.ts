import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ConsultaService } from './services/consulta.service';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from './components/input-error/input-error.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { MapasComponent } from './components/mapas/mapas.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    CadastroComponent,
    InputErrorComponent,
    OperatorsComponent,
    HomeComponent,
    MapasComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConsultaService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
