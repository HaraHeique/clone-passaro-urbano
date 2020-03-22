import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-ordem-compra-sucesso',
    templateUrl: './ordem-compra-sucesso.component.html',
    styleUrls: ['./ordem-compra-sucesso.component.css']
})
export class OrdemCompraSucessoComponent implements OnInit, OnChanges {
    @Input("idPedidoCompra") public idPedidoCompra: number;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges() {
        console.log(this.idPedidoCompra);
    }
}
