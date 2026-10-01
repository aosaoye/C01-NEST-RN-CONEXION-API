import { Injectable } from '@nestjs/common';

export type Mascota = {
  id: number;
  nombre: string;
  likes: number;
};

@Injectable()
export class MascotasService {
  private mascotas: Mascota[] = [
    { id: 1, nombre: 'Toby', likes: 14 },
  ];

  findAll(): Mascota[] {
    return this.mascotas;
  }

  findOne(id: number): Mascota | undefined {
    return this.mascotas.find((item) => item.id === id);
  }

  darLike(id: number): Mascota | undefined {
    const mascota = this.mascotas.find((item) => item.id === id);

    if (!mascota) {
      return undefined;
    }

    mascota.likes++;
    return mascota;
  }
}
