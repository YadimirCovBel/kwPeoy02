import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'nota-nueva', component: NotaNuevaComponent },
    { path: 'logIn', component: LogInComponent },
    { path: 'control-maquinas', component: ControlMaquinasComponent },
  ];
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
