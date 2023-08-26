import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { AdminClientesComponent } from './admin-usuarios/admin-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  displayedColumns: string[] = [
    'id', 'nombre', 'apellido1',
    'apellido2', 'correo', 'rol'
    /*'contrasena'*/, 'acciones'];
  dataSource = new MatTableDataSource();

  constructor(private srvUsuarios: UsuariosService, public dialog: MatDialog) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.srvUsuarios.getAll().subscribe((datos) => {
      this.dataSource.data = datos
    });
  }

  abrirDialog(usuario?: Usuario): void {
    if (usuario) {
      this.dialog.open(AdminClientesComponent, {
        width: '650px', height: '650px', data: { usuario },
      });
    } else {
      this.dialog.open(AdminClientesComponent, {
        width: '650px', height: '650px'
      });
    }
  }

  delete(id: number): void {
    this.srvUsuarios.delete(id).subscribe((dato) => {
      alert('Se elimino el usuario');
    }, (error) => {
      alert('Error al eliminar playazo');
    })

  }
}


