import type { Completable } from "./interfaces/Completable";
import type { Priority }  from "./Priority";
import { Status }from "./Status";


export abstract class Task implements Completable {
    protected id: number;
    public nombre: string;
    public prioridad: Priority;
    public estado: Status;
    public descripcion: string;
    public completado: boolean;
    constructor(
        id: number,
        nombre: string,
        prioridad: Priority,
        descripcion: string,
        estado: Status = Status.Pendiente,
        completado: boolean = false,
    ) {
        this.id = id;
        this.nombre = nombre;
        this.prioridad = prioridad;
        this.estado = estado;
        this.descripcion = descripcion;
        this.completado = completado;
    };

    marcarCompletado():void {
        this.completado = true;
    }

    abstract obtenerDescripcion(): string;
}