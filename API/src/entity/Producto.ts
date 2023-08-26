import { IsNotEmpty, MaxLength, isEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { DetalleFactura } from "./DetalleFactura";
import { CategoriaProducto } from "./CategoriaProducto";

@Entity()
export class Producto {
    //PrimaryGeneratedColumn = valor auto_incremental
    //definir tamano del campo que tendra
    //@IsEmail para validar si cumple el formato
    @PrimaryColumn()
    id: number;

    @Column({ /*length: 20*/ })
    //@MaxLength(50, { message: 'Tiene que ser menor a 5 caracteres' })
    @IsNotEmpty({ message: 'Falta el nombre' })
    nombre: string;

    @Column()
    @IsNotEmpty({ message: 'Falta el precio' })
    precio: number;

    @Column()
    @IsNotEmpty()
    stock: number;

    @Column()
    fechaIngreso: Date;

    @Column()
    estado: boolean;

    @ManyToOne(() => CategoriaProducto, (categoria) => categoria.productos)
    categoria: CategoriaProducto;

    @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.producto)
    detallesFactura: DetalleFactura[];

}