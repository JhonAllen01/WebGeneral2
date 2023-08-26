import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  IsNumber,
  IsString,
  IsBoolean,
  ValidateNested,
  IsEmpty,
} from "class-validator";
import { Vehiculo } from "./Vehiculo";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  @IsNumber({}, { message: "El ID debe ser un número." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  id: number;
  @Column()
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  nombre: string;
  @Column()
  @IsBoolean({ message: "El estado debe ser un valor booleano." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  estado: boolean;
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.id_color)
  @ValidateNested({ message: "El objeto Vehiculo no es válido." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  vehiculo: Vehiculo;
}
