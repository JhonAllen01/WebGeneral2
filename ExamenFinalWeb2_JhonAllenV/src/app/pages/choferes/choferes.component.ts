import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChoferesForm } from 'src/app/shared/formModel/choferForm';
import { ChoferesService } from 'src/app/shared/services/choferes.service';
import { LicenciasComponent } from './licencias/licencias.component';
import { Licencias } from 'src/app/shared/models/licencias';

@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss'],
})
export class ChoferesComponent {
  constructor(
    private srvChoferes: ChoferesService,
    public choferForm: ChoferesForm,
    public dialog: MatDialog,
    private mensajeria: ToastrService
  ) {}

  openDialog() {
    let dialogoOpen;
    dialogoOpen = this.dialog.open(LicenciasComponent, {
      height: '500px',
      width: '800px',
    });
    dialogoOpen.afterClosed().subscribe((licenciasEscogidas: Licencias) => {
      this.choferForm.baseForm.patchValue({
        /*cedula: this.data.chofer.cedula,
        nombre: this.data.chofer.nombre,
        apellido1: this.data.chofer.apellido1,
        apellido2: this.data.chofer.apellido2,
        fechaNac: this.data.chofer.fechaNac,*/
        licencias: [licenciasEscogidas],
        //estado: true
      });
    });
  }
  SaveDriver() {
    if (this.choferForm.baseForm.valid) {
      this.srvChoferes.create(this.choferForm.baseForm.value).subscribe(
        (datos) => {
          console.log(datos);
          this.mensajeria.success('Chofer creado');
        },
        (error) => {
          this.mensajeria.error('Error');
        }
      );
    }
  }
  GetLicense(): any {
    const licencias = this.choferForm.baseForm.get('licencias');
    if (licencias && licencias.value.length > 0) {
      const licenciasEscogida = licencias.value.find(
        (licencia: { nombre: any }) => licencia.nombre
      );
      return (licenciasEscogida && licenciasEscogida.nombre) || '';
    }
  }
}
