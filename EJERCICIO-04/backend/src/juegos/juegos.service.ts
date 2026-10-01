import { Injectable, NotFoundException } from '@nestjs/common';

export interface Juego {
    id: number;
    titulo: string;
    genero: string;
    anio: number;
}

@Injectable()
export class JuegosService {
    private readonly juegos: Juego[] = [
        { id: 1, titulo: 'League of Legends', genero: 'MOBA', anio: 2009 },
        { id: 2, titulo: 'Minecraft', genero: 'Sandbox', anio: 2011 },
        { id: 3, titulo: 'Grand Theft Auto V', genero: 'Acción-aventura', anio: 2013 },
        { id: 4, titulo: 'Valorant', genero: 'FPS', anio: 2020 },
        { id: 5, titulo: 'Among Us', genero: 'Social-deduction', anio: 2018 },
    ];

    findAll(genero?: string): Juego[] {
        if (genero) {
            return this.juegos.filter(
                j => j.genero.toLowerCase() === genero.toLowerCase(),
            );
        }
        return this.juegos;
    }
}
