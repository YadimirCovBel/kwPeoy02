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
    const preciosObj = this.preciosService.obtenerPrecios(this.clienteSeleccionado);
    this.precios = preciosObj ? Object.keys(preciosObj).map(key => ({
      servicio: key,
      precio: preciosObj[key]
    })) : [];
  }
}
}