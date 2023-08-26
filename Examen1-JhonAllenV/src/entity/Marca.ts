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
export class Marca {
  @PrimaryGeneratedColumn()
  @IsNumber({}, { message: "El ID debe ser un número." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  id: number;
  @Column()
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  nombre: String;
  @Column()
  @IsBoolean({ message: "El estado debe ser un valor booleano." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  metalizado: Boolean;
  @Column()
  @IsEmpty({ message: "El campo no debe estar vacío." })
  estado: boolean;
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.id_marca)
  @ValidateNested({ message: "El objeto Vehiculo no es válido." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  vehiculos: Vehiculo[];
}
