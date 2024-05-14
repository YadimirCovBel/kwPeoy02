import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-acumulado-cliente',
  templateUrl: './acumulado-cliente.component.html',
  styleUrls: ['./acumulado-cliente.component.css']
})
export class AcumuladoClienteComponent {
  @Input() clienteSeleccionado!: string;
acumulado: any = {};
constructor(private http:HttpClient){}
ngOnInit(){
  this.obtenerAcumulado();
}
ngOnChanges(){
  this.obtenerAcumulado();
}
obtenerAcumulado(){
  this.http.get(`http://localhost:3002/acumulado/${this.clienteSeleccionado}`).subscribe({
    next: (res) => {
      this.acumulado = res;
    },
    error: (err) => console.error('Error al obtener el acumulado', err)
  });
}
}
