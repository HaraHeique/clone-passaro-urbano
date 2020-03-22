import { Component, OnInit } from "@angular/core";
import { OfertasService } from './../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
    selector: "app-topo",
    templateUrl: "./topo.component.html",
    styleUrls: ["./topo.component.css"],
    providers: [OfertasService]
})
export class TopoComponent implements OnInit {
    private subjectPesquisa: Subject<string> = new Subject();
    public ofertasObservable: Observable<Oferta[]>;
    public ofertas: Oferta[];
    public readonly LOGOIMG: string = "assets/logo.png";
    public readonly BANNERIMG: string = "assets/banners/img_1.jpg";
    public readonly CARRINHOIMG: string = "assets/carrinho.png";

    constructor(private ofertasService: OfertasService) { }

    ngOnInit() {
        // O switch map recebe os dados gerados pelo Subject
        /* Ponto importante do switchMap é que agora antes de se fazer uma request HTTP para a API
           existe uma camada em que posso fazer uma lógica antes de performar a request */
        this.ofertasObservable = this.subjectPesquisa
                           .pipe(
                               debounceTime(1000), // Executar a ação do switchMap após 1 segundo
                               distinctUntilChanged(), // Para fazer pesquisas distintas
                               switchMap((termoDaBusca: string) => {
                                   // Posso inserir lógica aqui antes de fazer a request para o back-end
                                   if (termoDaBusca.trim() === '') {
                                       // Retorar um observable vazio
                                       return of([]);
                                   }

                                   return this.ofertasService.pesquisaOfertas(termoDaBusca);
                               }),
                               catchError((error: any) => { 
                                   console.log(error);
                                   return of([]);
                                })
                           );

        // Substituído pelo pipe asynch
        //this.ofertasObservable.subscribe((ofertas: Oferta[]) => this.ofertas = ofertas);
    }

    public pesquisa(termoDaBusca: string): void {
        // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);

        // this.ofertas.subscribe(
        //     (data: Oferta[]) => console.log(data),
        //     (error: any) => console.log(error),
        //     () => console.log("Fluxo de eventos do OBSERVABLE completo!")
        // );

        // Envia o parâmetro termoDaBusca para o switchMap
        this.subjectPesquisa.next(termoDaBusca);
    }

    public limpaPesquisa() : void {
        this.subjectPesquisa.next('');
    }
}
