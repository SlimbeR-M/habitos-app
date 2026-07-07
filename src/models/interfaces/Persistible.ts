export interface Persistible {
    guardar(clave: string, datos: any): void;
    obtener(clave: string): any | null;
}