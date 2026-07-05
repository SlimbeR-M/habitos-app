import type { Priority } from "./Priority";
import { Status } from "./Status";
import { Task } from "./Task";

export class OneTimeTask extends Task {
    
    public fechaFinal: Date;
    public horaFinal: string;

    constructor(
        id: number,
        nombre: string,
        prioridad: Priority,
        descripcion: string,
        fechaFinal: Date,
        horaFinal: string,
        estado: Status = Status.Pendiente,
        completado: boolean = false,
    ){
        super(id, nombre, prioridad, descripcion ,estado,completado);
        this.fechaFinal = fechaFinal;
        this.horaFinal = horaFinal;
    };

    obtenerDescripcion(): string {
        return `${this.descripcion} (vence el ${this.fechaFinal.toLocaleDateString()} a las ${this.horaFinal})`;
    }
}