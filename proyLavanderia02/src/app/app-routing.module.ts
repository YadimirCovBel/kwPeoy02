import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { NotaNuevaComponent } from './nota-nueva/nota-nueva.component';
import { ControlMaquinasComponent } from './control-maquinas/control-maquinas.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path: 'nota-nueva', component: NotaNuevaComponent},
  {path: 'login', component: LogInComponent},
  {path: 'control-maquinas', component: ControlMaquinasComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
