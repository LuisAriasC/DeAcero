import { Dato } from './Dato';

export class Datos {

    constructor( mes = 0, anio = 0){
        this.mes = mes;
        this.anio = anio;
    }

    public tabla: string;
    public mes: number;
    public anio: number;
    public datos: Dato[];
}
