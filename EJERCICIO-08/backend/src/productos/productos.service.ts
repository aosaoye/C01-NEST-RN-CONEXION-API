import { Injectable } from '@nestjs/common';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  emoji: string;
}

@Injectable()
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Burger', precio: 9.95, emoji: '🍔' },
    { id: 2, nombre: 'Pizza', precio: 11.5, emoji: '🍕' },
    { id: 3, nombre: 'Taco', precio: 7.5, emoji: '🌮' },
    { id: 4, nombre: 'Sushi', precio: 14.0, emoji: '🍣' },
  ];

  findAll(): Producto[] {
    return this.productos;
  }
}
