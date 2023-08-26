import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class Cliente{
    @PrimaryColumn()
    cedula: number;
    @Column()
    nombre: string;
    @Column()
    apellido1: string;
    @Column()
    apellido2: string;
    @Column()
    fechaNacimiento: Date;
    @Column()
    genero: string;
    @Column()
    estado: Boolean;
}


