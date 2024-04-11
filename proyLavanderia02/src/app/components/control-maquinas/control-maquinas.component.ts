import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-control-maquinas',
  templateUrl: './control-maquinas.component.html',
  styleUrls: ['./control-maquinas.component.css']
})
export class ControlMaquinasComponent {
  constructor(private http: HttpClient){}

  cambiarNumero(){
    this.http.post('/api/maquinas', {}).subscribe((response:any) =>{
      console.log('Numero actualizado:', response.numero);
    })
  }

}
