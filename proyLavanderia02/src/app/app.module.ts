import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotaNuevaComponent } from './nota-nueva/nota-nueva.component';
import { LogInComponent } from './log-in/log-in.component';
import { ControlMaquinasComponent } from './control-maquinas/control-maquinas.component';

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
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
