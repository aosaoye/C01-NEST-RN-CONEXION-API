import { Injectable, NotFoundException } from '@nestjs/common';

export interface Heroe {
  id: number;
  nombre: string;
  poder: number;
  universo: string;
}

@Injectable()
export class HeroesService {
  private heroes: Heroe[] = [
    { id: 1, nombre: 'Nova', poder: 80, universo: 'A' },
    { id: 2, nombre: 'Titan', poder: 95, universo: 'B' },
    { id: 3, nombre: 'Volt', poder: 88, universo: 'A' },
  ];

  findOne(id: number): Heroe {
    const heroe = this.heroes.find(h => h.id === id);
    if (!heroe) {
      throw new NotFoundException(`Héroe con ID ${id} no encontrado`);
    }
    return heroe;
  }
}
