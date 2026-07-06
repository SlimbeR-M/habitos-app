import type { Identifiable } from "../models/interfaces/Identifiable";

export class Repository<T extends Identifiable> {
    private items: T[] = [];

    agregar(item: T):void {
        this.items.push(item);
    }

    obtenerTodos(): T[] {
        return [...this.items];
    }

    obtenerPorId(id: number): T | undefined {
        return this.items.find(item => item.id === id );
    }

    eliminar(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    actualizar(id: number, datosNuevos: T): void {
        let indice = this.items.findIndex(item => item.id === id);

        if(indice !== -1){
            this.items[indice] = datosNuevos;
        }
    }
}