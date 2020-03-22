import { OrdemCompraService } from './../ordem-compra.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../shared/pedido.model';

@Component({
    selector: 'app-ordem-compra',
    templateUrl: './ordem-compra.component.html',
    styleUrls: ['./ordem-compra.component.css'],
    providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {
    // Quando a compra é feita com sucesso
    public idPedidoCompra: number;

    // Campos do formulário
    public endereco: string = "";
    public numero: string = "";
    public complemento: string = "";
    public formaPagamento: string = "";

    // Controle de validação dos campos
    public enderecoValido: boolean;
    public numeroValido: boolean;
    public complementoValido: boolean;
    public formaPagamentoValido: boolean;

    // Estados primitivos dos campos (pristine)
    public enderecoEstadoPrimitivo: boolean = true;
    public numeroEstadoPrimitivo: boolean = true;
    public complementoEstadoPrimitivo: boolean = true;
    public formaPagamentoEstadoPrimitivo: boolean = true;

    // Controlar botão confirmar compra
    public formEstado: string = "disabled";

    constructor(private ordemCompraService: OrdemCompraService) { }

    ngOnInit() {
        //this.ordemCompraService.efetivarCompra();
    }

    public atualizaEndereco(endereco: string): void {
        this.endereco = endereco;
        this.enderecoEstadoPrimitivo = false;

        if (this.endereco.length > 3) {
            this.enderecoValido = true;
        } else {
            this.enderecoValido = false;
        }

        this.habilitaForm();
    }

    public atualizaNumero(numero: string): void {
        this.numero = numero;
        this.numeroEstadoPrimitivo = false;
        this.numeroValido = this.isNormalInteger(numero);

        this.habilitaForm();
    }

    public atualizaComplemento(complemento: string): void {
        this.complemento = complemento;
        this.complementoEstadoPrimitivo = false;

        if (this.complemento.length < 0) {
            this.complementoValido = false;
        } else {
            this.complementoValido = true;
        }

        this.habilitaForm();
    }

    public atualizaFormaPagamento(formaPagamento: string): void {
        this.formaPagamento = formaPagamento;
        this.formaPagamentoEstadoPrimitivo = false;

        // Ou checar se a string é maior que zero
        if (this.formaPagamento.toLocaleLowerCase() == "dinheiro" || 
            this.formaPagamento.toLocaleLowerCase() == "debito") {
                this.formaPagamentoValido = true;
        } else {
            this.formaPagamentoValido = false;
        }

        this.habilitaForm();
    }

    public habilitaForm(): void {
        if (this.enderecoValido && this.numeroValido && this.formaPagamentoValido) {
            this.formEstado = "";
        } else {
            this.formEstado = "disabled";
        }
    }

    public confirmarCompra(): void {
        let pedido: Pedido = new Pedido(
            this.endereco,
            this.numero,
            this.complemento,
            this.formaPagamento
        );
        
        this.ordemCompraService.efetivarCompra(pedido).subscribe(
            (idPedido: number) => this.idPedidoCompra = idPedido,
            (error: any) => console.log(error),
            () => console.log("Finalizado com sucesso!")
        );
    }

    private isNormalInteger(strNumber: string): boolean {
        return /^\+?(0|[1-9]\d*)$/.test(strNumber);
    }
}