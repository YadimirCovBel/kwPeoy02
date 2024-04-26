import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-control-maquinas',
  templateUrl: './control-maquinas.component.html',
  styleUrls: ['./control-maquinas.component.css']
})
export class ControlMaquinasComponent implements OnInit {
  estado = 0
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.toggleEstado();
  }

  toggleEstado() {
    this.http.get('/estado').subscribe((data: any) => {
     this.estado = data.valor;
      const nuevoValor = this.estado === 0 ? 1 : 0;
      this.http.post('/estado', { valor: nuevoValor }).subscribe();
    });
  }
}