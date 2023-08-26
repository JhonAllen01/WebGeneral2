import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

const lista = [
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
];

@NgModule({
  exports: [...lista],
  imports: [...lista],
})
export class MaterialModule { }
