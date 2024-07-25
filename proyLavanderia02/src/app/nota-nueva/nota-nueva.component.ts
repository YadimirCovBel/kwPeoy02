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
  noteId: string = ''; //i want this to be the identification metod of each note insted of folio
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
  
  // Property to store the currently selected service for editing
  selectedServiceIndex: number | null = null;
   
  
  constructor(private http: HttpClient) {
    this.folioActual = Number(localStorage.getItem('ultimoFolio')) || 0;
      // Actualiza la fecha y hora cada segundo
      setInterval(() => this.actualizarFechaHora(), 1000);
  }
    // Método para actualizar la fecha y hora en tiempo real
    actualizarFechaHora() {
      const fechaUTC = new Date();
      const offset = fechaUTC.getTimezoneOffset() * 60000;//get timezone 
      const localISOTime = (new Date(fechaUTC.getTime() - offset)).toISOString().slice(0, -1);
      this.fechaNota = localISOTime.replace('T', ' ').replace(/\..+/, '');
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
  createNote(){
    const datosAEnviar = {
      cliente: this.clienteSeleccionado,
      servicios: this.listaServicios,
      razonDescarte: this.clienteSeleccionado === 'descartesHospitalSanJavier' 
        ? this.razonDescarteSeleccionada : undefined,
      folio: this.folioActual,
      fecha: new Date(this.fechaNota).toISOString(),
    };
    console.log('Current fechaNota value: ', this.fechaNota); // Debuggeing log
    console.log('Sending data:', datosAEnviar); // Debugging log

     // Convierte la fecha a formato ISO solo si es válida.
     const fechaISO = new Date(this.fechaNota).toISOString();

    this.http.post('http://localhost:3002/servicios', 
      datosAEnviar).subscribe({
      next: (response: any) => {
        console.log('Datos enviados', response); // Debugging log
        this.noteId = response._id; // Save the _id of the note
        
        //create a summary of the note
        const noteSummary= this.listaServicios.map(s =>
          `${s.servicio}: ${s.cantidad}`).join(', ');
          // Display the _id and summary in an alert
          alert(`Nota creada con éxito. ID de la nota: ${this.noteId}\nResume de la nota: ${noteSummary}`);
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al enviar datos', err) // Debugging log
        alert('Error al enviar la nota. ')
      }
    });

  }
    updateNote(){
      const updateData = {
        cliente: this.clienteSeleccionado,
        servicios:this.listaServicios,
      };
      this.http.put(`http://localhost:3002/servicios/${this.noteId}`, 
        updateData).subscribe({
          next: (response) => {
            console.log('Note Updated successfully', response);
            alert('Nota actualizada con exito.')
          },
          error: (err) => {
            console.error('Error updating note', err);
            alert('Error al Actualizar la nota.');
          }
      });
      
    }
    saveServiceChanges(){
      if (this.selectedServiceIndex !== null) {
        // Update the service in the listaServicios array
        this.listaServicios[this.selectedServiceIndex] = {
          servicio: this.servicioSeleccionado,
          cantidad: this.cantidad
        };
      }else{
        // If no service is selected for editing, add a new service
        this.listaServicios.push({
          servicio: this.servicioSeleccionado,
          cantidad: this.cantidad
        });
      }
        //reset the form
        this.servicioSeleccionado = '';
        this.cantidad = 0;
        this.selectedServiceIndex = null;
        
        //if editing an existing note, send a put request to the backend
        if (this.noteId){
          this.updateNote();
        };
        
  
        //
        // Clear the form and reset the selectedServiceIndex
        this.servicioSeleccionado = '';
        this.cantidad = 0;
        this.selectedServiceIndex = null;
  
      }
  enviarDatos() {

     try {
      // Validate the date before proceeding.
    if (!this.fechaNota || isNaN(new 
      Date(this.fechaNota).getTime())) {
        alert('La fecha de la nota no es válida. Por favor, verifique.');
      return; // Stop the function if the date is not valid.
    } if(this.noteId) {
        //If noteId is set, Update the existing note
        this.updateNote();

      }else{
        //If noteId is not set, create a new note
        this.createNote();
        }
      } catch (error) {
        console.error('Error al preparar o enviar los datos:', error);
        alert('Hubo un error al preparar los datos para enviar. por favor, revise el formulario. ')
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

  editNote(index: number) {
    // SelectedServiceIndex to the index of the service to be edited
    this.selectedServiceIndex = index;
    // Load the service data into the form fields
    const serviceToEdit = this.listaServicios[index];
    this.servicioSeleccionado = serviceToEdit.servicio;
    this.cantidad = serviceToEdit.cantidad;
  }

  //added metod to delete services from the list
  deleteService(index: number) {
    this.listaServicios.splice(index, 1);
  }
  // Call this method when the user saves the changes to the service
  

  }
