import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';

import { CarrinhoService } from './carrrinho.service';

import { DescricaoReduzidaPipe } from './util/descricao-reduzida.pipe';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        TopoComponent,
        HomeComponent,
        RodapeComponent,
        RestauranteComponent,
        DiversaoComponent,
        OfertaComponent,
        ComoUsarComponent,
        OndeFicaComponent,
        DescricaoReduzidaPipe,
        OrdemCompraComponent,
        OrdemCompraSucessoComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),
        // FormsModule
        ReactiveFormsModule
    ],
    providers: [ 
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        //{ provide: CarrinhoService, useValue: CarrinhoService }, // Forma extendida
        CarrinhoService // Forma reduzida
    ],
    // providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
