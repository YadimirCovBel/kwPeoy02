import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private preciosPorCliente: { [key: string]: { [servicio: string]: number } } = {
    //estructura de precios 
    fenix:{
      Almoada:12.27,
      FundasAlmohadasViejas: 2.30,
      fundasAlmohadasNuevas: 2.30,
      sabanaNueva: 4.76,
      sabanaVieja: 4.76,
      toallaDeBañoVeja: 4.23,
      toallaDeBañoNueva: 4.23,
      tapeteDeBañoVieja: 2.50,
      tapeteDeBañoNueva: 2.50,
      toallaDeManoVieja: 2.12,
      toallaDeManoNueva: 2.12,
      cobertor: 50.06,
      edrecolcha: 50.06,
      relleno: 21.53,
      dubeth: 21.53,
      protectorDeColchon: 14.45,
      cortinaBlackout: 46.32,
      cortinaDeBaño: 5.25,
      cortinaFrescura: 78.25,
      rodapie: 14.45,
      bataDeBaño: 32.55,
      cojin: 18.76,
      dulce: 3.26,
      fundaCojin: 3.26,
      servilletas: 2.5,
      mantel:12.52,
      tablon: 12.52,
      cubreMantel: 6.26,
      liston: 3.75,
      cubreCabrilla: 5.01,
      cubreCharola: 3.13,
      cubreSilla: 5.01,
      bambalina: 68.84,
      camino: 3.75,
      banda: 3.75,
      moyeton: 12.52,
      camisa: 53.30,
      limpion: 1.56

    },
    hospitalSanJavier:{
      cobertor:42.64,
      toallaDeBaño: 12.09,
      toallaDeMano: 4.27,
      tapeteDeBaño: 7.11
    },
    descartesHospitalSanJavier:{
      toallaDeBañoDescartes: 105,
      toallaDeManoDescartes: 52,
      tapeteDescarte: 74,
      cobertorDescartes: 289
    },
    incrementoStockHospitalSanJavier:{
      cobertor: 289,
      toallaDeBaño: 105,
      toallaDeMano: 52,
      tapeteDeBaño: 74
    },
    expoGDLmanteleria:{
      moyeton: 12.16,
      moyetonPlastificado: 39.50,
      camino: 4.45,
      bambalina: 7.13,
      bambalinaGrande: 67.69,
      cubreSilla: 5.73,
      cubreCharola: 3.18,
      cubreCabrilla: 5.09,
      cubreMantel: 6.54,
      tablon: 10.20,
      tablonGrande: 15.29,
      mantelGrande: 15.29,
      mantelMediano: 12.16,
      mantelRedondo: 10.20,
      mantelImperial: 15.29,
      mantelSpandex: 12.16,
      servilleta: 2.55,
      cortinaNegra: 205.92,
      moño: 3.18,
      bandera: 15.29,
      filipina: 16.41,
      chamarraTermica: 88.34,
      chaleco: 12.62,
      trajeDeBombero5pz: 145.60,
    },
    casaAlexiaDesarolloDisa:{
      Almoada:12.95,
      fundasAlmohadas: 2.43,
      sabana: 5.02,
      toallaDeBaño: 7.01,
      tapeteDeBaño: 2.78,
      toallaDeMano: 2.46,
      relleno: 25.25,
      dubeth: 25.25,
      protectorDeColchon: 15.27,
      cobertor: 53.00,
      edrecolcha: 53.00,
      rodapie: 15.27,
      servilletas: 3.41,
      mantel:17.41,
      liston: 4.41,
      bataDeBaño: 34.35,
      banda: 6.94,
      cubreMantel: 7.25,
      cubreSilla: 6.2,
      limpion: 1.85,
      camino: 4.4,
      cojin: 22.02,      
    },
    servicioFrente:{

    }
  };
  constructor() { }

  //metodo para obtener los precios basados en el cliente
  obtenerPrecios(cliente: string): { [servicio: string]: number } | null {
    return this.preciosPorCliente[cliente] || null;
  }

}
