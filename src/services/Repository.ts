import type { Identifiable } from "../models/interfaces/Identifiable";
import type { Persistible } from "../models/interfaces/Persistible";

export class Repository<T extends Identifiable> {
    private items: T[] = [];
    private storage: Persistible;
    private clave: string;
    private crearInstancia: (data: any) => T;

    constructor(storage: Persistible, clave: string, crearInstancia: (data: any) => T) {
        this.storage = storage;
        this.clave = clave;
        this.crearInstancia = crearInstancia;

        let datos = this.storage.obtener(this.clave);
        if (datos) {
            this.items = datos.map((item: any) => this.crearInstancia(item));
        }
    }

    agregar(item: T):void {
        this.items.push(item);
        this.storage.guardar(this.clave, this.items);
    }

    obtenerTodos(): T[] {
        return [...this.items];
    }

    obtenerPorId(id: number): T | undefined {
        return this.items.find(item => item.id === id );
    }

    eliminar(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
        this.storage.guardar(this.clave, this.items);
    }

    actualizar(id: number, datosNuevos: T): void {
        let indice = this.items.findIndex(item => item.id === id);

        if(indice !== -1){
            this.items[indice] = datosNuevos;
            this.storage.guardar(this.clave, this.items);
        }
    }
}