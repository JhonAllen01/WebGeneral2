import { Categoria } from "./categoria";

export interface Productos {

    //mismos valores que tiene la entidad Productos
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    fechaIngreso: Date
    categoria: Categoria;
    estado: boolean;
}