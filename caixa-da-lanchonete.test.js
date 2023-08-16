import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {
    const caixa = new CaixaDaLanchonete();

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);
        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    // Testes de carrinho vazio
    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testes de compras simples
    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    // Testes de compras com múltiplos itens
    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    // Testes de compras com múltiplas quantidades
    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    // Testes de casos inválidos
    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testes de itens extras
    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testes de combos
    test.each([
        ['dinheiro', 'R$ 9,03', ['combo1,1']],
        ['credito', 'R$ 9,78', ['combo1,1']],
        ['debito', 'R$ 9,50', ['combo1,1']],
    ])('compra do combo1 em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 7,22', ['combo2,1']],
        ['credito', 'R$ 7,42', ['combo2,1']],
        ['debito', 'R$ 7,50', ['combo2,1']],
    ])('compra do combo2 em %p deve resultar em %p', validaTeste);

    // Testes de descontos/acréscimos
    test.each([
        ['dinheiro', 'R$ 8,55', ['cafe,1', 'sanduiche,1'], 'credito'],
        ['credito', 'R$ 9,00', ['cafe,1', 'sanduiche,1'], 'debito'],
        ['debito', 'R$ 9,35', ['cafe,1', 'sanduiche,1'], 'dinheiro'],
    ])('compra com desconto/acréscimo em %p deve resultar em %p', (formaDePagamento, resultadoEsperado, itens, formaPagamentoExtra) => {
        validaTeste(formaDePagamento, resultadoEsperado, itens.concat([formaPagamentoExtra]));
    });
});
