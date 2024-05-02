import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nota-nueva',
  templateUrl: './nota-nueva.component.html',
  styleUrls: ['./nota-nueva.component.css']
})
export class NotaNuevaComponent {
  cantidadSeleccionada = '';
  servicioSeleccionado = '';
  cantidad = 0;
  listaServicios = [];
  clientes = [
    { nombre: 'hoteleria', servicios: ['Almoada', 'Fundas Almohadas Viejas', 'fundasAlmohadasNuevas', 'sabanaNueva', 'sabanaVieja', 'toallaDeBañoVeja', 'toallaDeBañoNueva', 'tapeteDeBañoVieja', 'tapeteDeBañoNueva', 'toallaDeManoVieja', 'toallaDeManoNueva', 'toallaFacial', 'bataDeBaño', 'cobertor', 'edrecolcha', 'relleno', 'cortinaDeBaño', 'rodapie', 'dubeth', 'protectorDeColchon', 'pieDeCama', 'limpion', 'cortinaBlackout' /* ... otros servicios ... */] },
    { nombre: 'hospital', servicios: [ 'cobertor', 'toallaDeBaño', 'toallaDeMano', 'tapeteDeBaño' /* ... servicios ... */] },
    { nombre: 'descartesHospital', servicios: [ 'toallaDeBañoDescartesClorhexidina', 'toallaDeBañoDescartesArrastre', 'toallaDeBañoDescartesTinta', 'toallaDeBañoDescartesVieja', 'toallaDeBañoDescartesCloro', 'toallaDeBañoDescartesPuntoAzul', 'cobertorDescartesClorhexidina', 'cobertorDescartesArrastre', 'cobertorDescartesTinta', 'cobertorDescartesVieja', 'cobertorDescartesCloro', 'cobertorDescartesPuntoAzul', 'toallaDeManoDescartesClorhexidina', 'toallaDeManoDescartesArrastre', 'toallaDeManoDescartesTinta', 'toallaDeManoDescartesVieja', 'toallaDeManoDescartesCloro', 'toallaDeManoDescartesPuntoAzul' /* ... servicios ... */] },
    { nombre: 'manteleria', servicios: [ 'moyeton', 'moyetonPlastificado', 'banda', 'camino', 'bambalina', 'bambalinaGrande', 'cubreSilla', 'cubreCharola', 'cubreCabrilla', 'cubreMantel', 'liston', 'tablon', 'tablonGrande', 'mantelGrande', 'mantelMediano', 'mantelRedondo', 'mantelImperial', 'mantelSpandex', 'servilleta', 'cortinaNegra', 'moño', 'bandera', 'filipina', 'chamarraTermica', 'chaleco', 'trajeDeBombero5pz' /* ... servicios ... */] },// ... otros clientes ...
    { nombre: 'servicioFrente', servicios: [ 'encargoPorKilo', 'planchaDocena', 'planchaPieza', 'blusas', 'camisas', 'corbatas', 'chamarras', 'playeras', 'faldas', 'pantalones', 'sacos', 'sweters', 'trajes2Pz', 'trajes3Pz', 'vestidos' /* ... servicios ... */] },
    
  ];

  constructor(private http: HttpClient) {}

  agregarServicio() {
    if (this.servicioSeleccionado && this.cantidad > 0) {
      this.listaServicios.push({
        servicio: this.servicioSeleccionado,
        cantidad: this.cantidad
      });
      this.servicioSeleccionado = '';
      this.cantidad = 0;
    }
  }

  enviarDatos() {
    const datosAEnviar = {
      cliente: this.clienteSeleccionado,
      servicios: this.listaServicios
    };
    this.http.post('http://tu-url-de-backend.com/servicios', datosAEnviar).subscribe(res => {
      console.log('Datos enviados', res);
    });
  }
}