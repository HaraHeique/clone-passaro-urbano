import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from './../ofertas.service';
import { Oferta } from './../shared/oferta.model';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { CarrinhoService } from '../carrrinho.service';

@Component({
    selector: 'app-oferta',
    templateUrl: './oferta.component.html',
    styleUrls: ['./oferta.component.css'],
    providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {
    //private meuObservableTesteSubscription: Subscription;
    public oferta: Oferta;

    constructor(private route: ActivatedRoute, 
                private ofertasService: OfertasService,
                private carrinhoService: CarrinhoService) { }

    ngOnInit(): void {
        // Pegando o parâmetro da rota atual do template do respectivo componente
        let id: number = this.route.snapshot.params['id'];

        this.route.params.subscribe(
            (params: any) => {
                this.ofertasService.getOfertaPorId(params.id)
                                   .then((value: Oferta) => this.oferta = value)
                                   .catch((reason: any) => console.log(reason));
            }
        );
        /* TESTANDO O OBSERVABLE DE ACTIVATED ROUTE*/
        // Se inscreve em um objeto e fica assistindo até que haja alguma alteração. Quando há alteração é feita a reação desta alteração
        // this.route.params.subscribe((params: any) => {
        //     console.log(params.id);
        // });
        // this.route.params.subscribe(
        //     (params: any) => { console.log(params) },
        //     (error: any) => console.log(error),
        //     () => console.log("Processamento foi classificado como concluído!")
        // );

        /* UTILIZANDO INTERVAL OBSERVABLE */
        // // Criando o objeto observável a partir da interval
        // let tempo: Observable<number> = interval(2000);

        // // Criando o observador e o inscrevendo no objeto observável
        // // OBS.: Não há trativas de erro e finalização, pois o interval não implementa estas possibilidades por ser uma stream infinita
        // tempo.subscribe((intervalo: number) => {
        //     console.log(intervalo);
        // });

        /* UTILIZANDO OBSERVABLE P/ MECANISMO DE TRANSFORMAÇÃO DE DADOS */
        // Observable (observável) - Produz as informações a partir de um fluxo em um processamento assincrono
        // let meuObservableTeste: Observable<string> = Observable.create((observer: Observer<string>) => {
        //     observer.next("Primeiro evento da stream");
        //     observer.next("Segundo evento da stream");
        //     observer.error("Algum erro foi encontrado na stream de eventos");
        //     observer.complete();
        // });

        // // Observable (observador) - Escuta as alterações do observavel chamando três estados de next, error ou complete
        // meuObservableTeste.subscribe(
        //     (resultado: string) => console.log(resultado),
        //     (erro: string) => console.log(erro),
        //     () => console.log("Stream de eventos foi finalizada")
        // );

        // Observável do tipo number
        // let meuObservableNumber: Observable<number> = Observable.create((observer: Observer<number>) => {
        //       observer.next(1);
        //       observer.next(3);
        //       observer.complete();
        //       observer.error("Erro ocorreu ao contar os números");
        // });

        // // Observador do tipo number
        // this.meuObservableTesteSubscription = meuObservableNumber.subscribe(
        //     (resultado: number) => console.log(resultado),
        //     (error: string) => console.log(error),
        //     () => console.log("ACABOU É TETRA!!!")
        // );
    }

    ngOnDestroy(): void {
        //this.meuObservableTesteSubscription.unsubscribe();
    }

    public adicionarItemCarrinho(): void {
        this.carrinhoService.incluirItem(this.oferta);
    }
}
