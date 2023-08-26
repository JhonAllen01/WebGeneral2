import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class UsuarioForm {

    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            id: [0, [Validators.required]],
            nombre: ['', [Validators.required]],
            apellido1: ['', [Validators.required]],
            apellido2: ['', [Validators.required]],
            correo: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.minLength(10)]],
            rol: ['', [Validators.required]],
            estado: [true]
        })
    }
}