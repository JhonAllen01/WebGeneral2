import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Persona {

    @PrimaryColumn()
    cedula: string;

    @Column()
    nombre: string;

    @Column()
    apellido1: string;

    @Column()
    apellido2: string;

    @Column()
    fechaNacimiento: Date;

    @Column()
    estado: boolean;
}