import { Injectable } from '@angular/core';
import { Productos } from '../models/producto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Productos[]> {
    return this.http.get<Productos[]>("http://localhost:3000/Productos").
      pipe(catchError(this.handlerError));
  }
  guardar(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>("http://localhost:3000/Productos", producto).
      pipe(catchError(this.handlerError));
  }
  modificar(producto: Productos): Observable<Productos> {
    console.log(producto);
    return this.http.patch<Productos>("http://localhost:3000/Productos/", producto).
      pipe(catchError(this.handlerError));
  }
  eliminar(id: number): Observable<Productos> {
    return this.http.delete<Productos>("http://localhost:3000/Productos/" + id).
      pipe(catchError(this.handlerError));
  }

  handlerError(error: HttpErrorResponse) {

    /*la variable debe de llamarse igual a
    la variable que devuelve el error en el trycatch*/

    let mensaje = 'Error desconocido';

    /*const values = Object.values(error.error);

    values.map((error) => {
      mensaje += error;
    });

    console.log(values);
    */
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }

    //class-validator


    return throwError(() => new Error(mensaje));
  }
}
