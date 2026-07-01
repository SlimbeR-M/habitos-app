import type { Completable } from "./interfaces/Completable";
import { Priority }  from "./Priority";
import { Status }from "./Status";


export abstract class Task implements Completable {
    protected id: number;
    public nombre: string;
    public prioridad: Priority;
    public estado: Status;
    public fechaFinal: Date;
    public horaFinal: string;
    public completado: boolean;
    constructor(
        id: number,
        nombre: string,
        prioridad: Priority,
        fechaFinal: Date,
        horaFinal: string,
        estado: Status = Status.Pendiente,
        completado: boolean = false,
    ) {
        this.id = id;
        this.nombre = nombre;
        this.prioridad = prioridad;
        this.estado = estado;
        this.fechaFinal = fechaFinal;
        this.horaFinal = horaFinal;
        this.completado = completado;
    };

    marcarCompletado():void {
        this.completado = true;
    }

    abstract obtenerDescripcion(): string;
}