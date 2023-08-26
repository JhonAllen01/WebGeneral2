import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ChoferesForm {
    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            cedula: ['', [Validators.required, Validators.maxLength(12)]],
            nombre: ['', [Validators.required, Validators.maxLength(50)]],
            apellido1: ['', [Validators.required, Validators.maxLength(50)]],
            apellido2: ['', [Validators.required, Validators.maxLength(50)]],
            fechaNac: [Date, [Validators.required]],
            licencias: [0, [Validators.required]],
            estado: [true],
        });
    }
}