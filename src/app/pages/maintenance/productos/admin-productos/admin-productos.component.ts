import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductosForm } from 'src/app/shared/formsModels/productosForms';
import { Categoria } from 'src/app/shared/models/categoria';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss'],
})
export class AdminProductosComponent {
  titulo = 'Crear producto';
  isCreate = true;
  //[]=[] significa que permite inicializar vacia
  listaCategorias: Categoria[] = [];

  constructor(
    public productosForm: ProductosForm,
    private svrProductos: ProductosService, //el nombre producto es el mismo del abrirDialog() en productoscomponent
    @Inject(MAT_DIALOG_DATA) public data: { producto: any },
    private mensajeria: ToastrService,
    private srvCategorias: CategoriasService
  ) {}

  ngOnInit() {
    if (this.data?.producto) {
      this.isCreate = false;
      this.titulo = 'Modificar producto';
      this.cargarDatosForm();
    } else {
      this.isCreate = true;
      this.titulo = 'Crear producto';
    }

    this.cargarCombos();
  }

  cargarCombos(): void {
    this.srvCategorias.getAll().subscribe((lista) => {
      this.listaCategorias = lista;
    });
    //console.log(this.listaCategorias);
  }

  cargarDatosForm(): void {
    //baseForm.setValue = uno por uno
    //baseForm.patchValue = todo
    this.productosForm.baseForm.patchValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      precio: this.data.producto.precio,
      stock: this.data.producto.stock,
      fechaIngreso: formatDate(
        this.data.producto.fechaIngreso,
        'yyyy-MM-dd',
        'en'
      ),
      categoria: this.data.producto.categoria.id,
      estado: true,
    });
  }

  guardar(): void {
    //ver si paso las validaciones para guadar los datos de entrada
    if (this.productosForm.baseForm.valid) {
      if (this.isCreate) {
        this.svrProductos.guardar(this.productosForm.baseForm.value).subscribe(
          (dato) => {
            this.productosForm.baseForm.reset();
            this.mensajeria.success('Se guardo correctamente');
          },
          (error) => {
            this.mensajeria.error(`Se produjo un error. ${error}`);
          }
        );
      }
    } else {
      this.svrProductos.modificar(this.productosForm.baseForm.value).subscribe(
        (dato) => {
          this.productosForm.baseForm.reset();
          this.mensajeria.success('Se modifico correctamnte');
        },
        (error) => {
          this.mensajeria.error(`Se produjo un error. ${error}`);
        }
      );
    }
  }
}
