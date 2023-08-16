class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        // Definição do cardápio com os valores de cada item
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        // Itens que são considerados principais
        const itensPrincipais = ['cafe', 'suco', 'sanduiche', 'combo1', 'combo2'];

        // Desconto para pagamento em dinheiro e acréscimo para pagamento a crédito
        const descontoDinheiro = 0.05;
        const acrescimoCredito = 0.03;

        let total = 0;

        // Verifica se não há itens no carrinho de compra
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Itera sobre os itens no carrinho
        for (const itemInfo of itens) {
            const [item, quantidade] = itemInfo.split(','); // Divide a string em código do item e quantidade
            if (!cardapio.hasOwnProperty(item)) {
                return "Item inválido!";
            }

            const valorItem = cardapio[item] * quantidade; // Calcula o valor total do item com base na quantidade

            if (itensPrincipais.includes(item)) {
                total += valorItem;
            } else {
                const itemPrincipal = item.replace('extra', ''); // Encontra o item principal relacionado ao extra
                if (!itens.includes(`${itemPrincipal},${quantidade}`)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
                total += valorItem;
            }
        }

        // Verifica se o total é inválido
        if (total === 0) {
            return "Quantidade inválida!";
        }

        // Aplica desconto ou acréscimo com base na forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            total -= total * descontoDinheiro;
        } else if (formaDePagamento === 'credito') {
            total += total * acrescimoCredito;
        } else if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Retorna o valor total formatado com R$ e decimais separados por vírgula
        return `Total a pagar: R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

