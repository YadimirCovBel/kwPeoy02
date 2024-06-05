import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PreciosService } from '../precios.service';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnChanges {
  @Input() clienteSeleccionado: string = '';
  precios: { servicio: string, precio: number }[] = [];

  constructor(private preciosService: PreciosService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clienteSeleccionado']) {
      this.cargarPrecios();
    }
  }
  cargarPrecios() {
    // Nos suscribimos al Observable para obtener los precios
    this.preciosService.obtenerPrecios(this.clienteSeleccionado).subscribe(preciosObj => {
      // Verificamos que preciosObj no sea null
      if (preciosObj) {
        // Mapeamos los precios a un arreglo para usarlos en la vista
        this.precios = Object.keys(preciosObj).map(key => ({
          servicio: key,
          precio: preciosObj[key]
        }));
      } else {
        // Manejamos el caso cuando preciosObj es null
        console.error('No se pudieron cargar los precios');
        this.precios = []; // Limpia los precios si no se obtienen datos
      }
    }, error => {
      // Manejamos cualquier error que ocurra durante la suscripción
      console.error('Error al cargar los precios', error);
      this.precios = [];
    });
  }
}