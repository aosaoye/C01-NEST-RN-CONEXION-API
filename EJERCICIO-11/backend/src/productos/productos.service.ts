import { Injectable } from '@nestjs/common';

export type NuevoProducto = {
  nombre: string;
  precio: number;
};

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

@Injectable()
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Mochila', precio: 35 },
    { id: 2, nombre: 'Auriculares', precio: 49 },
  ];

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto | undefined {
    return this.productos.find((p) => p.id === id);
  }

  crear(producto: NuevoProducto): Producto {
    const nuevo: Producto = {
      id: this.productos.length + 1,
      ...producto,
    };

    this.productos.push(nuevo);
    return nuevo;
  }
}
