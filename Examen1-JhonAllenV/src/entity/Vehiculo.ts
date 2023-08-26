import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo";
import {
  IsNumber,
  IsString,
  IsDate,
  IsBoolean,
  IsEmpty,
} from "class-validator";
import { Marca } from "./Marca";
import { Color } from "./Color";

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  @IsNumber({}, { message: "El ID debe ser un número." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  id: number;
  @Column()
  @IsString({ message: "La placa debe ser una cadena de texto." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  placa: string;
  @ManyToOne(() => Marca, (marca) => marca.vehiculos)
  @JoinColumn({ name: "id_marca" })
  @IsNumber({}, { message: "El ID de la marca debe ser un número." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  id_marca: number;
  @ManyToOne(() => Color, (color) => color.vehiculo)
  @JoinColumn({ name: "id_color" })
  @IsNumber({}, { message: "El ID del color debe ser un número." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  id_color: number;
  @Column({ unique: true })
  @IsString({ message: "El cilindraje debe ser una cadena de texto." })
  @IsEmpty({ message: "El campo no debe estar vacío." })
  cilindraje: string;
  @ManyToOne(() => Tipo_Vehiculo, (tipoVehiculo) => tipoVehiculo.vehiculos)
  @JoinColumn({ name: "id_TipoVehiculo" })
  @IsNumber({}, { message: "El ID del tipo de vehículo debe ser un número." })
  @IsEmpty({ message: "El campo np debe estar vacío." })
  id_TipoVehiculo: number;
  @Column()
  @IsNumber({}, { message: "La cantidad de pasajeros debe ser un número." })
  @IsEmpty({ message: "El campo np debe estar vacío." })
  cantidadPasajeros: number;
  @Column()
  @IsDate({ message: "La fecha de ingreso debe ser una fecha válida." })
  @IsEmpty({ message: "El campo np debe estar vacío." })
  fechaIngreso: Date;
  @Column()
  @IsEmpty({ message: "El campo np debe estar vacío." })
  @IsBoolean({ message: "El estado debe ser un valor booleano." })
  estado: boolean;
}
