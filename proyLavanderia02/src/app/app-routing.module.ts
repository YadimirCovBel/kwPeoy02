import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotaNuevaComponent } from './components/nota-nueva/nota-nueva.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ControlMaquinasComponent } from './components/control-maquinas/control-maquinas.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'nota-nueva', component: NotaNuevaComponent },
    { path: 'logIn', component: LogInComponent },
    { path: 'control-maquinas', component: ControlMaquinasComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
