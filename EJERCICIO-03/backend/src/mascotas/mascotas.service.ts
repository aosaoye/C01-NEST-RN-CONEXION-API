import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
    private readonly mascotas = [
        {
            id: 1,
            nombre: 'Pelusa',
            raza: 'gato',
            edad: 5,
        },
        {
            id: 2,
            nombre: 'Bobby',
            raza: 'perro',
            edad: 3,
        },
        {
            id: 3,
            nombre: 'Punky',
            raza: 'gato',
            edad: 2,
        },
        {
            id: 4,
            nombre: 'Bobby',
            raza: 'perro',
            edad: 1,
        },
        {
            id: 5,
            nombre: 'Bobby',
            raza: 'perro',
            edad: 1,
        },
    ];

    findOne(id: number) {
        return this.mascotas.find(mascota => mascota.id === id);
    }
}
