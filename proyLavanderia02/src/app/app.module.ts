import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotaNuevaComponent } from './components/nota-nueva/nota-nueva.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ControlMaquinasComponent } from './components/control-maquinas/control-maquinas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotaNuevaComponent,
    LogInComponent,
    ControlMaquinasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
