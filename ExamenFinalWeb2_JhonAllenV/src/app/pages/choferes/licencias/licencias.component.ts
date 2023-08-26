import { Component } from '@angular/core';
import { LicenciasService } from 'src/app/shared/services/licencias.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.scss']
})
export class LicenciasComponent {


  displayedColumns: string[] = ['nombre', 'accion'];
  dataSource = new MatTableDataSource();

  constructor(
    private srvLicencias: LicenciasService,
    private mensajeria: ToastrService,
  ) { }

  ngOnInit() {
    this.getLicencias();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLicencias() {
    this.srvLicencias.getAll().subscribe((datos) => {
      this.dataSource.data = datos;
    }, (error) => { this.mensajeria.error('No hay licencias para mostrar'); });
  }


}
