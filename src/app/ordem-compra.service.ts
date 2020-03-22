import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from './shared/pedido.model';
import { Observable } from 'rxjs';
import { URL_API_ORDEMCOMPRA } from './app.api';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {
    
    constructor(private http: HttpClient) {
    }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        const headers: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8"
        });

        // return this.http.post(
        //     `${URL_API_ORDEMCOMPRA}`,
        //     JSON.stringify(pedido),
        //     {
        //         headers: headers,
        //         observe: "response" // Este observe é meio troll
        //     }
        // );

        return this.http.post(
            `${URL_API_ORDEMCOMPRA}`,
            JSON.stringify(pedido),
            {
                headers: headers
            }
        )
        .pipe(
            map((response: any) => response.id)
        );
    }
}