import { Oferta } from './shared/oferta.model';
import { ItemCarrinho } from './shared/item-carrinho.model';

/* Este Service deve ser injetado no módulo, ou seja, singleton/global e não do componente em si,
pois o carrinho é compartilhado por toda a aplicação.
*/
class CarrinhoService {
    private itens: Array<ItemCarrinho> = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );
        
        // Verificar se o item em questão já exista dentro de this.itens
        let itemCarrinhoExistente: ItemCarrinho = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
        
        if (itemCarrinhoExistente) {
            itemCarrinhoExistente.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinhoCompras(): number {
        // let total: number = 0;

        // this.itens.map((item: ItemCarrinho) => {
        //     total += item.valor * item.quantidade
        // });

        // return total;
    
        return this.itens.map((item: ItemCarrinho) => item.valor * item.quantidade)
                         .reduce((previous: number, current: number) => previous + current, 0);
    }

    public adicionarQuantidade(item: ItemCarrinho) {
        let itemCarrinhoExistente: ItemCarrinho = this.itens.find((i: ItemCarrinho) => i.id === item.id);
        
        if (itemCarrinhoExistente) {
            itemCarrinhoExistente.quantidade++;
        }
    }

    public removerQuantidade(item: ItemCarrinho) {
        let itemCarrinhoExistente: ItemCarrinho = this.itens.find((i: ItemCarrinho) => i.id === item.id);

        if (itemCarrinhoExistente && itemCarrinhoExistente.quantidade !== 0) {
            itemCarrinhoExistente.quantidade--;

            if (itemCarrinhoExistente.quantidade === 0) {
                // Removendo o item do array
                this.itens.splice(this.itens.indexOf(itemCarrinhoExistente), 1);
            }
        }
    }

    public contemItens(): boolean {
        return this.itens.length > 0;
    }

    public pegarTodosItens(): Array<ItemCarrinho> {
        return this.itens;
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

export { CarrinhoService };