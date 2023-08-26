import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";


@Entity()
export class CategoriaProducto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column()
    estado: boolean;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];
}