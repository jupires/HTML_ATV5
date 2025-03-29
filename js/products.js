const produtos = [
    {
        id: 'mk001',
        nome: 'Base Líquida HD',
        categoria: 'maquiagem',
        preco: 89.90,
        imagem: 'https://i.pinimg.com/736x/97/ee/22/97ee223cc886f0ebf2751edef7eae047.jpg',
        descricao: 'Cobertura média a alta com acabamento natural',
        ingredientes: ['Água', 'Óleo de Jojoba', 'Pigmentos minerais'],
        disponivel: true
    },
    {
        id: 'sk002',
        nome: 'Serum Vitamina C',
        categoria: 'skincare',
        preco: 129.90,
        imagem: 'https://i.pinimg.com/736x/fe/1c/19/fe1c19d2c7f4a567fffab3736b08299d.jpg',
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