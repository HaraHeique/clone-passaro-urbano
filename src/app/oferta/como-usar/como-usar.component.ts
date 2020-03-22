import { OfertasService } from './../../ofertas.service';
import { ComoUsar } from './../../shared/como-usar.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-como-usar',
    templateUrl: './como-usar.component.html',
    styleUrls: ['./como-usar.component.css'],
    providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {
    public comoUsarObj: ComoUsar;
    public comoUsar: string;

    constructor(private route: ActivatedRoute,
                private ofertasService: OfertasService) { }

    ngOnInit() {
        // Pega os parâmetros da rota do pai
        let idPai: number = this.route.parent.snapshot.params['id'];

        this.route.parent.params.subscribe(
            (params: any) => {
                this.ofertasService.getComoUsarOfertaPorId(idPai)
                                   .then((value: ComoUsar) => this.comoUsarObj = value)
                                   .catch((reason: any) => console.log(reason));
            }
        );
    }
}
