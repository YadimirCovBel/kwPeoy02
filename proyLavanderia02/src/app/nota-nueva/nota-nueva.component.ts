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
  fechaNota = ''; // Propiedad para la fecha y hora de la nota
  razonDescarteSeleccionada = ''; // Nueva propiedad para el selector de razón del descarte
  listaServicios: { servicio: string; cantidad: number; }[] = [];
  razonesDescarte = ['Clorhexidina', 'Arrastre', 'Tinta', 'Rota/Vieja', 'Cloro', 'Punto Azul'];
  clientes = [
    { nombre: 'hospitalSanJavier', servicios: [ 'cobertor', 'toallaDeBaño', 'toallaDeMano', 'tapeteDeBaño' /* ... servicios ... */] },
    { nombre: 'descartesHospitalSanJavier', servicios: [ 'toallaDeBañoDescartes', 'toallaDeManoDescartes', 'tapeteDescarte', 'cobertorDescartes',] },
    { nombre: 'incrementoStockHospitalSanJavier', servicios:['cobertor', 'toallaDeBaño', 'toallaDeMano', 'tapeteDeBaño',]},
    { nombre: 'casaAlexiaDesarolloDisa', servicios: ['Almoada','fundasAlmohadas','sabana','toallaDeBaño','tapeteDeBaño','toallaDeMano','relleno','dubeth','protectorDeColchon','cobertor','edrecolcha','rodapie','servilletas','mantel','liston','bataDeBaño','banda','cubreMantel','cubreSilla','limpion','camino','cojin',] },
    { nombre: 'fenix', servicios:['Almoada', 'FundasAlmohadasViejas', 'fundasAlmohadasNuevas', 'sabanaNueva', 'sabanaVieja', 'toallaDeBañoVeja', 'toallaDeBañoNueva', 'tapeteDeBañoVieja', 'tapeteDeBañoNueva', 'toallaDeManoVieja', 'toallaDeManoNueva', 'cobertor', 'edrecolcha', 'relleno', 'dubeth', 'protectorDeColchon','cortinaBlackout','cortinaDeBaño','cortinaFrescura','rodapie','bataDeBaño','cojin','dulce','fundaCojin','servilletas','mantel','tablon','cubreMantel','liston','cubreCabrilla','cubreCharola','cubreSilla','bambalina','camino','banda','moyeton','camisa','limpion',]},
    { nombre: 'expoGDLmanteleria', servicios: [ 'moyeton', 'moyetonPlastificado', 'camino', 'bambalina', 'bambalinaGrande', 'cubreSilla', 'cubreCharola', 'cubreCabrilla', 'cubreMantel', 'tablon', 'tablonGrande', 'mantelGrande', 'mantelMediano', 'mantelRedondo', 'mantelImperial', 'mantelSpandex', 'servilleta', 'cortinaNegra', 'moño', 'bandera', 'filipina', 'chamarraTermica', 'chaleco', 'trajeDeBombero5pz'] },
    { nombre: 'servicioFrente', servicios: [ 'encargoPorKilo', 'planchaDocena', 'planchaPieza', 'blusas', 'camisas', 'corbatas', 'chamarras', 'playeras', 'faldas', 'pantalones', 'sacos', 'sweters', 'trajes2Pz', 'trajes3Pz', 'vestidos' ] },
    // ... otros clientes ...
  ];
  
  
  constructor(private http: HttpClient) {
    this.folioActual = Number(localStorage.getItem('ultimoFolio')) || 0;
      // Actualiza la fecha y hora cada segundo
      setInterval(() => this.actualizarFechaHora(), 1000);
  }
    // Método para actualizar la fecha y hora en tiempo real
    actualizarFechaHora() {
      const fechaUTC = new Date();
      this.fechaNota = fechaUTC.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
    }
    
    // Método para incrementar el folio cada vez que se agrega un servicio
    generarFolio() {
      this.folioActual++; // Incrementa el folio actual
      localStorage.setItem('ultimoFolio', this.folioActual.toString());
    }

  agregarServicio() {
    if (this.clienteSeleccionado === 'descartesHospitalSanJavier' && !this.razonDescarteSeleccionada) {
      console.error('Debes seleccionar una razón de descarte');
      return; // No permitir agregar el servicio si no se ha seleccionado una razón de descarte
    }// Lógica para manejar la razón del descarte
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

     try {
    // Verifica que this.fechaNota sea una fecha válida.
    if (!this.fechaNota || isNaN(new Date(this.fechaNota).getTime())) {
      throw new Error('La fechaNota no es una fecha válida.');
    }

     // Convierte la fecha a formato ISO solo si es válida.
     const fechaISO = new Date(this.fechaNota).toISOString();
     const datosAEnviar = {
          cliente: this.clienteSeleccionado,
          servicios: this.listaServicios,
          razonDescarte: this.clienteSeleccionado === 'descartesHospitalSanJavier' 
            ? this.razonDescarteSeleccionada : undefined,
          folio: this.folioActual,
          fecha: fechaISO,
        };
  
        this.http.post('http://localhost:3002/servicios', datosAEnviar).subscribe({
          next: (res) => {
            console.log('Datos enviados', res);
            this.limpiarFormulario();
          },
          error: (err) => console.error('Error al enviar datos', err)
        });
      } catch (error) {
        console.error('Error al preparar o enviar los datos:', error);
      }
    }

    limpiarFormulario() {
      this.listaServicios = [];
      this.clienteSeleccionado = '';
      this.servicioSeleccionado = '';
      this.cantidad = 0;
      this.razonDescarteSeleccionada = '';
      this.folioActual++;
    }

  // Función para obtener los servicios del cliente seleccionado
  getServiciosClienteSeleccionado() {
    const cliente = this.clientes.find(c => c.nombre === this.clienteSeleccionado);
    return cliente ? cliente.servicios : [];
  }
}