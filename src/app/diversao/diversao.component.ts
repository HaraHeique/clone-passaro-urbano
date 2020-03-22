import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';

@Component({
    selector: 'app-diversao',
    templateUrl: './diversao.component.html',
    styleUrls: ['./diversao.component.css'],
    providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {
    public ofertas: Array<Oferta>;

    constructor(private ofertasService: OfertasService) { }

    ngOnInit() {
        this.ofertasService.getOfertasPorCategoria("diversao")
            .then((value: Array<Oferta>) => this.ofertas = value)
            .catch((reason: any) => console.log(reason));
    }
}
