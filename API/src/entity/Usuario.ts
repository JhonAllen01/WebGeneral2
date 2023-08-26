import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import * as bcrypt from "bcryptjs"


@Entity()
export class Usuario{

    @PrimaryColumn()
    id:number;

    @Column()
    @IsNotEmpty({message:'Falta el nombre'})
    nombre:string;

    @Column()
    @IsNotEmpty({message:'Falta el apellido 1'})
    apellido1:string;

    @Column()
    @IsNotEmpty({message:'Falta el apellido 2'})
    apellido2:string;

    @Column({unique:true})
    @IsNotEmpty({message:'Falta el correo'})
    @IsEmail()
    correo:string;

    @Column()
    @IsNotEmpty({message:'Falta el password'})
    contrasena:string;

    @Column()
    @IsNotEmpty({message:'Falta el rol'})
    rol:string;

    @Column({default:true})
    estado:boolean;

    hashPassword():void{
        const salt=bcrypt.genSaltSync(10);
        this.contrasena=bcrypt.hashSync(this.contrasena,salt);
    }

    checkPassword(contra:string):boolean{
        return bcrypt.compareSync(contra,this.contrasena);
    }
}