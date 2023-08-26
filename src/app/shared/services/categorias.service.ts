import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service';
import { Observable, catchError } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient, private handler: ProductosService) { }

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>("http://localhost:3000/Categorias").
      pipe(catchError(this.handler.handlerError));
  }
}
