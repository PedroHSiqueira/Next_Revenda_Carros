import { MarcaI } from "./marcas";

export interface CarroI{
    id: number;
    modelo: string;
    ano: string;
    km: number;
    preco: number;
    foto: string;
    acessorios: string;
    destacado: boolean;
    createdAt: Date;
    updatedAt: Date;
    combustivel: string;
    marca: MarcaI;
    marcaId: number;
}