import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MenuComponent } from './components/menu/menu.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { MapasComponent } from './components/mapas/mapas.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
  {path: 'operadores', component: OperatorsComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'mapas', component: MapasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
