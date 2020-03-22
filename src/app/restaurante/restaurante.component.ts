import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
    selector: 'app-restaurante',
    templateUrl: './restaurante.component.html',
    styleUrls: ['./restaurante.component.css'],
    providers: [OfertasService]
})
export class RestauranteComponent implements OnInit {
    public ofertas: Array<Oferta>;
    //public dataTeste: any = new Date(2017, 8, 30);

    constructor(private ofertasService: OfertasService) { }

    ngOnInit() {
        this.ofertasService.getOfertasPorCategoria("restaurante")
            .then((value: Array<Oferta>) => this.ofertas = value)
            .catch((reason: any) => console.log(reason));
    }
}
