import { ActivatedRoute } from '@angular/router';
import { OfertasService } from './../../ofertas.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-onde-fica',
    templateUrl: './onde-fica.component.html',
    styleUrls: ['./onde-fica.component.css'],
    providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {
    public ondeFica: string;

    constructor(private ofertasService: OfertasService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        let idPai: number = this.route.parent.snapshot.params['id'];

        this.route.parent.params.subscribe(
            (params: any) => {
                this.ofertasService.getOndeFicaOfertaPorId(params.id)
                                   .then((value: string) => this.ondeFica = value)
                                   .catch((reason: any) => console.log(reason));
            }
        );
    }

}
