import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private handler: ProductosService) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>("http://localhost:3000/Usuarios").
      pipe(catchError(this.handler.handlerError));
  }

  insert(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>("http://localhost:3000/Usuarios", usuario).
      pipe(catchError(this.handler.handlerError));
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>("http://localhost:3000/Usuarios", usuario).
      pipe(catchError(this.handler.handlerError));
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>("http://localhost:3000/Usuarios/" + id).
      pipe(catchError(this.handler.handlerError));
  }
}
