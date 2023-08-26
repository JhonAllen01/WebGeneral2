import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioForm } from 'src/app/shared/formsModels/usuariosForm';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss']
})
export class AdminClientesComponent {

  titulo = '';
  isCreate = true;

  constructor(public usuarioForm: UsuarioForm,
    private srvUsuario: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: any }) { }


  ngOnInit() {
    if (this.data?.usuario) {
      this.isCreate = false;
      this.titulo = 'Actualizar un usuario';
      this.cargarDatos();
    } else {
      this.isCreate = true;
      this.titulo = 'Crear un usuario';
    }
  }

  cargarDatos() {
    this.usuarioForm.baseForm.patchValue({
      id: this.data.usuario.id,
      nombre: this.data.usuario.nombre,
      apellido1: this.data.usuario.apellido1,
      apellido2: this.data.usuario.apellido2,
      correo: this.data.usuario.correo,
      contrasena: this.data.usuario.contrasena,
      rol: this.data.usuario.rol,
      estado: true,
    });
  }

  guardar() {
    if (this.usuarioForm.baseForm.valid) {
      if (this.isCreate) {
        this.srvUsuario.insert(this.usuarioForm.baseForm.value).
          subscribe((dato) => {
            this.usuarioForm.baseForm.reset();
            alert('Usuario insertado');
          }, (error) => { alert('No se pudo insertar') });
      }
    } else {
      this.srvUsuario.update(this.usuarioForm.baseForm.value).
        subscribe((dato) => {
          this.usuarioForm.baseForm.reset();
          alert('Usuario actualizado');
        }, (error) => { alert('No se pudo actualizar') });
    }
  }

}
