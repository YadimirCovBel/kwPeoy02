import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-control-maquinas',
  templateUrl: './control-maquinas.component.html',
  styleUrls: ['./control-maquinas.component.css']
})
export class ControlMaquinasComponent {
  constructor(private http: HttpClient) {}

  toggleEstado() {
    this.http.get('/estado').subscribe((data: any) => {
      const nuevoValor = data.valor === 0 ? 1 : 0;
      this.http.post('/estado', { valor: nuevoValor }).subscribe();
    });
  }
}