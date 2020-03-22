import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { OfertaComponent } from './oferta/oferta.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'restaurantes', component: RestauranteComponent },
    { path: 'diversao', component: DiversaoComponent },
    { path: 'oferta', component: OfertaComponent },
    {
        path: 'oferta/:id', component: OfertaComponent,
        children: [
            { path: '', component: ComoUsarComponent },
            { path: 'como-usar', component: ComoUsarComponent },
            { path: 'onde-fica', component: OndeFicaComponent }
        ]
    },
    { path: 'ordem-compra', component: OrdemCompraComponent }
    // { path: 'oferta/:id/:subId', component: OfertaComponent },
]