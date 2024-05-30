import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreciosService } from '../precios.service';

@Component({
  selector: 'app-acumulado-cliente',
  templateUrl: './acumulado-cliente.component.html',
  styleUrls: ['./acumulado-cliente.component.css']
})
export class AcumuladoClienteComponent implements OnInit, OnChanges {
  @Input() clienteSeleccionado!: string;
acumulado: any = {};
// propiedades para las fechas
fechaInicio: string = ''; // Valor por defecto asignado
  fechaFin: string = ''; 
// Agrega un arreglo para almacenar los servicios
servicios: any[] = [];
clientes: any[] = [];
precios: any[] = [];

constructor(private http:HttpClient, private preciosService: PreciosService){}
ngOnInit(){
  this.obtenerAcumulado();
  this.cargarPrecios(); // llamar a esta función para cargar los precios

}
ngOnChanges(){
    if (this.clienteSeleccionado && this.fechaInicio && this.fechaFin) {
      this.obtenerAcumulado();
    }
  }

  cargarClientes() {
    // Para obtener los clientes
    const urlClientes = 'http://localhost:3002/clientes';
    this.http.get<any[]>(urlClientes).subscribe({
      next: (res) => {
        this.clientes = res;
      },
      error: (err) => console.error('Error al cargar los clientes', err)
    });
  }

    cargarPrecios() {
    // Usa PreciosService para obtener los precios
    
       if (this.clienteSeleccionado) {
      this.preciosService.obtenerPrecios(this.clienteSeleccionado).subscribe({
        next: (preciosObj) => {
          if (preciosObj) {
            this.precios = Object.keys(preciosObj).map(key => ({
              servicio: key,
              precio: preciosObj[key]
            }));
          } else {
            console.error('No se encontraron precios para el cliente seleccionado');
            this.precios = [];
          }
        },
        error: (err) => {
          console.error('Error al cargar los precios', err);
          this.precios = [];
        }
      });
    } else {
      console.error('No se ha seleccionado ningún cliente');
    }
  }

  obtenerAcumulado() {
    // Validar que los datos
    if (!this.clienteSeleccionado || !this.fechaInicio || !this.fechaFin) {
      console.error('Datos de cliente o fechas no proporcionados');
      return;
    }
// Actualiza la URL para incluir las fechas como parámetros de consulta
const url = `http://localhost:3002/acumulado/${this.clienteSeleccionado}?fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}`;
  this.http.get<any[]>(url).subscribe({
    next: (res) => {
      this.servicios = res;
      this.procesarDatos(res);
  },
  error: (err) => {
    console.error('Error al obtener el acumulado', err);
    // Mostrar mensaje de error al usuario
    alert('Hubo un error al obtener los datos del acumulado.');
  }
  
});
}
procesarDatos(datos: any[]) {

}
}
