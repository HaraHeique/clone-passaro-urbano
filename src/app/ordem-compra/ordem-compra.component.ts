import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
    selector: 'app-ordem-compra',
    templateUrl: './ordem-compra.component.html',
    styleUrls: ['./ordem-compra.component.css'],
    providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {
    public readonly SEMITENS: string = "Seu carrinho está vazio!!! Não perca tempo, aproveita as ofertas!";
    public idPedido: number;
    public itensCarrinho: Array<ItemCarrinho>;
    public totalValorCarrinho: number;

    // FormGroup é um formulário
    // FormControl é o campos do formulário
    public formulario: FormGroup = new FormGroup({
        "endereco": new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(120)
        ]),
        "numero": new FormControl(null, [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
        ]),
        "complemento": new FormControl(null),
        "formaPagamento": new FormControl(null, [
            Validators.required
        ])
    });

    constructor(private ordemCompraService: OrdemCompraService,
                private carrinhoService: CarrinhoService) { }

    ngOnInit() {
        this.itensCarrinho = this.carrinhoService.exibirItens();
        this.totalValorCarrinho = this.carrinhoService.totalCarrinhoCompras();
    }

    public confirmarCompra(): void {
        if (this.formulario.status == "INVALID") {
            // this.formulario.get("endereco").markAsTouched();
            // this.formulario.get("numero").markAsTouched();
            // this.formulario.get("complemento").markAsTouched();
            // this.formulario.get("formaPagamento").markAsTouched();
            this.formulario.markAllAsTouched();
        } else {
            if (!this.carrinhoService.contemItens()) {
                alert("Você não selecionou nenhum item!");
                return;
            }

            let pedido: Pedido = new Pedido(
                this.formulario.value.endereco,
                this.formulario.value.numero,
                this.formulario.value.complemento,
                this.formulario.value.formaPagamento,
                this.carrinhoService.pegarTodosItens()
            );

            this.ordemCompraService.efetivarCompra(pedido).subscribe(
                (idPedido: number) => { 
                    this.idPedido = idPedido;

                    // Limpar o carrinho de compras
                    this.carrinhoService.limparCarrinho();
                },
                (error: any) => console.log(error),
                () => console.log("Compra efetivada com sucesso")
            );
        }
    }

    public adicionar(item: ItemCarrinho): void {
        this.carrinhoService.adicionarQuantidade(item);
        this.totalValorCarrinho = this.carrinhoService.totalCarrinhoCompras();
    }

    public remover(item: ItemCarrinho): void {
        this.carrinhoService.removerQuantidade(item);
        this.totalValorCarrinho = this.carrinhoService.totalCarrinhoCompras();
    }
}
