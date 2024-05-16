import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nota-nueva',
  templateUrl: './nota-nueva.component.html',
  styleUrls: ['./nota-nueva.component.css']
})
export class NotaNuevaComponent {
  clienteSeleccionado = '';
  servicioSeleccionado = '';
  cantidad = 0;
  folioActual = 0; // Para el folio automático
  fechaNota = '';     // Propiedad para la fecha y hora de la nota
  razonDescarteSeleccionada = ''; // <-- Nueva propiedad para el que aparesca el selector para indicar razon del descarte
  listaServicios: { servicio: string; cantidad: number; }[] = [];
  razonesDescarte = ['Clorhexidina', 'Arrastre', 'Tinta', 'Rota/Vieja', 'Cloro', 'Punto Azul']; // <-- Nuevo arreglo para indicar la razon de descarte
  clientes = [
    { nombre: 'hospitalSanJavier', servicios: [ 'cobertor', 'toallaDeBaño', 'toallaDeMano', 'tapeteDeBaño' /* ... servicios ... */] },
    { nombre: 'descartesHospitalSanJavier', servicios: [ 'toallaDeBañoDescartes', 'toallaDeManoDescartes', 'tapeteDescarte', 'cobertorDescartes',] },
    { nombre: 'incrementoStockHospitalSanJavier', servicios:['cobertor', 'toallaDeBaño', 'toallaDeMano', 'tapeteDeBaño',]},
    { nombre: 'casaAlexiaDesarolloDisa', servicios: ['Almoada','fundasAlmohadas','sabana','toallaDeBaño','tapeteDeBaño','toallaDeMano','relleno','dubeth','protectorDeColchon','cobertor','edrecolcha','rodapie','servilletas','mantel','liston','bataDeBaño','banda','cubreMantel','cubreSilla','limpion','camino','cojin',] },
    { nombre: 'fenix', servicios:['Almoada', 'FundasAlmohadasViejas', 'fundasAlmohadasNuevas', 'sabanaNueva', 'sabanaVieja', 'toallaDeBañoVeja', 'toallaDeBañoNueva', 'tapeteDeBañoVieja', 'tapeteDeBañoNueva', 'toallaDeManoVieja', 'toallaDeManoNueva', 'cobertor', 'edrecolcha', 'relleno', 'dubeth', 'protectorDeColchon','cortinaBlackout','cortinaDeBaño','cortinaFrescura','rodapie','bataDeBaño','cojin','dulce','fundaCojin','servilletas','mantel','tablon','cubreMantel','liston','cubreCabrilla','cubreCharola','cubreSilla','bambalina','camino','banda','moyeton','camisa','limpion',]},
    { nombre: 'incrementoStockHospitalSanJavier', servicios: [ 'cobertor', 'toallaDeBaño', 'toallaDeMano', 'tapeteDeBaño' ] },
    { nombre: 'expoGDLmanteleria', servicios: [ 'moyeton', 'moyetonPlastificado', 'camino', 'bambalina', 'bambalinaGrande', 'cubreSilla', 'cubreCharola', 'cubreCabrilla', 'cubreMantel', 'tablon', 'tablonGrande', 'mantelGrande', 'mantelMediano', 'mantelRedondo', 'mantelImperial', 'mantelSpandex', 'servilleta', 'cortinaNegra', 'moño', 'bandera', 'filipina', 'chamarraTermica', 'chaleco', 'trajeDeBombero5pz'] },
    { nombre: 'servicioFrente', servicios: [ 'encargoPorKilo', 'planchaDocena', 'planchaPieza', 'blusas', 'camisas', 'corbatas', 'chamarras', 'playeras', 'faldas', 'pantalones', 'sacos', 'sweters', 'trajes2Pz', 'trajes3Pz', 'vestidos' ] },
    // ... otros clientes ...
  ];

  constructor(private http: HttpClient) {
      // Actualiza la fecha y hora cada segundo
      setInterval(() => this.actualizarFechaHora(), 1000);
  }

    // Método para incrementar el folio cada vez que se agrega un servicio
    generarFolio() {
      this.folioActual++; // Incrementa el folio actual
    }
    obtenerFechaGuadalajara() {
      const fechaUTC = new Date(); // Ajusta la fecha UTC a la zona horaria de Guadalajara
      this.fechaNota = fechaUTC.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }); // <-- Agregado
    }

  agregarServicio() {
    if (this.clienteSeleccionado === 'descartesHospitalSanJavier' && this.razonDescarteSeleccionada) {}// Lógica para manejar la razón del descarte
    if (this.servicioSeleccionado && this.cantidad > 0) {
      this.listaServicios.push({
        servicio: this.servicioSeleccionado,
        cantidad: this.cantidad
      });
      this.servicioSeleccionado = '';
      this.cantidad = 0;
      this.generarFolio(); // Llama al método para generar el folio
    }
  }

  enviarDatos() {
    const datosAEnviar = {
      cliente: this.clienteSeleccionado,
      servicios: this.listaServicios,
      razonDescarte: this.clienteSeleccionado === 'descartesHospitalSanJavier' ? 
      this.razonDescarteSeleccionada : undefined, // <-- Incluir razón del descarte
      folio: this.folioActual, // Incluye el folio en los datos a enviar
      fecha: this.fechaNota // Agrega la fecha a los datos a enviar <-- Agregado
    };
    //cambie 3000 por 3002
    this.http.post('http://localhost:3002/servicios', datosAEnviar).subscribe({
    next: (res) => {
      console.log('Datos enviados', res);
      // Limpia los datos después de enviar
      this.listaServicios = []; // Se limpia la lista de servicios
      this.clienteSeleccionado = ''; // Se limpia el cliente seleccionado
    },
    error: (err) => console.error('Error al enviar datos', err)
    });
  }

  // Función para obtener los servicios del cliente seleccionado
  getServiciosClienteSeleccionado() {
    const cliente = this.clientes.find(c => c.nombre === this.clienteSeleccionado);
    return cliente ? cliente.servicios : [];
  }
}