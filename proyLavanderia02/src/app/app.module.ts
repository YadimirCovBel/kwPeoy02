import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotaNuevaComponent } from './nota-nueva/nota-nueva.component';
import { LogInComponent } from './log-in/log-in.component';
import { ControlMaquinasComponent } from './control-maquinas/control-maquinas.component';
import { ListaPreciosComponent } from './lista-precios/lista-precios.component';
import { AcumuladoClienteComponent } from './acumulado-cliente/acumulado-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotaNuevaComponent,
    LogInComponent,
    ControlMaquinasComponent,
    ListaPreciosComponent,
    AcumuladoClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
