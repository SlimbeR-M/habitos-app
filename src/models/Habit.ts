import type { Priority } from "./Priority";
import { Status } from "./Status";
import { Task } from "./Task";

export class Habit extends Task {
    public racha: number;
    public ultimaFecha: string | null;

    constructor(
        id: number,
        nombre: string,
        prioridad: Priority,
        descripcion: string,
        estado: Status = Status.Pendiente,
        completado: boolean = false,
        racha: number = 0,
        ultimaFecha: string | null = null,
    ){
        super(id, nombre, prioridad, descripcion ,estado,completado);
        this.racha = racha;
        this.ultimaFecha = ultimaFecha;
    }

    static desdeObjeto(obj: any): Habit {
    return new Habit(
        obj.id,
        obj.nombre,
        obj.prioridad,
        obj.descripcion,
        obj.estado,
        obj.completado,
        obj.racha,
        obj.ultimaFecha
    );
}

    incrementarRacha(): boolean {
        const hoy = new Date().toISOString().split("T")[0];
        if(this.ultimaFecha === hoy){
            return false;
        } 
        this.racha += 1;
        this.marcarCompletado();
        this.ultimaFecha = hoy;
        return true;
    }

    romperRacha():void {
        this.racha = 0;
    }

    obtenerDescripcion(): string {
        return `${this.descripcion} (${this.racha} dias de racha)`;
    }
}