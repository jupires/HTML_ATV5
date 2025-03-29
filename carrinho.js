class Carrinho {
    constructor() {
        this.itens = [];
        this.total = 0;
        this.carregarLocalStorage();
    }

    adicionarItem(produto, quantidade = 1) {
        const itemExistente = this.itens.find(item => item.id === produto.id);
        
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            this.itens.push({
                ...produto,
                quantidade
            });
        }
        
        this.calcularTotal();
        this.salvarLocalStorage();
        this.atualizarUI();
    }

    removerItem(id) {
        this.itens = this.itens.filter(item => item.id !== id);
        this.calcularTotal();
        this.salvarLocalStorage();
        this.atualizarUI();
    }

    calcularTotal() {
        this.total = this.itens.reduce((acc, item) => {
            return acc + (item.preco * item.quantidade);
        }, 0);
    }

    salvarLocalStorage() {
        localStorage.setItem('carrinhoGlow', JSON.stringify({
            itens: this.itens,
            total: this.total
        }));
    }

    carregarLocalStorage() {
        const dados = JSON.parse(localStorage.getItem('carrinhoGlow'));
        if (dados) {
            this.itens = dados.itens;
            this.total = dados.total;
            this.atualizarUI();
        }
    }

    atualizarUI() {
        // Atualizar ícone do carrinho
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItens = this.itens.reduce((acc, item) => acc + item.quantidade, 0);
            cartCount.textContent = totalItens;
            cartCount.style.display = totalItens > 0 ? 'flex' : 'none';
        }
        
        // Atualizar modal do carrinho (se aberto)
        if (document.getElementById('cartModal').classList.contains('active')) {
            this.renderizarCarrinho();
        }
    }

    renderizarCarrinho() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (this.itens.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            cartTotal.textContent = 'R$ 0,00';
            return;
        }
        
        cartItems.innerHTML = this.itens.map(item => `
            <div class="cart-item">
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-details">
                    <h4>${item.nome}</h4>
                    <div class="item-price">R$ ${item.preco.toFixed(2)}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantidade}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        cartTotal.textContent = `R$ ${this.total.toFixed(2)}`;
        
        // Adicionar event listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removerItem(e.target.dataset.id);
            });
        });
        
        // Event listeners para quantidade
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const item = this.itens.find(item => item.id === id);
                
                if (e.target.classList.contains('minus')) {
                    if (item.quantidade > 1) {
                        item.quantidade--;
                    } else {
                        this.removerItem(id);
                    }
                } else if (e.target.classList.contains('plus')) {
                    item.quantidade++;
                }
                
                this.calcularTotal();
                this.salvarLocalStorage();
                this.renderizarCarrinho();
            });
        });
    }
}

// Inicialização
const carrinho = new Carrinho();

// Abrir/fechar modal do carrinho
document.getElementById('cartToggle').addEventListener('click', () => {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    carrinho.renderizarCarrinho();
});