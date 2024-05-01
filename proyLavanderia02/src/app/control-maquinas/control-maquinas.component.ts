import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-control-maquinas',
  templateUrl: './control-maquinas.component.html',
  styleUrls: ['./control-maquinas.component.css']
})
export class ControlMaquinasComponent implements OnInit {
  estado = 0;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // se borro esto this.toggleEstado();
  }

toggleEstado() {
  const nuevoValor = this.estado === 0 ? 1 : 0; //movi el cosnt de lugar 
  this.http.post('http://localhost:3000/estado', { valor: nuevoValor }).subscribe(() => {
      this.estado = nuevoValor; // Actualiza el estado local
      console.log('Nuevo valor: ', nuevoValor); // Imprime el nuevo valor en la consola del navegador
      // No necesitamos recargar la página aquí, ya que el estado se ha actualizado
    });
}
}
