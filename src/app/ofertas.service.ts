import { ComoUsar } from './shared/como-usar.model';
import { Oferta } from './shared/oferta.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API_OFERTAS, URL_API_COMOUSAR, URL_API_ONDEFICA } from './app.api';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {
    //private urlApi = "http://localhost:3000/ofertas";

    constructor(private http: HttpClient) {}

    public async getOfertas(): Promise<Array<Oferta>> {
        // Efetuar uma requisição http e retornar a promise para quem chama o serviço
        return await this.http.get<Array<Oferta>>(URL_API_OFERTAS)
                              .toPromise()
                              .then((resposta: Array<Oferta>) => resposta);
    }

    public async getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>> {
        // Efetuar uma request http para a API Rest fake passando como parâmetro a categoria desejada
        return await this.http.get(`${URL_API_OFERTAS}?categoria=${categoria}`)
                              .toPromise()
                              .then((resposta: Array<Oferta>) => { return resposta });
    }

    public async getOfertaPorId(id: number): Promise<Oferta> {
        // .shift() é uma função do js que pega a primeira posição do array, retirando-o do array e rearanjando as posições dos outros elementos do array
        return await this.http.get(`${URL_API_OFERTAS}?id=${id}`)
                              .toPromise()
                              .then((resposta: Array<Oferta>) => resposta.shift());
    }

    public async getComoUsarOfertaPorId(id: number): Promise<ComoUsar> {
        // Utilizado pelo subcomponente do componente oferta
        // Poderia usar exatamente uma string da chave descrição em vez da classe ComoUsar
        return await this.http.get(`${URL_API_COMOUSAR}?id=${id}`)
                              .toPromise()
                              .then((resposta: ComoUsar[]) => resposta.shift());
    }

    public async getOndeFicaOfertaPorId(id: number): Promise<string> {
        // Também utilizado pelo subcomponente do componente oferta
        return await this.http.get(`${URL_API_ONDEFICA}?id=${id}`)
                              .toPromise()
                              .then((resposta: any) => resposta.shift().descricao);
    }

    public pesquisaOfertas(termo: string): Observable<Array<Oferta>> {
        // _like é algo que o json-server possui para recuperar baseado na proximidade da string
        // O pipe é um mecanismo para trasformar o dado para depois mapeá-lo
        // O retry tentará fazer x conexões com a api rest back-end
        return this.http.get<Array<Oferta>>(`${URL_API_OFERTAS}?descricao_oferta_like=${termo}`)
                        .pipe(
                            retry(10),
                            map((resposta: Array<Oferta>) => resposta)
                        );
    }

    /* #region Código antigo sem utilização do pacote json-server */
    // private ofertas: Array<Oferta> = [
    //     {
    //         id: 1,
    //         categoria: "restaurante",
    //         titulo: "Super Burger",
    //         descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
    //         anunciante: "Original Burger",
    //         valor: 29.90,
    //         destaque: true,
    //         imagens: [
    //             { url: "/assets/ofertas/1/img1.jpg" },
    //             { url: "/assets/ofertas/1/img2.jpg" },
    //             { url: "/assets/ofertas/1/img3.jpg" },
    //             { url: "/assets/ofertas/1/img4.jpg" }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         categoria: "restaurante",
    //         titulo: "Cozinha Mexicana",
    //         descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
    //         anunciante: "Mexicana",
    //         valor: 32.90,
    //         destaque: true,
    //         imagens: [
    //             { url: "/assets/ofertas/2/img1.jpg" },
    //             { url: "/assets/ofertas/2/img2.jpg" },
    //             { url: "/assets/ofertas/2/img3.jpg" },
    //             { url: "/assets/ofertas/2/img4.jpg" }
    //         ]

    //     },
    //     {
    //         id: 4,
    //         categoria: "diversao",
    //         titulo: "Estância das águas",
    //         descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
    //         anunciante: "Estância das águas",
    //         valor: 31.90,
    //         destaque: true,
    //         imagens: [
    //             { url: "/assets/ofertas/3/img1.jpg" },
    //             { url: "/assets/ofertas/3/img2.jpg" },
    //             { url: "/assets/ofertas/3/img3.jpg" },
    //             { url: "/assets/ofertas/3/img4.jpg" },
    //             { url: "/assets/ofertas/3/img5.jpg" },
    //             { url: "/assets/ofertas/3/img6.jpg" }
    //         ]
    //     }
    // ]

    // public getOfertas(): Array<Oferta> {
    //     return this.ofertas;
    // }

    // public getOfertasPromise(): Promise<Array<Oferta>> {
    //     // return new Promise(function(resolve, reject) {
    //     // });

    //     // Usando arrow function (ES6)
    //     return new Promise((resolve, reject) => {
    //         // Algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject
    //         let deu_certo: boolean = true;

    //         if (deu_certo) {
    //             setTimeout(() => resolve(this.ofertas), 3000);
    //         }
    //         else {
    //             reject({
    //                 codigo_erro: 404,
    //                 mensagem_erro: 'Servidor não encontrado'
    //             });
    //         }
    //     })
    //     .then((ofertas: Array<Oferta>) => {
    //         // Fazer alguma tratativa
    //         console.log("Primeiro then");
    //         return ofertas;
    //     })
    //     .then((ofertas: Array<Oferta>) => {
    //         // Fazer uma outra tratativa
    //         console.log("Segundo then");
    //         return new Promise((resolve2, reject2) => {
    //             setTimeout(() => {
    //                 resolve2(ofertas)
    //             }, 3000);
    //         });
    //     })
    //     .then((ofertas: Oferta[]) => {
    //         console.log("Terceiro then executado após 3 segundos porque estava aguardando uma promise ser resolvida");
    //         return ofertas;
    //     });
    // }
    //#endregion
}