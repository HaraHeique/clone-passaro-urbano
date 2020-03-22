// import { Component, OnInit, ViewChild } from '@angular/core';
// import { OrdemCompraService } from '../ordem-compra.service'
// import { Pedido } from '../shared/pedido.model'
// import { NgForm } from '@angular/forms';

// @Component({
//     selector: 'app-ordem-compra',
//     templateUrl: './ordem-compra.component.html',
//     styleUrls: ['./ordem-compra.component.css'],
//     providers: [OrdemCompraService]
// })
// export class OrdemCompraComponent implements OnInit {
//     @ViewChild('formulario', { static: false }) public f: NgForm;
//     public idPedido: number;

//     constructor(private ordemCompraService: OrdemCompraService) { }

//     ngOnInit() {

//     }

//     // public confirmarCompra(formulario: NgForm): void {
//     //     console.log(formulario);
//     // }

//     public confirmarCompra(): void {
//         let pedido: Pedido = new Pedido(
//             this.f.value.endereco,
//             this.f.value.numero,
//             this.f.value.complemento,
//             this.f.value.formaPagamento
//         );

//         this.ordemCompraService.efetivarCompra(pedido).subscribe(
//             (idPedido: number) => this.idPedido = idPedido,
//             (error: any) => console.log(error),
//             () => console.log("Pedido cadastrado com sucesso!")
//         );
//     }
// }
