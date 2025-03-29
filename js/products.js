const produtos = [
    {
        id: 'mk001',
        nome: 'Base Líquida HD',
        categoria: 'maquiagem',
        preco: 89.90,
        imagem: 'images/produtos/base-hd.jpg',
        descricao: 'Cobertura média a alta com acabamento natural',
        ingredientes: ['Água', 'Óleo de Jojoba', 'Pigmentos minerais'],
        disponivel: true
    },
    {
        id: 'sk002',
        nome: 'Serum Vitamina C',
        categoria: 'skincare',
        preco: 129.90,
        imagem: 'images/produtos/serum-vitc.jpg',
        descricao: 'Clareador e antioxidante potente',
        ingredientes: ['Vitamina C 20%', 'Ácido Ferúlico', 'Ácido Hialurônico'],
        disponivel: true
    }
    // +20 produtos...
];

function getProdutosPorCategoria(categoria) {
    return produtos.filter(produto => produto.categoria === categoria);
}

function getProdutoPorId(id) {
    return produtos.find(produto => produto.id === id);
}