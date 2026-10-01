import { Injectable, NotFoundException } from '@nestjs/common';
import { MASCOTAS_API } from '../constants/petsApi.js';


export interface Pet {
    id: number;
    nombre: string;
    raza: string;
    edad: number;
    imagen: string;
}

@Injectable()
export class MascotasService {

    private readonly mascotas: Pet[] = MASCOTAS_API;

    async findAll(): Promise<Pet[]> {
        return Promise.resolve(this.mascotas);
    }

    async findOne(id: number): Promise<Pet> {
        const mascota = this.mascotas.find(mascota => mascota.id === id);
        if(!mascota) throw new NotFoundException(`Mascota con id ${id} no encontrada`);
        return Promise.resolve(mascota);
    }
}
