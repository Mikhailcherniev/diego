document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.querySelector('.fa-cart-shopping');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartButton = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout');
    let cart = [];
    let totalAmount = 0;

    // Criação do contador de itens no carrinho
    const cartCounter = document.createElement('span');
    cartCounter.style.backgroundColor = '#f00';
    cartCounter.style.color = '#fff';
    cartCounter.style.borderRadius = '50%';
    cartCounter.style.padding = '2px 6px';
    cartCounter.style.position = 'absolute';
    cartCounter.style.fontSize = '0.75rem';
    cartCounter.style.top = '10px';
    cartCounter.style.right = '10px';
    cartCounter.textContent = '0';

    // Inserir o contador ao lado do ícone do carrinho
    cartIcon.style.position = 'relative';
    cartIcon.appendChild(cartCounter);

    // Função para atualizar o total e o contador
    function updateCart() {
        cartCounter.textContent = cart.length;
        totalAmount = cart.reduce((total, item) => total + item.price, 0);
        totalAmountElement.textContent = `Total: R$ ${totalAmount.toFixed(2)}`;
        updateCartPopup();
    }

    function updateCartPopup() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-index="${index}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Adicionar eventos de clique para os botões de remover
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function toggleCartPopup() {
        cartPopup.style.display = cartPopup.style.display === 'flex' ? 'none' : 'flex';
    }

    // Evento de clique para adicionar itens ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const menuItem = this.closest('.menu-item');
            const name = menuItem.querySelector('h3').textContent;
            const price = parseFloat(menuItem.querySelector('.price').textContent.replace('R$', '').replace(',', '.'));

            cart.push({ name, price });
            updateCart();
        });
    });

    // Evento de clique para exibir o pop-up do carrinho
    cartIcon.addEventListener('click', toggleCartPopup);
    closeCartButton.addEventListener('click', toggleCartPopup);

    // Evento de clique para finalizar compra
    checkoutButton.addEventListener('click', function () {
        if (cart.length > 0) {
            alert(`Compra finalizada! Total: R$ ${totalAmount.toFixed(2)}`);
            cart = [];
            updateCart();
            toggleCartPopup();
        } else {
            alert("Seu carrinho está vazio!");
        }
    });

    // Evento para filtrar categorias
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            document.querySelectorAll('.menu-item').forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
