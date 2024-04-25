import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nota-nueva',
  templateUrl: './nota-nueva.component.html',
  styleUrls: ['./nota-nueva.component.css']
})
export class NotaNuevaComponent {
  servicioSeleccionado = '';
  cantidad = 0;
  cantidadSeleccionada = '';

  constructor(private http: HttpClient){}//servicio
  agregarCantidad() {
    this.cantidadSeleccionada = `Cantidad seleccionada: ${this.cantidad}`;
  
}

enviarFormulario() {
  // Aquí puedes enviar los datos a tu backend
  // Puedes usar HttpClient para hacer una petición HTTP a tu servidor
  const datos = {
    servicio: this.servicioSeleccionado,
    cantidad: this.cantidad
  };
  // Realizar la solicitud POST al backend (reemplaza la URL con la tuya)
  this.http.post('http://tu-url-de-backend.com', datos).subscribe(res => {
    console.log(res); // Manejar la respuesta del backend aquí
  });

}
}