import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class ProductosForm {


    /*
        debe de tener los mismos atributos
        que tiene el modelo de productos
        de la carpeta models revisar
    */

    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            id: ['', [Validators.required]],
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            precio: [0, [Validators.required]],
            stock: [0, [Validators.required]],
            fechaIngreso: [Date.now, Validators.required],
            categoria: [1, [Validators.required]],
            estado: [true]
        });
    }
}
