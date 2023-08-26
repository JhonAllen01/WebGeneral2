import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehiculo } from "./Vehiculo";
import {
  IsNumber,
  IsString,
  IsBoolean,
  ValidateNested,
  IsEmpty,
} from "class-validator";

@Entity()
export class Tipo_Vehiculo {
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
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.id_marca)
  @ValidateNested({ each: true, message: "Los vehículos no son válidos." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  vehiculos: Vehiculo[];
}
