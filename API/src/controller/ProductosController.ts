import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Producto } from '../entity/Producto';
import { validate } from 'class-validator';
import { CategoriaProducto } from '../entity/CategoriaProducto';

export class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    //AppDataSource= repositorio para acceder a mi base de datos
    //ver status code en el campus

    try {
      const productosRepo = AppDataSource.getRepository(Producto);
      const listaProductos = await productosRepo.find({
        where: { estado: true },
        relations: { categoria: true },
      });

      if (listaProductos.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encontraron resultados' });
      }

      return resp.status(200).json(listaProductos);
    } catch (error) {
      return resp.status(400).json({ error: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    //obtener el valor del id, como parametro lleva el mismo nombre
    //que le dimos en productos.ts
    //findOne = encontrar solo uno
    //find = devolver lista

    try {
      const id = parseInt(req.params['id']);

      if (!id) {
        return resp.status(404).json({ mensaje: 'No encontrado el Id' });
      }

      const productosRepo = AppDataSource.getRepository(Producto);
      let producto;

      try {
        producto = await productosRepo.findOneOrFail({
          where: { id: id, estado: true },
          relations: { categoria: true },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No se encontro el Id' });
      }

      return resp.status(200).json({ mensaje: producto });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING = agarrar el cuerpo y descomponerlo,
      //para insertar valores en una variable
      //toda columna de la tabla, excepto el estado,
      //ya que se crea automaticamente cada que se insertan valores

      const { id, nombre, precio, stock, fechaIngreso, categoria } = req.body;

      //validar datos de entrada
      if (!id) {
        return resp.status(404).json({ mensaje: 'Debe indicar el Id' });
      }
      if (!nombre) {
        return resp.status(404).json({ mensaje: 'Debe indicar el nombre' });
      }

      if (!precio) {
        return resp.status(404).json({ mensaje: 'Debe indicar el precio' });
      }
      if (precio < 0) {
        return resp
          .status(404)
          .json({ mensaje: 'El precio debe ser mayor que 0' });
      }
      if (!stock) {
        return resp
          .status(404)
          .json({ mensaje: 'Debe indicar el stock del producto' });
      }
      if (stock < 0) {
        return resp
          .status(404)
          .json({ mensaje: 'El stock debe ser mayor que 0' });
      }

      //validacion de relas de negocio

      const productosRepo = AppDataSource.getRepository(Producto);
      const categoriaRepo = AppDataSource.getRepository(CategoriaProducto);
      let cat: CategoriaProducto;

      const pro = await productosRepo.findOne({ where: { id } });

      if (pro) {
        return resp.status(404).json({ mensaje: 'El producto ya existe' });
      }

      //crear producto

      const fecha = new Date();
      let producto = new Producto();

      producto.id = id;
      producto.categoria = categoria;
      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;
      producto.fechaIngreso = fecha;
      producto.estado = true;

      //validar con class-validator
      const errors = await validate(producto, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await productosRepo.save(producto);
      return resp.status(201).json({ mensaje: 'Producto creado' });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      const { id, nombre, precio, stock, fechaIngreso, categoria } = req.body;

      //findOneOrFail es siempre dentro de un trycatch
      const productosRepo = AppDataSource.getRepository(Producto);
      const categoriaRepo = AppDataSource.getRepository(CategoriaProducto);

      let pro: Producto;
      let cat: CategoriaProducto;

      try {
        pro = await productosRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No existe el producto' });
      }
      try {
        cat = await categoriaRepo.findOneOrFail({ where: { id: categoria } });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No existe la categoria' });
      }

      //let fecha = new Date();
      //let producto = new Producto();
      pro.nombre = nombre;
      pro.categoria = cat;
      pro.precio = precio;
      pro.stock = stock;
      pro.fechaIngreso = fechaIngreso;
      pro.estado = true;
      //el id no se toca porque es llave primaria

      //validar con class-validator
      const errors = await validate(pro, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      try {
        await productosRepo.save(pro);
        return resp
          .status(200)
          .json({ mensaje: 'Producto actualizado correctamente' });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No se pudo guardar' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params['id']);

      if (!id) {
        return resp.status(404).json({ mensaje: 'Debe indicar el Id' });
      }

      const productosRepo = AppDataSource.getRepository(Producto);
      let pro: Producto;

      try {
        pro = await productosRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: 'No se encontro el producto' });
      }

      //como el estado es true siempre que haya producto
      //al ponerle false se borra automaticamente
      pro.estado = false;
      try {
        await productosRepo.save(pro);
        return resp
          .status(200)
          .json({ mensaje: 'Producto eliminado correctamente' });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No se pudo eliminar' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: 'No se pudo eliminar' });
    }
  };
}

export default ProductosController;
