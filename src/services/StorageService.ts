import type { Persistible } from "../models/interfaces/Persistible";

export class StorageService implements Persistible {
    private static instancia: StorageService;

    private constructor(){}

    static obtenerInstancia(): StorageService {
        if(!StorageService.instancia) {
            StorageService.instancia = new StorageService();
        }
        return StorageService.instancia;
    }

    guardar(clave: string, datos: any): void {
        const info = JSON.stringify(datos);
        localStorage.setItem(clave, info);
    }

    obtener(clave: string): any | null  {
        let datosGuardados = localStorage.getItem(clave);
        if(datosGuardados === null){
            console.log("No hay datos guardados con esa clave");
            return null;
        } else {
            return JSON.parse(datosGuardados);
        }
    }
}